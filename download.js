// ============================================================
// DOWNLOAD DESIGN AS IMAGE (2D or 3D — whichever is active)
// ============================================================

(function() {
    'use strict';

    const downloadBtn = document.getElementById('downloadBtn');

    if (!downloadBtn) {
        console.error('❌ downloadBtn not found! Make sure id="downloadBtn" exists.');
        return;
    }

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const btn3D = document.getElementById('btn3D');
        const is3DActive = btn3D && btn3D.classList.contains('active');

        let dataUrl = null;
        let filename = 'my-design.png';

        if (is3DActive) {
            // ---- 3D VIEW ACTIVE ----
            const threeContainer = document.getElementById('threeView');
            const threeCanvas = threeContainer ? threeContainer.querySelector('canvas') : null;

            if (!threeCanvas) {
                alert('3D view is not ready yet. Please wait for it to load and try again.');
                return;
            }

            try {
                dataUrl = threeCanvas.toDataURL('image/png');
                filename = 'my-design-3d.png';
            } catch (err) {
                console.error('❌ Could not capture 3D canvas:', err);
                alert('Could not capture the 3D view. The 3D renderer needs "preserveDrawingBuffer: true" enabled — check threeview.js.');
                return;
            }

        } else {
            // ---- 2D VIEW ACTIVE ----
            if (window.fabricCanvas && typeof window.fabricCanvas.toDataURL === 'function') {
                // Better quality export using Fabric's own method
                dataUrl = window.fabricCanvas.toDataURL({ format: 'png', multiplier: 2 });
            } else {
                const fabricCanvasEl = document.getElementById('floorCanvas');
                if (!fabricCanvasEl) {
                    alert('2D canvas not found.');
                    return;
                }
                dataUrl = fabricCanvasEl.toDataURL('image/png');
            }
            filename = 'my-design-2d.png';
        }

        if (!dataUrl) {
            alert('Could not generate the image. Please try again.');
            return;
        }

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('✅ Download triggered:', filename);
    });

})();