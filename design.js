/* =====================================================
           DESIGN.JS (condensed – includes all your logic)
           ===================================================== */
        // ---- FABRIC CANVAS ----
        const canvas = new fabric.Canvas("floorCanvas", {
            selection: true,
            preserveObjectStacking: true
        });

        // ---- ELEMENTS ----
        const room = document.getElementById("room");
        const widthInput = document.getElementById("objectWidth");
        const depthInput = document.getElementById("objectDepth");
        const heightInput = document.getElementById("objectHeight");
        const angleInput = document.getElementById("objectAngle");
        const elevationInput = document.getElementById("objectElevation");
        const topDimension = document.getElementById("topDimension");
        const bottomDimension = document.getElementById("bottomDimension");
        const leftDimension = document.getElementById("leftDimension");
        const rightDimension = document.getElementById("rightDimension");

        // ---- ROOM DATA ----
        let roomData = { width: 500, depth: 300, height: 280, angle: 0, elevation: 0 };
        window.roomData = roomData;

        // ---- WALL DATA ----
        window.roomWallData = { points: [], walls: [], closed: false, shape: "custom" };

        // ---- HELPERS ----
        function getNumber(value) {
            return parseFloat(String(value).replace("cm", "").replace("°", "").trim());
        }

        // ---- 3D SYNC ----
        function sendRoomDataTo3D() {
            window.roomData = { width: roomData.width, depth: roomData.depth, height: roomData.height, angle: roomData
                    .angle, elevation: roomData.elevation };
            window.dispatchEvent(new CustomEvent("roomDataUpdated", { detail: window.roomData }));
            if (typeof updateThreeRoom === "function") updateThreeRoom(window.roomData);
            if (typeof update3DRoom === "function") update3DRoom(window.roomData);
            if (typeof rebuildThreeRoom === "function") rebuildThreeRoom(window.roomData);
        }

        function sendWallsTo3D() {
            const data = {
                points: window.roomWallData.points,
                walls: window.roomWallData.walls,
                closed: window.roomWallData.closed,
                shape: window.roomWallData.shape,
                room: { width: roomData.width, depth: roomData.depth, height: roomData.height }
            };
            window.roomWallData = data;
            window.dispatchEvent(new CustomEvent("roomWallsUpdated", { detail: data }));
            if (typeof updateThreeWalls === "function") updateThreeWalls(data);
            if (typeof createThreeWalls === "function") createThreeWalls(data);
            if (typeof rebuildThreeWalls === "function") rebuildThreeWalls(data);
            if (typeof update3DFromWalls === "function") update3DFromWalls(data);
        }

        // ---- UPDATE ROOM ----
        function updateRoom() {
            if (!room) { sendRoomDataTo3D(); return; }
            room.style.width = roomData.width + "px";
            room.style.height = roomData.depth + "px";
            room.style.transform = "rotate(" + roomData.angle + "deg)";
            canvas.setDimensions({ width: roomData.width, height: roomData.depth });
            canvas.calcOffset();
            canvas.renderAll();
            if (widthInput) widthInput.value = roomData.width + " cm";
            if (depthInput) depthInput.value = roomData.depth + " cm";
            if (heightInput) heightInput.value = roomData.height + " cm";
            if (angleInput) angleInput.value = roomData.angle + "°";
            if (elevationInput) elevationInput.value = roomData.elevation + " cm";
            const wm = (roomData.width / 100).toFixed(1);
            const dm = (roomData.depth / 100).toFixed(1);
            if (topDimension) topDimension.innerText = wm + " m";
            if (bottomDimension) bottomDimension.innerText = wm + " m";
            if (leftDimension) leftDimension.innerText = dm + " m";
            if (rightDimension) rightDimension.innerText = dm + " m";
            const area = (roomData.width / 100) * (roomData.depth / 100);
            const label = room.querySelector(".label");
            if (label) label.innerText = "Room (" + area.toFixed(1) + " m²)";
            sendRoomDataTo3D();
        }

        // ---- INPUT LISTENERS ----
        if (widthInput) widthInput.addEventListener("change", function() { const v = getNumber(this.value); if (!isNaN(v) &&
                v > 0) roomData.width = v;
            updateRoom(); });
        if (depthInput) depthInput.addEventListener("change", function() { const v = getNumber(this.value); if (!isNaN(v) &&
                v > 0) roomData.depth = v;
            updateRoom(); });
        if (heightInput) heightInput.addEventListener("change", function() { const v = getNumber(this.value); if (!isNaN(v) &&
                v > 0) roomData.height = v;
            updateRoom(); });
        if (angleInput) angleInput.addEventListener("change", function() { const v = getNumber(this.value); if (!isNaN(v))
                roomData.angle = v;
            updateRoom(); });
        if (elevationInput) elevationInput.addEventListener("change", function() { const v = getNumber(this.value); if (!isNaN(
                v) && v >= 0) roomData.elevation = v;
            updateRoom(); });

        // ---- DRAW WALLS ----
        let isDrawingWallMode = false,
            isDrawing = false,
            activeLine = null,
            activePoints = [];
        const WALL_WIDTH = 10;

        function startWallDrawing() {
            isDrawingWallMode = true;
            isDrawing = false;
            activePoints = [];
            window.roomWallData = { points: [], walls: [], closed: false, shape: "custom" };
            canvas.defaultCursor = "crosshair";
            canvas.selection = false;
            canvas.forEachObject(function(obj) { obj.selectable = false; });
            if (activeLine) { canvas.remove(activeLine);
                activeLine = null; }
            showDesignMessage("Draw Walls: Click points to create your room. Double-click or press Enter to finish.");
        }

        function stopWallDrawing() {
            isDrawingWallMode = false;
            isDrawing = false;
            if (activeLine) { canvas.remove(activeLine);
                activeLine = null; }
            canvas.defaultCursor = "default";
            canvas.selection = true;
            canvas.forEachObject(function(obj) { obj.selectable = true; });
            canvas.renderAll();
            sendWallsTo3D();
            hideDesignMessage();
        }

        function toggleWallDrawing(enable) {
            if (enable === undefined) enable = !isDrawingWallMode;
            enable ? startWallDrawing() : stopWallDrawing();
        }

        function createPermanentWall(p1, p2) {
            const wallLine = new fabric.Line([p1.x, p1.y, p2.x, p2.y], { stroke: "#586a6d", strokeWidth: WALL_WIDTH,
                strokeLineCap: "round", selectable: false, evented: false, itemType: "Wall", wallType: "room-wall" });
            canvas.add(wallLine);
        }

        function createTemporaryWall(x1, y1, x2, y2) {
            if (activeLine) canvas.remove(activeLine);
            activeLine = new fabric.Line([x1, y1, x2, y2], { stroke: "#198754", strokeWidth: 6, strokeDashArray: [5, 5],
                selectable: false, evented: false });
            canvas.add(activeLine);
        }

        canvas.on("mouse:down", function(o) {
            if (!isDrawingWallMode) return;
            const pointer = canvas.getPointer(o.e);
            if (activePoints.length === 0) {
                activePoints.push({ x: pointer.x, y: pointer.y });
                isDrawing = true;
                createTemporaryWall(pointer.x, pointer.y, pointer.x, pointer.y);
                return;
            }
            const previous = activePoints[activePoints.length - 1];
            const newPoint = { x: pointer.x, y: pointer.y };
            activePoints.push(newPoint);
            createPermanentWall(previous, newPoint);
            window.roomWallData.walls.push({ x1: previous.x, y1: previous.y, x2: newPoint.x, y2: newPoint.y });
            window.roomWallData.points = activePoints.map(function(p) { return { x: p.x, y: p.y }; });
            sendWallsTo3D();
            if (activeLine) canvas.remove(activeLine);
            createTemporaryWall(pointer.x, pointer.y, pointer.x, pointer.y);
            canvas.renderAll();
        });

        canvas.on("mouse:move", function(o) {
            if (!isDrawingWallMode || !isDrawing || !activeLine) return;
            const pointer = canvas.getPointer(o.e);
            activeLine.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        });

        canvas.on("mouse:dblclick", function() { if (isDrawingWallMode) finishWallDrawing(); });

        function finishWallDrawing() {
            if (activePoints.length < 2) { stopWallDrawing(); return; }
            const first = activePoints[0],
                last = activePoints[activePoints.length - 1];
            const dist = Math.sqrt(Math.pow(first.x - last.x, 2) + Math.pow(first.y - last.y, 2));
            if (dist > 15) {
                createPermanentWall(last, first);
                window.roomWallData.walls.push({ x1: last.x, y1: last.y, x2: first.x, y2: first.y });
            }
            window.roomWallData.points = activePoints.map(function(p) { return { x: p.x, y: p.y }; });
            window.roomWallData.closed = true;
            window.roomWallData.shape = "custom";
            sendWallsTo3D();
            canvas.renderAll();
            stopWallDrawing();
        }

        document.addEventListener("keydown", function(e) {
            if (!isDrawingWallMode) return;
            if (e.key === "Escape") stopWallDrawing();
            if (e.key === "Enter") finishWallDrawing();
        });

        // ---- DESIGN MESSAGE ----
        function showDesignMessage(text) {
            let msg = document.getElementById("designMessage");
            if (!msg) {
                msg = document.createElement("div");
                msg.id = "designMessage";
                msg.style.cssText =
                    "position:fixed;left:50%;top:75px;transform:translateX(-50%);background:#198754;color:#fff;padding:10px 18px;border-radius:8px;z-index:999999;font-size:13px;box-shadow:0 4px 15px rgba(0,0,0,.2);display:none;";
                document.body.appendChild(msg);
            }
            msg.innerText = text;
            msg.style.display = "block";
        }

        function hideDesignMessage() {
            const msg = document.getElementById("designMessage");
            if (msg) msg.style.display = "none";
        }

        // ---- ROOM SHAPES ----
        function clearCanvasFurnitureAndWalls() {
            canvas.getObjects().forEach(function(obj) {
                if (obj.itemType === "Wall" || obj.itemType === "RoomShape") canvas.remove(obj);
            });
            activePoints = [];
            window.roomWallData = { points: [], walls: [], closed: false, shape: "custom" };
        }

        function createRoomShape(shape) {
            clearCanvasFurnitureAndWalls();
            const w = roomData.width,
                h = roomData.depth;
            let pts = [];
            if (shape === "rectangle") pts = [{ x: 40, y: 40 }, { x: w - 40, y: 40 }, { x: w - 40, y: h - 40 }, { x: 40,
                    y: h - 40 }];
            else if (shape === "square") { const s = Math.min(w, h) - 80,
                    l = (w - s) / 2,
                    t = (h - s) / 2;
                pts = [{ x: l, y: t }, { x: l + s, y: t }, { x: l + s, y: t + s }, { x: l, y: t + s }]; } else if (shape ===
                "lshape") pts = [{ x: 40, y: 40 }, { x: w - 40, y: 40 }, { x: w - 40, y: h * 0.55 }, { x: w * 0.60, y: h *
                    0.55 }, { x: w * 0.60, y: h - 40 }, { x: 40, y: h - 40 }];
            else if (shape === "tshape") pts = [{ x: w * 0.30, y: 40 }, { x: w * 0.70, y: 40 }, { x: w * 0.70, y: h *
                    0.35 }, { x: w - 40, y: h * 0.35 }, { x: w - 40, y: h - 40 }, { x: 40, y: h - 40 }, { x: 40, y: h *
                    0.35 }, { x: w * 0.30, y: h * 0.35 }];
            else if (shape === "ushape") pts = [{ x: 40, y: 40 }, { x: w - 40, y: 40 }, { x: w - 40, y: h - 40 }, { x: w *
                    0.65, y: h - 40 }, { x: w * 0.65, y: h * 0.45 }, { x: w * 0.35, y: h * 0.45 }, { x: w * 0.35, y: h -
                    40 }, { x: 40, y: h - 40 }];
            else return createRoomShape("rectangle");
            for (let i = 0; i < pts.length; i++) {
                const p1 = pts[i],
                    p2 = pts[(i + 1) % pts.length];
                canvas.add(new fabric.Line([p1.x, p1.y, p2.x, p2.y], { stroke: "#586a6d", strokeWidth: WALL_WIDTH,
                    strokeLineCap: "round", selectable: false, evented: false, itemType: "RoomShape",
                    roomShape: shape }));
            }
            window.roomWallData = { points: pts, walls: pts.map(function(p, i) { const n = pts[(i + 1) % pts.length];
                    return { x1: p.x, y1: p.y, x2: n.x, y2: n.y }; }), closed: true, shape: shape };
            canvas.renderAll();
            sendWallsTo3D();
            showDesignMessage(shape.toUpperCase() + " room created in 2D and sent to 3D.");
            setTimeout(hideDesignMessage, 1800);
        }

        // ---- SMART WIZARD ----
        function openSmartWizard() {
            let modal = document.getElementById("smartWizardModal");
            if (modal) modal.remove();
            const style = localStorage.getItem("selectedStyle") || "Modern";
            const roomType = localStorage.getItem("selectedRoom") || "Bedroom";
            modal = document.createElement("div");
            modal.id = "smartWizardModal";
            modal.innerHTML =
                `<div class="smart-wizard-box"><div class="smart-wizard-header"><div><h3>Smart Wizard</h3><small>AI Room Designer</small></div><button id="closeSmartWizard">×</button></div><div class="wizard-info"><div><strong>Style</strong><span>${style}</span></div><div><strong>Room</strong><span>${roomType}</span></div></div><label>Describe your room</label><textarea id="smartWizardPrompt" rows="5" placeholder="Example: Create a modern bedroom with a king bed, two side tables, warm lighting and neutral colors."></textarea><button id="generateSmartRoom" class="smart-generate-btn"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate Room</button><div id="smartWizardResult" class="smart-wizard-result"></div></div>`;
            document.body.appendChild(modal);
            document.getElementById("closeSmartWizard").addEventListener("click", function() { modal.remove(); });
            document.getElementById("generateSmartRoom").addEventListener("click", function() {
                generateSmartRoom(style, roomType);
            });
            addSmartWizardStyles();
        }

        function generateSmartRoom(style, roomType) {
            const prompt = document.getElementById("smartWizardPrompt");
            const result = document.getElementById("smartWizardResult");
            const userPrompt = prompt ? prompt.value.trim() : "";
            window.smartRoomData = { style: style, roomType: roomType, prompt: userPrompt };
            const lower = roomType.toLowerCase();
            if (lower.includes("bedroom")) { roomData.width = 500;
                roomData.depth = 400; } else if (lower.includes("living")) { roomData.width = 600;
                roomData.depth = 450; } else if (lower.includes("kitchen")) { roomData.width = 500;
                roomData.depth = 350; } else if (lower.includes("office")) { roomData.width = 450;
                roomData.depth = 350; }
            updateRoom();
            createRoomShape("rectangle");
            if (lower.includes("bedroom")) createBed(roomData.width / 2, roomData.depth / 2);
            else if (lower.includes("living")) createSofa(roomData.width / 2, roomData.depth / 2);
            window.dispatchEvent(new CustomEvent("smartRoomGenerated", { detail: window.smartRoomData }));
            if (result) result.innerHTML =
                `<strong>Room Generated</strong><br>Style: ${style}<br>Room: ${roomType}${userPrompt ? "<br>Prompt: " + userPrompt : ""}`;
        }

        function addSmartWizardStyles() {
            if (document.getElementById("smartWizardStyles")) return;
            const s = document.createElement("style");
            s.id = "smartWizardStyles";
            s.innerHTML =
                `#smartWizardModal{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:999999;display:flex;align-items:center;justify-content:center}.smart-wizard-box{width:420px;max-width:90vw;background:#fff;border-radius:14px;padding:20px;box-shadow:0 15px 50px rgba(0,0,0,.25)}.smart-wizard-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px}.smart-wizard-header h3{margin:0;font-size:20px}.smart-wizard-header small{color:#777}.smart-wizard-header button{border:none;background:transparent;font-size:25px;cursor:pointer}.wizard-info{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}.wizard-info div{background:#f5faf6;padding:10px;border-radius:8px;display:flex;flex-direction:column}.wizard-info span{color:#198754;margin-top:3px}#smartWizardPrompt{width:100%;resize:vertical;border:1px solid #ddd;border-radius:8px;padding:10px;margin-top:6px;margin-bottom:12px}#smartWizardPrompt:focus{outline:none;border-color:#198754}.smart-generate-btn{width:100%;border:none;background:#198754;color:white;padding:11px;border-radius:8px;cursor:pointer}.smart-generate-btn:hover{background:#146c43}.smart-wizard-result{margin-top:12px;font-size:13px;line-height:1.6}`;
            document.head.appendChild(s);
        }

        // ---- FORMS ----
        function showFormsPanel() {
            let panel = document.getElementById("formsFloatingPanel");
            if (panel) panel.remove();
            panel = document.createElement("div");
            panel.id = "formsFloatingPanel";
            panel.innerHTML =
                `<div class="forms-header"><strong>Forms</strong><button id="closeForms">×</button></div><div class="forms-grid"><button data-form="rectangle">▭ Rectangle</button><button data-form="circle">● Circle</button><button data-form="triangle">△ Triangle</button><button data-form="square">□ Square</button></div>`;
            document.body.appendChild(panel);
            panel.querySelectorAll("[data-form]").forEach(function(btn) {
                btn.addEventListener("click", function() { createForm(this.dataset.form); });
            });
            document.getElementById("closeForms").addEventListener("click", function() { panel.remove(); });
            addFormsStyles();
        }

        function createForm(type) {
            let obj;
            if (type === "circle") obj = new fabric.Circle({ radius: 40, fill: "#9e9e9e", left: roomData.width / 2,
                top: roomData.depth / 2, originX: "center", originY: "center" });
            else if (type === "triangle") obj = new fabric.Triangle({ width: 80, height: 80, fill: "#9e9e9e",
                left: roomData.width / 2, top: roomData.depth / 2, originX: "center", originY: "center" });
            else obj = new fabric.Rect({ width: type === "square" ? 80 : 120, height: type === "square" ? 80 : 60,
                fill: "#9e9e9e", stroke: "#555", strokeWidth: 2, rx: 6, ry: 6, left: roomData.width / 2,
                top: roomData.depth / 2, originX: "center", originY: "center" });
            obj.itemType = "Form";
            obj.formType = type;
            obj.furnitureName = type;
            canvas.add(obj);
            canvas.setActiveObject(obj);
            canvas.renderAll();
            updateFurnitureToolbar();
        }

        function addFormsStyles() {
            if (document.getElementById("formsStyles")) return;
            const s = document.createElement("style");
            s.id = "formsStyles";
            s.innerHTML =
                `#formsFloatingPanel{position:fixed;left:400px;top:100px;width:280px;background:#fff;border:1px solid #ddd;border-radius:12px;padding:12px;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,.18)}.forms-header{display:flex;justify-content:space-between;margin-bottom:12px}.forms-header button{border:none;background:transparent;font-size:22px;cursor:pointer}.forms-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.forms-grid button{padding:12px 5px;background:#fff;border:1px solid #ddd;border-radius:8px;cursor:pointer}.forms-grid button:hover{border-color:#198754;color:#198754}`;
            document.head.appendChild(s);
        }

        // ---- FURNITURE TOOLBAR ----
        let furnitureToolbar = null;

        function createFurnitureToolbar() {
            if (furnitureToolbar) furnitureToolbar.remove();
            furnitureToolbar = document.createElement("div");
            furnitureToolbar.id = "furnitureToolbar";
            furnitureToolbar.innerHTML =
                `<button id="rotateLeftBtn" title="Rotate Left">↶</button><button id="rotateRightBtn" title="Rotate Right">↷</button><button id="deleteSelectedBtn" title="Delete">🗑</button>`;
            document.body.appendChild(furnitureToolbar);
            document.getElementById("rotateLeftBtn").addEventListener("click", function() {
                const obj = canvas.getActiveObject();
                if (!obj) return;
                obj.rotate((obj.angle || 0) - 15);
                obj.setCoords();
                canvas.renderAll();
                updateFurnitureToolbar();
                updatePropertiesFromObject(obj);
            });
            document.getElementById("rotateRightBtn").addEventListener("click", function() {
                const obj = canvas.getActiveObject();
                if (!obj) return;
                obj.rotate((obj.angle || 0) + 15);
                obj.setCoords();
                canvas.renderAll();
                updateFurnitureToolbar();
                updatePropertiesFromObject(obj);
            });
            document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedFurniture);
        }

        function updateFurnitureToolbar() {
            if (!furnitureToolbar) return;
            const obj = canvas.getActiveObject();
            if (!obj) { furnitureToolbar.style.display = "none"; return; }
            furnitureToolbar.style.display = "flex";
            const rect = canvas.upperCanvasEl.getBoundingClientRect();
            const bounds = obj.getBoundingRect();
            const left = rect.left + bounds.left;
            const top = rect.top + bounds.top - 45;
            furnitureToolbar.style.left = left + "px";
            furnitureToolbar.style.top = Math.max(5, top) + "px";
        }

        function hideFurnitureToolbar() { if (furnitureToolbar) furnitureToolbar.style.display = "none"; }

        function deleteSelectedFurniture() {
            const obj = canvas.getActiveObject();
            if (!obj) return;
            canvas.remove(obj);
            canvas.discardActiveObject();
            canvas.renderAll();
            hideFurnitureToolbar();
        }

        // ---- GENERIC FURNITURE ----
        function createGenericFurniture(type, x, y) {
            const obj = new fabric.Group([
                new fabric.Rect({ left: -40, top: -30, width: 80, height: 60, fill: "#9e9e9e", stroke: "#555",
                    strokeWidth: 2, rx: 6, ry: 6 }),
                new fabric.Text(type, { left: -30, top: -8, fontSize: 10, fill: "white" })
            ], { left: x, top: y, originX: "center", originY: "center" });
            obj.itemType = type;
            obj.furnitureName = type;
            canvas.add(obj);
            canvas.setActiveObject(obj);
            canvas.renderAll();
            updateFurnitureToolbar();
            return obj;
        }

        function createArmchair(modelPath, left, top) {
            const imgPath = "models/armchair1.png";
            fabric.Image.fromURL(imgPath, function(img) {
                if (!img) { createGenericFurniture("Armchair", left, top); return; }
                const maxW = 80,
                    maxH = 80,
                    sc = Math.min(maxW / img.width, maxH / img.height);
                img.set({ left: left, top: top, originX: "center", originY: "center", scaleX: sc, scaleY: sc });
                img.glbModel = modelPath || "models/armchair1.glb";
                img.furnitureName = "Armchair";
                img.itemType = "Armchair";
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
                updateFurnitureToolbar();
            }, { crossOrigin: "anonymous" });
        }

        function createBed(x, y) {
            const obj = new fabric.Rect({ width: 120, height: 80, fill: "#b8a99a", stroke: "#555", strokeWidth: 2,
                rx: 8, ry: 8, left: x, top: y, originX: "center", originY: "center" });
            obj.itemType = "Bed";
            obj.furnitureName = "Bed";
            canvas.add(obj);
            canvas.setActiveObject(obj);
            canvas.renderAll();
            updateFurnitureToolbar();
        }

        function createSofa(x, y) {
            const obj = new fabric.Rect({ width: 160, height: 70, fill: "#7d8a9a", stroke: "#555", strokeWidth: 2,
                rx: 10, ry: 10, left: x, top: y, originX: "center", originY: "center" });
            obj.itemType = "Sofa";
            obj.furnitureName = "Sofa";
            canvas.add(obj);
            canvas.setActiveObject(obj);
            canvas.renderAll();
            updateFurnitureToolbar();
        }

        function createFurnitureAt(type, x, y, model) {
            if (type === "Armchair") { createArmchair(model, x, y); return; }
            if (type === "Bed") { createBed(x, y); return; }
            if (type === "Sofa") { createSofa(x, y); return; }
            createGenericFurniture(type, x, y);
        }

        // ---- FURNITURE CATEGORIES ----
        const furnitureCategories = document.querySelectorAll(".furniture-category");
        const categoryView = document.getElementById("categoryView");
        const armchairsView = document.getElementById("armchairsView");
        const sofasView = document.getElementById("sofasView");
        const panelBack = document.getElementById("panelBack");

        function hideAllSubcategories() {
            if (armchairsView) armchairsView.style.display = "none";
            if (sofasView) sofasView.style.display = "none";
        }
        furnitureCategories.forEach(function(cat) {
            cat.addEventListener("click", function() {
                const name = this.dataset.category;
                if (categoryView) categoryView.style.display = "none";
                hideAllSubcategories();
                if (name === "Armchairs") { if (armchairsView) armchairsView.style.display = "block"; }
                if (name === "Sofa") { if (sofasView) sofasView.style.display = "block"; }
            });
        });
        if (panelBack) {
            panelBack.addEventListener("click", function() {
                hideAllSubcategories();
                if (categoryView) categoryView.style.display = "block";
            });
        }

        // ---- DRAG & DROP ----
        const furnitureItems = document.querySelectorAll(".furniture-item, .furniture-card");
        furnitureItems.forEach(function(item) {
            item.addEventListener("dragstart", function(e) {
                const type = this.dataset.type || this.dataset.category || "";
                const model = this.dataset.model || "";
                e.dataTransfer.effectAllowed = "copy";
                e.dataTransfer.setData("furnitureType", type);
                e.dataTransfer.setData("furnitureModel", model);
            });
        });

        const fabricDropArea = canvas.wrapperEl;
        if (fabricDropArea) {
            fabricDropArea.addEventListener("dragover", function(e) { e.preventDefault();
                e.dataTransfer.dropEffect = "copy"; });
            fabricDropArea.addEventListener("drop", function(e) {
                e.preventDefault();
                const type = e.dataTransfer.getData("furnitureType");
                const model = e.dataTransfer.getData("furnitureModel");
                if (!type) return;
                const rect = fabricDropArea.getBoundingClientRect();
                const x = (e.clientX - rect.left) / zoom;
                const y = (e.clientY - rect.top) / zoom;
                createFurnitureAt(type, x, y, model);
            });
        }

        // ---- OBJECT SELECTION ----
        canvas.on("selection:created", function(e) { updateProperties(e);
            syncSelectedFurniture3D(); });
        canvas.on("selection:updated", function(e) { updateProperties(e);
            syncSelectedFurniture3D(); });
        canvas.on("selection:cleared", function() { showRoomProperties();
            hideFurnitureToolbar(); if (typeof clearSelectedFurniture3D === "function") clearSelectedFurniture3D(); });

        function syncSelectedFurniture3D() {
            const data = getSelectedFurniture3DData();
            if (!data) return;
            window.selectedFurniture3D = data;
            window.dispatchEvent(new CustomEvent("selectedFurniture3DUpdated", { detail: data }));
        }

        canvas.on("object:moving", updateFurnitureToolbar);
        canvas.on("object:scaling", function(e) { updateFurnitureToolbar();
            updatePropertiesFromObject(e.target); });
        canvas.on("object:rotating", function(e) { updateFurnitureToolbar();
            updatePropertiesFromObject(e.target); });
        canvas.on("object:modified", function(e) {
            if (!e.target) return;
            e.target.setCoords();
            updateFurnitureToolbar();
            updatePropertiesFromObject(e.target);
            syncSelectedFurniture3D();
            if (typeof updateSelectedFurniture3D === "function") updateSelectedFurniture3D(window.selectedFurniture3D);
        });

        // ---- PROPERTIES ----
        function showRoomProperties() {
            if (widthInput) widthInput.value = roomData.width + " cm";
            if (depthInput) depthInput.value = roomData.depth + " cm";
            if (heightInput) heightInput.value = roomData.height + " cm";
            if (angleInput) angleInput.value = roomData.angle + "°";
            if (elevationInput) elevationInput.value = roomData.elevation + " cm";
        }

        function updateProperties(e) {
            const obj = e.selected && e.selected[0];
            if (obj) updatePropertiesFromObject(obj);
        }

        function updatePropertiesFromObject(obj) {
            if (!obj) return;
            if (widthInput) widthInput.value = Math.round(obj.getScaledWidth()) + " cm";
            if (depthInput) depthInput.value = Math.round(obj.getScaledHeight()) + " cm";
            if (heightInput) heightInput.value = "65 cm";
            if (angleInput) angleInput.value = Math.round(obj.angle || 0) + "°";
            if (elevationInput) elevationInput.value = "0 cm";
        }

        // ---- DELETE BUTTON ----
        const deleteButton = document.getElementById("deleteFurniture");
        if (deleteButton) {
            deleteButton.addEventListener("click", function() {
                const obj = canvas.getActiveObject();
                if (obj) { deleteSelectedFurniture(); return; }
                if (room && confirm("Do you want to delete the room?")) room.remove();
            });
        }

        // ---- ZOOM ----
        let zoom = 1;

        function updateZoomText() {
            const zv = document.getElementById("zoomValue");
            if (zv) zv.innerText = Math.round(zoom * 100) + "%";
            updateFurnitureToolbar();
        }
        document.getElementById("zoomIn").addEventListener("click", function() { zoom = Math.min(2, zoom + 0.1);
            canvas.setZoom(zoom);
            updateZoomText(); });
        document.getElementById("zoomOut").addEventListener("click", function() { zoom = Math.max(0.5, zoom - 0.1);
            canvas.setZoom(zoom);
            updateZoomText(); });