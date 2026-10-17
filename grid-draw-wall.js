(function() {
    "use strict";

    // ============================================================
    //  CONFIG
    // ============================================================
    const GRID_SIZE = 30;
    const WALL_THICKNESS = 4;

    // ============================================================
    //  STATE
    // ============================================================
    let walls = [];
    let isDrawingMode = false;
    let isDrawing = false;
    let startPoint = null;
    let hoveredWallIndex = -1;
    let lastMousePos = { x: 0, y: 0 };

    // ============================================================
    //  DOM REFS
    // ============================================================
    const workspace = document.querySelector('.workspace');
    let overlayCanvas = null;
    let ctx = null;

    // ============================================================
    //  CREATE OVERLAY CANVAS
    // ============================================================
    function createOverlayCanvas() {
        if (!workspace) {
            console.warn('[GridDraw] .workspace not found');
            return false;
        }

        const old = document.getElementById('gridWallOverlay');
        if (old) old.remove();

        overlayCanvas = document.createElement('canvas');
        overlayCanvas.id = 'gridWallOverlay';
        overlayCanvas.style.position = 'absolute';
        overlayCanvas.style.top = '0';
        overlayCanvas.style.left = '0';
        overlayCanvas.style.width = '100%';
        overlayCanvas.style.height = '100%';
        overlayCanvas.style.pointerEvents = 'auto';
        overlayCanvas.style.zIndex = '15';
        overlayCanvas.style.display = 'none';

        workspace.style.position = 'relative';
        workspace.appendChild(overlayCanvas);

        ctx = overlayCanvas.getContext('2d');
        resizeCanvas();

        if (window.ResizeObserver) {
            const ro = new ResizeObserver(() => resizeCanvas());
            ro.observe(workspace);
        }
        window.addEventListener('resize', resizeCanvas);

        console.log('[GridDraw] Overlay canvas created');
        return true;
    }

    function resizeCanvas() {
        if (!overlayCanvas || !workspace) return;
        const rect = workspace.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        overlayCanvas.width = rect.width * dpr;
        overlayCanvas.height = rect.height * dpr;
        overlayCanvas.style.width = rect.width + 'px';
        overlayCanvas.style.height = rect.height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        render();
    }

    // ============================================================
    //  SNAP TO GRID (CSS pixel coords)
    // ============================================================
    function snapToGrid(value) {
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
    }

    function getSnappedPoint(clientX, clientY) {
        const rect = overlayCanvas.getBoundingClientRect();
        let rawX = clientX - rect.left;
        let rawY = clientY - rect.top;
        rawX = Math.max(0, Math.min(rect.width, rawX));
        rawY = Math.max(0, Math.min(rect.height, rawY));
        return {
            x: snapToGrid(rawX),
            y: snapToGrid(rawY)
        };
    }

    // ============================================================
    //  DRAWING (No grid – only walls and preview)
    // ============================================================
    function drawWalls() {
        if (!ctx) return;
        walls.forEach((wall, index) => {
            const isHovered = (index === hoveredWallIndex && isDrawingMode);
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 3;

            ctx.beginPath();
            ctx.moveTo(wall.x1, wall.y1);
            ctx.lineTo(wall.x2, wall.y2);

            if (isHovered) {
                ctx.strokeStyle = '#e94560';
                ctx.lineWidth = WALL_THICKNESS + 4;
                ctx.shadowColor = 'rgba(233,69,96,0.5)';
                ctx.shadowBlur = 16;
            } else {
                ctx.strokeStyle = '#2c3e50';
                ctx.lineWidth = WALL_THICKNESS;
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            ctx.shadowBlur = 0;
            ctx.fillStyle = isHovered ? '#e94560' : '#2c3e50';
            ctx.beginPath();
            ctx.arc(wall.x1, wall.y1, isHovered ? 7 : 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(wall.x2, wall.y2, isHovered ? 7 : 4, 0, Math.PI * 2);
            ctx.fill();

            if (isHovered) {
                ctx.fillStyle = '#fff';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const midX = (wall.x1 + wall.x2) / 2;
                const midY = (wall.y1 + wall.y2) / 2;
                ctx.fillText('✕', midX, midY);
            }
            ctx.restore();
        });
    }

    function drawPreview() {
        if (!isDrawing || !startPoint || !ctx) return;
        const { x: sx, y: sy } = startPoint;
        const { x: ex, y: ey } = lastMousePos;

        ctx.save();
        ctx.setLineDash([8, 6]);
        ctx.strokeStyle = '#3a7bd5';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(58,123,213,0.3)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(58,123,213,0.6)';
        ctx.fillStyle = '#3a7bd5';
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(58,123,213,0.4)';
        ctx.fillStyle = '#3a7bd5';
        ctx.beginPath();
        ctx.arc(ex, ey, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function render() {
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        drawWalls();
        drawPreview();
    }

    // ============================================================
    //  3D SYNC – Send walls to the existing 3D system
    // ============================================================
    function syncWallsTo3D() {
        // Update the global wall data used by design.js
        window.roomWallData = window.roomWallData || {};
        window.roomWallData.walls = walls.map(w => ({
            x1: w.x1,
            y1: w.y1,
            x2: w.x2,
            y2: w.y2
        }));
        // For 3D we might also need points array (optional)
        // We'll set it to empty or derive from walls if needed
        window.roomWallData.points = [];
        window.roomWallData.closed = false;
        window.roomWallData.shape = 'custom';

        // Call the global function from design.js
        if (typeof sendWallsTo3D === 'function') {
            sendWallsTo3D();
        } else {
            // Fallback: dispatch event for threeview.js
            window.dispatchEvent(new CustomEvent('roomWallsUpdated', {
                detail: window.roomWallData
            }));
        }
        console.log('[GridDraw] Synced walls to 3D, count:', walls.length);
    }

    // ============================================================
    //  WALL OPERATIONS (with 3D sync)
    // ============================================================
    function addWall(x1, y1, x2, y2) {
        if (Math.abs(x1 - x2) < 2 && Math.abs(y1 - y2) < 2) return false;
        walls.push({ x1, y1, x2, y2 });
        render();
        syncWallsTo3D();
        return true;
    }

    function deleteWallAt(index) {
        if (index < 0 || index >= walls.length) return false;
        walls.splice(index, 1);
        hoveredWallIndex = -1;
        render();
        syncWallsTo3D();
        return true;
    }

    function clearAllWalls() {
        if (walls.length === 0) return;
        walls = [];
        hoveredWallIndex = -1;
        isDrawing = false;
        startPoint = null;
        render();
        syncWallsTo3D();
    }

    // ============================================================
    //  HIT TEST
    // ============================================================
    function distToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1, dy = y2 - y1;
        const lenSq = dx * dx + dy * dy;
        if (lenSq === 0) return Math.hypot(px - x1, py - y1);
        let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
        t = Math.max(0, Math.min(1, t));
        const projX = x1 + t * dx, projY = y1 + t * dy;
        return Math.hypot(px - projX, py - projY);
    }

    function findWallAt(cx, cy) {
        for (let i = walls.length - 1; i >= 0; i--) {
            const w = walls[i];
            if (distToSegment(cx, cy, w.x1, w.y1, w.x2, w.y2) < 18) return i;
        }
        return -1;
    }

    // ============================================================
    //  EVENTS
    // ============================================================
    function handleCanvasDown(e) {
        if (!isDrawingMode) return;
        e.preventDefault();
        e.stopPropagation();

        const rect = overlayCanvas.getBoundingClientRect();
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
        const { x, y } = getSnappedPoint(clientX, clientY);

        // Delete mode: Right-click or Shift+click
        if (e.button === 2 || e.shiftKey) {
            const idx = findWallAt(x, y);
            if (idx !== -1) {
                deleteWallAt(idx);
                showStatus('🗑️ Wall deleted');
            } else {
                showStatus('❌ No wall here');
            }
            return;
        }

        // Draw mode
        if (!isDrawing) {
            isDrawing = true;
            startPoint = { x, y };
            lastMousePos = { x, y };
            render();
            showStatus('📍 Click again to place wall end');
        } else {
            const success = addWall(startPoint.x, startPoint.y, x, y);
            isDrawing = false;
            startPoint = null;
            showStatus(success ? '✅ Wall placed!' : '⚠️ Wall too short');
            render();
        }
    }

    function handleCanvasMove(e) {
        if (!isDrawingMode) return;
        e.preventDefault();

        const rect = overlayCanvas.getBoundingClientRect();
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
        const { x, y } = getSnappedPoint(clientX, clientY);
        lastMousePos = { x, y };

        const idx = findWallAt(x, y);
        if (idx !== hoveredWallIndex) {
            hoveredWallIndex = idx;
            render();
            overlayCanvas.style.cursor = idx !== -1 ? 'pointer' : 'crosshair';
        }

        if (isDrawing && startPoint) render();
    }

    function handleCanvasLeave() {
        if (hoveredWallIndex !== -1) {
            hoveredWallIndex = -1;
            render();
        }
    }

    function handleKeyDown(e) {
        if (!isDrawingMode) return;

        if (e.key === 'Escape') {
            if (isDrawing) {
                isDrawing = false;
                startPoint = null;
                render();
                showStatus('❌ Cancelled');
            } else {
                deactivateGridDraw();
            }
            e.preventDefault();
        }

        if (e.key === 'Enter' && isDrawing && startPoint) {
            const { x, y } = lastMousePos;
            addWall(startPoint.x, startPoint.y, x, y);
            isDrawing = false;
            startPoint = null;
            render();
            showStatus('✅ Wall placed');
            e.preventDefault();
        }

        if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey) {
            if (confirm('Clear all walls?')) {
                clearAllWalls();
                showStatus('🧹 All walls cleared');
            }
            e.preventDefault();
        }

        if ((e.key === 'Delete' || e.key === 'Backspace') && hoveredWallIndex !== -1) {
            deleteWallAt(hoveredWallIndex);
            showStatus('🗑️ Wall deleted');
            e.preventDefault();
        }
    }

    // ============================================================
    //  STATUS MESSAGE
    // ============================================================
    let statusTimeout = null;

    function showStatus(text) {
        let el = document.getElementById('gridWallStatus');
        if (!el) {
            el = document.createElement('div');
            el.id = 'gridWallStatus';
            el.style.position = 'fixed';
            el.style.bottom = '70px';
            el.style.left = '50%';
            el.style.transform = 'translateX(-50%)';
            el.style.background = 'rgba(0,0,0,0.8)';
            el.style.color = '#fff';
            el.style.padding = '8px 18px';
            el.style.borderRadius = '30px';
            el.style.fontSize = '14px';
            el.style.zIndex = '999999';
            el.style.pointerEvents = 'none';
            el.style.transition = 'opacity 0.3s';
            document.body.appendChild(el);
        }
        el.textContent = text;
        el.style.opacity = '1';
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { el.style.opacity = '0'; }, 2000);
    }

    // ============================================================
    //  ACTIVATE / DEACTIVATE
    // ============================================================
    function activateGridDraw() {
        if (isDrawingMode) return;
        if (!overlayCanvas) {
            const created = createOverlayCanvas();
            if (!created) {
                alert('Could not create grid canvas.');
                return;
            }
        }
        overlayCanvas.style.display = 'block';
        overlayCanvas.style.pointerEvents = 'auto';
        isDrawingMode = true;
        isDrawing = false;
        startPoint = null;
        hoveredWallIndex = -1;

        overlayCanvas.addEventListener('mousedown', handleCanvasDown);
        overlayCanvas.addEventListener('mousemove', handleCanvasMove);
        overlayCanvas.addEventListener('mouseleave', handleCanvasLeave);
        overlayCanvas.addEventListener('touchstart', handleCanvasDown, { passive: false });
        overlayCanvas.addEventListener('touchmove', handleCanvasMove, { passive: false });
        overlayCanvas.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('keydown', handleKeyDown);

        render();
        showStatus('✏️ Grid Draw active — click to start wall');
        console.log('[GridDraw] Activated');
    }

    function deactivateGridDraw() {
        if (!isDrawingMode) return;
        isDrawingMode = false;
        isDrawing = false;
        startPoint = null;
        hoveredWallIndex = -1;

        if (overlayCanvas) {
            overlayCanvas.style.pointerEvents = 'none';
            overlayCanvas.style.display = 'none';
            overlayCanvas.removeEventListener('mousedown', handleCanvasDown);
            overlayCanvas.removeEventListener('mousemove', handleCanvasMove);
            overlayCanvas.removeEventListener('mouseleave', handleCanvasLeave);
            overlayCanvas.removeEventListener('touchstart', handleCanvasDown);
            overlayCanvas.removeEventListener('touchmove', handleCanvasMove);
        }
        document.removeEventListener('keydown', handleKeyDown);
        showStatus('🔒 Grid Draw deactivated');
        console.log('[GridDraw] Deactivated');
    }

    function toggleGridDraw() {
        if (isDrawingMode) deactivateGridDraw();
        else activateGridDraw();
    }

    // ============================================================
    //  OVERRIDE "Draw Walls" CARD
    // ============================================================
    function overrideDrawWallsCard() {
        const selectors = [
            '.cards-grid .card .card-title',
            '.cards-grid .card'
        ];
        let card = null;
        for (let sel of selectors) {
            const els = document.querySelectorAll(sel);
            for (let el of els) {
                let title = el;
                if (el.classList.contains('card-title')) {
                    title = el;
                } else {
                    title = el.querySelector('.card-title');
                }
                if (title && title.textContent.trim() === 'Draw Walls') {
                    card = el.closest('.card') || el;
                    break;
                }
            }
            if (card) break;
        }

        if (!card) {
            console.warn('[GridDraw] "Draw Walls" card not found, retrying...');
            setTimeout(overrideDrawWallsCard, 500);
            return;
        }

        card.removeAttribute('onclick');
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);

        newCard.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleGridDraw();
            this.classList.toggle('active-card');
        });

        console.log('[GridDraw] Overridden "Draw Walls" card');
    }

    // ============================================================
    //  INIT
    // ============================================================
    function init() {
        createOverlayCanvas();
        if (overlayCanvas) {
            overlayCanvas.style.display = 'none';
            overlayCanvas.style.pointerEvents = 'none';
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', overrideDrawWallsCard);
        } else {
            overrideDrawWallsCard();
        }
        console.log('[GridDraw] Initialized');
    }

    // ============================================================
    //  EXPOSE GLOBALLY
    // ============================================================
    window.GridWallDraw = {
        init,
        activate: activateGridDraw,
        deactivate: deactivateGridDraw,
        toggle: toggleGridDraw,
        clear: clearAllWalls,
        getWalls: () => walls,
        addWall,
        deleteWall: deleteWallAt,
        syncWallsTo3D   // expose if needed manually
    };

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Hide overlay when 3D mode is active
    const btn3D = document.getElementById('btn3D');
    const btn2D = document.getElementById('btn2D');
    if (btn3D && btn2D) {
        btn3D.addEventListener('click', function() {
            if (overlayCanvas) overlayCanvas.style.display = 'none';
        });
        btn2D.addEventListener('click', function() {
            if (overlayCanvas && isDrawingMode) {
                overlayCanvas.style.display = 'block';
                render();
            }
        });
    }

})();