const canva = document.querySelector(".canvasContainer");
const room = document.querySelector(".boxCanvas");

let scale = 1;

canva.addEventListener("wheel", (e) => {

    e.preventDefault();

    // Scroll Up = Zoom Out
    if (e.deltaY < 0) {

        scale -= 0.1;

    }

    // Scroll Down = Zoom In
    else {

        scale += 0.1;

    }

    // LIMIT
    scale = Math.min(Math.max(0.5, scale), 2);

    // GRID SIZE CHANGE
    const gridSize = 40 * scale;

    canva.style.backgroundSize = `${gridSize}px ${gridSize}px`;

    // ROOM ZOOM
    room.style.transform = `scale(${scale})`;

    // CENTER FROM TOP LEFT
    room.style.transformOrigin = "top left";

});