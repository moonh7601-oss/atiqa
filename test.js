// // /* =====================================================
// //    DESIGN.JS
// //    Home Interior Design Project
// //    2D Fabric.js + 3D Three.js Integration

// //    FIXES:
// //    - All category images now load with proper fallbacks
// //    - Consistent path handling for Furniture, Construction, Outdoor
// //    - Placeholder generation for missing images
// //    - Drag & drop works with all items (specific image per card)
// //    - 3D sync for all objects
// // ===================================================== */

// // /* =====================================================
// //    CREATE FABRIC CANVAS
// // ===================================================== */
// // const canvas = new fabric.Canvas("floorCanvas", {
// //     selection: true,
// //     preserveObjectStacking: true
// // });

// // /* =====================================================
// //    ROOM & INPUT ELEMENTS
// // ===================================================== */
// // const room = document.getElementById("room");
// // const widthInput = document.getElementById("objectWidth");
// // const depthInput = document.getElementById("objectDepth");
// // const heightInput = document.getElementById("objectHeight");
// // const angleInput = document.getElementById("objectAngle");
// // const elevationInput = document.getElementById("objectElevation");

// // const topDimension = document.getElementById("topDimension");
// // const bottomDimension = document.getElementById("bottomDimension");
// // const leftDimension = document.getElementById("leftDimension");
// // const rightDimension = document.getElementById("rightDimension");

// // /* =====================================================
// //    ROOM DATA
// // ===================================================== */
// // let roomData = {
// //     width: 500,
// //     depth: 300,
// //     height: 280,
// //     angle: 0,
// //     elevation: 0
// // };

// // window.roomData = roomData;

// // /* =====================================================
// //    DRAWN WALL DATA
// // ===================================================== */
// // window.roomWallData = {
// //     points: [],
// //     walls: [],
// //     closed: false,
// //     shape: "custom"
// // };

// // /* =====================================================
// //    NUMBER HELPER
// // ===================================================== */
// // function getNumber(value) {
// //     return parseFloat(
// //         String(value)
// //             .replace("cm", "")
// //             .replace("°", "")
// //             .trim()
// //     );
// // }

// // /* =====================================================
// //    SEND ROOM DATA TO THREE.JS
// // ===================================================== */
// // function sendRoomDataTo3D() {
// //     window.roomData = {
// //         width: roomData.width,
// //         depth: roomData.depth,
// //         height: roomData.height,
// //         angle: roomData.angle,
// //         elevation: roomData.elevation
// //     };

// //     window.dispatchEvent(
// //         new CustomEvent("roomDataUpdated", {
// //             detail: window.roomData
// //         })
// //     );

// //     if (typeof updateThreeRoom === "function") {
// //         updateThreeRoom(window.roomData);
// //     }
// //     if (typeof update3DRoom === "function") {
// //         update3DRoom(window.roomData);
// //     }
// //     if (typeof rebuildThreeRoom === "function") {
// //         rebuildThreeRoom(window.roomData);
// //     }
// // }

// // /* =====================================================
// //    SEND WALL DATA TO THREE.JS
// // ===================================================== */
// // function sendWallsTo3D() {
// //     const data = {
// //         points: window.roomWallData.points,
// //         walls: window.roomWallData.walls,
// //         closed: window.roomWallData.closed,
// //         shape: window.roomWallData.shape,
// //         room: {
// //             width: roomData.width,
// //             depth: roomData.depth,
// //             height: roomData.height
// //         }
// //     };

// //     window.roomWallData = data;

// //     window.dispatchEvent(
// //         new CustomEvent("roomWallsUpdated", {
// //             detail: data
// //         })
// //     );

// //     if (typeof updateThreeWalls === "function") {
// //         updateThreeWalls(data);
// //     }
// //     if (typeof createThreeWalls === "function") {
// //         createThreeWalls(data);
// //     }
// //     if (typeof rebuildThreeWalls === "function") {
// //         rebuildThreeWalls(data);
// //     }
// //     if (typeof update3DFromWalls === "function") {
// //         update3DFromWalls(data);
// //     }
// // }

// // /* =====================================================
// //    UPDATE ROOM
// // ===================================================== */
// // function updateRoom() {
// //     if (!room) {
// //         sendRoomDataTo3D();
// //         return;
// //     }

// //     room.style.width = roomData.width + "px";
// //     room.style.height = roomData.depth + "px";
// //     room.style.transform = "rotate(" + roomData.angle + "deg)";

// //     canvas.setDimensions({
// //         width: roomData.width,
// //         height: roomData.depth
// //     });

// //     canvas.calcOffset();
// //     canvas.renderAll();

// //     if (widthInput) widthInput.value = roomData.width + " cm";
// //     if (depthInput) depthInput.value = roomData.depth + " cm";
// //     if (heightInput) heightInput.value = roomData.height + " cm";
// //     if (angleInput) angleInput.value = roomData.angle + "°";
// //     if (elevationInput) elevationInput.value = roomData.elevation + " cm";

// //     const widthMeter = (roomData.width / 100).toFixed(1);
// //     const depthMeter = (roomData.depth / 100).toFixed(1);

// //     if (topDimension) topDimension.innerText = widthMeter + " m";
// //     if (bottomDimension) bottomDimension.innerText = widthMeter + " m";
// //     if (leftDimension) leftDimension.innerText = depthMeter + " m";
// //     if (rightDimension) rightDimension.innerText = depthMeter + " m";

// //     const area = (roomData.width / 100) * (roomData.depth / 100);
// //     const label = room.querySelector(".label");

// //     if (label) {
// //         label.innerText = "Room (" + area.toFixed(1) + " m²)";
// //     }

// //     sendRoomDataTo3D();
// // }

// // /* =====================================================
// //    ROOM INPUT LISTENERS
// // ===================================================== */
// // if (widthInput) {
// //     widthInput.addEventListener("change", function () {
// //         const val = getNumber(this.value);
// //         if (!isNaN(val) && val > 0) {
// //             roomData.width = val;
// //         }
// //         updateRoom();
// //     });
// // }

// // if (depthInput) {
// //     depthInput.addEventListener("change", function () {
// //         const val = getNumber(this.value);
// //         if (!isNaN(val) && val > 0) {
// //             roomData.depth = val;
// //         }
// //         updateRoom();
// //     });
// // }

// // if (heightInput) {
// //     heightInput.addEventListener("change", function () {
// //         const val = getNumber(this.value);
// //         if (!isNaN(val) && val > 0) {
// //             roomData.height = val;
// //         }
// //         updateRoom();
// //     });
// // }

// // if (angleInput) {
// //     angleInput.addEventListener("change", function () {
// //         const val = getNumber(this.value);
// //         if (!isNaN(val)) {
// //             roomData.angle = val;
// //         }
// //         updateRoom();
// //     });
// // }

// // if (elevationInput) {
// //     elevationInput.addEventListener("change", function () {
// //         const val = getNumber(this.value);
// //         if (!isNaN(val) && val >= 0) {
// //             roomData.elevation = val;
// //         }
// //         updateRoom();
// //     });
// // }

// // updateRoom();

// // /* =====================================================
// //    IMAGE LOADER WITH PLACEHOLDER GENERATION
// // ===================================================== */
// // const categoryColors = {
// //     'Armchair': '#d4a574',
// //     'Armchairs': '#d4a574',
// //     'Sofa': '#b8a08a',
// //     'Sofas': '#b8a08a',
// //     'Ottoman': '#c9b99a',
// //     'Bed': '#a8b5c4',
// //     'Beds': '#a8b5c4',
// //     'Storage': '#b8a88a',
// //     'Table': '#c4b8a0',
// //     'Tables, chairs': '#c4b8a0',
// //     'Office Desk': '#8a9a8a',
// //     'Office furniture': '#8a9a8a',
// //     'Children Furniture': '#f0c8b0',
// //     "Children's furniture": '#f0c8b0',
// //     'Kitchen': '#d4c8b0',
// //     'Bathroom': '#a8d4d4',
// //     'Door': '#8B7355',
// //     'Doors': '#8B7355',
// //     'Window': '#87CEEB',
// //     'Windows': '#87CEEB',
// //     'Stairs': '#A0A0A0',
// //     'Arch': '#c4b0a0',
// //     'Archs': '#c4b0a0',
// //     'Partition': '#b8b8c0',
// //     'Roof': '#8a7a6a',
// //     'Roofs': '#8a7a6a',
// //     'Fireplace': '#cc8866',
// //     'Column': '#b0a898',
// //     'Terrace': '#a8b89a',
// //     'Fence': '#8a7a6a',
// //     'Fences & Gates': '#8a7a6a',
// //     'Path and Lawn': '#8aba7a',
// //     'Path and Lawns': '#8aba7a',
// //     'Patio': '#c4b89a',
// //     'Tree and Plant': '#6aaa5a',
// //     'Trees and Plants': '#6aaa5a',
// //     'Garage': '#8a8a8a',
// //     'Pool': '#6ac4d4',
// //     'Outdoor Lighting': '#d4d480',
// //     'Lighting': '#d4d480',
// //     'Outdoor Activity': '#d4a86a',
// //     'Outdoor Activities': '#d4a86a',
// //     'Garden': '#6aaa5a'
// // };

// // function getCategoryColor(category) {
// //     return categoryColors[category] || '#cccccc';
// // }

// // function generatePlaceholderImage(category, index, width = 120, height = 120) {
// //     const canvasEl = document.createElement('canvas');
// //     canvasEl.width = width;
// //     canvasEl.height = height;
// //     const ctx = canvasEl.getContext('2d');

// //     const color = getCategoryColor(category);

// //     // Background gradient
// //     const grad = ctx.createLinearGradient(0, 0, width, height);
// //     grad.addColorStop(0, color);
// //     grad.addColorStop(1, darkenColor(color, 30));
// //     ctx.fillStyle = grad;
// //     ctx.fillRect(0, 0, width, height);

// //     // Border
// //     ctx.strokeStyle = 'rgba(255,255,255,0.3)';
// //     ctx.lineWidth = 2;
// //     ctx.strokeRect(2, 2, width - 4, height - 4);

// //     // Icon
// //     const iconMap = {
// //         'Armchair': 'fa-chair',
// //         'Armchairs': 'fa-chair',
// //         'Sofa': 'fa-couch',
// //         'Sofas': 'fa-couch',
// //         'Ottoman': 'fa-cube',
// //         'Bed': 'fa-bed',
// //         'Beds': 'fa-bed',
// //         'Storage': 'fa-box',
// //         'Table': 'fa-table',
// //         'Tables, chairs': 'fa-table',
// //         'Office Desk': 'fa-desktop',
// //         'Office furniture': 'fa-desktop',
// //         'Children Furniture': 'fa-child',
// //         "Children's furniture": 'fa-child',
// //         'Kitchen': 'fa-kitchen-set',
// //         'Bathroom': 'fa-bath',
// //         'Door': 'fa-door-open',
// //         'Doors': 'fa-door-open',
// //         'Window': 'fa-window-maximize',
// //         'Windows': 'fa-window-maximize',
// //         'Stairs': 'fa-stairs',
// //         'Arch': 'fa-archway',
// //         'Archs': 'fa-archway',
// //         'Partition': 'fa-table-columns',
// //         'Roof': 'fa-house',
// //         'Roofs': 'fa-house',
// //         'Fireplace': 'fa-fire',
// //         'Column': 'fa-building-columns',
// //         'Terrace': 'fa-umbrella-beach',
// //         'Fence': 'fa-fence',
// //         'Fences & Gates': 'fa-fence',
// //         'Path and Lawn': 'fa-road',
// //         'Path and Lawns': 'fa-road',
// //         'Patio': 'fa-umbrella-beach',
// //         'Tree and Plant': 'fa-tree',
// //         'Trees and Plants': 'fa-tree',
// //         'Garage': 'fa-warehouse',
// //         'Pool': 'fa-person-swimming',
// //         'Outdoor Lighting': 'fa-lightbulb',
// //         'Lighting': 'fa-lightbulb',
// //         'Outdoor Activity': 'fa-volleyball',
// //         'Outdoor Activities': 'fa-volleyball',
// //         'Garden': 'fa-seedling'
// //     };

// //     const iconClass = iconMap[category] || 'fa-cube';

// //     // Draw icon (simplified using canvas text as we can't load FontAwesome here)
// //     ctx.fillStyle = 'rgba(255,255,255,0.25)';
// //     ctx.font = '40px Arial';
// //     ctx.textAlign = 'center';
// //     ctx.textBaseline = 'middle';
// //     ctx.fillText('🪑', width / 2, height / 2 - 10);

// //     // Category name
// //     ctx.fillStyle = 'rgba(255,255,255,0.9)';
// //     ctx.font = 'bold 11px Arial';
// //     ctx.textAlign = 'center';
// //     ctx.textBaseline = 'bottom';
// //     const displayName = category.length > 12 ? category.substring(0, 10) + '…' : category;
// //     ctx.fillText(displayName, width / 2, height - 8);

// //     // Number
// //     ctx.fillStyle = 'rgba(255,255,255,0.6)';
// //     ctx.font = '9px Arial';
// //     ctx.textBaseline = 'top';
// //     ctx.fillText('#' + index, width / 2, 6);

// //     return canvasEl.toDataURL('image/png');
// // }

// // function darkenColor(hex, amount) {
// //     let c = hex.replace('#', '');
// //     if (c.length === 3) {
// //         c = c.split('').map(ch => ch + ch).join('');
// //     }
// //     let r = parseInt(c.substring(0, 2), 16);
// //     let g = parseInt(c.substring(2, 4), 16);
// //     let b = parseInt(c.substring(4, 6), 16);
// //     r = Math.max(0, r - amount);
// //     g = Math.max(0, g - amount);
// //     b = Math.max(0, b - amount);
// //     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
// // }

// // /* =====================================================
// //    SMART IMAGE LOADER
// // ===================================================== */
// // function loadImageWithFallback(imgElement, src, category, index) {
// //     if (!imgElement) return;

// //     imgElement.crossOrigin = 'anonymous';
// //     imgElement.loading = 'lazy';

// //     const fallbackSrc = generatePlaceholderImage(category, index);

// //     imgElement.src = src;
// //     imgElement.onerror = function () {
// //         this.style.display = 'none';
// //         const fallbackIcon = this.nextElementSibling;
// //         if (fallbackIcon) {
// //             fallbackIcon.style.display = 'block';
// //             // Use the placeholder as background if possible
// //             this.style.display = 'block';
// //             this.style.backgroundImage = `url(${fallbackSrc})`;
// //             this.style.backgroundSize = 'cover';
// //             this.style.backgroundPosition = 'center';
// //             this.src = fallbackSrc;
// //             this.onerror = null;
// //         }
// //     };

// //     // Also handle if image loads successfully
// //     imgElement.onload = function () {
// //         this.style.display = 'block';
// //         const fallbackIcon = this.nextElementSibling;
// //         if (fallbackIcon) {
// //             fallbackIcon.style.display = 'none';
// //         }
// //     };
// // }

// // /* =====================================================
// //    FURNITURE ITEM IMAGE LOADING (for all categories)
// // ===================================================== */
// // function setupFurnitureCardImages(container) {
// //     const cards = container.querySelectorAll('.furniture-card');
// //     cards.forEach(function (card) {
// //         const img = card.querySelector('.furniture-thumbnail');
// //         if (!img) return;

// //         const type = card.dataset.type || card.dataset.category || 'Furniture';
// //         const alt = img.alt || type;
// //         const src = img.getAttribute('src');

// //         // Extract category and index from alt or src
// //         let category = type;
// //         let index = 1;

// //         const altMatch = alt.match(/(.+?)\s*(\d+)$/);
// //         if (altMatch) {
// //             category = altMatch[1];
// //             index = parseInt(altMatch[2]) || 1;
// //         }

// //         // Clean up category name
// //         category = category.trim();

// //         loadImageWithFallback(img, src, category, index);
// //     });
// // }

// // /* =====================================================
// //    DRAW WALLS
// // ===================================================== */
// // let isDrawingWallMode = false;
// // let isDrawing = false;
// // let activeLine = null;
// // let activePoints = [];
// // let currentWallGroup = null;

// // const WALL_WIDTH = 10;

// // function startWallDrawing() {
// //     isDrawingWallMode = true;
// //     isDrawing = false;
// //     activePoints = [];
// //     window.roomWallData = {
// //         points: [],
// //         walls: [],
// //         closed: false,
// //         shape: "custom"
// //     };

// //     canvas.defaultCursor = "crosshair";
// //     canvas.selection = false;

// //     canvas.forEachObject(function (obj) {
// //         obj.selectable = false;
// //     });

// //     if (activeLine) {
// //         canvas.remove(activeLine);
// //         activeLine = null;
// //     }

// //     showDesignMessage(
// //         "Draw Walls: Click points to create your room. Double-click or press Enter to finish."
// //     );
// // }

// // function stopWallDrawing() {
// //     isDrawingWallMode = false;
// //     isDrawing = false;

// //     if (activeLine) {
// //         canvas.remove(activeLine);
// //         activeLine = null;
// //     }

// //     canvas.defaultCursor = "default";
// //     canvas.selection = true;

// //     canvas.forEachObject(function (obj) {
// //         obj.selectable = true;
// //     });

// //     canvas.renderAll();

// //     sendWallsTo3D();
// //     hideDesignMessage();
// // }

// // function toggleWallDrawing(enable) {
// //     if (enable === undefined) {
// //         enable = !isDrawingWallMode;
// //     }

// //     if (enable) {
// //         startWallDrawing();
// //     } else {
// //         stopWallDrawing();
// //     }
// // }

// // /* =====================================================
// //    FABRIC MOUSE DOWN
// // ===================================================== */
// // canvas.on("mouse:down", function (o) {
// //     if (!isDrawingWallMode) return;

// //     const pointer = canvas.getPointer(o.e);

// //     if (activePoints.length === 0) {
// //         activePoints.push({
// //             x: pointer.x,
// //             y: pointer.y
// //         });
// //         isDrawing = true;

// //         createTemporaryWall(
// //             pointer.x,
// //             pointer.y,
// //             pointer.x,
// //             pointer.y
// //         );
// //         return;
// //     }

// //     const previous = activePoints[activePoints.length - 1];
// //     const newPoint = {
// //         x: pointer.x,
// //         y: pointer.y
// //     };

// //     activePoints.push(newPoint);

// //     createPermanentWall(previous, newPoint);

// //     window.roomWallData.walls.push({
// //         x1: previous.x,
// //         y1: previous.y,
// //         x2: newPoint.x,
// //         y2: newPoint.y
// //     });

// //     window.roomWallData.points = activePoints.map(function (p) {
// //         return {
// //             x: p.x,
// //             y: p.y
// //         };
// //     });

// //     sendWallsTo3D();

// //     if (activeLine) {
// //         canvas.remove(activeLine);
// //     }

// //     createTemporaryWall(
// //         pointer.x,
// //         pointer.y,
// //         pointer.x,
// //         pointer.y
// //     );

// //     canvas.renderAll();
// // });

// // function createPermanentWall(p1, p2) {
// //     const wallLine = new fabric.Line(
// //         [p1.x, p1.y, p2.x, p2.y],
// //         {
// //             stroke: "#586a6d",
// //             strokeWidth: WALL_WIDTH,
// //             strokeLineCap: "round",
// //             selectable: false,
// //             evented: false,
// //             itemType: "Wall",
// //             wallType: "room-wall"
// //         }
// //     );

// //     canvas.add(wallLine);
// // }

// // function createTemporaryWall(x1, y1, x2, y2) {
// //     if (activeLine) {
// //         canvas.remove(activeLine);
// //     }

// //     activeLine = new fabric.Line(
// //         [x1, y1, x2, y2],
// //         {
// //             stroke: "#198754",
// //             strokeWidth: 6,
// //             strokeDashArray: [5, 5],
// //             selectable: false,
// //             evented: false
// //         }
// //     );

// //     canvas.add(activeLine);
// // }

// // canvas.on("mouse:move", function (o) {
// //     if (!isDrawingWallMode || !isDrawing || !activeLine) {
// //         return;
// //     }

// //     const pointer = canvas.getPointer(o.e);

// //     activeLine.set({
// //         x2: pointer.x,
// //         y2: pointer.y
// //     });

// //     canvas.renderAll();
// // });

// // canvas.on("mouse:dblclick", function () {
// //     if (!isDrawingWallMode) return;
// //     finishWallDrawing();
// // });

// // function finishWallDrawing() {
// //     if (activePoints.length < 2) {
// //         stopWallDrawing();
// //         return;
// //     }

// //     const first = activePoints[0];
// //     const last = activePoints[activePoints.length - 1];

// //     const distance = Math.sqrt(
// //         Math.pow(first.x - last.x, 2) + Math.pow(first.y - last.y, 2)
// //     );

// //     if (distance > 15) {
// //         createPermanentWall(last, first);

// //         window.roomWallData.walls.push({
// //             x1: last.x,
// //             y1: last.y,
// //             x2: first.x,
// //             y2: first.y
// //         });
// //     }

// //     window.roomWallData.points = activePoints.map(function (p) {
// //         return {
// //             x: p.x,
// //             y: p.y
// //         };
// //     });

// //     window.roomWallData.closed = true;
// //     window.roomWallData.shape = "custom";

// //     sendWallsTo3D();
// //     canvas.renderAll();
// //     stopWallDrawing();
// // }

// // document.addEventListener("keydown", function (e) {
// //     if (!isDrawingWallMode) return;

// //     if (e.key === "Escape") {
// //         stopWallDrawing();
// //     }

// //     if (e.key === "Enter") {
// //         finishWallDrawing();
// //     }
// // });

// // function showDesignMessage(text) {
// //     let message = document.getElementById("designMessage");

// //     if (!message) {
// //         message = document.createElement("div");
// //         message.id = "designMessage";
// //         message.style.position = "fixed";
// //         message.style.left = "50%";
// //         message.style.top = "75px";
// //         message.style.transform = "translateX(-50%)";
// //         message.style.background = "#198754";
// //         message.style.color = "#fff";
// //         message.style.padding = "10px 18px";
// //         message.style.borderRadius = "8px";
// //         message.style.zIndex = "999999";
// //         message.style.fontSize = "13px";
// //         message.style.boxShadow = "0 4px 15px rgba(0,0,0,.2)";

// //         document.body.appendChild(message);
// //     }

// //     message.innerText = text;
// //     message.style.display = "block";
// // }

// // function hideDesignMessage() {
// //     const message = document.getElementById("designMessage");
// //     if (message) {
// //         message.style.display = "none";
// //     }
// // }

// // /* =====================================================
// //    ROOM SHAPES
// // ===================================================== */
// // function clearCanvasFurnitureAndWalls() {
// //     const objects = canvas.getObjects();

// //     objects.forEach(function (obj) {
// //         if (obj.itemType === "Wall" || obj.itemType === "RoomShape") {
// //             canvas.remove(obj);
// //         }
// //     });

// //     activePoints = [];
// //     window.roomWallData = {
// //         points: [],
// //         walls: [],
// //         closed: false,
// //         shape: "custom"
// //     };
// // }

// // function createRoomShape(shape) {
// //     clearCanvasFurnitureAndWalls();

// //     const w = roomData.width;
// //     const h = roomData.depth;
// //     const cx = w / 2;
// //     const cy = h / 2;

// //     let points = [];

// //     if (shape === "rectangle") {
// //         points = [
// //             { x: 40, y: 40 },
// //             { x: w - 40, y: 40 },
// //             { x: w - 40, y: h - 40 },
// //             { x: 40, y: h - 40 }
// //         ];
// //     } else if (shape === "square") {
// //         const size = Math.min(w, h) - 80;
// //         const left = (w - size) / 2;
// //         const top = (h - size) / 2;

// //         points = [
// //             { x: left, y: top },
// //             { x: left + size, y: top },
// //             { x: left + size, y: top + size },
// //             { x: left, y: top + size }
// //         ];
// //     } else if (shape === "lshape") {
// //         points = [
// //             { x: 40, y: 40 },
// //             { x: w - 40, y: 40 },
// //             { x: w - 40, y: h * 0.55 },
// //             { x: w * 0.60, y: h * 0.55 },
// //             { x: w * 0.60, y: h - 40 },
// //             { x: 40, y: h - 40 }
// //         ];
// //     } else if (shape === "tshape") {
// //         points = [
// //             { x: w * 0.30, y: 40 },
// //             { x: w * 0.70, y: 40 },
// //             { x: w * 0.70, y: h * 0.35 },
// //             { x: w - 40, y: h * 0.35 },
// //             { x: w - 40, y: h - 40 },
// //             { x: 40, y: h - 40 },
// //             { x: 40, y: h * 0.35 },
// //             { x: w * 0.30, y: h * 0.35 }
// //         ];
// //     } else if (shape === "ushape") {
// //         points = [
// //             { x: 40, y: 40 },
// //             { x: w - 40, y: 40 },
// //             { x: w - 40, y: h - 40 },
// //             { x: w * 0.65, y: h - 40 },
// //             { x: w * 0.65, y: h * 0.45 },
// //             { x: w * 0.35, y: h * 0.45 },
// //             { x: w * 0.35, y: h - 40 },
// //             { x: 40, y: h - 40 }
// //         ];
// //     } else {
// //         return createRoomShape("rectangle");
// //     }

// //     for (let i = 0; i < points.length; i++) {
// //         const p1 = points[i];
// //         const p2 = points[(i + 1) % points.length];

// //         const wall = new fabric.Line(
// //             [p1.x, p1.y, p2.x, p2.y],
// //             {
// //                 stroke: "#586a6d",
// //                 strokeWidth: WALL_WIDTH,
// //                 strokeLineCap: "round",
// //                 selectable: false,
// //                 evented: false,
// //                 itemType: "RoomShape",
// //                 roomShape: shape
// //             }
// //         );

// //         canvas.add(wall);
// //     }

// //     window.roomWallData = {
// //         points: points,
// //         walls: points.map(function (p, index) {
// //             const next = points[(index + 1) % points.length];
// //             return {
// //                 x1: p.x,
// //                 y1: p.y,
// //                 x2: next.x,
// //                 y2: next.y
// //             };
// //         }),
// //         closed: true,
// //         shape: shape
// //     };

// //     canvas.renderAll();

// //     sendWallsTo3D();
// //     showDesignMessage(
// //         shape.toUpperCase() + " room created in 2D and sent to 3D."
// //     );
// //     setTimeout(hideDesignMessage, 1800);
// // }

// // function showRoomShapes() {
// //     let panel = document.getElementById("roomShapesFloatingPanel");
// //     if (panel) {
// //         panel.remove();
// //     }

// //     panel = document.createElement("div");
// //     panel.id = "roomShapesFloatingPanel";
// //     panel.innerHTML = `
// //         <div class="room-shapes-header">
// //             <strong>Room Shapes</strong>
// //             <button id="closeRoomShapes">×</button>
// //         </div>
// //         <div class="room-shapes-grid">
// //             <button data-shape="rectangle"><span>▭</span>Rectangle</button>
// //             <button data-shape="square"><span>□</span>Square</button>
// //             <button data-shape="lshape"><span>⌞</span>L Shape</button>
// //             <button data-shape="tshape"><span>⊤</span>T Shape</button>
// //             <button data-shape="ushape"><span>∪</span>U Shape</button>
// //         </div>
// //     `;

// //     document.body.appendChild(panel);

// //     panel.querySelectorAll("[data-shape]").forEach(function (button) {
// //         button.addEventListener("click", function () {
// //             createRoomShape(this.dataset.shape);
// //         });
// //     });

// //     document.getElementById("closeRoomShapes").addEventListener("click", function () {
// //         panel.remove();
// //     });

// //     addRoomShapeStyles();
// // }

// // function addRoomShapeStyles() {
// //     if (document.getElementById("roomShapeStyles")) {
// //         return;
// //     }

// //     const style = document.createElement("style");
// //     style.id = "roomShapeStyles";
// //     style.innerHTML = `
// //         #roomShapesFloatingPanel {
// //             position: fixed;
// //             left: 400px;
// //             top: 100px;
// //             width: 300px;
// //             background: #fff;
// //             border: 1px solid #ddd;
// //             border-radius: 12px;
// //             padding: 12px;
// //             z-index: 99999;
// //             box-shadow: 0 8px 30px rgba(0,0,0,.18);
// //         }
// //         .room-shapes-header {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             margin-bottom: 12px;
// //         }
// //         .room-shapes-header button {
// //             border: none;
// //             background: transparent;
// //             font-size: 22px;
// //             cursor: pointer;
// //         }
// //         .room-shapes-grid {
// //             display: grid;
// //             grid-template-columns: repeat(2, 1fr);
// //             gap: 8px;
// //         }
// //         .room-shapes-grid button {
// //             border: 1px solid #ddd;
// //             background: #fff;
// //             border-radius: 8px;
// //             padding: 12px 6px;
// //             cursor: pointer;
// //             display: flex;
// //             flex-direction: column;
// //             align-items: center;
// //             gap: 5px;
// //         }
// //         .room-shapes-grid button:hover {
// //             border-color: #198754;
// //             color: #198754;
// //             background: #f5fbf7;
// //         }
// //         .room-shapes-grid span {
// //             font-size: 28px;
// //         }
// //     `;

// //     document.head.appendChild(style);
// // }

// // /* =====================================================
// //    FORMS
// // ===================================================== */
// // function showFormsPanel() {
// //     let panel = document.getElementById("formsFloatingPanel");
// //     if (panel) {
// //         panel.remove();
// //     }

// //     panel = document.createElement("div");
// //     panel.id = "formsFloatingPanel";
// //     panel.innerHTML = `
// //         <div class="forms-header">
// //             <strong>Forms</strong>
// //             <button id="closeForms">×</button>
// //         </div>
// //         <div class="forms-grid">
// //             <button data-form="rectangle">▭ Rectangle</button>
// //             <button data-form="circle">● Circle</button>
// //             <button data-form="triangle">△ Triangle</button>
// //             <button data-form="square">□ Square</button>
// //         </div>
// //     `;

// //     document.body.appendChild(panel);

// //     panel.querySelectorAll("[data-form]").forEach(function (button) {
// //         button.addEventListener("click", function () {
// //             createForm(this.dataset.form);
// //         });
// //     });

// //     document.getElementById("closeForms").addEventListener("click", function () {
// //         panel.remove();
// //     });

// //     addFormsStyles();
// // }

// // function createForm(type) {
// //     let object;

// //     if (type === "circle") {
// //         object = new fabric.Circle({
// //             radius: 40,
// //             fill: "#9e9e9e",
// //             left: roomData.width / 2,
// //             top: roomData.depth / 2,
// //             originX: "center",
// //             originY: "center"
// //         });
// //     } else if (type === "triangle") {
// //         object = new fabric.Triangle({
// //             width: 80,
// //             height: 80,
// //             fill: "#9e9e9e",
// //             left: roomData.width / 2,
// //             top: roomData.depth / 2,
// //             originX: "center",
// //             originY: "center"
// //         });
// //     } else {
// //         object = new fabric.Rect({
// //             width: type === "square" ? 80 : 120,
// //             height: type === "square" ? 80 : 60,
// //             fill: "#9e9e9e",
// //             stroke: "#555",
// //             strokeWidth: 2,
// //             rx: 6,
// //             ry: 6,
// //             left: roomData.width / 2,
// //             top: roomData.depth / 2,
// //             originX: "center",
// //             originY: "center"
// //         });
// //     }

// //     object.itemType = "Form";
// //     object.formType = type;
// //     object.furnitureName = type;

// //     canvas.add(object);
// //     canvas.setActiveObject(object);
// //     canvas.renderAll();
// //     updateFurnitureToolbar();
// // }

// // function addFormsStyles() {
// //     if (document.getElementById("formsStyles")) {
// //         return;
// //     }

// //     const style = document.createElement("style");
// //     style.id = "formsStyles";
// //     style.innerHTML = `
// //         #formsFloatingPanel {
// //             position: fixed;
// //             left: 400px;
// //             top: 100px;
// //             width: 280px;
// //             background: #fff;
// //             border: 1px solid #ddd;
// //             border-radius: 12px;
// //             padding: 12px;
// //             z-index: 99999;
// //             box-shadow: 0 8px 30px rgba(0,0,0,.18);
// //         }
// //         .forms-header {
// //             display: flex;
// //             justify-content: space-between;
// //             margin-bottom: 12px;
// //         }
// //         .forms-header button {
// //             border: none;
// //             background: transparent;
// //             font-size: 22px;
// //             cursor: pointer;
// //         }
// //         .forms-grid {
// //             display: grid;
// //             grid-template-columns: repeat(2, 1fr);
// //             gap: 8px;
// //         }
// //         .forms-grid button {
// //             padding: 12px 5px;
// //             background: #fff;
// //             border: 1px solid #ddd;
// //             border-radius: 8px;
// //             cursor: pointer;
// //         }
// //         .forms-grid button:hover {
// //             border-color: #198754;
// //             color: #198754;
// //         }
// //     `;

// //     document.head.appendChild(style);
// // }

// // /* =====================================================
// //    SMART WIZARD
// // ===================================================== */
// // function openSmartWizard() {
// //     let modal = document.getElementById("smartWizardModal");
// //     if (modal) {
// //         modal.remove();
// //     }

// //     const selectedStyle =
// //         localStorage.getItem("selectedStyle") ||
// //         localStorage.getItem("roomStyle") ||
// //         "Modern";

// //     const selectedRoom =
// //         localStorage.getItem("selectedRoom") ||
// //         localStorage.getItem("roomType") ||
// //         "Bedroom";

// //     modal = document.createElement("div");
// //     modal.id = "smartWizardModal";
// //     modal.innerHTML = `
// //         <div class="smart-wizard-box">
// //             <div class="smart-wizard-header">
// //                 <div>
// //                     <h3>Smart Wizard</h3>
// //                     <small>AI Room Designer</small>
// //                 </div>
// //                 <button id="closeSmartWizard">×</button>
// //             </div>
// //             <div class="wizard-info">
// //                 <div>
// //                     <strong>Style</strong>
// //                     <span>${selectedStyle}</span>
// //                 </div>
// //                 <div>
// //                     <strong>Room</strong>
// //                     <span>${selectedRoom}</span>
// //                 </div>
// //             </div>
// //             <label>Describe your room</label>
// //             <textarea
// //                 id="smartWizardPrompt"
// //                 rows="5"
// //                 placeholder="Example: Create a modern bedroom with a king bed, two side tables, warm lighting and neutral colors."
// //             ></textarea>
// //             <button id="generateSmartRoom" class="smart-generate-btn">
// //                 <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Room
// //             </button>
// //             <div id="smartWizardResult" class="smart-wizard-result"></div>
// //         </div>
// //     `;

// //     document.body.appendChild(modal);

// //     document.getElementById("closeSmartWizard").addEventListener("click", function () {
// //         modal.remove();
// //     });

// //     document.getElementById("generateSmartRoom").addEventListener("click", function () {
// //         generateSmartRoom(selectedStyle, selectedRoom);
// //     });

// //     addSmartWizardStyles();
// // }

// // function generateSmartRoom(style, roomType) {
// //     const prompt = document.getElementById("smartWizardPrompt");
// //     const result = document.getElementById("smartWizardResult");
// //     const userPrompt = prompt ? prompt.value.trim() : "";

// //     window.smartRoomData = {
// //         style: style,
// //         roomType: roomType,
// //         prompt: userPrompt
// //     };

// //     const lowerRoom = roomType.toLowerCase();

// //     if (lowerRoom.includes("bedroom")) {
// //         roomData.width = 500;
// //         roomData.depth = 400;
// //     } else if (lowerRoom.includes("living")) {
// //         roomData.width = 600;
// //         roomData.depth = 450;
// //     } else if (lowerRoom.includes("kitchen")) {
// //         roomData.width = 500;
// //         roomData.depth = 350;
// //     } else if (lowerRoom.includes("office")) {
// //         roomData.width = 450;
// //         roomData.depth = 350;
// //     }

// //     updateRoom();
// //     createRoomShape("rectangle");

// //     if (lowerRoom.includes("bedroom")) {
// //         createBed(roomData.width / 2, roomData.depth / 2);
// //     } else if (lowerRoom.includes("living")) {
// //         createSofa(roomData.width / 2, roomData.depth / 2);
// //     }

// //     window.dispatchEvent(
// //         new CustomEvent("smartRoomGenerated", {
// //             detail: window.smartRoomData
// //         })
// //     );

// //     if (result) {
// //         result.innerHTML = `
// //             <strong>Room Generated</strong><br>
// //             Style: ${style}<br>
// //             Room: ${roomType}
// //             ${userPrompt ? "<br>Prompt: " + userPrompt : ""}
// //         `;
// //     }
// // }

// // function addSmartWizardStyles() {
// //     if (document.getElementById("smartWizardStyles")) {
// //         return;
// //     }

// //     const style = document.createElement("style");
// //     style.id = "smartWizardStyles";
// //     style.innerHTML = `
// //         #smartWizardModal {
// //             position: fixed;
// //             inset: 0;
// //             background: rgba(0,0,0,.35);
// //             z-index: 999999;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //         }
// //         .smart-wizard-box {
// //             width: 420px;
// //             max-width: 90vw;
// //             background: #fff;
// //             border-radius: 14px;
// //             padding: 20px;
// //             box-shadow: 0 15px 50px rgba(0,0,0,.25);
// //         }
// //         .smart-wizard-header {
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: flex-start;
// //             margin-bottom: 18px;
// //         }
// //         .smart-wizard-header h3 {
// //             margin: 0;
// //             font-size: 20px;
// //         }
// //         .smart-wizard-header small {
// //             color: #777;
// //         }
// //         .smart-wizard-header button {
// //             border: none;
// //             background: transparent;
// //             font-size: 25px;
// //             cursor: pointer;
// //         }
// //         .wizard-info {
// //             display: grid;
// //             grid-template-columns: 1fr 1fr;
// //             gap: 10px;
// //             margin-bottom: 16px;
// //         }
// //         .wizard-info div {
// //             background: #f5faf6;
// //             padding: 10px;
// //             border-radius: 8px;
// //             display: flex;
// //             flex-direction: column;
// //         }
// //         .wizard-info span {
// //             color: #198754;
// //             margin-top: 3px;
// //         }
// //         #smartWizardPrompt {
// //             width: 100%;
// //             resize: vertical;
// //             border: 1px solid #ddd;
// //             border-radius: 8px;
// //             padding: 10px;
// //             margin-top: 6px;
// //             margin-bottom: 12px;
// //         }
// //         #smartWizardPrompt:focus {
// //             outline: none;
// //             border-color: #198754;
// //         }
// //         .smart-generate-btn {
// //             width: 100%;
// //             border: none;
// //             background: #198754;
// //             color: white;
// //             padding: 11px;
// //             border-radius: 8px;
// //             cursor: pointer;
// //         }
// //         .smart-generate-btn:hover {
// //             background: #146c43;
// //         }
// //         .smart-wizard-result {
// //             margin-top: 12px;
// //             font-size: 13px;
// //             line-height: 1.6;
// //         }
// //     `;

// //     document.head.appendChild(style);
// // }

// // /* =====================================================
// //    FURNITURE TOOLBAR
// // ===================================================== */
// // let furnitureToolbar = null;

// // function createFurnitureToolbar() {
// //     if (furnitureToolbar) {
// //         furnitureToolbar.remove();
// //     }

// //     furnitureToolbar = document.createElement("div");
// //     furnitureToolbar.id = "furnitureToolbar";
// //     furnitureToolbar.innerHTML = `
// //         <button type="button" id="rotateLeftBtn" title="Rotate Left">↶</button>
// //         <button type="button" id="rotateRightBtn" title="Rotate Right">↷</button>
// //         <button type="button" id="deleteSelectedBtn" title="Delete">🗑</button>
// //     `;

// //     document.body.appendChild(furnitureToolbar);

// //     document.getElementById("rotateLeftBtn").addEventListener("click", function () {
// //         const object = canvas.getActiveObject();
// //         if (!object) return;

// //         object.rotate((object.angle || 0) - 15);
// //         object.setCoords();
// //         canvas.renderAll();
// //         updateFurnitureToolbar();
// //         updatePropertiesFromObject(object);
// //     });

// //     document.getElementById("rotateRightBtn").addEventListener("click", function () {
// //         const object = canvas.getActiveObject();
// //         if (!object) return;

// //         object.rotate((object.angle || 0) + 15);
// //         object.setCoords();
// //         canvas.renderAll();
// //         updateFurnitureToolbar();
// //         updatePropertiesFromObject(object);
// //     });

// //     document.getElementById("deleteSelectedBtn").addEventListener(
// //         "click",
// //         deleteSelectedFurniture
// //     );
// // }

// // function updateFurnitureToolbar() {
// //     if (!furnitureToolbar) return;

// //     const object = canvas.getActiveObject();
// //     if (!object) {
// //         furnitureToolbar.style.display = "none";
// //         return;
// //     }

// //     furnitureToolbar.style.display = "flex";

// //     const rect = canvas.upperCanvasEl.getBoundingClientRect();
// //     const bounds = object.getBoundingRect();
// //     const left = rect.left + bounds.left;
// //     const top = rect.top + bounds.top - 45;

// //     furnitureToolbar.style.left = left + "px";
// //     furnitureToolbar.style.top = Math.max(5, top) + "px";
// // }

// // function hideFurnitureToolbar() {
// //     if (furnitureToolbar) {
// //         furnitureToolbar.style.display = "none";
// //     }
// // }

// // function deleteSelectedFurniture() {
// //     const object = canvas.getActiveObject();
// //     if (!object) return;

// //     canvas.remove(object);
// //     canvas.discardActiveObject();
// //     canvas.renderAll();
// //     hideFurnitureToolbar();
// // }

// // /* =====================================================
// //    FURNITURE CREATION FUNCTIONS
// // ===================================================== */
// // function createGenericFurniture(type, x = 200, y = 150) {
// //     const object = new fabric.Group(
// //         [
// //             new fabric.Rect({
// //                 left: -40,
// //                 top: -30,
// //                 width: 80,
// //                 height: 60,
// //                 fill: "#9e9e9e",
// //                 stroke: "#555",
// //                 strokeWidth: 2,
// //                 rx: 6,
// //                 ry: 6
// //             }),
// //             new fabric.Text(type, {
// //                 left: -30,
// //                 top: -8,
// //                 fontSize: 10,
// //                 fill: "white"
// //             })
// //         ],
// //         {
// //             left: x,
// //             top: y,
// //             originX: "center",
// //             originY: "center"
// //         }
// //     );

// //     object.itemType = type;
// //     object.furnitureName = type;

// //     canvas.add(object);
// //     canvas.setActiveObject(object);
// //     canvas.renderAll();
// //     updateFurnitureToolbar();

// //     return object;
// // }
// // function createFurnitureFromImage(src, type, modelPath, x = 200, y = 150) {
// //     fabric.Image.fromURL(
// //         src,
// //         function (img) {
// //             if (!img) {
// //                 createGenericFurniture(type, x, y);
// //                 return;
// //             }

// //             const maxWidth = 80;
// //             const maxHeight = 80;
// //             const scale = Math.min(
// //                 maxWidth / img.width,
// //                 maxHeight / img.height
// //             );

// //             img.set({
// //                 left: x,
// //                 top: y,
// //                 originX: "center",
// //                 originY: "center",
// //                 scaleX: scale,
// //                 scaleY: scale
// //             });

// //             img.glbModel = modelPath || "";
// //             img.imageUrl = src;               // ✅ NEW: store image URL
// //             img.furnitureName = type;
// //             img.itemType = type;

// //             canvas.add(img);
// //             canvas.setActiveObject(img);
// //             canvas.renderAll();
// //             updateFurnitureToolbar();

// //             // Immediately sync to 3D
// //             syncSelectedFurniture3D();        // ✅ NEW: trigger 3D update
// //         },
// //         { crossOrigin: "anonymous" }
// //     );
// // }

// // function createArmchair(modelPath, left = 200, top = 150) {
// //     const imagePath = "models/armchair1.png";
// //     createFurnitureFromImage(imagePath, "Armchair", modelPath || "models/armchair1.glb", left, top);
// // }

// // function createBed(x = 200, y = 150) {
// //     const imagePath = "models/bed1.png";
// //     createFurnitureFromImage(imagePath, "Bed", "models/bed1.glb", x, y);
// // }

// // function createSofa(x = 200, y = 150) {
// //     const imagePath = "models/sofa1.png";
// //     createFurnitureFromImage(imagePath, "Sofa", "models/sofa1.glb", x, y);
// // }
// // function getSelectedFurniture3DData() {
// //     const object = canvas.getActiveObject();
// //     if (!object || !object.itemType) {
// //         return null;
// //     }

// //     let modelPath = object.glbModel || "";
// //     if (object.itemType === "Armchair" && !modelPath) {
// //         modelPath = "models/armchair1.glb";
// //     }

// //     return {
// //         type: object.itemType,
// //         name: object.furnitureName || object.itemType,
// //         model: modelPath,
// //         imageUrl: object.imageUrl || null,   // ✅ NEW: pass image URL to 3D
// //         x: object.left || 0,
// //         y: object.top || 0,
// //         rotation: object.angle || 0,
// //         width: object.getScaledWidth(),
// //         height: object.getScaledHeight(),
// //         scaleX: object.scaleX || 1,
// //         scaleY: object.scaleY || 1
// //     };
// // }

// // /* =====================================================
// //    MODIFIED: createFurnitureAt now accepts imageSrc
// // ===================================================== */
// // function createFurnitureAt(type, x, y, model, imageSrc) {
// //     // If imageSrc is provided, use it directly
// //     if (imageSrc) {
// //         // Determine model path: if model ends with .glb, use it; else try to find from imageMap
// //         let modelPath = (model && model.endsWith('.glb')) ? model : '';
// //         if (!modelPath) {
// //             // Try to get from imageMap
// //             const fallback = imageMap[type];
// //             if (fallback) {
// //                 modelPath = fallback.model;
// //             }
// //         }
// //         createFurnitureFromImage(imageSrc, type, modelPath || '', x, y);
// //         return;
// //     }

// //     // Otherwise use the default imageMap
// //     const fallback = imageMap[type];
// //     if (fallback) {
// //         const imgPath = model && model.endsWith('.png') ? model : fallback.img;
// //         const modelPath = model && model.endsWith('.glb') ? model : fallback.model;
// //         createFurnitureFromImage(imgPath, type, modelPath, x, y);
// //     } else {
// //         createGenericFurniture(type, x, y);
// //     }
// // }

// // // Global imageMap for fallback
// // const imageMap = {
// //     'Armchair': { img: 'models/armchair1.png', model: 'models/armchair1.glb' },
// //     'Sofa': { img: 'models/sofa1.png', model: 'models/sofa1.glb' },
// //     'Bed': { img: 'models/bed1.png', model: 'models/bed1.glb' },
// //     'Ottoman': { img: 'models/ottoman1.png', model: 'models/ottoman1.glb' },
// //     'Storage': { img: 'models/storage1.png', model: 'models/storage1.glb' },
// //     'Table': { img: 'models/table1.png', model: 'models/table1.glb' },
// //     'Office Desk': { img: 'models/officedesk1.png', model: 'models/officedesk1.glb' },
// //     'Children Furniture': { img: 'models/children1.png', model: 'models/children1.glb' },
// //     'Kitchen': { img: 'models/kitchen1.png', model: 'models/kitchen1.glb' },
// //     'Bathroom': { img: 'models/bathroom1.png', model: 'models/bathroom1.glb' },
// //     'Door': { img: 'models/construction/door/door1.png', model: 'models/construction/doors/door1.glb' },
// //     'Window': { img: 'models/construction/window/window1.png', model: 'models/construction/windows/window1.glb' },
// //     'Stairs': { img: 'models/construction/stairs/stair1.png', model: 'models/construction/stairs/stair1.glb' },
// //     'Arch': { img: 'models/construction/archs/arch1.png', model: 'models/construction/archs/arch1.glb' },
// //     'Partition': { img: 'models/construction/partition/partition1.png', model: 'models/construction/partition/partition1.glb' },
// //     'Roof': { img: 'models/construction/roofs/roof1.png', model: 'models/construction/roofs/roof1.glb' },
// //     'Fireplace': { img: 'models/construction/fireplace/fire1.png', model: 'models/construction/fireplace/fire1.glb' },
// //     'Column': { img: 'models/construction/column/column1.png', model: 'models/construction/column/column1.glb' },
// //     'Terrace': { img: 'models/construction/terrace/terrace1.png', model: 'models/construction/terrace/terrace1.glb' },
// //     'Fence': { img: 'models/construction/fences/fence1.png', model: 'models/construction/fences/fence1.glb' },
// //     'Path and Lawn': { img: 'models/outdoor/path and lawns/path1.png', model: 'models/outdoor/path and lawns/path1.glb' },
// //     'Patio': { img: 'models/outdoor/patio/patio1.png', model: 'models/outdoor/patio/patio1.glb' },
// //     'Tree and Plant': { img: 'models/outdoor/trees/tree1.png', model: 'models/outdoor/trees/tree1.glb' },
// //     'Garage': { img: 'models/outdoor/garage/garage1.png', model: 'models/outdoor/garage/garage1.glb' },
// //     'Pool': { img: 'models/outdoor/pool/pool1.png', model: 'models/outdoor/pool/pool1.glb' },
// //     'Outdoor Lighting': { img: 'models/outdoor/lighting/lighting1.png', model: 'models/outdoor/lighting/lighting1.glb' },
// //     'Outdoor Activity': { img: 'models/outdoor/activity/activity1.png', model: 'models/outdoor/activity/activity1.glb' },
// //     'Garden': { img: 'models/outdoor/garden/garden1.png', model: 'models/outdoor/garden/garden1.glb' }
// // };

// // /* =====================================================
// //    FURNITURE CATEGORY NAVIGATION
// // ===================================================== */
// // const furnitureCategories = document.querySelectorAll(".furniture-category");
// // const categoryView = document.getElementById("categoryView");
// // const armchairsView = document.getElementById("armchairsView");
// // const sofasView = document.getElementById("sofasView");
// // const panelBack = document.getElementById("panelBack");
// // const panelTitle = document.getElementById("panelTitle");

// // function hideAllSubcategories() {
// //     if (armchairsView) armchairsView.style.display = "none";
// //     if (sofasView) sofasView.style.display = "none";
// //     document.querySelectorAll('.subcategory-view').forEach(v => {
// //         if (v.id !== 'armchairsView' && v.id !== 'sofasView') {
// //             v.style.display = 'none';
// //         }
// //     });
// // }

// // furnitureCategories.forEach(function (category) {
// //     category.addEventListener("click", function () {
// //         const categoryName = this.dataset.category;

// //         if (categoryView) categoryView.style.display = "none";
// //         hideAllSubcategories();

// //         if (categoryName === "Armchairs") {
// //             if (armchairsView) armchairsView.style.display = "block";
// //             if (panelTitle) panelTitle.innerText = "Armchairs";
// //             setupFurnitureCardImages(armchairsView);
// //         } else if (categoryName === "Sofa") {
// //             if (sofasView) sofasView.style.display = "block";
// //             if (panelTitle) panelTitle.innerText = "Sofas";
// //             setupFurnitureCardImages(sofasView);
// //         }
// //     });
// // });

// // if (panelBack) {
// //     panelBack.addEventListener("click", function () {
// //         hideAllSubcategories();
// //         if (categoryView) categoryView.style.display = "block";
// //         if (panelTitle) panelTitle.innerText = "Furniture";
// //         if (panelBack) panelBack.style.display = "none";
// //     });
// // }

// // /* =====================================================
// //    DRAG & DROP - UPDATED with imageSrc
// // ===================================================== */
// // // Delegated dragstart on document for all .furniture-card
// // document.addEventListener('dragstart', function(event) {
// //     const card = event.target.closest('.furniture-card');
// //     if (!card) return;
    
// //     const type = card.dataset.type || card.dataset.category || "";
// //     const model = card.dataset.model || "";
// //     const img = card.querySelector('.furniture-thumbnail');
// //     const imageSrc = img ? img.getAttribute('src') || '' : '';
    
// //     event.dataTransfer.effectAllowed = "copy";
// //     event.dataTransfer.setData("furnitureType", type);
// //     event.dataTransfer.setData("furnitureModel", model);
// //     event.dataTransfer.setData("imageSrc", imageSrc);
// // });

// // const fabricDropArea = canvas.wrapperEl;

// // if (fabricDropArea) {
// //     fabricDropArea.addEventListener("dragover", function (event) {
// //         event.preventDefault();
// //         event.dataTransfer.dropEffect = "copy";
// //     });

// //     fabricDropArea.addEventListener("drop", function (event) {
// //         event.preventDefault();

// //         const type = event.dataTransfer.getData("furnitureType");
// //         const model = event.dataTransfer.getData("furnitureModel");
// //         const imageSrc = event.dataTransfer.getData("imageSrc"); // new

// //         if (!type) return;

// //         const rect = fabricDropArea.getBoundingClientRect();
// //         const x = (event.clientX - rect.left) / zoom;
// //         const y = (event.clientY - rect.top) / zoom;

// //         createFurnitureAt(type, x, y, model, imageSrc);
// //     });
// // }

// // /* =====================================================
// //    OBJECT SELECTION
// // ===================================================== */
// // canvas.on("selection:created", function (e) {
// //     updateProperties(e);
// //     syncSelectedFurniture3D();
// // });

// // canvas.on("selection:updated", function (e) {
// //     updateProperties(e);
// //     syncSelectedFurniture3D();
// // });

// // canvas.on("selection:cleared", function () {
// //     showRoomProperties();
// //     hideFurnitureToolbar();

// //     if (typeof clearSelectedFurniture3D === "function") {
// //         clearSelectedFurniture3D();
// //     }
// // });

// // function syncSelectedFurniture3D() {
// //     const data = getSelectedFurniture3DData();
// //     if (!data) return;

// //     window.selectedFurniture3D = data;
// //     window.dispatchEvent(
// //         new CustomEvent("selectedFurniture3DUpdated", {
// //             detail: data
// //         })
// //     );
// // }

// // canvas.on("object:moving", updateFurnitureToolbar);

// // canvas.on("object:scaling", function (e) {
// //     updateFurnitureToolbar();
// //     updatePropertiesFromObject(e.target);
// // });

// // canvas.on("object:rotating", function (e) {
// //     updateFurnitureToolbar();
// //     updatePropertiesFromObject(e.target);
// // });

// // canvas.on("object:modified", function (e) {
// //     if (!e.target) return;

// //     e.target.setCoords();
// //     updateFurnitureToolbar();
// //     updatePropertiesFromObject(e.target);
// //     syncSelectedFurniture3D();

// //     if (typeof updateSelectedFurniture3D === "function") {
// //         updateSelectedFurniture3D(window.selectedFurniture3D);
// //     }
// // });

// // function showRoomProperties() {
// //     if (widthInput) widthInput.value = roomData.width + " cm";
// //     if (depthInput) depthInput.value = roomData.depth + " cm";
// //     if (heightInput) heightInput.value = roomData.height + " cm";
// //     if (angleInput) angleInput.value = roomData.angle + "°";
// //     if (elevationInput) elevationInput.value = roomData.elevation + " cm";
// // }

// // function updateProperties(event) {
// //     const object = event.selected && event.selected[0];
// //     if (object) {
// //         updatePropertiesFromObject(object);
// //     }
// // }

// // function updatePropertiesFromObject(object) {
// //     if (!object) return;

// //     if (widthInput)
// //         widthInput.value = Math.round(object.getScaledWidth()) + " cm";
// //     if (depthInput)
// //         depthInput.value = Math.round(object.getScaledHeight()) + " cm";
// //     if (heightInput) heightInput.value = "65 cm";
// //     if (angleInput) angleInput.value = Math.round(object.angle || 0) + "°";
// //     if (elevationInput) elevationInput.value = "0 cm";
// // }

// // /* =====================================================
// //    DELETE BUTTON
// // ===================================================== */
// // const deleteButton = document.getElementById("deleteFurniture");

// // if (deleteButton) {
// //     deleteButton.addEventListener("click", function () {
// //         const object = canvas.getActiveObject();

// //         if (object) {
// //             deleteSelectedFurniture();
// //             return;
// //         }

// //         if (room && confirm("Do you want to delete the room?")) {
// //             room.remove();
// //         }
// //     });
// // }

// // /* =====================================================
// //    ZOOM
// // ===================================================== */
// // let zoom = 1;

// // const zoomInButton = document.getElementById("zoomIn");
// // const zoomOutButton = document.getElementById("zoomOut");

// // function updateZoomText() {
// //     const zoomValue = document.getElementById("zoomValue");
// //     if (zoomValue) {
// //         zoomValue.innerText = Math.round(zoom * 100) + "%";
// //     }
// //     updateFurnitureToolbar();
// // }

// // if (zoomInButton) {
// //     zoomInButton.addEventListener("click", function () {
// //         zoom = Math.min(2, zoom + 0.1);
// //         canvas.setZoom(zoom);
// //         updateZoomText();
// //     });
// // }

// // if (zoomOutButton) {
// //     zoomOutButton.addEventListener("click", function () {
// //         zoom = Math.max(0.5, zoom - 0.1);
// //         canvas.setZoom(zoom);
// //         updateZoomText();
// //     });
// // }

// // canvas.on("mouse:wheel", function (opt) {
// //     if (isDrawingWallMode) return;

// //     const delta = opt.e.deltaY;
// //     zoom *= 0.999 ** delta;
// //     zoom = Math.min(Math.max(0.5, zoom), 2);

// //     canvas.zoomToPoint(
// //         { x: opt.e.offsetX, y: opt.e.offsetY },
// //         zoom
// //     );

// //     updateZoomText();
// //     opt.e.preventDefault();
// //     opt.e.stopPropagation();
// // });

// // /* =====================================================
// //    2D / 3D SWITCH
// // ===================================================== */
// // const btn2D = document.getElementById("btn2D");
// // const btn3D = document.getElementById("btn3D");
// // const workspace = document.querySelector(".workspace");

// // if (btn2D) {
// //     btn2D.addEventListener("click", function () {
// //         btn2D.classList.add("active");
// //         if (btn3D) btn3D.classList.remove("active");
// //         if (workspace) workspace.classList.remove("three-mode");
// //     });
// // }

// // if (btn3D) {
// //     btn3D.addEventListener("click", function () {
// //         btn3D.classList.add("active");
// //         if (btn2D) btn2D.classList.remove("active");
// //         if (workspace) workspace.classList.add("three-mode");

// //         sendRoomDataTo3D();
// //         sendWallsTo3D();

// //         setTimeout(function () {
// //             if (typeof initThreeView === "function") {
// //                 initThreeView();
// //             }

// //             sendWallsTo3D();

// //             const selected = getSelectedFurniture3DData();
// //             if (selected) {
// //                 window.selectedFurniture3D = selected;
// //                 if (typeof showSelectedFurniture3D === "function") {
// //                     showSelectedFurniture3D(selected);
// //                 }
// //             }

// //             window.dispatchEvent(new Event("resize"));
// //         }, 250);
// //     });
// // }

// // /* =====================================================
// //    SELECT BUILD OPTION
// // ===================================================== */
// // function selectOption(optionName) {
// //     console.log("Selected Action:", optionName);

// //     document.querySelectorAll(".cards-grid .card").forEach(function (card) {
// //         card.classList.remove("active-card");
// //     });

// //     const cards = document.querySelectorAll(".cards-grid .card");
// //     cards.forEach(function (card) {
// //         const title = card.querySelector(".card-title");
// //         if (title && title.innerText.trim() === optionName) {
// //             card.classList.add("active-card");
// //         }
// //     });

// //     if (optionName === "Draw Walls") {
// //         showDesignMessage("Draw Walls selected.");
// //         setTimeout(function () {
// //             startWallDrawing();
// //         }, 100);
// //         return;
// //     }

// //     if (optionName === "Rooms") {
// //         stopWallDrawing();
// //         showRoomShapes();
// //         return;
// //     }

// //     if (optionName === "Smart Wizard") {
// //         stopWallDrawing();
// //         openSmartWizard();
// //         return;
// //     }

// //     if (optionName === "Forms") {
// //         stopWallDrawing();
// //         showFormsPanel();
// //         return;
// //     }

// //     stopWallDrawing();
// // }

// // /* =====================================================
// //    LEFT SIDEBAR
// // ===================================================== */
// // document.addEventListener("DOMContentLoaded", function () {
// //     const sideIcons = document.querySelectorAll(".side-icon[data-panel]");
// //     const sidePanels = document.querySelector(".side-panels");
// //     const closeSidePanel = document.getElementById("closeSidePanel");

// //     function openSidePanel(panelId, clickedIcon) {
// //         if (sidePanels) {
// //             sidePanels.classList.remove("panel-hidden");
// //         }

// //         sideIcons.forEach(function (icon) {
// //             icon.classList.remove("active");
// //         });

// //         if (clickedIcon) {
// //             clickedIcon.classList.add("active");
// //         }

// //         document.querySelectorAll(".side-panel").forEach(function (panel) {
// //             panel.classList.remove("active");
// //         });

// //         const selectedPanel = document.getElementById(panelId);
// //         if (selectedPanel) {
// //             selectedPanel.classList.add("active");
// //         }
// //     }

// //     sideIcons.forEach(function (icon) {
// //         icon.addEventListener("click", function () {
// //             const panelId = this.getAttribute("data-panel");
// //             openSidePanel(panelId, this);
// //         });
// //     });

// //     if (closeSidePanel) {
// //         closeSidePanel.addEventListener("click", function () {
// //             if (sidePanels) {
// //                 sidePanels.classList.add("panel-hidden");
// //             }

// //             sideIcons.forEach(function (icon) {
// //                 icon.classList.remove("active");
// //             });
// //         });
// //     }

// //     const defaultIcon = document.getElementById("searchBtn");
// //     const defaultPanel = document.getElementById("searchPanel");

// //     if (defaultIcon && defaultPanel) {
// //         if (sidePanels) {
// //             sidePanels.classList.remove("panel-hidden");
// //         }

// //         sideIcons.forEach(function (icon) {
// //             icon.classList.remove("active");
// //         });

// //         document.querySelectorAll(".side-panel").forEach(function (panel) {
// //             panel.classList.remove("active");
// //         });

// //         defaultIcon.classList.add("active");
// //         defaultPanel.classList.add("active");
// //     }

// //     const furnitureBackBtn = document.getElementById("furnitureBackBtn");
// //     if (furnitureBackBtn) {
// //         furnitureBackBtn.addEventListener("click", function () {
// //             if (categoryView) categoryView.style.display = "block";
// //             if (armchairsView) armchairsView.style.display = "none";
// //             if (sofasView) sofasView.style.display = "none";
// //         });
// //     }

// //     // Setup all furniture card images after DOM is ready
// //     setTimeout(function () {
// //         document.querySelectorAll('.subcategory-view').forEach(function (view) {
// //             setupFurnitureCardImages(view);
// //         });
// //         // Also setup armchairs and sofas
// //         if (armchairsView) setupFurnitureCardImages(armchairsView);
// //         if (sofasView) setupFurnitureCardImages(sofasView);
// //     }, 500);
// // });

// // /* =====================================================
// //    TOOLBAR STYLE
// // ===================================================== */
// // const toolbarStyle = document.createElement("style");
// // toolbarStyle.innerHTML = `
// //     #furnitureToolbar {
// //         position: fixed;
// //         display: none;
// //         align-items: center;
// //         gap: 4px;
// //         padding: 5px;
// //         background: #ffffff;
// //         border: 1px solid #d0d0d0;
// //         border-radius: 8px;
// //         box-shadow: 0 3px 12px rgba(0,0,0,0.18);
// //         z-index: 99999;
// //     }
// //     #furnitureToolbar button {
// //         width: 32px;
// //         height: 32px;
// //         border: none;
// //         border-radius: 6px;
// //         background: #f4f4f4;
// //         color: #333;
// //         cursor: pointer;
// //         font-size: 17px;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //     }
// //     #furnitureToolbar button:hover {
// //         background: #e5e5e5;
// //     }
// //     #furnitureToolbar button:last-child:hover {
// //         background: #ffe1e1;
// //     }
// // `;

// // document.head.appendChild(toolbarStyle);

// // /* =====================================================
// //    GET SELECTED FURNITURE DATA
// // ===================================================== */
// // function getSelectedFurniture3DData() {
// //     const object = canvas.getActiveObject();
// //     if (!object || !object.itemType) {
// //         return null;
// //     }

// //     let modelPath = object.glbModel || "";
// //     if (object.itemType === "Armchair" && !modelPath) {
// //         modelPath = "models/armchair1.glb";
// //     }

// //     return {
// //         type: object.itemType,
// //         name: object.furnitureName || object.itemType,
// //         model: modelPath,
// //         x: object.left || 0,
// //         y: object.top || 0,
// //         rotation: object.angle || 0,
// //         width: object.getScaledWidth(),
// //         height: object.getScaledHeight(),
// //         scaleX: object.scaleX || 1,
// //         scaleY: object.scaleY || 1
// //     };
// // }

// // /* =====================================================
// //    INITIALIZE
// // ===================================================== */
// // createFurnitureToolbar();
// // canvas.renderAll();
// // updateZoomText();
// // showRoomProperties();
// // hideFurnitureToolbar();

// // /* =====================================================
// //    GLOBAL ACCESS
// // ===================================================== */
// // window.designApp = {
// //     canvas: canvas,
// //     roomData: roomData,
// //     roomWallData: window.roomWallData,
// //     drawWalls: startWallDrawing,
// //     finishWalls: finishWallDrawing,
// //     createRoomShape: createRoomShape,
// //     openSmartWizard: openSmartWizard,
// //     createForm: createForm,
// //     sendWallsTo3D: sendWallsTo3D,
// //     sendRoomDataTo3D: sendRoomDataTo3D,
// //     generatePlaceholder: generatePlaceholderImage,
// //     setupFurnitureCardImages: setupFurnitureCardImages
// // };

// // /* =====================================================
// //    FINAL INITIAL SYNC
// // ===================================================== */
// // setTimeout(function () {
// //     sendRoomDataTo3D();
// //     sendWallsTo3D();
// // }, 300);

// // /* =====================================================
// //    ROOMS / CATEGORIES TAB
// // ===================================================== */
// // function showTab(tabName, clickedTab) {
// //     const rooms = document.getElementById("rooms");
// //     const categories = document.getElementById("categories");

// //     rooms.style.display = "none";
// //     categories.style.display = "none";

// //     document.querySelectorAll(".tab").forEach(function (tab) {
// //         tab.classList.remove("active-tab");
// //     });

// //     if (tabName === "rooms") {
// //         rooms.style.display = "block";
// //     }

// //     if (tabName === "categories") {
// //         categories.style.display = "block";
// //     }

// //     clickedTab.classList.add("active-tab");
// // }

// // /* =====================================================
// //    ROOM FURTHER CATEGORIES
// // ===================================================== */
// // const roomCategories = {
// //     bedroom: [
// //         ["Beds", "fa-bed"],
// //         ["Wardrobes", "fa-box"],
// //         ["Bedside Tables", "fa-table"],
// //         ["Chairs", "fa-chair"]
// //     ],
// //     "living-room": [
// //         ["Sofas", "fa-couch"],
// //         ["Armchairs", "fa-chair"],
// //         ["Coffee Tables", "fa-table"],
// //         ["TV Units", "fa-tv"]
// //     ],
// //     kitchen: [
// //         ["Kitchen Cabinets", "fa-kitchen-set"],
// //         ["Kitchen Tables", "fa-table"],
// //         ["Kitchen Chairs", "fa-chair"],
// //         ["Kitchen Storage", "fa-box"]
// //     ],
// //     office: [
// //         ["Office Desks", "fa-desktop"],
// //         ["Office Chairs", "fa-chair"],
// //         ["Office Storage", "fa-box"]
// //     ],
// //     "kids-room": [
// //         ["Kids Beds", "fa-bed"],
// //         ["Kids Tables", "fa-table"],
// //         ["Kids Chairs", "fa-chair"],
// //         ["Kids Storage", "fa-box"]
// //     ],
// //     "dining-room": [
// //         ["Dining Tables", "fa-table"],
// //         ["Dining Chairs", "fa-chair"],
// //         ["Dining Storage", "fa-box"]
// //     ],
// //     bathroom: [
// //         ["Bathroom Cabinets", "fa-box"],
// //         ["Bathroom Storage", "fa-box"]
// //     ],
// //     hallway: [
// //         ["Hallway Tables", "fa-table"],
// //         ["Hallway Storage", "fa-box"],
// //         ["Hallway Chairs", "fa-chair"]
// //     ],
// //     "public-space": [
// //         ["Sofas", "fa-couch"],
// //         ["Chairs", "fa-chair"],
// //         ["Tables", "fa-table"]
// //     ],
// //     decor: [
// //         ["Wall Decor", "fa-image"],
// //         ["Lamps", "fa-lightbulb"],
// //         ["Plants", "fa-leaf"],
// //         ["Rugs", "fa-rug"]
// //     ]
// // };

// // function openRoom(roomName) {
// //     const rooms = document.getElementById("rooms");
// //     const roomCategoryView = document.getElementById("roomCategoryView");
// //     const roomCategoryTitle = document.getElementById("roomCategoryTitle");
// //     const roomCategoryList = document.getElementById("roomCategoryList");

// //     if (!rooms || !roomCategoryView || !roomCategoryTitle || !roomCategoryList) {
// //         console.error("Room category elements not found.");
// //         return;
// //     }

// //     const categories = roomCategories[roomName];

// //     if (!categories) {
// //         console.error("Categories not found for:", roomName);
// //         return;
// //     }

// //     rooms.style.display = "none";
// //     roomCategoryView.style.display = "block";

// //     roomCategoryTitle.textContent =
// //         roomName
// //             .replace(/-/g, " ")
// //             .replace(/\b\w/g, function (letter) {
// //                 return letter.toUpperCase();
// //             });

// //     roomCategoryList.innerHTML = "";

// //     categories.forEach(function (category) {
// //         const categoryName = category[0];
// //         const categoryIcon = category[1];

// //         const item = document.createElement("div");
// //         item.className = "room-category-item";

// //         item.innerHTML = `
// //             <div class="room-category-icon">
// //                 <i class="fa-solid ${categoryIcon}"></i>
// //             </div>
// //             <span>${categoryName}</span>
// //             <i class="fa-solid fa-chevron-right"></i>
// //         `;

// //         item.addEventListener("click", function () {
// //             showFurniturePictures(roomName, categoryName);
// //         });

// //         roomCategoryList.appendChild(item);
// //     });
// // }

// // function backToRooms() {
// //     const rooms = document.getElementById("rooms");
// //     const roomCategoryView = document.getElementById("roomCategoryView");

// //     if (!rooms || !roomCategoryView) {
// //         console.error("Rooms view not found.");
// //         return;
// //     }

// //     roomCategoryView.style.display = "none";
// //     rooms.style.display = "block";
// // }

// // /* =========================================================
// //    CONSTRUCTION CATEGORY CLICK FIX + DRAG with imageSrc
// // ========================================================= */
// // (function () {
// //     function initConstructionCategoryClick() {
// //         const constructionSection = document.querySelector(".construction-section");
// //         if (!constructionSection) {
// //             console.error("ERROR: .construction-section not found");
// //             return;
// //         }

// //         const categoryViews = {
// //             "Doors": "constructionDoorsView",
// //             "Windows": "constructionWindowsView",
// //             "Stairs": "constructionStairsView",
// //             "Archs": "constructionArchsView",
// //             "Partition": "constructionPartitionView",
// //             "Roofs": "constructionRoofsView",
// //             "Fireplace": "constructionFireplaceView",
// //             "Column": "constructionColumnView",
// //             "Terrace": "constructionTerraceView",
// //             "Fences & Gates": "constructionFencesView"
// //         };

// //         const buttons = constructionSection.querySelectorAll(".construction-grid .build-option");

// //         console.log("Construction buttons found:", buttons.length);

// //         buttons.forEach(function (button) {
// //             const span = button.querySelector("span");
// //             if (!span) {
// //                 console.warn("Category button has no span:", button);
// //                 return;
// //             }

// //             const category = span.textContent.trim();
// //             console.log("Construction category detected:", category);

// //             button.removeAttribute("onclick");
// //             button.style.cursor = "pointer";

// //             button.addEventListener("click", function (event) {
// //                 event.preventDefault();
// //                 event.stopPropagation();

// //                 console.log("CLICKED:", category);

// //                 const viewId = categoryViews[category];

// //                 if (!viewId) {
// //                     console.error("No view mapped for:", category);
// //                     return;
// //                 }

// //                 const selectedView = document.getElementById(viewId);

// //                 if (!selectedView) {
// //                     console.error("View not found:", viewId);
// //                     return;
// //                 }

// //                 constructionSection.style.display = "none";

// //                 Object.values(categoryViews).forEach(function (id) {
// //                     const view = document.getElementById(id);
// //                     if (view) {
// //                         view.style.display = "none";
// //                         view.classList.remove("active");
// //                     }
// //                 });

// //                 selectedView.style.display = "block";
// //                 selectedView.classList.add("active");

// //                 selectedView.dataset.category = category;
// //                 window.currentConstructionCategory = category;

// //                 console.log("OPENED:", category, "->", viewId);

// //                 setupConstructionDragDrop(selectedView);
// //             }, true);
// //         });

// //         Object.values(categoryViews).forEach(function (viewId) {
// //             const view = document.getElementById(viewId);
// //             if (view) {
// //                 setupConstructionDragDrop(view);
// //             }
// //         });
// //     }

// //     function setupConstructionDragDrop(view) {
// //         if (!view) return;

// //         const cards = view.querySelectorAll(".furniture-card");

// //         cards.forEach(function (card) {
// //             card.setAttribute("draggable", "true");

// //             if (card.dataset.dragSetup === "true") {
// //                 return;
// //             }

// //             card.dataset.dragSetup = "true";

// //             card.addEventListener("dragstart", function (event) {
// //                 const model = card.dataset.model;
// //                 const type = card.dataset.type;
// //                 const category = view.dataset.category || window.currentConstructionCategory || "";
// //                 const img = card.querySelector('.furniture-thumbnail');
// //                 const imageSrc = img ? img.getAttribute('src') || '' : '';

// //                 const data = { type, model, category, source: "construction" };

// //                 window.selectedConstructionModel = model;
// //                 window.selectedConstructionType = type;
// //                 window.selectedConstructionCategory = category;
// //                 window.selectedFurnitureModel = model;
// //                 window.selectedFurnitureType = type;
// //                 window.currentDraggedConstruction = data;

// //                 event.dataTransfer.effectAllowed = "copy";
// //                 event.dataTransfer.setData("text/plain", JSON.stringify(data));
// //                 event.dataTransfer.setData("application/json", JSON.stringify(data));
// //                 event.dataTransfer.setData("model", model || "");
// //                 event.dataTransfer.setData("type", type || "");
// //                 event.dataTransfer.setData("imageSrc", imageSrc); // important

// //                 console.log("DRAGGING Construction:", data);
// //             });
// //         });

// //         // Setup images for construction cards
// //         setupFurnitureCardImages(view);
// //     }

// //     window.backToConstruction = function () {
// //         const constructionSection = document.querySelector(".construction-section");

// //         if (constructionSection) {
// //             constructionSection.style.display = "block";
// //         }

// //         document.querySelectorAll(".subcategory-view").forEach(function (view) {
// //             if (view.id && view.id.indexOf("construction") === 0) {
// //                 view.style.display = "none";
// //                 view.classList.remove("active");
// //             }
// //         });

// //         window.currentConstructionCategory = null;
// //     };

// //     if (document.readyState === "loading") {
// //         document.addEventListener("DOMContentLoaded", initConstructionCategoryClick);
// //     } else {
// //         initConstructionCategoryClick();
// //     }
// // })();

// // /* =========================================================
// //    OUTDOOR CATEGORY SYSTEM + DRAG with imageSrc
// // ========================================================= */
// // (function () {
// //     "use strict";

// //     const outdoorViews = {
// //         "Path and Lawns": "outdoorPathLawnsView",
// //         "Patio": "outdoorPatioView",
// //         "Trees and Plants": "outdoorTreesView",
// //         "Garage": "outdoorGarageView",
// //         "Pool": "outdoorPoolView",
// //         "Lighting": "outdoorLightingView",
// //         "Outdoor Activities": "outdoorActivitiesView",
// //         "Garden": "outdoorGardenView"
// //     };

// //     window.openOutdoorCategory = function (category) {
// //         console.log("Outdoor category:", category);

// //         const outdoorPanel = document.getElementById("outdoorPanel");
// //         const viewId = outdoorViews[category];

// //         if (!viewId) {
// //             console.error("Outdoor category not found:", category);
// //             return;
// //         }

// //         const selectedView = document.getElementById(viewId);

// //         if (!selectedView) {
// //             console.error("Outdoor view not found:", viewId);
// //             return;
// //         }

// //         if (outdoorPanel) {
// //             outdoorPanel.style.display = "none";
// //         }

// //         Object.values(outdoorViews).forEach(function (id) {
// //             const view = document.getElementById(id);
// //             if (view) {
// //                 view.style.display = "none";
// //                 view.classList.remove("active");
// //             }
// //         });

// //         selectedView.style.display = "block";
// //         selectedView.classList.add("active");

// //         selectedView.dataset.category = category;
// //         window.currentOutdoorCategory = category;

// //         addOutdoorBackButton(selectedView);
// //         setupOutdoorCards(selectedView);
// //     };

// //     function initializeOutdoorCategories() {
// //         const outdoorPanel = document.getElementById("outdoorPanel");

// //         if (!outdoorPanel) {
// //             console.warn("#outdoorPanel not found");
// //             return;
// //         }

// //         const buttons = outdoorPanel.querySelectorAll(".build-option");

// //         console.log("Outdoor categories found:", buttons.length);

// //         buttons.forEach(function (button) {
// //             const span = button.querySelector("span");

// //             if (!span) return;

// //             const category = span.textContent.trim();

// //             button.style.cursor = "pointer";
// //             button.removeAttribute("onclick");

// //             button.addEventListener("click", function (event) {
// //                 event.preventDefault();
// //                 event.stopPropagation();

// //                 openOutdoorCategory(category);
// //             }, true);
// //         });
// //     }

// //     function addOutdoorBackButton(view) {
// //         if (!view) return;

// //         const heading = view.querySelector(".subcategory-heading");

// //         if (!heading) return;

// //         if (heading.querySelector(".outdoor-back-button")) {
// //             return;
// //         }

// //         const button = document.createElement("button");
// //         button.type = "button";
// //         button.className = "outdoor-back-button";
// //         button.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';

// //         button.addEventListener("click", function (event) {
// //             event.preventDefault();
// //             event.stopPropagation();

// //             closeOutdoorCategory();
// //         });

// //         heading.prepend(button);
// //     }

// //     window.closeOutdoorCategory = function () {
// //         Object.values(outdoorViews).forEach(function (id) {
// //             const view = document.getElementById(id);
// //             if (view) {
// //                 view.style.display = "none";
// //                 view.classList.remove("active");
// //             }
// //         });

// //         const outdoorPanel = document.getElementById("outdoorPanel");
// //         if (outdoorPanel) {
// //             outdoorPanel.style.display = "block";
// //         }

// //         window.currentOutdoorCategory = null;
// //     };

// //     function setupOutdoorCards(view) {
// //         if (!view) return;

// //         const cards = view.querySelectorAll(".furniture-card");

// //         cards.forEach(function (card) {
// //             card.setAttribute("draggable", "true");

// //             if (card.dataset.outdoorReady === "true") {
// //                 return;
// //             }

// //             card.dataset.outdoorReady = "true";

// //             card.addEventListener("dragstart", function (event) {
// //                 const model = card.getAttribute("data-model");
// //                 const type = card.getAttribute("data-type");
// //                 const category = view.dataset.category || window.currentOutdoorCategory || "";
// //                 const img = card.querySelector('.furniture-thumbnail');
// //                 const imageSrc = img ? img.getAttribute('src') || '' : '';

// //                 const itemData = { type, model, category, source: "outdoor" };

// //                 window.selectedOutdoorModel = model;
// //                 window.selectedOutdoorType = type;
// //                 window.selectedOutdoorCategory = category;
// //                 window.selectedFurnitureModel = model;
// //                 window.selectedFurnitureType = type;
// //                 window.currentDraggedOutdoor = itemData;

// //                 if (event.dataTransfer) {
// //                     event.dataTransfer.effectAllowed = "copy";
// //                     event.dataTransfer.setData("text/plain", JSON.stringify(itemData));
// //                     event.dataTransfer.setData("application/json", JSON.stringify(itemData));
// //                     event.dataTransfer.setData("model", model || "");
// //                     event.dataTransfer.setData("type", type || "");
// //                     event.dataTransfer.setData("imageSrc", imageSrc); // important
// //                 }

// //                 console.log("Outdoor item dragging:", itemData);
// //             });
// //         });

// //         // Setup images for outdoor cards
// //         setupFurnitureCardImages(view);
// //     }

// //     function initializeOutdoorCards() {
// //         Object.values(outdoorViews).forEach(function (viewId) {
// //             const view = document.getElementById(viewId);
// //             if (view) {
// //                 setupOutdoorCards(view);
// //             }
// //         });
// //     }

// //     function initializeOutdoorSystem() {
// //         initializeOutdoorCategories();
// //         initializeOutdoorCards();
// //         console.log("Outdoor system initialized.");
// //     }

// //     if (document.readyState === "loading") {
// //         document.addEventListener("DOMContentLoaded", initializeOutdoorSystem);
// //     } else {
// //         initializeOutdoorSystem();
// //     }
// // })();

// // /* =========================================================
// //    CONSTRUCTION BACK BUTTON
// // ========================================================= */
// // function closeConstructionCategory() {
// //     console.log("Construction Back clicked");

// //     const constructionViews = [
// //         "constructionDoorsView",
// //         "constructionWindowsView",
// //         "constructionStairsView",
// //         "constructionArchsView",
// //         "constructionPartitionView",
// //         "constructionRoofsView",
// //         "constructionFireplaceView",
// //         "constructionColumnView",
// //         "constructionTerraceView",
// //         "constructionFencesView"
// //     ];

// //     constructionViews.forEach(function (viewId) {
// //         const view = document.getElementById(viewId);
// //         if (view) {
// //             view.style.display = "none";
// //             view.classList.remove("active");
// //         }
// //     });

// //     const constructionSection = document.querySelector(".construction-section");
// //     if (constructionSection) {
// //         constructionSection.style.display = "block";
// //     }

// //     window.currentConstructionCategory = null;
// //     window.selectedConstructionModel = null;
// //     window.selectedConstructionType = null;

// //     console.log("Back to Construction categories");
// // }

// // /* =====================================================
// //    ROOM + WALL SELECTION SYSTEM
// // ===================================================== */
// // const propertiesBar = document.getElementById("propertiesBar");
// // const selectionToolbar = document.getElementById("selectionToolbar");
// // const roomSelectionBox = document.getElementById("roomSelectionBox");
// // const roomElement = document.getElementById("room");
// // const actionMove = document.getElementById("actionMove");
// // const actionRotate = document.getElementById("actionRotate");
// // const actionDuplicate = document.getElementById("actionDuplicate");
// // const actionDelete = document.getElementById("actionDelete");

// // let currentSelectionType = null;
// // let currentWallObject = null;

// // function hideSelectionUI() {
// //     if (propertiesBar) {
// //         propertiesBar.classList.remove("room-properties-visible");
// //     }
// //     if (selectionToolbar) {
// //         selectionToolbar.style.display = "none";
// //     }
// //     if (roomSelectionBox) {
// //         roomSelectionBox.style.display = "none";
// //     }
// //     if (roomElement) {
// //         roomElement.classList.remove("room-selected");
// //     }
// //     removeWallHighlight();
// //     currentSelectionType = null;
// //     currentWallObject = null;
// // }

// // function showRoomPropertiesOnly() {
// //     if (!propertiesBar) return;

// //     propertiesBar.classList.add("room-properties-visible");

// //     if (widthInput) {
// //         widthInput.value = roomData.width + " cm";
// //     }
// //     if (depthInput) {
// //         depthInput.value = roomData.depth + " cm";
// //     }
// //     if (heightInput) {
// //         heightInput.value = roomData.height + " cm";
// //     }
// //     if (angleInput) {
// //         angleInput.value = roomData.angle + "°";
// //     }
// //     if (elevationInput) {
// //         elevationInput.value = roomData.elevation + " cm";
// //     }
// // }

// // function updateRoomSelectionBox() {
// //     if (!roomElement || !roomSelectionBox) {
// //         return;
// //     }

// //     const rect = roomElement.getBoundingClientRect();

// //     roomSelectionBox.style.display = "block";
// //     roomSelectionBox.style.left = rect.left + "px";
// //     roomSelectionBox.style.top = rect.top + "px";
// //     roomSelectionBox.style.width = rect.width + "px";
// //     roomSelectionBox.style.height = rect.height + "px";
// // }

// // function positionToolbar(left, top) {
// //     if (!selectionToolbar) return;

// //     selectionToolbar.style.display = "flex";
// //     selectionToolbar.style.left = left + "px";
// //     selectionToolbar.style.top = top + "px";
// // }

// // function selectCompleteRoom() {
// //     hideSelectionUI();

// //     currentSelectionType = "room";

// //     if (roomElement) {
// //         roomElement.classList.add("room-selected");
// //     }

// //     if (canvas) {
// //         canvas.discardActiveObject();
// //         canvas.renderAll();
// //     }

// //     showRoomPropertiesOnly();

// //     requestAnimationFrame(function () {
// //         updateRoomSelectionBox();

// //         const rect = roomElement.getBoundingClientRect();

// //         positionToolbar(
// //             rect.left + rect.width / 2 - 90,
// //             rect.top - 55
// //         );
// //     });
// // }

// // if (roomElement) {
// //     roomElement.addEventListener("click", function (event) {
// //         event.stopPropagation();
// //         selectCompleteRoom();
// //     });
// // }

// // let wallHighlight = null;

// // function createWallHighlight() {
// //     if (wallHighlight) return;

// //     wallHighlight = document.createElement("div");
// //     wallHighlight.className = "wall-selected-highlight";
// //     document.body.appendChild(wallHighlight);
// // }

// // function removeWallHighlight() {
// //     if (wallHighlight) {
// //         wallHighlight.remove();
// //         wallHighlight = null;
// //     }
// // }

// // function selectWall(object) {
// //     hideSelectionUI();

// //     currentSelectionType = "wall";
// //     currentWallObject = object;

// //     createWallHighlight();

// //     const rect = object.getBoundingRect();
// //     const canvasRect = canvas.upperCanvasEl.getBoundingClientRect();
// //     const left = canvasRect.left + rect.left;
// //     const top = canvasRect.top + rect.top;

// //     wallHighlight.style.left = left + "px";
// //     wallHighlight.style.top = top + "px";
// //     wallHighlight.style.width = rect.width + "px";
// //     wallHighlight.style.height = rect.height + "px";

// //     positionToolbar(
// //         left + rect.width / 2 - 90,
// //         Math.max(10, top - 55)
// //     );

// //     if (propertiesBar) {
// //         propertiesBar.classList.remove("room-properties-visible");
// //     }
// // }

// // canvas.on("selection:created", function (event) {
// //     const object = event.selected && event.selected[0];

// //     if (!object) return;

// //     if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
// //         selectWall(object);
// //         return;
// //     }

// //     if (object.itemType === "RoomShape" || object.isRoomShape === true) {
// //         selectCompleteRoom();
// //         return;
// //     }

// //     hideSelectionUI();
// //     currentSelectionType = "furniture";
// //     updateFurnitureProperties(object);
// // });

// // canvas.on("selection:updated", function (event) {
// //     const object = event.selected && event.selected[0];

// //     if (!object) return;

// //     if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
// //         selectWall(object);
// //         return;
// //     }

// //     if (object.itemType === "RoomShape" || object.isRoomShape === true) {
// //         selectCompleteRoom();
// //         return;
// //     }

// //     hideSelectionUI();
// //     currentSelectionType = "furniture";
// //     updateFurnitureProperties(object);
// // });

// // canvas.on("selection:cleared", function () {
// //     if (currentSelectionType !== "room") {
// //         hideSelectionUI();
// //     }
// // });

// // function updateFurnitureProperties(object) {
// //     if (widthInput) {
// //         widthInput.value = Math.round(object.getScaledWidth()) + " cm";
// //     }
// //     if (depthInput) {
// //         depthInput.value = Math.round(object.getScaledHeight()) + " cm";
// //     }
// //     if (heightInput) {
// //         heightInput.value = object.objectHeight || "65 cm";
// //     }
// //     if (angleInput) {
// //         angleInput.value = Math.round(object.angle || 0) + "°";
// //     }
// //     if (elevationInput) {
// //         elevationInput.value = object.elevation || "0 cm";
// //     }

// //     if (propertiesBar) {
// //         propertiesBar.classList.add("room-properties-visible");
// //     }
// // }

// // if (actionMove) {
// //     actionMove.addEventListener("click", function (event) {
// //         event.stopPropagation();

// //         if (currentSelectionType === "room") {
// //             roomElement.style.cursor = "move";
// //             return;
// //         }

// //         if (currentSelectionType === "wall" && currentWallObject) {
// //             canvas.setActiveObject(currentWallObject);
// //             currentWallObject.set({
// //                 selectable: true,
// //                 evented: true
// //             });
// //             canvas.renderAll();
// //         }
// //     });
// // }

// // if (actionRotate) {
// //     actionRotate.addEventListener("click", function (event) {
// //         event.stopPropagation();

// //         if (currentSelectionType === "room") {
// //             roomData.angle = (roomData.angle + 90) % 360;
// //             updateRoom();
// //             sendRoomDataTo3D();
// //             updateRoomSelectionBox();
// //             return;
// //         }

// //         if (currentWallObject) {
// //             currentWallObject.rotate((currentWallObject.angle || 0) + 90);
// //             currentWallObject.setCoords();
// //             canvas.renderAll();
// //         }
// //     });
// // }

// // if (actionDuplicate) {
// //     actionDuplicate.addEventListener("click", function (event) {
// //         event.stopPropagation();

// //         if (currentSelectionType === "wall" && currentWallObject) {
// //             currentWallObject.clone(function (cloned) {
// //                 cloned.set({
// //                     left: (cloned.left || 0) + 20,
// //                     top: (cloned.top || 0) + 20
// //                 });
// //                 canvas.add(cloned);
// //                 canvas.setActiveObject(cloned);
// //                 canvas.renderAll();
// //             });
// //             return;
// //         }

// //         const activeObject = canvas.getActiveObject();
// //         if (activeObject && currentSelectionType === "furniture") {
// //             activeObject.clone(function (cloned) {
// //                 cloned.set({
// //                     left: (cloned.left || 0) + 20,
// //                     top: (cloned.top || 0) + 20
// //                 });
// //                 canvas.add(cloned);
// //                 canvas.setActiveObject(cloned);
// //                 canvas.renderAll();
// //             });
// //         }
// //     });
// // }

// // if (actionDelete) {
// //     actionDelete.addEventListener("click", function (event) {
// //         event.stopPropagation();

// //         if (currentSelectionType === "wall" && currentWallObject) {
// //             canvas.remove(currentWallObject);
// //             canvas.discardActiveObject();
// //             canvas.renderAll();
// //             removeWallHighlight();
// //             sendWallsTo3D();
// //             hideSelectionUI();
// //             return;
// //         }

// //         const activeObject = canvas.getActiveObject();
// //         if (activeObject && currentSelectionType === "furniture") {
// //             canvas.remove(activeObject);
// //             canvas.discardActiveObject();
// //             canvas.renderAll();
// //             hideSelectionUI();
// //         }

// //         if (currentSelectionType === "room") {
// //             console.log("Room cannot be deleted.");
// //         }
// //     });
// // }

// // const bottomDelete = document.getElementById("deleteFurniture");

// // if (bottomDelete) {
// //     bottomDelete.addEventListener("click", function (event) {
// //         event.stopPropagation();

// //         if (currentSelectionType === "wall" && currentWallObject) {
// //             canvas.remove(currentWallObject);
// //             canvas.discardActiveObject();
// //             canvas.renderAll();
// //             sendWallsTo3D();
// //             hideSelectionUI();
// //             return;
// //         }

// //         const object = canvas.getActiveObject();
// //         if (object && currentSelectionType === "furniture") {
// //             canvas.remove(object);
// //             canvas.discardActiveObject();
// //             canvas.renderAll();
// //             hideSelectionUI();
// //         }
// //     });
// // }

// // canvas.on("mouse:down", function (event) {
// //     if (!event.target) {
// //         hideSelectionUI();
// //     }
// // });

// // window.addEventListener("resize", function () {
// //     if (currentSelectionType === "room") {
// //         updateRoomSelectionBox();
// //     }
// // });

// // function refreshRoomSelection() {
// //     if (currentSelectionType === "room") {
// //         updateRoomSelectionBox();
// //         showRoomPropertiesOnly();
// //     }
// // }

// // /* =========================================================
// //    ROOM & WALL SELECTION (INDEPENDENT SYSTEM)
// // ========================================================= */
// // (function () {
// //     "use strict";

// //     const roomEl = document.getElementById('room');
// //     const canvasEl = canvas;

// //     if (!roomEl || !canvasEl) {
// //         console.warn('Room or Canvas not found');
// //         return;
// //     }

// //     let isRoomSelected = false;
// //     let selectedWall = null;
// //     let wallHighlightDiv = null;
// //     let wallIconDiv = null;
// //     let roomBadge = null;

// //     function getAllWalls() {
// //         return canvasEl.getObjects().filter(obj => {
// //             return obj.itemType === 'Wall' ||
// //                 obj.itemType === 'RoomShape' ||
// //                 obj.type === 'line' ||
// //                 obj.isWall === true;
// //         });
// //     }

// //     function setWallColor(wall, color) {
// //         if (!wall) return;
// //         wall.set({ stroke: color });
// //         wall.setCoords();
// //     }

// //     function resetWallColor(wall) {
// //         setWallColor(wall, '#586a6d');
// //     }

// //     function highlightWall(wall) {
// //         setWallColor(wall, '#00cc44');
// //     }

// //     function resetAllWalls() {
// //         getAllWalls().forEach(w => resetWallColor(w));
// //         canvasEl.renderAll();
// //     }

// //     function distToSegment(px, py, x1, y1, x2, y2) {
// //         const dx = x2 - x1;
// //         const dy = y2 - y1;
// //         const lenSq = dx * dx + dy * dy;
// //         if (lenSq === 0) {
// //             return Math.hypot(px - x1, py - y1);
// //         }
// //         let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
// //         t = Math.max(0, Math.min(1, t));
// //         const nearX = x1 + t * dx;
// //         const nearY = y1 + t * dy;
// //         return Math.hypot(px - nearX, py - nearY);
// //     }

// //     function findWallAtPointer(e) {
// //         const pointer = canvasEl.getPointer(e);
// //         const walls = getAllWalls();
// //         const threshold = 15;

// //         for (let i = walls.length - 1; i >= 0; i--) {
// //             const wall = walls[i];
// //             let x1, y1, x2, y2;
// //             if (wall.type === 'line') {
// //                 x1 = wall.x1;
// //                 y1 = wall.y1;
// //                 x2 = wall.x2;
// //                 y2 = wall.y2;
// //             } else {
// //                 const rect = wall.getBoundingRect();
// //                 x1 = rect.left;
// //                 y1 = rect.top;
// //                 x2 = rect.left + rect.width;
// //                 y2 = rect.top + rect.height;
// //             }
// //             const dist = distToSegment(pointer.x, pointer.y, x1, y1, x2, y2);
// //             if (dist < threshold) {
// //                 return wall;
// //             }
// //         }
// //         return null;
// //     }

// //     function clearSelectionUI() {
// //         if (roomBadge) {
// //             roomBadge.remove();
// //             roomBadge = null;
// //         }
// //         roomEl.classList.remove('room-selected');
// //         isRoomSelected = false;

// //         if (wallHighlightDiv) {
// //             wallHighlightDiv.remove();
// //             wallHighlightDiv = null;
// //         }
// //         if (wallIconDiv) {
// //             wallIconDiv.remove();
// //             wallIconDiv = null;
// //         }
// //         if (selectedWall) {
// //             resetWallColor(selectedWall);
// //             selectedWall = null;
// //         }
// //         resetAllWalls();
// //         canvasEl.renderAll();
// //     }

// //     function showWallUI(wall) {
// //         if (wallHighlightDiv) wallHighlightDiv.remove();
// //         if (wallIconDiv) wallIconDiv.remove();

// //         const rect = wall.getBoundingRect();
// //         const canvasRect = canvasEl.upperCanvasEl.getBoundingClientRect();
// //         const left = canvasRect.left + rect.left;
// //         const top = canvasRect.top + rect.top;
// //         const width = rect.width || 20;
// //         const height = rect.height || 20;

// //         wallHighlightDiv = document.createElement('div');
// //         wallHighlightDiv.className = 'wall-selected-highlight';
// //         wallHighlightDiv.style.left = (left - 4) + 'px';
// //         wallHighlightDiv.style.top = (top - 4) + 'px';
// //         wallHighlightDiv.style.width = (width + 8) + 'px';
// //         wallHighlightDiv.style.height = (height + 8) + 'px';
// //         document.body.appendChild(wallHighlightDiv);

// //         wallIconDiv = document.createElement('div');
// //         wallIconDiv.className = 'wall-selection-icon';
// //         wallIconDiv.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
// //         wallIconDiv.style.left = (left + width + 4) + 'px';
// //         wallIconDiv.style.top = (top - 14) + 'px';
// //         document.body.appendChild(wallIconDiv);
// //     }

// //     function selectWall(wall) {
// //         if (isRoomSelected) {
// //             clearSelectionUI();
// //         }

// //         if (selectedWall === wall) {
// //             resetWallColor(wall);
// //             selectedWall = null;
// //             if (wallHighlightDiv) wallHighlightDiv.remove();
// //             if (wallIconDiv) wallIconDiv.remove();
// //             wallHighlightDiv = null;
// //             wallIconDiv = null;
// //             canvasEl.renderAll();
// //             return;
// //         }

// //         if (selectedWall) {
// //             resetWallColor(selectedWall);
// //         }

// //         selectedWall = wall;
// //         highlightWall(wall);
// //         showWallUI(wall);
// //         canvasEl.renderAll();
// //     }

// //     function selectRoom() {
// //         if (selectedWall) {
// //             resetWallColor(selectedWall);
// //             selectedWall = null;
// //             if (wallHighlightDiv) wallHighlightDiv.remove();
// //             if (wallIconDiv) wallIconDiv.remove();
// //             wallHighlightDiv = null;
// //             wallIconDiv = null;
// //         }

// //         isRoomSelected = !isRoomSelected;

// //         if (isRoomSelected) {
// //             getAllWalls().forEach(w => highlightWall(w));
// //             canvasEl.renderAll();

// //             if (!roomBadge) {
// //                 roomBadge = document.createElement('div');
// //                 roomBadge.className = 'room-selection-badge';
// //                 roomBadge.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Room Selected';
// //                 roomEl.style.position = 'relative';
// //                 roomEl.appendChild(roomBadge);
// //             }
// //             roomEl.classList.add('room-selected');
// //         } else {
// //             resetAllWalls();
// //             canvasEl.renderAll();
// //             if (roomBadge) {
// //                 roomBadge.remove();
// //                 roomBadge = null;
// //             }
// //             roomEl.classList.remove('room-selected');
// //         }
// //     }

// //     roomEl.addEventListener('click', function (e) {
// //         if (e.target.closest('.room-selection-badge') ||
// //             e.target.closest('.wall-selection-icon')) {
// //             return;
// //         }
// //         e.stopPropagation();
// //         selectRoom();
// //     }, true);

// //     canvasEl.on('mouse:down', function (opt) {
// //         const e = opt.e;
// //         const target = opt.target;

// //         if (target && target.itemType &&
// //             target.itemType !== 'Wall' &&
// //             target.itemType !== 'RoomShape' &&
// //             target.type !== 'line') {
// //             clearSelectionUI();
// //             return;
// //         }

// //         const wall = findWallAtPointer(e);
// //         if (wall) {
// //             e.stopPropagation && e.stopPropagation();
// //             selectWall(wall);
// //         } else {
// //             clearSelectionUI();
// //         }
// //     });

// //     let resizeTimer;
// //     window.addEventListener('resize', function () {
// //         clearTimeout(resizeTimer);
// //         resizeTimer = setTimeout(() => {
// //             if (selectedWall) {
// //                 showWallUI(selectedWall);
// //             }
// //         }, 100);
// //     });

// //     clearSelectionUI();
// //     console.log('✅ Room & Wall Selection (Independent) loaded successfully!');
// // })();

// // // ============================================================
// // //  UNDO / REDO SYSTEM
// // // ============================================================
// // (function () {
// //     "use strict";

// //     const MAX_HISTORY = 50;
// //     let undoStack = [];
// //     let redoStack = [];
// //     let isRestoring = false;

// //     function saveState() {
// //         if (isRestoring) return;

// //         const json = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
// //         if (undoStack.length > 0) {
// //             const last = undoStack[undoStack.length - 1];
// //             if (JSON.stringify(last) === JSON.stringify(json)) {
// //                 return;
// //             }
// //         }
// //         undoStack.push(json);
// //         if (undoStack.length > MAX_HISTORY) {
// //             undoStack.shift();
// //         }
// //         redoStack = [];
// //         updateUndoRedoButtons();
// //     }

// //     function undo() {
// //         if (undoStack.length <= 1) {
// //             console.log('Nothing to undo');
// //             return;
// //         }
// //         const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
// //         redoStack.push(current);

// //         const target = undoStack[undoStack.length - 2];
// //         if (!target) return;

// //         isRestoring = true;
// //         canvas.clear();
// //         canvas.loadFromJSON(target, function () {
// //             canvas.renderAll();
// //             isRestoring = false;
// //             if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
// //             if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
// //             updateUndoRedoButtons();
// //         });
// //     }

// //     function redo() {
// //         if (redoStack.length === 0) {
// //             console.log('Nothing to redo');
// //             return;
// //         }
// //         const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
// //         undoStack.push(current);

// //         const next = redoStack.pop();
// //         isRestoring = true;
// //         canvas.clear();
// //         canvas.loadFromJSON(next, function () {
// //             canvas.renderAll();
// //             isRestoring = false;
// //             if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
// //             if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
// //             updateUndoRedoButtons();
// //         });
// //     }

// //     function updateUndoRedoButtons() {
// //         const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
// //         const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
// //         if (undoBtn) {
// //             undoBtn.style.opacity = (undoStack.length > 1) ? '1' : '0.4';
// //             undoBtn.style.pointerEvents = (undoStack.length > 1) ? 'auto' : 'none';
// //         }
// //         if (redoBtn) {
// //             redoBtn.style.opacity = (redoStack.length > 0) ? '1' : '0.4';
// //             redoBtn.style.pointerEvents = (redoStack.length > 0) ? 'auto' : 'none';
// //         }
// //     }

// //     canvas.on('object:added', saveState);
// //     canvas.on('object:modified', saveState);
// //     canvas.on('object:removed', saveState);

// //     setTimeout(function () {
// //         saveState();
// //         updateUndoRedoButtons();
// //     }, 100);

// //     window.undoAction = undo;
// //     window.redoAction = redo;
// //     window.saveCanvasState = saveState;

// //     document.addEventListener('DOMContentLoaded', function () {
// //         const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
// //         const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
// //         if (undoBtn) {
// //             undoBtn.addEventListener('click', function (e) {
// //                 e.preventDefault();
// //                 undo();
// //             });
// //         }
// //         if (redoBtn) {
// //             redoBtn.addEventListener('click', function (e) {
// //                 e.preventDefault();
// //                 redo();
// //             });
// //         }
// //         updateUndoRedoButtons();
// //     });
// // })();

// // /**
// //  * FURNITURE CATEGORY CLICK HANDLER
// //  * Makes all categories clickable and shows thumbnails.
// //  */
// // document.addEventListener('DOMContentLoaded', function () {
// //     const furnitureItems = document.querySelectorAll('.furniture-item');
// //     const categoriesDiv = document.getElementById('categories');
// //     const furniturePanel = document.getElementById('furniturePanel');
// //     const backBtn = document.getElementById('furnitureBackBtn');

// //     const VIEW_MAP = {
// //         'Armchairs': 'armchairsView',
// //         'Sofa': 'sofasView'
// //     };

// //     const DISPLAY_NAMES = {
// //         'Armchairs': 'Armchairs',
// //         'Sofa': 'Sofas',
// //         'Ottoman': 'Ottoman',
// //         'Bed': 'Beds',
// //         'Storage': 'Storage',
// //         'Table': 'Tables, chairs',
// //         'Office Desk': 'Office furniture',
// //         'Children Furniture': "Children's furniture",
// //         'Kitchen': 'Kitchen',
// //         'Bathroom': 'Bathroom'
// //     };

// //     const ICON_MAP = {
// //         'Armchairs': 'fa-chair',
// //         'Sofa': 'fa-couch',
// //         'Ottoman': 'fa-cube',
// //         'Bed': 'fa-bed',
// //         'Storage': 'fa-box',
// //         'Table': 'fa-table',
// //         'Office Desk': 'fa-desktop',
// //         'Children Furniture': 'fa-child',
// //         'Kitchen': 'fa-kitchen-set',
// //         'Bathroom': 'fa-bath'
// //     };

// //     const THUMB_COUNT = 12;

// //     function hideAllSubViews() {
// //         document.querySelectorAll('.subcategory-view').forEach(v => v.style.display = 'none');
// //         const dyn = document.getElementById('dynamicCategoryView');
// //         if (dyn) dyn.remove();
// //     }

// //     function showBuiltView(viewId) {
// //         hideAllSubViews();
// //         if (categoriesDiv) categoriesDiv.style.display = 'none';
// //         const view = document.getElementById(viewId);
// //         if (view) {
// //             view.style.display = 'block';
// //             setupFurnitureCardImages(view);
// //             return true;
// //         }
// //         return false;
// //     }

// //     function generateDynamicView(category) {
// //         const oldDyn = document.getElementById('dynamicCategoryView');
// //         if (oldDyn) oldDyn.remove();

// //         hideAllSubViews();
// //         if (categoriesDiv) categoriesDiv.style.display = 'none';

// //         const view = document.createElement('div');
// //         view.id = 'dynamicCategoryView';
// //         view.className = 'subcategory-view';
// //         view.style.display = 'block';

// //         const heading = document.createElement('div');
// //         heading.className = 'subcategory-heading';
// //         heading.innerHTML = `<span>${DISPLAY_NAMES[category] || category}</span>`;
// //         view.appendChild(heading);

// //         const grid = document.createElement('div');
// //         grid.className = 'furniture-grid';

// //         const iconClass = ICON_MAP[category] || 'fa-cube';
// //         const displayName = DISPLAY_NAMES[category] || category;
// //         const folder = category.toLowerCase().replace(/\s/g, '');

// //         for (let i = 1; i <= THUMB_COUNT; i++) {
// //             const card = document.createElement('div');
// //             card.className = 'furniture-card';
// //             card.draggable = true;
// //             card.dataset.type = category;
// //             card.dataset.model = `models/${folder}/${folder}${i}.glb`;

// //             const imageDiv = document.createElement('div');
// //             imageDiv.className = 'card-image';

// //             const img = document.createElement('img');
// //             img.src = `models/${folder}/${folder}${i}.png`;
// //             img.alt = `${displayName} ${i}`;
// //             img.className = 'furniture-thumbnail';
// //             img.loading = 'lazy';

// //             // Use our enhanced image loader
// //             loadImageWithFallback(img, img.src, category, i);

// //             imageDiv.appendChild(img);

// //             const fallback = document.createElement('i');
// //             fallback.className = `fa-solid ${iconClass} thumbnail-fallback`;
// //             fallback.style.display = 'none';
// //             imageDiv.appendChild(fallback);

// //             card.appendChild(imageDiv);

// //             const nameSpan = document.createElement('div');
// //             nameSpan.className = 'card-name';
// //             nameSpan.textContent = `${displayName} ${i}`;
// //             card.appendChild(nameSpan);

// //             grid.appendChild(card);
// //         }

// //         view.appendChild(grid);

// //         const panel = furniturePanel || document.getElementById('furniturePanel');
// //         const lastView = panel.querySelector('.subcategory-view:last-of-type');
// //         if (lastView) {
// //             lastView.parentNode.insertBefore(view, lastView.nextSibling);
// //         } else {
// //             panel.appendChild(view);
// //         }

// //         setupFurnitureCardImages(view);
// //         return view;
// //     }

// //     function handleCategoryClick(category) {
// //         furnitureItems.forEach(el => el.classList.remove('active'));

// //         const target = Array.from(furnitureItems).find(
// //             el => (el.dataset.category || el.dataset.type) === category
// //         );
// //         if (target) target.classList.add('active');

// //         const viewId = VIEW_MAP[category];
// //         if (viewId) {
// //             showBuiltView(viewId);
// //             return;
// //         }

// //         generateDynamicView(category);
// //     }

// //     function goBackToCategories() {
// //         hideAllSubViews();
// //         if (categoriesDiv) categoriesDiv.style.display = 'block';
// //         furnitureItems.forEach(el => el.classList.remove('active'));
// //     }

// //     furnitureItems.forEach(item => {
// //         item.addEventListener('click', function (e) {
// //             e.stopPropagation();

// //             const category = this.dataset.category || this.dataset.type;
// //             if (!category) return;

// //             handleCategoryClick(category);
// //         });

// //         item.style.cursor = 'pointer';
// //         item.setAttribute('role', 'button');
// //         item.setAttribute('tabindex', '0');
// //         item.addEventListener('keydown', function (e) {
// //             if (e.key === 'Enter' || e.key === ' ') {
// //                 e.preventDefault();
// //                 this.click();
// //             }
// //         });
// //     });

// //     if (backBtn) {
// //         backBtn.addEventListener('click', function (e) {
// //             e.stopPropagation();
// //             goBackToCategories();
// //         });
// //     }

// //     console.log('✅ Furniture categories are now clickable!');
// // });
// /* =====================================================
//    DESIGN.JS
//    Home Interior Design Project
//    2D Fabric.js + 3D Three.js Integration

//    FIXES:
//    - All category images now load with proper fallbacks
//    - Consistent path handling for Furniture, Construction, Outdoor
//    - Placeholder generation for missing images
//    - Drag & drop works with all items (specific image per card)
//    - 3D sync for all objects
//    - NEW: 2D images are used as textures in 3D (no GLB needed)
// ===================================================== */

// // =====================================================
// // 3D IMAGE TEXTURE MODE (set false to use GLB models)
// // =====================================================
// window.USE_2D_IMAGE_IN_3D = true;  // true: use 2D image in 3D, false: load GLB model

// /* =====================================================
//    CREATE FABRIC CANVAS
// ===================================================== */
// const canvas = new fabric.Canvas("floorCanvas", {
//     selection: true,
//     preserveObjectStacking: true
// });

// /* =====================================================
//    ROOM & INPUT ELEMENTS
// ===================================================== */
// const room = document.getElementById("room");
// const widthInput = document.getElementById("objectWidth");
// const depthInput = document.getElementById("objectDepth");
// const heightInput = document.getElementById("objectHeight");
// const angleInput = document.getElementById("objectAngle");
// const elevationInput = document.getElementById("objectElevation");

// const topDimension = document.getElementById("topDimension");
// const bottomDimension = document.getElementById("bottomDimension");
// const leftDimension = document.getElementById("leftDimension");
// const rightDimension = document.getElementById("rightDimension");

// /* =====================================================
//    ROOM DATA
// ===================================================== */
// let roomData = {
//     width: 500,
//     depth: 300,
//     height: 280,
//     angle: 0,
//     elevation: 0
// };

// window.roomData = roomData;

// /* =====================================================
//    DRAWN WALL DATA
// ===================================================== */
// window.roomWallData = {
//     points: [],
//     walls: [],
//     closed: false,
//     shape: "custom"
// };

// /* =====================================================
//    NUMBER HELPER
// ===================================================== */
// function getNumber(value) {
//     return parseFloat(
//         String(value)
//             .replace("cm", "")
//             .replace("°", "")
//             .trim()
//     );
// }

// /* =====================================================
//    SEND ROOM DATA TO THREE.JS
// ===================================================== */
// function sendRoomDataTo3D() {
//     window.roomData = {
//         width: roomData.width,
//         depth: roomData.depth,
//         height: roomData.height,
//         angle: roomData.angle,
//         elevation: roomData.elevation
//     };

//     window.dispatchEvent(
//         new CustomEvent("roomDataUpdated", {
//             detail: window.roomData
//         })
//     );

//     if (typeof updateThreeRoom === "function") {
//         updateThreeRoom(window.roomData);
//     }
//     if (typeof update3DRoom === "function") {
//         update3DRoom(window.roomData);
//     }
//     if (typeof rebuildThreeRoom === "function") {
//         rebuildThreeRoom(window.roomData);
//     }
// }

// /* =====================================================
//    SEND WALL DATA TO THREE.JS
// ===================================================== */
// function sendWallsTo3D() {
//     const data = {
//         points: window.roomWallData.points,
//         walls: window.roomWallData.walls,
//         closed: window.roomWallData.closed,
//         shape: window.roomWallData.shape,
//         room: {
//             width: roomData.width,
//             depth: roomData.depth,
//             height: roomData.height
//         }
//     };

//     window.roomWallData = data;

//     window.dispatchEvent(
//         new CustomEvent("roomWallsUpdated", {
//             detail: data
//         })
//     );

//     if (typeof updateThreeWalls === "function") {
//         updateThreeWalls(data);
//     }
//     if (typeof createThreeWalls === "function") {
//         createThreeWalls(data);
//     }
//     if (typeof rebuildThreeWalls === "function") {
//         rebuildThreeWalls(data);
//     }
//     if (typeof update3DFromWalls === "function") {
//         update3DFromWalls(data);
//     }
// }

// /* =====================================================
//    UPDATE ROOM
// ===================================================== */
// function updateRoom() {
//     if (!room) {
//         sendRoomDataTo3D();
//         return;
//     }

//     room.style.width = roomData.width + "px";
//     room.style.height = roomData.depth + "px";
//     room.style.transform = "rotate(" + roomData.angle + "deg)";

//     canvas.setDimensions({
//         width: roomData.width,
//         height: roomData.depth
//     });

//     canvas.calcOffset();
//     canvas.renderAll();

//     if (widthInput) widthInput.value = roomData.width + " cm";
//     if (depthInput) depthInput.value = roomData.depth + " cm";
//     if (heightInput) heightInput.value = roomData.height + " cm";
//     if (angleInput) angleInput.value = roomData.angle + "°";
//     if (elevationInput) elevationInput.value = roomData.elevation + " cm";

//     const widthMeter = (roomData.width / 100).toFixed(1);
//     const depthMeter = (roomData.depth / 100).toFixed(1);

//     if (topDimension) topDimension.innerText = widthMeter + " m";
//     if (bottomDimension) bottomDimension.innerText = widthMeter + " m";
//     if (leftDimension) leftDimension.innerText = depthMeter + " m";
//     if (rightDimension) rightDimension.innerText = depthMeter + " m";

//     const area = (roomData.width / 100) * (roomData.depth / 100);
//     const label = room.querySelector(".label");

//     if (label) {
//         label.innerText = "Room (" + area.toFixed(1) + " m²)";
//     }

//     sendRoomDataTo3D();
// }

// /* =====================================================
//    ROOM INPUT LISTENERS
// ===================================================== */
// if (widthInput) {
//     widthInput.addEventListener("change", function () {
//         const val = getNumber(this.value);
//         if (!isNaN(val) && val > 0) {
//             roomData.width = val;
//         }
//         updateRoom();
//     });
// }

// if (depthInput) {
//     depthInput.addEventListener("change", function () {
//         const val = getNumber(this.value);
//         if (!isNaN(val) && val > 0) {
//             roomData.depth = val;
//         }
//         updateRoom();
//     });
// }

// if (heightInput) {
//     heightInput.addEventListener("change", function () {
//         const val = getNumber(this.value);
//         if (!isNaN(val) && val > 0) {
//             roomData.height = val;
//         }
//         updateRoom();
//     });
// }

// if (angleInput) {
//     angleInput.addEventListener("change", function () {
//         const val = getNumber(this.value);
//         if (!isNaN(val)) {
//             roomData.angle = val;
//         }
//         updateRoom();
//     });
// }

// if (elevationInput) {
//     elevationInput.addEventListener("change", function () {
//         const val = getNumber(this.value);
//         if (!isNaN(val) && val >= 0) {
//             roomData.elevation = val;
//         }
//         updateRoom();
//     });
// }

// updateRoom();

// /* =====================================================
//    IMAGE LOADER WITH PLACEHOLDER GENERATION
// ===================================================== */
// const categoryColors = {
//     'Armchair': '#d4a574',
//     'Armchairs': '#d4a574',
//     'Sofa': '#b8a08a',
//     'Sofas': '#b8a08a',
//     'Ottoman': '#c9b99a',
//     'Bed': '#a8b5c4',
//     'Beds': '#a8b5c4',
//     'Storage': '#b8a88a',
//     'Table': '#c4b8a0',
//     'Tables, chairs': '#c4b8a0',
//     'Office Desk': '#8a9a8a',
//     'Office furniture': '#8a9a8a',
//     'Children Furniture': '#f0c8b0',
//     "Children's furniture": '#f0c8b0',
//     'Kitchen': '#d4c8b0',
//     'Bathroom': '#a8d4d4',
//     'Door': '#8B7355',
//     'Doors': '#8B7355',
//     'Window': '#87CEEB',
//     'Windows': '#87CEEB',
//     'Stairs': '#A0A0A0',
//     'Arch': '#c4b0a0',
//     'Archs': '#c4b0a0',
//     'Partition': '#b8b8c0',
//     'Roof': '#8a7a6a',
//     'Roofs': '#8a7a6a',
//     'Fireplace': '#cc8866',
//     'Column': '#b0a898',
//     'Terrace': '#a8b89a',
//     'Fence': '#8a7a6a',
//     'Fences & Gates': '#8a7a6a',
//     'Path and Lawn': '#8aba7a',
//     'Path and Lawns': '#8aba7a',
//     'Patio': '#c4b89a',
//     'Tree and Plant': '#6aaa5a',
//     'Trees and Plants': '#6aaa5a',
//     'Garage': '#8a8a8a',
//     'Pool': '#6ac4d4',
//     'Outdoor Lighting': '#d4d480',
//     'Lighting': '#d4d480',
//     'Outdoor Activity': '#d4a86a',
//     'Outdoor Activities': '#d4a86a',
//     'Garden': '#6aaa5a'
// };

// function getCategoryColor(category) {
//     return categoryColors[category] || '#cccccc';
// }

// function generatePlaceholderImage(category, index, width = 120, height = 120) {
//     const canvasEl = document.createElement('canvas');
//     canvasEl.width = width;
//     canvasEl.height = height;
//     const ctx = canvasEl.getContext('2d');

//     const color = getCategoryColor(category);

//     // Background gradient
//     const grad = ctx.createLinearGradient(0, 0, width, height);
//     grad.addColorStop(0, color);
//     grad.addColorStop(1, darkenColor(color, 30));
//     ctx.fillStyle = grad;
//     ctx.fillRect(0, 0, width, height);

//     // Border
//     ctx.strokeStyle = 'rgba(255,255,255,0.3)';
//     ctx.lineWidth = 2;
//     ctx.strokeRect(2, 2, width - 4, height - 4);

//     // Icon
//     const iconMap = {
//         'Armchair': 'fa-chair',
//         'Armchairs': 'fa-chair',
//         'Sofa': 'fa-couch',
//         'Sofas': 'fa-couch',
//         'Ottoman': 'fa-cube',
//         'Bed': 'fa-bed',
//         'Beds': 'fa-bed',
//         'Storage': 'fa-box',
//         'Table': 'fa-table',
//         'Tables, chairs': 'fa-table',
//         'Office Desk': 'fa-desktop',
//         'Office furniture': 'fa-desktop',
//         'Children Furniture': 'fa-child',
//         "Children's furniture": 'fa-child',
//         'Kitchen': 'fa-kitchen-set',
//         'Bathroom': 'fa-bath',
//         'Door': 'fa-door-open',
//         'Doors': 'fa-door-open',
//         'Window': 'fa-window-maximize',
//         'Windows': 'fa-window-maximize',
//         'Stairs': 'fa-stairs',
//         'Arch': 'fa-archway',
//         'Archs': 'fa-archway',
//         'Partition': 'fa-table-columns',
//         'Roof': 'fa-house',
//         'Roofs': 'fa-house',
//         'Fireplace': 'fa-fire',
//         'Column': 'fa-building-columns',
//         'Terrace': 'fa-umbrella-beach',
//         'Fence': 'fa-fence',
//         'Fences & Gates': 'fa-fence',
//         'Path and Lawn': 'fa-road',
//         'Path and Lawns': 'fa-road',
//         'Patio': 'fa-umbrella-beach',
//         'Tree and Plant': 'fa-tree',
//         'Trees and Plants': 'fa-tree',
//         'Garage': 'fa-warehouse',
//         'Pool': 'fa-person-swimming',
//         'Outdoor Lighting': 'fa-lightbulb',
//         'Lighting': 'fa-lightbulb',
//         'Outdoor Activity': 'fa-volleyball',
//         'Outdoor Activities': 'fa-volleyball',
//         'Garden': 'fa-seedling'
//     };

//     const iconClass = iconMap[category] || 'fa-cube';

//     // Draw icon (simplified using canvas text as we can't load FontAwesome here)
//     ctx.fillStyle = 'rgba(255,255,255,0.25)';
//     ctx.font = '40px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText('🪑', width / 2, height / 2 - 10);

//     // Category name
//     ctx.fillStyle = 'rgba(255,255,255,0.9)';
//     ctx.font = 'bold 11px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'bottom';
//     const displayName = category.length > 12 ? category.substring(0, 10) + '…' : category;
//     ctx.fillText(displayName, width / 2, height - 8);

//     // Number
//     ctx.fillStyle = 'rgba(255,255,255,0.6)';
//     ctx.font = '9px Arial';
//     ctx.textBaseline = 'top';
//     ctx.fillText('#' + index, width / 2, 6);

//     return canvasEl.toDataURL('image/png');
// }

// function darkenColor(hex, amount) {
//     let c = hex.replace('#', '');
//     if (c.length === 3) {
//         c = c.split('').map(ch => ch + ch).join('');
//     }
//     let r = parseInt(c.substring(0, 2), 16);
//     let g = parseInt(c.substring(2, 4), 16);
//     let b = parseInt(c.substring(4, 6), 16);
//     r = Math.max(0, r - amount);
//     g = Math.max(0, g - amount);
//     b = Math.max(0, b - amount);
//     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
// }

// /* =====================================================
//    SMART IMAGE LOADER
// ===================================================== */
// function loadImageWithFallback(imgElement, src, category, index) {
//     if (!imgElement) return;

//     imgElement.crossOrigin = 'anonymous';
//     imgElement.loading = 'lazy';

//     const fallbackSrc = generatePlaceholderImage(category, index);

//     imgElement.src = src;
//     imgElement.onerror = function () {
//         this.style.display = 'none';
//         const fallbackIcon = this.nextElementSibling;
//         if (fallbackIcon) {
//             fallbackIcon.style.display = 'block';
//             // Use the placeholder as background if possible
//             this.style.display = 'block';
//             this.style.backgroundImage = `url(${fallbackSrc})`;
//             this.style.backgroundSize = 'cover';
//             this.style.backgroundPosition = 'center';
//             this.src = fallbackSrc;
//             this.onerror = null;
//         }
//     };

//     // Also handle if image loads successfully
//     imgElement.onload = function () {
//         this.style.display = 'block';
//         const fallbackIcon = this.nextElementSibling;
//         if (fallbackIcon) {
//             fallbackIcon.style.display = 'none';
//         }
//     };
// }

// /* =====================================================
//    FURNITURE ITEM IMAGE LOADING (for all categories)
// ===================================================== */
// function setupFurnitureCardImages(container) {
//     const cards = container.querySelectorAll('.furniture-card');
//     cards.forEach(function (card) {
//         const img = card.querySelector('.furniture-thumbnail');
//         if (!img) return;

//         const type = card.dataset.type || card.dataset.category || 'Furniture';
//         const alt = img.alt || type;
//         const src = img.getAttribute('src');

//         // Extract category and index from alt or src
//         let category = type;
//         let index = 1;

//         const altMatch = alt.match(/(.+?)\s*(\d+)$/);
//         if (altMatch) {
//             category = altMatch[1];
//             index = parseInt(altMatch[2]) || 1;
//         }

//         // Clean up category name
//         category = category.trim();

//         loadImageWithFallback(img, src, category, index);
//     });
// }

// /* =====================================================
//    DRAW WALLS
// ===================================================== */
// let isDrawingWallMode = false;
// let isDrawing = false;
// let activeLine = null;
// let activePoints = [];
// let currentWallGroup = null;

// const WALL_WIDTH = 10;

// function startWallDrawing() {
//     isDrawingWallMode = true;
//     isDrawing = false;
//     activePoints = [];
//     window.roomWallData = {
//         points: [],
//         walls: [],
//         closed: false,
//         shape: "custom"
//     };

//     canvas.defaultCursor = "crosshair";
//     canvas.selection = false;

//     canvas.forEachObject(function (obj) {
//         obj.selectable = false;
//     });

//     if (activeLine) {
//         canvas.remove(activeLine);
//         activeLine = null;
//     }

//     showDesignMessage(
//         "Draw Walls: Click points to create your room. Double-click or press Enter to finish."
//     );
// }

// function stopWallDrawing() {
//     isDrawingWallMode = false;
//     isDrawing = false;

//     if (activeLine) {
//         canvas.remove(activeLine);
//         activeLine = null;
//     }

//     canvas.defaultCursor = "default";
//     canvas.selection = true;

//     canvas.forEachObject(function (obj) {
//         obj.selectable = true;
//     });

//     canvas.renderAll();

//     sendWallsTo3D();
//     hideDesignMessage();
// }

// function toggleWallDrawing(enable) {
//     if (enable === undefined) {
//         enable = !isDrawingWallMode;
//     }

//     if (enable) {
//         startWallDrawing();
//     } else {
//         stopWallDrawing();
//     }
// }

// /* =====================================================
//    FABRIC MOUSE DOWN
// ===================================================== */
// canvas.on("mouse:down", function (o) {
//     if (!isDrawingWallMode) return;

//     const pointer = canvas.getPointer(o.e);

//     if (activePoints.length === 0) {
//         activePoints.push({
//             x: pointer.x,
//             y: pointer.y
//         });
//         isDrawing = true;

//         createTemporaryWall(
//             pointer.x,
//             pointer.y,
//             pointer.x,
//             pointer.y
//         );
//         return;
//     }

//     const previous = activePoints[activePoints.length - 1];
//     const newPoint = {
//         x: pointer.x,
//         y: pointer.y
//     };

//     activePoints.push(newPoint);

//     createPermanentWall(previous, newPoint);

//     window.roomWallData.walls.push({
//         x1: previous.x,
//         y1: previous.y,
//         x2: newPoint.x,
//         y2: newPoint.y
//     });

//     window.roomWallData.points = activePoints.map(function (p) {
//         return {
//             x: p.x,
//             y: p.y
//         };
//     });

//     sendWallsTo3D();

//     if (activeLine) {
//         canvas.remove(activeLine);
//     }

//     createTemporaryWall(
//         pointer.x,
//         pointer.y,
//         pointer.x,
//         pointer.y
//     );

//     canvas.renderAll();
// });

// function createPermanentWall(p1, p2) {
//     const wallLine = new fabric.Line(
//         [p1.x, p1.y, p2.x, p2.y],
//         {
//             stroke: "#586a6d",
//             strokeWidth: WALL_WIDTH,
//             strokeLineCap: "round",
//             selectable: false,
//             evented: false,
//             itemType: "Wall",
//             wallType: "room-wall"
//         }
//     );

//     canvas.add(wallLine);
// }

// function createTemporaryWall(x1, y1, x2, y2) {
//     if (activeLine) {
//         canvas.remove(activeLine);
//     }

//     activeLine = new fabric.Line(
//         [x1, y1, x2, y2],
//         {
//             stroke: "#198754",
//             strokeWidth: 6,
//             strokeDashArray: [5, 5],
//             selectable: false,
//             evented: false
//         }
//     );

//     canvas.add(activeLine);
// }

// canvas.on("mouse:move", function (o) {
//     if (!isDrawingWallMode || !isDrawing || !activeLine) {
//         return;
//     }

//     const pointer = canvas.getPointer(o.e);

//     activeLine.set({
//         x2: pointer.x,
//         y2: pointer.y
//     });

//     canvas.renderAll();
// });

// canvas.on("mouse:dblclick", function () {
//     if (!isDrawingWallMode) return;
//     finishWallDrawing();
// });

// function finishWallDrawing() {
//     if (activePoints.length < 2) {
//         stopWallDrawing();
//         return;
//     }

//     const first = activePoints[0];
//     const last = activePoints[activePoints.length - 1];

//     const distance = Math.sqrt(
//         Math.pow(first.x - last.x, 2) + Math.pow(first.y - last.y, 2)
//     );

//     if (distance > 15) {
//         createPermanentWall(last, first);

//         window.roomWallData.walls.push({
//             x1: last.x,
//             y1: last.y,
//             x2: first.x,
//             y2: first.y
//         });
//     }

//     window.roomWallData.points = activePoints.map(function (p) {
//         return {
//             x: p.x,
//             y: p.y
//         };
//     });

//     window.roomWallData.closed = true;
//     window.roomWallData.shape = "custom";

//     sendWallsTo3D();
//     canvas.renderAll();
//     stopWallDrawing();
// }

// document.addEventListener("keydown", function (e) {
//     if (!isDrawingWallMode) return;

//     if (e.key === "Escape") {
//         stopWallDrawing();
//     }

//     if (e.key === "Enter") {
//         finishWallDrawing();
//     }
// });

// function showDesignMessage(text) {
//     let message = document.getElementById("designMessage");

//     if (!message) {
//         message = document.createElement("div");
//         message.id = "designMessage";
//         message.style.position = "fixed";
//         message.style.left = "50%";
//         message.style.top = "75px";
//         message.style.transform = "translateX(-50%)";
//         message.style.background = "#198754";
//         message.style.color = "#fff";
//         message.style.padding = "10px 18px";
//         message.style.borderRadius = "8px";
//         message.style.zIndex = "999999";
//         message.style.fontSize = "13px";
//         message.style.boxShadow = "0 4px 15px rgba(0,0,0,.2)";

//         document.body.appendChild(message);
//     }

//     message.innerText = text;
//     message.style.display = "block";
// }

// function hideDesignMessage() {
//     const message = document.getElementById("designMessage");
//     if (message) {
//         message.style.display = "none";
//     }
// }

// /* =====================================================
//    ROOM SHAPES
// ===================================================== */
// function clearCanvasFurnitureAndWalls() {
//     const objects = canvas.getObjects();

//     objects.forEach(function (obj) {
//         if (obj.itemType === "Wall" || obj.itemType === "RoomShape") {
//             canvas.remove(obj);
//         }
//     });

//     activePoints = [];
//     window.roomWallData = {
//         points: [],
//         walls: [],
//         closed: false,
//         shape: "custom"
//     };
// }

// function createRoomShape(shape) {
//     clearCanvasFurnitureAndWalls();

//     const w = roomData.width;
//     const h = roomData.depth;
//     const cx = w / 2;
//     const cy = h / 2;

//     let points = [];

//     if (shape === "rectangle") {
//         points = [
//             { x: 40, y: 40 },
//             { x: w - 40, y: 40 },
//             { x: w - 40, y: h - 40 },
//             { x: 40, y: h - 40 }
//         ];
//     } else if (shape === "square") {
//         const size = Math.min(w, h) - 80;
//         const left = (w - size) / 2;
//         const top = (h - size) / 2;

//         points = [
//             { x: left, y: top },
//             { x: left + size, y: top },
//             { x: left + size, y: top + size },
//             { x: left, y: top + size }
//         ];
//     } else if (shape === "lshape") {
//         points = [
//             { x: 40, y: 40 },
//             { x: w - 40, y: 40 },
//             { x: w - 40, y: h * 0.55 },
//             { x: w * 0.60, y: h * 0.55 },
//             { x: w * 0.60, y: h - 40 },
//             { x: 40, y: h - 40 }
//         ];
//     } else if (shape === "tshape") {
//         points = [
//             { x: w * 0.30, y: 40 },
//             { x: w * 0.70, y: 40 },
//             { x: w * 0.70, y: h * 0.35 },
//             { x: w - 40, y: h * 0.35 },
//             { x: w - 40, y: h - 40 },
//             { x: 40, y: h - 40 },
//             { x: 40, y: h * 0.35 },
//             { x: w * 0.30, y: h * 0.35 }
//         ];
//     } else if (shape === "ushape") {
//         points = [
//             { x: 40, y: 40 },
//             { x: w - 40, y: 40 },
//             { x: w - 40, y: h - 40 },
//             { x: w * 0.65, y: h - 40 },
//             { x: w * 0.65, y: h * 0.45 },
//             { x: w * 0.35, y: h * 0.45 },
//             { x: w * 0.35, y: h - 40 },
//             { x: 40, y: h - 40 }
//         ];
//     } else {
//         return createRoomShape("rectangle");
//     }

//     for (let i = 0; i < points.length; i++) {
//         const p1 = points[i];
//         const p2 = points[(i + 1) % points.length];

//         const wall = new fabric.Line(
//             [p1.x, p1.y, p2.x, p2.y],
//             {
//                 stroke: "#586a6d",
//                 strokeWidth: WALL_WIDTH,
//                 strokeLineCap: "round",
//                 selectable: false,
//                 evented: false,
//                 itemType: "RoomShape",
//                 roomShape: shape
//             }
//         );

//         canvas.add(wall);
//     }

//     window.roomWallData = {
//         points: points,
//         walls: points.map(function (p, index) {
//             const next = points[(index + 1) % points.length];
//             return {
//                 x1: p.x,
//                 y1: p.y,
//                 x2: next.x,
//                 y2: next.y
//             };
//         }),
//         closed: true,
//         shape: shape
//     };

//     canvas.renderAll();

//     sendWallsTo3D();
//     showDesignMessage(
//         shape.toUpperCase() + " room created in 2D and sent to 3D."
//     );
//     setTimeout(hideDesignMessage, 1800);
// }

// function showRoomShapes() {
//     let panel = document.getElementById("roomShapesFloatingPanel");
//     if (panel) {
//         panel.remove();
//     }

//     panel = document.createElement("div");
//     panel.id = "roomShapesFloatingPanel";
//     panel.innerHTML = `
//         <div class="room-shapes-header">
//             <strong>Room Shapes</strong>
//             <button id="closeRoomShapes">×</button>
//         </div>
//         <div class="room-shapes-grid">
//             <button data-shape="rectangle"><span>▭</span>Rectangle</button>
//             <button data-shape="square"><span>□</span>Square</button>
//             <button data-shape="lshape"><span>⌞</span>L Shape</button>
//             <button data-shape="tshape"><span>⊤</span>T Shape</button>
//             <button data-shape="ushape"><span>∪</span>U Shape</button>
//         </div>
//     `;

//     document.body.appendChild(panel);

//     panel.querySelectorAll("[data-shape]").forEach(function (button) {
//         button.addEventListener("click", function () {
//             createRoomShape(this.dataset.shape);
//         });
//     });

//     document.getElementById("closeRoomShapes").addEventListener("click", function () {
//         panel.remove();
//     });

//     addRoomShapeStyles();
// }

// function addRoomShapeStyles() {
//     if (document.getElementById("roomShapeStyles")) {
//         return;
//     }

//     const style = document.createElement("style");
//     style.id = "roomShapeStyles";
//     style.innerHTML = `
//         #roomShapesFloatingPanel {
//             position: fixed;
//             left: 400px;
//             top: 100px;
//             width: 300px;
//             background: #fff;
//             border: 1px solid #ddd;
//             border-radius: 12px;
//             padding: 12px;
//             z-index: 99999;
//             box-shadow: 0 8px 30px rgba(0,0,0,.18);
//         }
//         .room-shapes-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 12px;
//         }
//         .room-shapes-header button {
//             border: none;
//             background: transparent;
//             font-size: 22px;
//             cursor: pointer;
//         }
//         .room-shapes-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 8px;
//         }
//         .room-shapes-grid button {
//             border: 1px solid #ddd;
//             background: #fff;
//             border-radius: 8px;
//             padding: 12px 6px;
//             cursor: pointer;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 5px;
//         }
//         .room-shapes-grid button:hover {
//             border-color: #198754;
//             color: #198754;
//             background: #f5fbf7;
//         }
//         .room-shapes-grid span {
//             font-size: 28px;
//         }
//     `;

//     document.head.appendChild(style);
// }

// /* =====================================================
//    FORMS
// ===================================================== */
// function showFormsPanel() {
//     let panel = document.getElementById("formsFloatingPanel");
//     if (panel) {
//         panel.remove();
//     }

//     panel = document.createElement("div");
//     panel.id = "formsFloatingPanel";
//     panel.innerHTML = `
//         <div class="forms-header">
//             <strong>Forms</strong>
//             <button id="closeForms">×</button>
//         </div>
//         <div class="forms-grid">
//             <button data-form="rectangle">▭ Rectangle</button>
//             <button data-form="circle">● Circle</button>
//             <button data-form="triangle">△ Triangle</button>
//             <button data-form="square">□ Square</button>
//         </div>
//     `;

//     document.body.appendChild(panel);

//     panel.querySelectorAll("[data-form]").forEach(function (button) {
//         button.addEventListener("click", function () {
//             createForm(this.dataset.form);
//         });
//     });

//     document.getElementById("closeForms").addEventListener("click", function () {
//         panel.remove();
//     });

//     addFormsStyles();
// }

// function createForm(type) {
//     let object;

//     if (type === "circle") {
//         object = new fabric.Circle({
//             radius: 40,
//             fill: "#9e9e9e",
//             left: roomData.width / 2,
//             top: roomData.depth / 2,
//             originX: "center",
//             originY: "center"
//         });
//     } else if (type === "triangle") {
//         object = new fabric.Triangle({
//             width: 80,
//             height: 80,
//             fill: "#9e9e9e",
//             left: roomData.width / 2,
//             top: roomData.depth / 2,
//             originX: "center",
//             originY: "center"
//         });
//     } else {
//         object = new fabric.Rect({
//             width: type === "square" ? 80 : 120,
//             height: type === "square" ? 80 : 60,
//             fill: "#9e9e9e",
//             stroke: "#555",
//             strokeWidth: 2,
//             rx: 6,
//             ry: 6,
//             left: roomData.width / 2,
//             top: roomData.depth / 2,
//             originX: "center",
//             originY: "center"
//         });
//     }

//     object.itemType = "Form";
//     object.formType = type;
//     object.furnitureName = type;

//     canvas.add(object);
//     canvas.setActiveObject(object);
//     canvas.renderAll();
//     updateFurnitureToolbar();
// }

// function addFormsStyles() {
//     if (document.getElementById("formsStyles")) {
//         return;
//     }

//     const style = document.createElement("style");
//     style.id = "formsStyles";
//     style.innerHTML = `
//         #formsFloatingPanel {
//             position: fixed;
//             left: 400px;
//             top: 100px;
//             width: 280px;
//             background: #fff;
//             border: 1px solid #ddd;
//             border-radius: 12px;
//             padding: 12px;
//             z-index: 99999;
//             box-shadow: 0 8px 30px rgba(0,0,0,.18);
//         }
//         .forms-header {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 12px;
//         }
//         .forms-header button {
//             border: none;
//             background: transparent;
//             font-size: 22px;
//             cursor: pointer;
//         }
//         .forms-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 8px;
//         }
//         .forms-grid button {
//             padding: 12px 5px;
//             background: #fff;
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             cursor: pointer;
//         }
//         .forms-grid button:hover {
//             border-color: #198754;
//             color: #198754;
//         }
//     `;

//     document.head.appendChild(style);
// }

// /* =====================================================
//    SMART WIZARD
// ===================================================== */
// function openSmartWizard() {
//     let modal = document.getElementById("smartWizardModal");
//     if (modal) {
//         modal.remove();
//     }

//     const selectedStyle =
//         localStorage.getItem("selectedStyle") ||
//         localStorage.getItem("roomStyle") ||
//         "Modern";

//     const selectedRoom =
//         localStorage.getItem("selectedRoom") ||
//         localStorage.getItem("roomType") ||
//         "Bedroom";

//     modal = document.createElement("div");
//     modal.id = "smartWizardModal";
//     modal.innerHTML = `
//         <div class="smart-wizard-box">
//             <div class="smart-wizard-header">
//                 <div>
//                     <h3>Smart Wizard</h3>
//                     <small>AI Room Designer</small>
//                 </div>
//                 <button id="closeSmartWizard">×</button>
//             </div>
//             <div class="wizard-info">
//                 <div>
//                     <strong>Style</strong>
//                     <span>${selectedStyle}</span>
//                 </div>
//                 <div>
//                     <strong>Room</strong>
//                     <span>${selectedRoom}</span>
//                 </div>
//             </div>
//             <label>Describe your room</label>
//             <textarea
//                 id="smartWizardPrompt"
//                 rows="5"
//                 placeholder="Example: Create a modern bedroom with a king bed, two side tables, warm lighting and neutral colors."
//             ></textarea>
//             <button id="generateSmartRoom" class="smart-generate-btn">
//                 <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Room
//             </button>
//             <div id="smartWizardResult" class="smart-wizard-result"></div>
//         </div>
//     `;

//     document.body.appendChild(modal);

//     document.getElementById("closeSmartWizard").addEventListener("click", function () {
//         modal.remove();
//     });

//     document.getElementById("generateSmartRoom").addEventListener("click", function () {
//         generateSmartRoom(selectedStyle, selectedRoom);
//     });

//     addSmartWizardStyles();
// }

// function generateSmartRoom(style, roomType) {
//     const prompt = document.getElementById("smartWizardPrompt");
//     const result = document.getElementById("smartWizardResult");
//     const userPrompt = prompt ? prompt.value.trim() : "";

//     window.smartRoomData = {
//         style: style,
//         roomType: roomType,
//         prompt: userPrompt
//     };

//     const lowerRoom = roomType.toLowerCase();

//     if (lowerRoom.includes("bedroom")) {
//         roomData.width = 500;
//         roomData.depth = 400;
//     } else if (lowerRoom.includes("living")) {
//         roomData.width = 600;
//         roomData.depth = 450;
//     } else if (lowerRoom.includes("kitchen")) {
//         roomData.width = 500;
//         roomData.depth = 350;
//     } else if (lowerRoom.includes("office")) {
//         roomData.width = 450;
//         roomData.depth = 350;
//     }

//     updateRoom();
//     createRoomShape("rectangle");

//     if (lowerRoom.includes("bedroom")) {
//         createBed(roomData.width / 2, roomData.depth / 2);
//     } else if (lowerRoom.includes("living")) {
//         createSofa(roomData.width / 2, roomData.depth / 2);
//     }

//     window.dispatchEvent(
//         new CustomEvent("smartRoomGenerated", {
//             detail: window.smartRoomData
//         })
//     );

//     if (result) {
//         result.innerHTML = `
//             <strong>Room Generated</strong><br>
//             Style: ${style}<br>
//             Room: ${roomType}
//             ${userPrompt ? "<br>Prompt: " + userPrompt : ""}
//         `;
//     }
// }

// function addSmartWizardStyles() {
//     if (document.getElementById("smartWizardStyles")) {
//         return;
//     }

//     const style = document.createElement("style");
//     style.id = "smartWizardStyles";
//     style.innerHTML = `
//         #smartWizardModal {
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,.35);
//             z-index: 999999;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }
//         .smart-wizard-box {
//             width: 420px;
//             max-width: 90vw;
//             background: #fff;
//             border-radius: 14px;
//             padding: 20px;
//             box-shadow: 0 15px 50px rgba(0,0,0,.25);
//         }
//         .smart-wizard-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             margin-bottom: 18px;
//         }
//         .smart-wizard-header h3 {
//             margin: 0;
//             font-size: 20px;
//         }
//         .smart-wizard-header small {
//             color: #777;
//         }
//         .smart-wizard-header button {
//             border: none;
//             background: transparent;
//             font-size: 25px;
//             cursor: pointer;
//         }
//         .wizard-info {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 10px;
//             margin-bottom: 16px;
//         }
//         .wizard-info div {
//             background: #f5faf6;
//             padding: 10px;
//             border-radius: 8px;
//             display: flex;
//             flex-direction: column;
//         }
//         .wizard-info span {
//             color: #198754;
//             margin-top: 3px;
//         }
//         #smartWizardPrompt {
//             width: 100%;
//             resize: vertical;
//             border: 1px solid #ddd;
//             border-radius: 8px;
//             padding: 10px;
//             margin-top: 6px;
//             margin-bottom: 12px;
//         }
//         #smartWizardPrompt:focus {
//             outline: none;
//             border-color: #198754;
//         }
//         .smart-generate-btn {
//             width: 100%;
//             border: none;
//             background: #198754;
//             color: white;
//             padding: 11px;
//             border-radius: 8px;
//             cursor: pointer;
//         }
//         .smart-generate-btn:hover {
//             background: #146c43;
//         }
//         .smart-wizard-result {
//             margin-top: 12px;
//             font-size: 13px;
//             line-height: 1.6;
//         }
//     `;

//     document.head.appendChild(style);
// }

// /* =====================================================
//    FURNITURE TOOLBAR
// ===================================================== */
// let furnitureToolbar = null;

// function createFurnitureToolbar() {
//     if (furnitureToolbar) {
//         furnitureToolbar.remove();
//     }

//     furnitureToolbar = document.createElement("div");
//     furnitureToolbar.id = "furnitureToolbar";
//     furnitureToolbar.innerHTML = `
//         <button type="button" id="rotateLeftBtn" title="Rotate Left">↶</button>
//         <button type="button" id="rotateRightBtn" title="Rotate Right">↷</button>
//         <button type="button" id="deleteSelectedBtn" title="Delete">🗑</button>
//     `;

//     document.body.appendChild(furnitureToolbar);

//     document.getElementById("rotateLeftBtn").addEventListener("click", function () {
//         const object = canvas.getActiveObject();
//         if (!object) return;

//         object.rotate((object.angle || 0) - 15);
//         object.setCoords();
//         canvas.renderAll();
//         updateFurnitureToolbar();
//         updatePropertiesFromObject(object);
//     });

//     document.getElementById("rotateRightBtn").addEventListener("click", function () {
//         const object = canvas.getActiveObject();
//         if (!object) return;

//         object.rotate((object.angle || 0) + 15);
//         object.setCoords();
//         canvas.renderAll();
//         updateFurnitureToolbar();
//         updatePropertiesFromObject(object);
//     });

//     document.getElementById("deleteSelectedBtn").addEventListener(
//         "click",
//         deleteSelectedFurniture
//     );
// }

// function updateFurnitureToolbar() {
//     if (!furnitureToolbar) return;

//     const object = canvas.getActiveObject();
//     if (!object) {
//         furnitureToolbar.style.display = "none";
//         return;
//     }

//     furnitureToolbar.style.display = "flex";

//     const rect = canvas.upperCanvasEl.getBoundingClientRect();
//     const bounds = object.getBoundingRect();
//     const left = rect.left + bounds.left;
//     const top = rect.top + bounds.top - 45;

//     furnitureToolbar.style.left = left + "px";
//     furnitureToolbar.style.top = Math.max(5, top) + "px";
// }

// function hideFurnitureToolbar() {
//     if (furnitureToolbar) {
//         furnitureToolbar.style.display = "none";
//     }
// }

// function deleteSelectedFurniture() {
//     const object = canvas.getActiveObject();
//     if (!object) return;

//     canvas.remove(object);
//     canvas.discardActiveObject();
//     canvas.renderAll();
//     hideFurnitureToolbar();
// }

// /* =====================================================
//    FURNITURE CREATION FUNCTIONS
// ===================================================== */
// function createGenericFurniture(type, x = 200, y = 150) {
//     const object = new fabric.Group(
//         [
//             new fabric.Rect({
//                 left: -40,
//                 top: -30,
//                 width: 80,
//                 height: 60,
//                 fill: "#9e9e9e",
//                 stroke: "#555",
//                 strokeWidth: 2,
//                 rx: 6,
//                 ry: 6
//             }),
//             new fabric.Text(type, {
//                 left: -30,
//                 top: -8,
//                 fontSize: 10,
//                 fill: "white"
//             })
//         ],
//         {
//             left: x,
//             top: y,
//             originX: "center",
//             originY: "center"
//         }
//     );

//     object.itemType = type;
//     object.furnitureName = type;

//     canvas.add(object);
//     canvas.setActiveObject(object);
//     canvas.renderAll();
//     updateFurnitureToolbar();

//     return object;
// }
// function createFurnitureFromImage(src, type, modelPath, x = 200, y = 150) {
//     fabric.Image.fromURL(
//         src,
//         function (img) {
//             if (!img) {
//                 createGenericFurniture(type, x, y);
//                 return;
//             }

//             const maxWidth = 80;
//             const maxHeight = 80;
//             const scale = Math.min(
//                 maxWidth / img.width,
//                 maxHeight / img.height
//             );

//             img.set({
//                 left: x,
//                 top: y,
//                 originX: "center",
//                 originY: "center",
//                 scaleX: scale,
//                 scaleY: scale
//             });

//             img.glbModel = modelPath || "";
//             img.imageUrl = src;               // store image URL for 3D texture
//             img.furnitureName = type;
//             img.itemType = type;

//             canvas.add(img);
//             canvas.setActiveObject(img);
//             canvas.renderAll();
//             updateFurnitureToolbar();

//             // Immediately sync to 3D
//             syncSelectedFurniture3D();
//         },
//         { crossOrigin: "anonymous" }
//     );
// }

// function createArmchair(modelPath, left = 200, top = 150) {
//     const imagePath = "models/armchair1.png";
//     createFurnitureFromImage(imagePath, "Armchair", modelPath || "models/armchair1.glb", left, top);
// }

// function createBed(x = 200, y = 150) {
//     const imagePath = "models/bed1.png";
//     createFurnitureFromImage(imagePath, "Bed", "models/bed1.glb", x, y);
// }

// function createSofa(x = 200, y = 150) {
//     const imagePath = "models/sofa1.png";
//     createFurnitureFromImage(imagePath, "Sofa", "models/sofa1.glb", x, y);
// }

// /* =====================================================
//    GET SELECTED FURNITURE DATA FOR 3D (UPDATED)
// ===================================================== */
// function getSelectedFurniture3DData() {
//     const object = canvas.getActiveObject();
//     if (!object || !object.itemType) {
//         return null;
//     }

//     let modelPath = object.glbModel || "";
//     // If 2D image mode is enabled, we don't send a GLB model path
//     if (window.USE_2D_IMAGE_IN_3D) {
//         modelPath = null;  // signal to 3D that we only use image texture
//     }

//     return {
//         type: object.itemType,
//         name: object.furnitureName || object.itemType,
//         model: modelPath,                    // null if using image
//         imageUrl: object.imageUrl || null,   // the 2D image path for texture
//         useImageTexture: window.USE_2D_IMAGE_IN_3D, // tell 3D to use image
//         x: object.left || 0,
//         y: object.top || 0,
//         rotation: object.angle || 0,
//         width: object.getScaledWidth(),
//         height: object.getScaledHeight(),
//         scaleX: object.scaleX || 1,
//         scaleY: object.scaleY || 1
//     };
// }

// /**
//  * Toggle between using 2D images as textures in 3D (true)
//  * or loading GLB models (false).
//  */
// function setUse2DImageIn3D(use) {
//     window.USE_2D_IMAGE_IN_3D = use;
//     syncSelectedFurniture3D(); // refresh 3D if something is selected
// }

// /* =====================================================
//    MODIFIED: createFurnitureAt now accepts imageSrc
// ===================================================== */
// function createFurnitureAt(type, x, y, model, imageSrc) {
//     // If imageSrc is provided, use it directly
//     if (imageSrc) {
//         // Determine model path: if model ends with .glb, use it; else try to find from imageMap
//         let modelPath = (model && model.endsWith('.glb')) ? model : '';
//         if (!modelPath) {
//             // Try to get from imageMap
//             const fallback = imageMap[type];
//             if (fallback) {
//                 modelPath = fallback.model;
//             }
//         }
//         createFurnitureFromImage(imageSrc, type, modelPath || '', x, y);
//         return;
//     }

//     // Otherwise use the default imageMap
//     const fallback = imageMap[type];
//     if (fallback) {
//         const imgPath = model && model.endsWith('.png') ? model : fallback.img;
//         const modelPath = model && model.endsWith('.glb') ? model : fallback.model;
//         createFurnitureFromImage(imgPath, type, modelPath, x, y);
//     } else {
//         createGenericFurniture(type, x, y);
//     }
// }

// // Global imageMap for fallback
// const imageMap = {
//     'Armchair': { img: 'models/armchair1.png', model: 'models/armchair1.glb' },
//     'Sofa': { img: 'models/sofa1.png', model: 'models/sofa1.glb' },
//     'Bed': { img: 'models/bed1.png', model: 'models/bed1.glb' },
//     'Ottoman': { img: 'models/ottoman1.png', model: 'models/ottoman1.glb' },
//     'Storage': { img: 'models/storage1.png', model: 'models/storage1.glb' },
//     'Table': { img: 'models/table1.png', model: 'models/table1.glb' },
//     'Office Desk': { img: 'models/officedesk1.png', model: 'models/officedesk1.glb' },
//     'Children Furniture': { img: 'models/children1.png', model: 'models/children1.glb' },
//     'Kitchen': { img: 'models/kitchen1.png', model: 'models/kitchen1.glb' },
//     'Bathroom': { img: 'models/bathroom1.png', model: 'models/bathroom1.glb' },
//     'Door': { img: 'models/construction/door/door1.png', model: 'models/construction/doors/door1.glb' },
//     'Window': { img: 'models/construction/window/window1.png', model: 'models/construction/windows/window1.glb' },
//     'Stairs': { img: 'models/construction/stairs/stair1.png', model: 'models/construction/stairs/stair1.glb' },
//     'Arch': { img: 'models/construction/archs/arch1.png', model: 'models/construction/archs/arch1.glb' },
//     'Partition': { img: 'models/construction/partition/partition1.png', model: 'models/construction/partition/partition1.glb' },
//     'Roof': { img: 'models/construction/roofs/roof1.png', model: 'models/construction/roofs/roof1.glb' },
//     'Fireplace': { img: 'models/construction/fireplace/fire1.png', model: 'models/construction/fireplace/fire1.glb' },
//     'Column': { img: 'models/construction/column/column1.png', model: 'models/construction/column/column1.glb' },
//     'Terrace': { img: 'models/construction/terrace/terrace1.png', model: 'models/construction/terrace/terrace1.glb' },
//     'Fence': { img: 'models/construction/fences/fence1.png', model: 'models/construction/fences/fence1.glb' },
//     'Path and Lawn': { img: 'models/outdoor/path and lawns/path1.png', model: 'models/outdoor/path and lawns/path1.glb' },
//     'Patio': { img: 'models/outdoor/patio/patio1.png', model: 'models/outdoor/patio/patio1.glb' },
//     'Tree and Plant': { img: 'models/outdoor/trees/tree1.png', model: 'models/outdoor/trees/tree1.glb' },
//     'Garage': { img: 'models/outdoor/garage/garage1.png', model: 'models/outdoor/garage/garage1.glb' },
//     'Pool': { img: 'models/outdoor/pool/pool1.png', model: 'models/outdoor/pool/pool1.glb' },
//     'Outdoor Lighting': { img: 'models/outdoor/lighting/lighting1.png', model: 'models/outdoor/lighting/lighting1.glb' },
//     'Outdoor Activity': { img: 'models/outdoor/activity/activity1.png', model: 'models/outdoor/activity/activity1.glb' },
//     'Garden': { img: 'models/outdoor/garden/garden1.png', model: 'models/outdoor/garden/garden1.glb' }
// };

// /* =====================================================
//    FURNITURE CATEGORY NAVIGATION
// ===================================================== */
// const furnitureCategories = document.querySelectorAll(".furniture-category");
// const categoryView = document.getElementById("categoryView");
// const armchairsView = document.getElementById("armchairsView");
// const sofasView = document.getElementById("sofasView");
// const panelBack = document.getElementById("panelBack");
// const panelTitle = document.getElementById("panelTitle");

// function hideAllSubcategories() {
//     if (armchairsView) armchairsView.style.display = "none";
//     if (sofasView) sofasView.style.display = "none";
//     document.querySelectorAll('.subcategory-view').forEach(v => {
//         if (v.id !== 'armchairsView' && v.id !== 'sofasView') {
//             v.style.display = 'none';
//         }
//     });
// }

// furnitureCategories.forEach(function (category) {
//     category.addEventListener("click", function () {
//         const categoryName = this.dataset.category;

//         if (categoryView) categoryView.style.display = "none";
//         hideAllSubcategories();

//         if (categoryName === "Armchairs") {
//             if (armchairsView) armchairsView.style.display = "block";
//             if (panelTitle) panelTitle.innerText = "Armchairs";
//             setupFurnitureCardImages(armchairsView);
//         } else if (categoryName === "Sofa") {
//             if (sofasView) sofasView.style.display = "block";
//             if (panelTitle) panelTitle.innerText = "Sofas";
//             setupFurnitureCardImages(sofasView);
//         }
//     });
// });

// if (panelBack) {
//     panelBack.addEventListener("click", function () {
//         hideAllSubcategories();
//         if (categoryView) categoryView.style.display = "block";
//         if (panelTitle) panelTitle.innerText = "Furniture";
//         if (panelBack) panelBack.style.display = "none";
//     });
// }

// /* =====================================================
//    DRAG & DROP - UPDATED with imageSrc
// ===================================================== */
// // Delegated dragstart on document for all .furniture-card
// document.addEventListener('dragstart', function(event) {
//     const card = event.target.closest('.furniture-card');
//     if (!card) return;
    
//     const type = card.dataset.type || card.dataset.category || "";
//     const model = card.dataset.model || "";
//     const img = card.querySelector('.furniture-thumbnail');
//     const imageSrc = img ? img.getAttribute('src') || '' : '';
    
//     event.dataTransfer.effectAllowed = "copy";
//     event.dataTransfer.setData("furnitureType", type);
//     event.dataTransfer.setData("furnitureModel", model);
//     event.dataTransfer.setData("imageSrc", imageSrc);
// });

// const fabricDropArea = canvas.wrapperEl;

// if (fabricDropArea) {
//     fabricDropArea.addEventListener("dragover", function (event) {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = "copy";
//     });

//     fabricDropArea.addEventListener("drop", function (event) {
//         event.preventDefault();

//         const type = event.dataTransfer.getData("furnitureType");
//         const model = event.dataTransfer.getData("furnitureModel");
//         const imageSrc = event.dataTransfer.getData("imageSrc"); // new

//         if (!type) return;

//         const rect = fabricDropArea.getBoundingClientRect();
//         const x = (event.clientX - rect.left) / zoom;
//         const y = (event.clientY - rect.top) / zoom;

//         createFurnitureAt(type, x, y, model, imageSrc);
//     });
// }

// /* =====================================================
//    OBJECT SELECTION
// ===================================================== */
// canvas.on("selection:created", function (e) {
//     updateProperties(e);
//     syncSelectedFurniture3D();
// });

// canvas.on("selection:updated", function (e) {
//     updateProperties(e);
//     syncSelectedFurniture3D();
// });

// canvas.on("selection:cleared", function () {
//     showRoomProperties();
//     hideFurnitureToolbar();

//     if (typeof clearSelectedFurniture3D === "function") {
//         clearSelectedFurniture3D();
//     }
// });

// function syncSelectedFurniture3D() {
//     const data = getSelectedFurniture3DData();
//     if (!data) return;

//     window.selectedFurniture3D = data;
//     window.dispatchEvent(
//         new CustomEvent("selectedFurniture3DUpdated", {
//             detail: data
//         })
//     );
// }

// canvas.on("object:moving", updateFurnitureToolbar);

// canvas.on("object:scaling", function (e) {
//     updateFurnitureToolbar();
//     updatePropertiesFromObject(e.target);
// });

// canvas.on("object:rotating", function (e) {
//     updateFurnitureToolbar();
//     updatePropertiesFromObject(e.target);
// });

// canvas.on("object:modified", function (e) {
//     if (!e.target) return;

//     e.target.setCoords();
//     updateFurnitureToolbar();
//     updatePropertiesFromObject(e.target);
//     syncSelectedFurniture3D();

//     if (typeof updateSelectedFurniture3D === "function") {
//         updateSelectedFurniture3D(window.selectedFurniture3D);
//     }
// });

// function showRoomProperties() {
//     if (widthInput) widthInput.value = roomData.width + " cm";
//     if (depthInput) depthInput.value = roomData.depth + " cm";
//     if (heightInput) heightInput.value = roomData.height + " cm";
//     if (angleInput) angleInput.value = roomData.angle + "°";
//     if (elevationInput) elevationInput.value = roomData.elevation + " cm";
// }

// function updateProperties(event) {
//     const object = event.selected && event.selected[0];
//     if (object) {
//         updatePropertiesFromObject(object);
//     }
// }

// function updatePropertiesFromObject(object) {
//     if (!object) return;

//     if (widthInput)
//         widthInput.value = Math.round(object.getScaledWidth()) + " cm";
//     if (depthInput)
//         depthInput.value = Math.round(object.getScaledHeight()) + " cm";
//     if (heightInput) heightInput.value = "65 cm";
//     if (angleInput) angleInput.value = Math.round(object.angle || 0) + "°";
//     if (elevationInput) elevationInput.value = "0 cm";
// }

// /* =====================================================
//    DELETE BUTTON
// ===================================================== */
// const deleteButton = document.getElementById("deleteFurniture");

// if (deleteButton) {
//     deleteButton.addEventListener("click", function () {
//         const object = canvas.getActiveObject();

//         if (object) {
//             deleteSelectedFurniture();
//             return;
//         }

//         if (room && confirm("Do you want to delete the room?")) {
//             room.remove();
//         }
//     });
// }
// /* =====================================================
//    ROOM FULLSCREEN  —  expand button pe click → room fullscreen
// ===================================================== */
// const roomFullscreenBtn = document.getElementById("roomFullscreen");
// const roomElFull = document.getElementById("room");

// if (roomFullscreenBtn && roomElFull) {
//     roomFullscreenBtn.addEventListener("click", function () {
//         if (!document.fullscreenElement) {
//             // Fullscreen me jao
//             if (roomElFull.requestFullscreen) {
//                 roomElFull.requestFullscreen();
//             } else if (roomElFull.webkitRequestFullscreen) {
//                 roomElFull.webkitRequestFullscreen();       // Safari
//             } else if (roomElFull.msRequestFullscreen) {
//                 roomElFull.msRequestFullscreen();           // IE/Edge
//             }
//         } else {
//             // Fullscreen se bahar aao
//             if (document.exitFullscreen) document.exitFullscreen();
//             else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//             else if (document.msExitFullscreen) document.msExitFullscreen();
//         }
//     });

//     // Fullscreen state change → icon badlo
//     document.addEventListener("fullscreenchange", function () {
//         const icon = roomFullscreenBtn.querySelector("i");
//         if (document.fullscreenElement) {
//             icon.className = "fa-solid fa-compress";   // chhota karne ka icon
//             roomElFull.style.width = "100vw";
//             roomElFull.style.height = "100vh";
//         } else {
//             icon.className = "fa-solid fa-expand";     // expand icon
//             roomElFull.style.width = "";
//             roomElFull.style.height = "";
//             if (typeof canvas !== "undefined" && canvas) {
//                 setTimeout(() => {
//                     canvas.setDimensions({
//                         width: roomElFull.clientWidth,
//                         height: roomElFull.clientHeight
//                     });
//                     canvas.renderAll();
//                 }, 100);
//             }
//         }
//     });
// }
// // Fullscreen enter hone ke baad canvas resize
// document.addEventListener("fullscreenchange", function () {
//     if (!document.fullscreenElement) return;

//     if (typeof canvas !== "undefined" && canvas) {
//         setTimeout(() => {
//             const w = roomElFull.clientWidth;
//             const h = roomElFull.clientHeight;
//             canvas.setDimensions({ width: w, height: h });
//             canvas.renderAll();
//         }, 100);
//     }
// });
// /* =====================================================
//    ZOOM  —  value + room (canvas + labels) dono zoom honge
// ===================================================== */
// let zoom = 1;
// const MIN_ZOOM = 0.5;
// const MAX_ZOOM = 2;

// const zoomInButton  = document.getElementById("zoomIn");
// const zoomOutButton = document.getElementById("zoomOut");
// const zoomValueEl   = document.getElementById("zoomValue");
// const roomEl        = document.getElementById("room");   // ⬅️ ROOM DIV

// // Zoom apply karne ka single function
// function applyZoom() {
//     // 1) Room div pe scale lagao (canvas + labels + dimensions sab scale honge)
//     roomEl.style.transform = `scale(${zoom})`;
//     roomEl.style.transformOrigin = "center center"; // beech se zoom

//     // 2) Fabric canvas ko bhi batao (mouse coordinates sahi rahen)
//     if (typeof canvas !== "undefined" && canvas) {
//         canvas.setZoom(zoom);
//         canvas.renderAll();
//     }

//     // 3) Value text update
//     if (zoomValueEl) zoomValueEl.innerText = Math.round(zoom * 100) + "%";

//     // 4) Furniture toolbar update (agar function exist karta hai)
//     if (typeof updateFurnitureToolbar === "function") updateFurnitureToolbar();
// }

// /* ---------- BUTTONS ---------- */
// if (zoomInButton) {
//     zoomInButton.addEventListener("click", function () {
//         zoom = Math.min(MAX_ZOOM, +(zoom + 0.1).toFixed(2));
//         applyZoom();
//     });
// }

// if (zoomOutButton) {
//     zoomOutButton.addEventListener("click", function () {
//         zoom = Math.max(MIN_ZOOM, +(zoom - 0.1).toFixed(2));
//         applyZoom();
//     });
// }

// /* ---------- MOUSE WHEEL ---------- */
// canvas.on("mouse:wheel", function (opt) {
//     if (isDrawingWallMode) return;

//     const delta = opt.e.deltaY;
//     zoom *= 0.999 ** delta;
//     zoom = Math.min(Math.max(MIN_ZOOM, zoom), MAX_ZOOM);
//     zoom = +zoom.toFixed(3);

//     applyZoom();

//     opt.e.preventDefault();
//     opt.e.stopPropagation();
// });
// /* =====================================================
//    2D / 3D SWITCH
// ===================================================== */
// const btn2D = document.getElementById("btn2D");
// const btn3D = document.getElementById("btn3D");
// const workspace = document.querySelector(".workspace");

// if (btn2D) {
//     btn2D.addEventListener("click", function () {
//         btn2D.classList.add("active");
//         if (btn3D) btn3D.classList.remove("active");
//         if (workspace) workspace.classList.remove("three-mode");
//     });
// }

// if (btn3D) {
//     btn3D.addEventListener("click", function () {
//         btn3D.classList.add("active");
//         if (btn2D) btn2D.classList.remove("active");
//         if (workspace) workspace.classList.add("three-mode");

//         sendRoomDataTo3D();
//         sendWallsTo3D();

//         setTimeout(function () {
//             if (typeof initThreeView === "function") {
//                 initThreeView();
//             }

//             sendWallsTo3D();

//             const selected = getSelectedFurniture3DData();
//             if (selected) {
//                 window.selectedFurniture3D = selected;
//                 if (typeof showSelectedFurniture3D === "function") {
//                     showSelectedFurniture3D(selected);
//                 }
//             }

//             window.dispatchEvent(new Event("resize"));
//         }, 250);
//     });
// }

// /* =====================================================
//    SELECT BUILD OPTION
// ===================================================== */
// function selectOption(optionName) {
//     console.log("Selected Action:", optionName);

//     document.querySelectorAll(".cards-grid .card").forEach(function (card) {
//         card.classList.remove("active-card");
//     });

//     const cards = document.querySelectorAll(".cards-grid .card");
//     cards.forEach(function (card) {
//         const title = card.querySelector(".card-title");
//         if (title && title.innerText.trim() === optionName) {
//             card.classList.add("active-card");
//         }
//     });

//     if (optionName === "Draw Walls") {
//         showDesignMessage("Draw Walls selected.");
//         setTimeout(function () {
//             startWallDrawing();
//         }, 100);
//         return;
//     }

//     if (optionName === "Rooms") {
//         stopWallDrawing();
//         showRoomShapes();
//         return;
//     }

//     if (optionName === "Smart Wizard") {
//         stopWallDrawing();
//         openSmartWizard();
//         return;
//     }

//     if (optionName === "Forms") {
//         stopWallDrawing();
//         showFormsPanel();
//         return;
//     }

//     stopWallDrawing();
// }

// /* =====================================================
//    LEFT SIDEBAR
// ===================================================== */
// document.addEventListener("DOMContentLoaded", function () {
//     const sideIcons = document.querySelectorAll(".side-icon[data-panel]");
//     const sidePanels = document.querySelector(".side-panels");
//     const closeSidePanel = document.getElementById("closeSidePanel");

//     function openSidePanel(panelId, clickedIcon) {
//         if (sidePanels) {
//             sidePanels.classList.remove("panel-hidden");
//         }

//         sideIcons.forEach(function (icon) {
//             icon.classList.remove("active");
//         });

//         if (clickedIcon) {
//             clickedIcon.classList.add("active");
//         }

//         document.querySelectorAll(".side-panel").forEach(function (panel) {
//             panel.classList.remove("active");
//         });

//         const selectedPanel = document.getElementById(panelId);
//         if (selectedPanel) {
//             selectedPanel.classList.add("active");
//         }
//     }

//     sideIcons.forEach(function (icon) {
//         icon.addEventListener("click", function () {
//             const panelId = this.getAttribute("data-panel");
//             openSidePanel(panelId, this);
//         });
//     });

//     if (closeSidePanel) {
//         closeSidePanel.addEventListener("click", function () {
//             if (sidePanels) {
//                 sidePanels.classList.add("panel-hidden");
//             }

//             sideIcons.forEach(function (icon) {
//                 icon.classList.remove("active");
//             });
//         });
//     }

//     const defaultIcon = document.getElementById("searchBtn");
//     const defaultPanel = document.getElementById("searchPanel");

//     if (defaultIcon && defaultPanel) {
//         if (sidePanels) {
//             sidePanels.classList.remove("panel-hidden");
//         }

//         sideIcons.forEach(function (icon) {
//             icon.classList.remove("active");
//         });

//         document.querySelectorAll(".side-panel").forEach(function (panel) {
//             panel.classList.remove("active");
//         });

//         defaultIcon.classList.add("active");
//         defaultPanel.classList.add("active");
//     }

//     const furnitureBackBtn = document.getElementById("furnitureBackBtn");
//     if (furnitureBackBtn) {
//         furnitureBackBtn.addEventListener("click", function () {
//             if (categoryView) categoryView.style.display = "block";
//             if (armchairsView) armchairsView.style.display = "none";
//             if (sofasView) sofasView.style.display = "none";
//         });
//     }

//     // Setup all furniture card images after DOM is ready
//     setTimeout(function () {
//         document.querySelectorAll('.subcategory-view').forEach(function (view) {
//             setupFurnitureCardImages(view);
//         });
//         // Also setup armchairs and sofas
//         if (armchairsView) setupFurnitureCardImages(armchairsView);
//         if (sofasView) setupFurnitureCardImages(sofasView);
//     }, 500);
// });

// /* =====================================================
//    TOOLBAR STYLE
// ===================================================== */
// const toolbarStyle = document.createElement("style");
// toolbarStyle.innerHTML = `
//     #furnitureToolbar {
//         position: fixed;
//         display: none;
//         align-items: center;
//         gap: 4px;
//         padding: 5px;
//         background: #ffffff;
//         border: 1px solid #d0d0d0;
//         border-radius: 8px;
//         box-shadow: 0 3px 12px rgba(0,0,0,0.18);
//         z-index: 99999;
//     }
//     #furnitureToolbar button {
//         width: 32px;
//         height: 32px;
//         border: none;
//         border-radius: 6px;
//         background: #f4f4f4;
//         color: #333;
//         cursor: pointer;
//         font-size: 17px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
//     #furnitureToolbar button:hover {
//         background: #e5e5e5;
//     }
//     #furnitureToolbar button:last-child:hover {
//         background: #ffe1e1;
//     }
// `;

// document.head.appendChild(toolbarStyle);

// /* =====================================================
//    GET SELECTED FURNITURE DATA (already updated above)
// ===================================================== */

// /* =====================================================
//    INITIALIZE
// ===================================================== */
// createFurnitureToolbar();
// canvas.renderAll();
// updateZoomText();
// showRoomProperties();
// hideFurnitureToolbar();

// /* =====================================================
//    GLOBAL ACCESS
// ===================================================== */
// window.designApp = {
//     canvas: canvas,
//     roomData: roomData,
//     roomWallData: window.roomWallData,
//     drawWalls: startWallDrawing,
//     finishWalls: finishWallDrawing,
//     createRoomShape: createRoomShape,
//     openSmartWizard: openSmartWizard,
//     createForm: createForm,
//     sendWallsTo3D: sendWallsTo3D,
//     sendRoomDataTo3D: sendRoomDataTo3D,
//     generatePlaceholder: generatePlaceholderImage,
//     setupFurnitureCardImages: setupFurnitureCardImages,
//     setUse2DImageIn3D: setUse2DImageIn3D
// };

// /* =====================================================
//    FINAL INITIAL SYNC
// ===================================================== */
// setTimeout(function () {
//     sendRoomDataTo3D();
//     sendWallsTo3D();
// }, 300);

// /* =====================================================
//    ROOMS / CATEGORIES TAB
// ===================================================== */
// function showTab(tabName, clickedTab) {
//     const rooms = document.getElementById("rooms");
//     const categories = document.getElementById("categories");

//     rooms.style.display = "none";
//     categories.style.display = "none";

//     document.querySelectorAll(".tab").forEach(function (tab) {
//         tab.classList.remove("active-tab");
//     });

//     if (tabName === "rooms") {
//         rooms.style.display = "block";
//     }

//     if (tabName === "categories") {
//         categories.style.display = "block";
//     }

//     clickedTab.classList.add("active-tab");
// }

// /* =====================================================
//    ROOM FURTHER CATEGORIES
// ===================================================== */
// const roomCategories = {
//     bedroom: [
//         ["Beds", "fa-bed"],
//         ["Wardrobes", "fa-box"],
//         ["Bedside Tables", "fa-table"],
//         ["Chairs", "fa-chair"]
//     ],
//     "living-room": [
//         ["Sofas", "fa-couch"],
//         ["Armchairs", "fa-chair"],
//         ["Coffee Tables", "fa-table"],
//         ["TV Units", "fa-tv"]
//     ],
//     kitchen: [
//         ["Kitchen Cabinets", "fa-kitchen-set"],
//         ["Kitchen Tables", "fa-table"],
//         ["Kitchen Chairs", "fa-chair"],
//         ["Kitchen Storage", "fa-box"]
//     ],
//     office: [
//         ["Office Desks", "fa-desktop"],
//         ["Office Chairs", "fa-chair"],
//         ["Office Storage", "fa-box"]
//     ],
//     "kids-room": [
//         ["Kids Beds", "fa-bed"],
//         ["Kids Tables", "fa-table"],
//         ["Kids Chairs", "fa-chair"],
//         ["Kids Storage", "fa-box"]
//     ],
//     "dining-room": [
//         ["Dining Tables", "fa-table"],
//         ["Dining Chairs", "fa-chair"],
//         ["Dining Storage", "fa-box"]
//     ],
//     bathroom: [
//         ["Bathroom Cabinets", "fa-box"],
//         ["Bathroom Storage", "fa-box"]
//     ],
//     hallway: [
//         ["Hallway Tables", "fa-table"],
//         ["Hallway Storage", "fa-box"],
//         ["Hallway Chairs", "fa-chair"]
//     ],
//     "public-space": [
//         ["Sofas", "fa-couch"],
//         ["Chairs", "fa-chair"],
//         ["Tables", "fa-table"]
//     ],
//     decor: [
//         ["Wall Decor", "fa-image"],
//         ["Lamps", "fa-lightbulb"],
//         ["Plants", "fa-leaf"],
//         ["Rugs", "fa-rug"]
//     ]
// };

// function openRoom(roomName) {
//     const rooms = document.getElementById("rooms");
//     const roomCategoryView = document.getElementById("roomCategoryView");
//     const roomCategoryTitle = document.getElementById("roomCategoryTitle");
//     const roomCategoryList = document.getElementById("roomCategoryList");

//     if (!rooms || !roomCategoryView || !roomCategoryTitle || !roomCategoryList) {
//         console.error("Room category elements not found.");
//         return;
//     }

//     const categories = roomCategories[roomName];

//     if (!categories) {
//         console.error("Categories not found for:", roomName);
//         return;
//     }

//     rooms.style.display = "none";
//     roomCategoryView.style.display = "block";

//     roomCategoryTitle.textContent =
//         roomName
//             .replace(/-/g, " ")
//             .replace(/\b\w/g, function (letter) {
//                 return letter.toUpperCase();
//             });

//     roomCategoryList.innerHTML = "";

//     categories.forEach(function (category) {
//         const categoryName = category[0];
//         const categoryIcon = category[1];

//         const item = document.createElement("div");
//         item.className = "room-category-item";

//         item.innerHTML = `
//             <div class="room-category-icon">
//                 <i class="fa-solid ${categoryIcon}"></i>
//             </div>
//             <span>${categoryName}</span>
//             <i class="fa-solid fa-chevron-right"></i>
//         `;

//         item.addEventListener("click", function () {
//             showFurniturePictures(roomName, categoryName);
//         });

//         roomCategoryList.appendChild(item);
//     });
// }

// function backToRooms() {
//     const rooms = document.getElementById("rooms");
//     const roomCategoryView = document.getElementById("roomCategoryView");

//     if (!rooms || !roomCategoryView) {
//         console.error("Rooms view not found.");
//         return;
//     }

//     roomCategoryView.style.display = "none";
//     rooms.style.display = "block";
// }

// /* =========================================================
//    CONSTRUCTION CATEGORY CLICK FIX + DRAG with imageSrc
// ========================================================= */
// (function () {
//     function initConstructionCategoryClick() {
//         const constructionSection = document.querySelector(".construction-section");
//         if (!constructionSection) {
//             console.error("ERROR: .construction-section not found");
//             return;
//         }

//         const categoryViews = {
//             "Doors": "constructionDoorsView",
//             "Windows": "constructionWindowsView",
//             "Stairs": "constructionStairsView",
//             "Archs": "constructionArchsView",
//             "Partition": "constructionPartitionView",
//             "Roofs": "constructionRoofsView",
//             "Fireplace": "constructionFireplaceView",
//             "Column": "constructionColumnView",
//             "Terrace": "constructionTerraceView",
//             "Fences & Gates": "constructionFencesView"
//         };

//         const buttons = constructionSection.querySelectorAll(".construction-grid .build-option");

//         console.log("Construction buttons found:", buttons.length);

//         buttons.forEach(function (button) {
//             const span = button.querySelector("span");
//             if (!span) {
//                 console.warn("Category button has no span:", button);
//                 return;
//             }

//             const category = span.textContent.trim();
//             console.log("Construction category detected:", category);

//             button.removeAttribute("onclick");
//             button.style.cursor = "pointer";

//             button.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 console.log("CLICKED:", category);

//                 const viewId = categoryViews[category];

//                 if (!viewId) {
//                     console.error("No view mapped for:", category);
//                     return;
//                 }

//                 const selectedView = document.getElementById(viewId);

//                 if (!selectedView) {
//                     console.error("View not found:", viewId);
//                     return;
//                 }

//                 constructionSection.style.display = "none";

//                 Object.values(categoryViews).forEach(function (id) {
//                     const view = document.getElementById(id);
//                     if (view) {
//                         view.style.display = "none";
//                         view.classList.remove("active");
//                     }
//                 });

//                 selectedView.style.display = "block";
//                 selectedView.classList.add("active");

//                 selectedView.dataset.category = category;
//                 window.currentConstructionCategory = category;

//                 console.log("OPENED:", category, "->", viewId);

//                 setupConstructionDragDrop(selectedView);
//             }, true);
//         });

//         Object.values(categoryViews).forEach(function (viewId) {
//             const view = document.getElementById(viewId);
//             if (view) {
//                 setupConstructionDragDrop(view);
//             }
//         });
//     }

//     function setupConstructionDragDrop(view) {
//         if (!view) return;

//         const cards = view.querySelectorAll(".furniture-card");

//         cards.forEach(function (card) {
//             card.setAttribute("draggable", "true");

//             if (card.dataset.dragSetup === "true") {
//                 return;
//             }

//             card.dataset.dragSetup = "true";

//             card.addEventListener("dragstart", function (event) {
//                 const model = card.dataset.model;
//                 const type = card.dataset.type;
//                 const category = view.dataset.category || window.currentConstructionCategory || "";
//                 const img = card.querySelector('.furniture-thumbnail');
//                 const imageSrc = img ? img.getAttribute('src') || '' : '';

//                 const data = { type, model, category, source: "construction" };

//                 window.selectedConstructionModel = model;
//                 window.selectedConstructionType = type;
//                 window.selectedConstructionCategory = category;
//                 window.selectedFurnitureModel = model;
//                 window.selectedFurnitureType = type;
//                 window.currentDraggedConstruction = data;

//                 event.dataTransfer.effectAllowed = "copy";
//                 event.dataTransfer.setData("text/plain", JSON.stringify(data));
//                 event.dataTransfer.setData("application/json", JSON.stringify(data));
//                 event.dataTransfer.setData("model", model || "");
//                 event.dataTransfer.setData("type", type || "");
//                 event.dataTransfer.setData("imageSrc", imageSrc); // important

//                 console.log("DRAGGING Construction:", data);
//             });
//         });

//         // Setup images for construction cards
//         setupFurnitureCardImages(view);
//     }

//     window.backToConstruction = function () {
//         const constructionSection = document.querySelector(".construction-section");

//         if (constructionSection) {
//             constructionSection.style.display = "block";
//         }

//         document.querySelectorAll(".subcategory-view").forEach(function (view) {
//             if (view.id && view.id.indexOf("construction") === 0) {
//                 view.style.display = "none";
//                 view.classList.remove("active");
//             }
//         });

//         window.currentConstructionCategory = null;
//     };

//     if (document.readyState === "loading") {
//         document.addEventListener("DOMContentLoaded", initConstructionCategoryClick);
//     } else {
//         initConstructionCategoryClick();
//     }
// })();

// /* =========================================================
//    OUTDOOR CATEGORY SYSTEM + DRAG with imageSrc
// ========================================================= */
// (function () {
//     "use strict";

//     const outdoorViews = {
//         "Path and Lawns": "outdoorPathLawnsView",
//         "Patio": "outdoorPatioView",
//         "Trees and Plants": "outdoorTreesView",
//         "Garage": "outdoorGarageView",
//         "Pool": "outdoorPoolView",
//         "Lighting": "outdoorLightingView",
//         "Outdoor Activities": "outdoorActivitiesView",
//         "Garden": "outdoorGardenView"
//     };

//     window.openOutdoorCategory = function (category) {
//         console.log("Outdoor category:", category);

//         const outdoorPanel = document.getElementById("outdoorPanel");
//         const viewId = outdoorViews[category];

//         if (!viewId) {
//             console.error("Outdoor category not found:", category);
//             return;
//         }

//         const selectedView = document.getElementById(viewId);

//         if (!selectedView) {
//             console.error("Outdoor view not found:", viewId);
//             return;
//         }

//         if (outdoorPanel) {
//             outdoorPanel.style.display = "none";
//         }

//         Object.values(outdoorViews).forEach(function (id) {
//             const view = document.getElementById(id);
//             if (view) {
//                 view.style.display = "none";
//                 view.classList.remove("active");
//             }
//         });

//         selectedView.style.display = "block";
//         selectedView.classList.add("active");

//         selectedView.dataset.category = category;
//         window.currentOutdoorCategory = category;

//         addOutdoorBackButton(selectedView);
//         setupOutdoorCards(selectedView);
//     };

//     function initializeOutdoorCategories() {
//         const outdoorPanel = document.getElementById("outdoorPanel");

//         if (!outdoorPanel) {
//             console.warn("#outdoorPanel not found");
//             return;
//         }

//         const buttons = outdoorPanel.querySelectorAll(".build-option");

//         console.log("Outdoor categories found:", buttons.length);

//         buttons.forEach(function (button) {
//             const span = button.querySelector("span");

//             if (!span) return;

//             const category = span.textContent.trim();

//             button.style.cursor = "pointer";
//             button.removeAttribute("onclick");

//             button.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 openOutdoorCategory(category);
//             }, true);
//         });
//     }

//     function addOutdoorBackButton(view) {
//         if (!view) return;

//         const heading = view.querySelector(".subcategory-heading");

//         if (!heading) return;

//         if (heading.querySelector(".outdoor-back-button")) {
//             return;
//         }

//         const button = document.createElement("button");
//         button.type = "button";
//         button.className = "outdoor-back-button";
//         button.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';

//         button.addEventListener("click", function (event) {
//             event.preventDefault();
//             event.stopPropagation();

//             closeOutdoorCategory();
//         });

//         heading.prepend(button);
//     }

//     window.closeOutdoorCategory = function () {
//         Object.values(outdoorViews).forEach(function (id) {
//             const view = document.getElementById(id);
//             if (view) {
//                 view.style.display = "none";
//                 view.classList.remove("active");
//             }
//         });

//         const outdoorPanel = document.getElementById("outdoorPanel");
//         if (outdoorPanel) {
//             outdoorPanel.style.display = "block";
//         }

//         window.currentOutdoorCategory = null;
//     };

//     function setupOutdoorCards(view) {
//         if (!view) return;

//         const cards = view.querySelectorAll(".furniture-card");

//         cards.forEach(function (card) {
//             card.setAttribute("draggable", "true");

//             if (card.dataset.outdoorReady === "true") {
//                 return;
//             }

//             card.dataset.outdoorReady = "true";

//             card.addEventListener("dragstart", function (event) {
//                 const model = card.getAttribute("data-model");
//                 const type = card.getAttribute("data-type");
//                 const category = view.dataset.category || window.currentOutdoorCategory || "";
//                 const img = card.querySelector('.furniture-thumbnail');
//                 const imageSrc = img ? img.getAttribute('src') || '' : '';

//                 const itemData = { type, model, category, source: "outdoor" };

//                 window.selectedOutdoorModel = model;
//                 window.selectedOutdoorType = type;
//                 window.selectedOutdoorCategory = category;
//                 window.selectedFurnitureModel = model;
//                 window.selectedFurnitureType = type;
//                 window.currentDraggedOutdoor = itemData;

//                 if (event.dataTransfer) {
//                     event.dataTransfer.effectAllowed = "copy";
//                     event.dataTransfer.setData("text/plain", JSON.stringify(itemData));
//                     event.dataTransfer.setData("application/json", JSON.stringify(itemData));
//                     event.dataTransfer.setData("model", model || "");
//                     event.dataTransfer.setData("type", type || "");
//                     event.dataTransfer.setData("imageSrc", imageSrc); // important
//                 }

//                 console.log("Outdoor item dragging:", itemData);
//             });
//         });

//         // Setup images for outdoor cards
//         setupFurnitureCardImages(view);
//     }

//     function initializeOutdoorCards() {
//         Object.values(outdoorViews).forEach(function (viewId) {
//             const view = document.getElementById(viewId);
//             if (view) {
//                 setupOutdoorCards(view);
//             }
//         });
//     }

//     function initializeOutdoorSystem() {
//         initializeOutdoorCategories();
//         initializeOutdoorCards();
//         console.log("Outdoor system initialized.");
//     }

//     if (document.readyState === "loading") {
//         document.addEventListener("DOMContentLoaded", initializeOutdoorSystem);
//     } else {
//         initializeOutdoorSystem();
//     }
// })();

// /* =========================================================
//    CONSTRUCTION BACK BUTTON
// ========================================================= */
// function closeConstructionCategory() {
//     console.log("Construction Back clicked");

//     const constructionViews = [
//         "constructionDoorsView",
//         "constructionWindowsView",
//         "constructionStairsView",
//         "constructionArchsView",
//         "constructionPartitionView",
//         "constructionRoofsView",
//         "constructionFireplaceView",
//         "constructionColumnView",
//         "constructionTerraceView",
//         "constructionFencesView"
//     ];

//     constructionViews.forEach(function (viewId) {
//         const view = document.getElementById(viewId);
//         if (view) {
//             view.style.display = "none";
//             view.classList.remove("active");
//         }
//     });

//     const constructionSection = document.querySelector(".construction-section");
//     if (constructionSection) {
//         constructionSection.style.display = "block";
//     }

//     window.currentConstructionCategory = null;
//     window.selectedConstructionModel = null;
//     window.selectedConstructionType = null;

//     console.log("Back to Construction categories");
// }

// /* =====================================================
//    ROOM + WALL SELECTION SYSTEM
// ===================================================== */
// const propertiesBar = document.getElementById("propertiesBar");
// const selectionToolbar = document.getElementById("selectionToolbar");
// const roomSelectionBox = document.getElementById("roomSelectionBox");
// const roomElement = document.getElementById("room");
// const actionMove = document.getElementById("actionMove");
// const actionRotate = document.getElementById("actionRotate");
// const actionDuplicate = document.getElementById("actionDuplicate");
// const actionDelete = document.getElementById("actionDelete");

// let currentSelectionType = null;
// let currentWallObject = null;

// function hideSelectionUI() {
//     if (propertiesBar) {
//         propertiesBar.classList.remove("room-properties-visible");
//     }
//     if (selectionToolbar) {
//         selectionToolbar.style.display = "none";
//     }
//     if (roomSelectionBox) {
//         roomSelectionBox.style.display = "none";
//     }
//     if (roomElement) {
//         roomElement.classList.remove("room-selected");
//     }
//     removeWallHighlight();
//     currentSelectionType = null;
//     currentWallObject = null;
// }

// function showRoomPropertiesOnly() {
//     if (!propertiesBar) return;

//     propertiesBar.classList.add("room-properties-visible");

//     if (widthInput) {
//         widthInput.value = roomData.width + " cm";
//     }
//     if (depthInput) {
//         depthInput.value = roomData.depth + " cm";
//     }
//     if (heightInput) {
//         heightInput.value = roomData.height + " cm";
//     }
//     if (angleInput) {
//         angleInput.value = roomData.angle + "°";
//     }
//     if (elevationInput) {
//         elevationInput.value = roomData.elevation + " cm";
//     }
// }

// function updateRoomSelectionBox() {
//     if (!roomElement || !roomSelectionBox) {
//         return;
//     }

//     const rect = roomElement.getBoundingClientRect();

//     roomSelectionBox.style.display = "block";
//     roomSelectionBox.style.left = rect.left + "px";
//     roomSelectionBox.style.top = rect.top + "px";
//     roomSelectionBox.style.width = rect.width + "px";
//     roomSelectionBox.style.height = rect.height + "px";
// }

// function positionToolbar(left, top) {
//     if (!selectionToolbar) return;

//     selectionToolbar.style.display = "flex";
//     selectionToolbar.style.left = left + "px";
//     selectionToolbar.style.top = top + "px";
// }

// function selectCompleteRoom() {
//     hideSelectionUI();

//     currentSelectionType = "room";

//     if (roomElement) {
//         roomElement.classList.add("room-selected");
//     }

//     if (canvas) {
//         canvas.discardActiveObject();
//         canvas.renderAll();
//     }

//     showRoomPropertiesOnly();

//     requestAnimationFrame(function () {
//         updateRoomSelectionBox();

//         const rect = roomElement.getBoundingClientRect();

//         positionToolbar(
//             rect.left + rect.width / 2 - 90,
//             rect.top - 55
//         );
//     });
// }

// if (roomElement) {
//     roomElement.addEventListener("click", function (event) {
//         event.stopPropagation();
//         selectCompleteRoom();
//     });
// }

// let wallHighlight = null;

// function createWallHighlight() {
//     if (wallHighlight) return;

//     wallHighlight = document.createElement("div");
//     wallHighlight.className = "wall-selected-highlight";
//     document.body.appendChild(wallHighlight);
// }

// function removeWallHighlight() {
//     if (wallHighlight) {
//         wallHighlight.remove();
//         wallHighlight = null;
//     }
// }

// function selectWall(object) {
//     hideSelectionUI();

//     currentSelectionType = "wall";
//     currentWallObject = object;

//     createWallHighlight();

//     const rect = object.getBoundingRect();
//     const canvasRect = canvas.upperCanvasEl.getBoundingClientRect();
//     const left = canvasRect.left + rect.left;
//     const top = canvasRect.top + rect.top;

//     wallHighlight.style.left = left + "px";
//     wallHighlight.style.top = top + "px";
//     wallHighlight.style.width = rect.width + "px";
//     wallHighlight.style.height = rect.height + "px";

//     positionToolbar(
//         left + rect.width / 2 - 90,
//         Math.max(10, top - 55)
//     );

//     if (propertiesBar) {
//         propertiesBar.classList.remove("room-properties-visible");
//     }
// }

// canvas.on("selection:created", function (event) {
//     const object = event.selected && event.selected[0];

//     if (!object) return;

//     if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
//         selectWall(object);
//         return;
//     }

//     if (object.itemType === "RoomShape" || object.isRoomShape === true) {
//         selectCompleteRoom();
//         return;
//     }

//     hideSelectionUI();
//     currentSelectionType = "furniture";
//     updateFurnitureProperties(object);
// });

// canvas.on("selection:updated", function (event) {
//     const object = event.selected && event.selected[0];

//     if (!object) return;

//     if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
//         selectWall(object);
//         return;
//     }

//     if (object.itemType === "RoomShape" || object.isRoomShape === true) {
//         selectCompleteRoom();
//         return;
//     }

//     hideSelectionUI();
//     currentSelectionType = "furniture";
//     updateFurnitureProperties(object);
// });

// canvas.on("selection:cleared", function () {
//     if (currentSelectionType !== "room") {
//         hideSelectionUI();
//     }
// });

// function updateFurnitureProperties(object) {
//     if (widthInput) {
//         widthInput.value = Math.round(object.getScaledWidth()) + " cm";
//     }
//     if (depthInput) {
//         depthInput.value = Math.round(object.getScaledHeight()) + " cm";
//     }
//     if (heightInput) {
//         heightInput.value = object.objectHeight || "65 cm";
//     }
//     if (angleInput) {
//         angleInput.value = Math.round(object.angle || 0) + "°";
//     }
//     if (elevationInput) {
//         elevationInput.value = object.elevation || "0 cm";
//     }

//     if (propertiesBar) {
//         propertiesBar.classList.add("room-properties-visible");
//     }
// }

// if (actionMove) {
//     actionMove.addEventListener("click", function (event) {
//         event.stopPropagation();

//         if (currentSelectionType === "room") {
//             roomElement.style.cursor = "move";
//             return;
//         }

//         if (currentSelectionType === "wall" && currentWallObject) {
//             canvas.setActiveObject(currentWallObject);
//             currentWallObject.set({
//                 selectable: true,
//                 evented: true
//             });
//             canvas.renderAll();
//         }
//     });
// }

// if (actionRotate) {
//     actionRotate.addEventListener("click", function (event) {
//         event.stopPropagation();

//         if (currentSelectionType === "room") {
//             roomData.angle = (roomData.angle + 90) % 360;
//             updateRoom();
//             sendRoomDataTo3D();
//             updateRoomSelectionBox();
//             return;
//         }

//         if (currentWallObject) {
//             currentWallObject.rotate((currentWallObject.angle || 0) + 90);
//             currentWallObject.setCoords();
//             canvas.renderAll();
//         }
//     });
// }

// if (actionDuplicate) {
//     actionDuplicate.addEventListener("click", function (event) {
//         event.stopPropagation();

//         if (currentSelectionType === "wall" && currentWallObject) {
//             currentWallObject.clone(function (cloned) {
//                 cloned.set({
//                     left: (cloned.left || 0) + 20,
//                     top: (cloned.top || 0) + 20
//                 });
//                 canvas.add(cloned);
//                 canvas.setActiveObject(cloned);
//                 canvas.renderAll();
//             });
//             return;
//         }

//         const activeObject = canvas.getActiveObject();
//         if (activeObject && currentSelectionType === "furniture") {
//             activeObject.clone(function (cloned) {
//                 cloned.set({
//                     left: (cloned.left || 0) + 20,
//                     top: (cloned.top || 0) + 20
//                 });
//                 canvas.add(cloned);
//                 canvas.setActiveObject(cloned);
//                 canvas.renderAll();
//             });
//         }
//     });
// }

// if (actionDelete) {
//     actionDelete.addEventListener("click", function (event) {
//         event.stopPropagation();

//         if (currentSelectionType === "wall" && currentWallObject) {
//             canvas.remove(currentWallObject);
//             canvas.discardActiveObject();
//             canvas.renderAll();
//             removeWallHighlight();
//             sendWallsTo3D();
//             hideSelectionUI();
//             return;
//         }

//         const activeObject = canvas.getActiveObject();
//         if (activeObject && currentSelectionType === "furniture") {
//             canvas.remove(activeObject);
//             canvas.discardActiveObject();
//             canvas.renderAll();
//             hideSelectionUI();
//         }

//         if (currentSelectionType === "room") {
//             console.log("Room cannot be deleted.");
//         }
//     });
// }

// const bottomDelete = document.getElementById("deleteFurniture");

// if (bottomDelete) {
//     bottomDelete.addEventListener("click", function (event) {
//         event.stopPropagation();

//         if (currentSelectionType === "wall" && currentWallObject) {
//             canvas.remove(currentWallObject);
//             canvas.discardActiveObject();
//             canvas.renderAll();
//             sendWallsTo3D();
//             hideSelectionUI();
//             return;
//         }

//         const object = canvas.getActiveObject();
//         if (object && currentSelectionType === "furniture") {
//             canvas.remove(object);
//             canvas.discardActiveObject();
//             canvas.renderAll();
//             hideSelectionUI();
//         }
//     });
// }

// canvas.on("mouse:down", function (event) {
//     if (!event.target) {
//         hideSelectionUI();
//     }
// });

// window.addEventListener("resize", function () {
//     if (currentSelectionType === "room") {
//         updateRoomSelectionBox();
//     }
// });

// function refreshRoomSelection() {
//     if (currentSelectionType === "room") {
//         updateRoomSelectionBox();
//         showRoomPropertiesOnly();
//     }
// }

// /* =========================================================
//    ROOM & WALL SELECTION (INDEPENDENT SYSTEM)
// ========================================================= */
// (function () {
//     "use strict";

//     const roomEl = document.getElementById('room');
//     const canvasEl = canvas;

//     if (!roomEl || !canvasEl) {
//         console.warn('Room or Canvas not found');
//         return;
//     }

//     let isRoomSelected = false;
//     let selectedWall = null;
//     let wallHighlightDiv = null;
//     let wallIconDiv = null;
//     let roomBadge = null;

//     function getAllWalls() {
//         return canvasEl.getObjects().filter(obj => {
//             return obj.itemType === 'Wall' ||
//                 obj.itemType === 'RoomShape' ||
//                 obj.type === 'line' ||
//                 obj.isWall === true;
//         });
//     }

//     function setWallColor(wall, color) {
//         if (!wall) return;
//         wall.set({ stroke: color });
//         wall.setCoords();
//     }

//     function resetWallColor(wall) {
//         setWallColor(wall, '#586a6d');
//     }

//     function highlightWall(wall) {
//         setWallColor(wall, '#00cc44');
//     }

//     function resetAllWalls() {
//         getAllWalls().forEach(w => resetWallColor(w));
//         canvasEl.renderAll();
//     }

//     function distToSegment(px, py, x1, y1, x2, y2) {
//         const dx = x2 - x1;
//         const dy = y2 - y1;
//         const lenSq = dx * dx + dy * dy;
//         if (lenSq === 0) {
//             return Math.hypot(px - x1, py - y1);
//         }
//         let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
//         t = Math.max(0, Math.min(1, t));
//         const nearX = x1 + t * dx;
//         const nearY = y1 + t * dy;
//         return Math.hypot(px - nearX, py - nearY);
//     }

//     function findWallAtPointer(e) {
//         const pointer = canvasEl.getPointer(e);
//         const walls = getAllWalls();
//         const threshold = 15;

//         for (let i = walls.length - 1; i >= 0; i--) {
//             const wall = walls[i];
//             let x1, y1, x2, y2;
//             if (wall.type === 'line') {
//                 x1 = wall.x1;
//                 y1 = wall.y1;
//                 x2 = wall.x2;
//                 y2 = wall.y2;
//             } else {
//                 const rect = wall.getBoundingRect();
//                 x1 = rect.left;
//                 y1 = rect.top;
//                 x2 = rect.left + rect.width;
//                 y2 = rect.top + rect.height;
//             }
//             const dist = distToSegment(pointer.x, pointer.y, x1, y1, x2, y2);
//             if (dist < threshold) {
//                 return wall;
//             }
//         }
//         return null;
//     }

//     function clearSelectionUI() {
//         if (roomBadge) {
//             roomBadge.remove();
//             roomBadge = null;
//         }
//         roomEl.classList.remove('room-selected');
//         isRoomSelected = false;

//         if (wallHighlightDiv) {
//             wallHighlightDiv.remove();
//             wallHighlightDiv = null;
//         }
//         if (wallIconDiv) {
//             wallIconDiv.remove();
//             wallIconDiv = null;
//         }
//         if (selectedWall) {
//             resetWallColor(selectedWall);
//             selectedWall = null;
//         }
//         resetAllWalls();
//         canvasEl.renderAll();
//     }

//     function showWallUI(wall) {
//         if (wallHighlightDiv) wallHighlightDiv.remove();
//         if (wallIconDiv) wallIconDiv.remove();

//         const rect = wall.getBoundingRect();
//         const canvasRect = canvasEl.upperCanvasEl.getBoundingClientRect();
//         const left = canvasRect.left + rect.left;
//         const top = canvasRect.top + rect.top;
//         const width = rect.width || 20;
//         const height = rect.height || 20;

//         wallHighlightDiv = document.createElement('div');
//         wallHighlightDiv.className = 'wall-selected-highlight';
//         wallHighlightDiv.style.left = (left - 4) + 'px';
//         wallHighlightDiv.style.top = (top - 4) + 'px';
//         wallHighlightDiv.style.width = (width + 8) + 'px';
//         wallHighlightDiv.style.height = (height + 8) + 'px';
//         document.body.appendChild(wallHighlightDiv);

//         wallIconDiv = document.createElement('div');
//         wallIconDiv.className = 'wall-selection-icon';
//         wallIconDiv.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
//         wallIconDiv.style.left = (left + width + 4) + 'px';
//         wallIconDiv.style.top = (top - 14) + 'px';
//         document.body.appendChild(wallIconDiv);
//     }

//     function selectWall(wall) {
//         if (isRoomSelected) {
//             clearSelectionUI();
//         }

//         if (selectedWall === wall) {
//             resetWallColor(wall);
//             selectedWall = null;
//             if (wallHighlightDiv) wallHighlightDiv.remove();
//             if (wallIconDiv) wallIconDiv.remove();
//             wallHighlightDiv = null;
//             wallIconDiv = null;
//             canvasEl.renderAll();
//             return;
//         }

//         if (selectedWall) {
//             resetWallColor(selectedWall);
//         }

//         selectedWall = wall;
//         highlightWall(wall);
//         showWallUI(wall);
//         canvasEl.renderAll();
//     }

//     function selectRoom() {
//         if (selectedWall) {
//             resetWallColor(selectedWall);
//             selectedWall = null;
//             if (wallHighlightDiv) wallHighlightDiv.remove();
//             if (wallIconDiv) wallIconDiv.remove();
//             wallHighlightDiv = null;
//             wallIconDiv = null;
//         }

//         isRoomSelected = !isRoomSelected;

//         if (isRoomSelected) {
//             getAllWalls().forEach(w => highlightWall(w));
//             canvasEl.renderAll();

//             if (!roomBadge) {
//                 roomBadge = document.createElement('div');
//                 roomBadge.className = 'room-selection-badge';
//                 roomBadge.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Room Selected';
//                 roomEl.style.position = 'relative';
//                 roomEl.appendChild(roomBadge);
//             }
//             roomEl.classList.add('room-selected');
//         } else {
//             resetAllWalls();
//             canvasEl.renderAll();
//             if (roomBadge) {
//                 roomBadge.remove();
//                 roomBadge = null;
//             }
//             roomEl.classList.remove('room-selected');
//         }
//     }

//     roomEl.addEventListener('click', function (e) {
//         if (e.target.closest('.room-selection-badge') ||
//             e.target.closest('.wall-selection-icon')) {
//             return;
//         }
//         e.stopPropagation();
//         selectRoom();
//     }, true);

//     canvasEl.on('mouse:down', function (opt) {
//         const e = opt.e;
//         const target = opt.target;

//         if (target && target.itemType &&
//             target.itemType !== 'Wall' &&
//             target.itemType !== 'RoomShape' &&
//             target.type !== 'line') {
//             clearSelectionUI();
//             return;
//         }

//         const wall = findWallAtPointer(e);
//         if (wall) {
//             e.stopPropagation && e.stopPropagation();
//             selectWall(wall);
//         } else {
//             clearSelectionUI();
//         }
//     });

//     let resizeTimer;
//     window.addEventListener('resize', function () {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(() => {
//             if (selectedWall) {
//                 showWallUI(selectedWall);
//             }
//         }, 100);
//     });

//     clearSelectionUI();
//     console.log('✅ Room & Wall Selection (Independent) loaded successfully!');
// })();

// // ============================================================
// //  UNDO / REDO SYSTEM
// // ============================================================
// (function () {
//     "use strict";

//     const MAX_HISTORY = 50;
//     let undoStack = [];
//     let redoStack = [];
//     let isRestoring = false;

//     function saveState() {
//         if (isRestoring) return;

//         const json = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
//         if (undoStack.length > 0) {
//             const last = undoStack[undoStack.length - 1];
//             if (JSON.stringify(last) === JSON.stringify(json)) {
//                 return;
//             }
//         }
//         undoStack.push(json);
//         if (undoStack.length > MAX_HISTORY) {
//             undoStack.shift();
//         }
//         redoStack = [];
//         updateUndoRedoButtons();
//     }

//     function undo() {
//         if (undoStack.length <= 1) {
//             console.log('Nothing to undo');
//             return;
//         }
//         const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
//         redoStack.push(current);

//         const target = undoStack[undoStack.length - 2];
//         if (!target) return;

//         isRestoring = true;
//         canvas.clear();
//         canvas.loadFromJSON(target, function () {
//             canvas.renderAll();
//             isRestoring = false;
//             if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
//             if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
//             updateUndoRedoButtons();
//         });
//     }

//     function redo() {
//         if (redoStack.length === 0) {
//             console.log('Nothing to redo');
//             return;
//         }
//         const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
//         undoStack.push(current);

//         const next = redoStack.pop();
//         isRestoring = true;
//         canvas.clear();
//         canvas.loadFromJSON(next, function () {
//             canvas.renderAll();
//             isRestoring = false;
//             if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
//             if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
//             updateUndoRedoButtons();
//         });
//     }

//     function updateUndoRedoButtons() {
//         const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
//         const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
//         if (undoBtn) {
//             undoBtn.style.opacity = (undoStack.length > 1) ? '1' : '0.4';
//             undoBtn.style.pointerEvents = (undoStack.length > 1) ? 'auto' : 'none';
//         }
//         if (redoBtn) {
//             redoBtn.style.opacity = (redoStack.length > 0) ? '1' : '0.4';
//             redoBtn.style.pointerEvents = (redoStack.length > 0) ? 'auto' : 'none';
//         }
//     }

//     canvas.on('object:added', saveState);
//     canvas.on('object:modified', saveState);
//     canvas.on('object:removed', saveState);

//     setTimeout(function () {
//         saveState();
//         updateUndoRedoButtons();
//     }, 100);

//     window.undoAction = undo;
//     window.redoAction = redo;
//     window.saveCanvasState = saveState;

//     document.addEventListener('DOMContentLoaded', function () {
//         const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
//         const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
//         if (undoBtn) {
//             undoBtn.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 undo();
//             });
//         }
//         if (redoBtn) {
//             redoBtn.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 redo();
//             });
//         }
//         updateUndoRedoButtons();
//     });
// })();

// /**
//  * FURNITURE CATEGORY CLICK HANDLER
//  * Makes all categories clickable and shows thumbnails.
//  */
// document.addEventListener('DOMContentLoaded', function () {
//     const furnitureItems = document.querySelectorAll('.furniture-item');
//     const categoriesDiv = document.getElementById('categories');
//     const furniturePanel = document.getElementById('furniturePanel');
//     const backBtn = document.getElementById('furnitureBackBtn');

//     const VIEW_MAP = {
//         'Armchairs': 'armchairsView',
//         'Sofa': 'sofasView'
//     };

//     const DISPLAY_NAMES = {
//         'Armchairs': 'Armchairs',
//         'Sofa': 'Sofas',
//         'Ottoman': 'Ottoman',
//         'Bed': 'Beds',
//         'Storage': 'Storage',
//         'Table': 'Tables, chairs',
//         'Office Desk': 'Office furniture',
//         'Children Furniture': "Children's furniture",
//         'Kitchen': 'Kitchen',
//         'Bathroom': 'Bathroom'
//     };

//     const ICON_MAP = {
//         'Armchairs': 'fa-chair',
//         'Sofa': 'fa-couch',
//         'Ottoman': 'fa-cube',
//         'Bed': 'fa-bed',
//         'Storage': 'fa-box',
//         'Table': 'fa-table',
//         'Office Desk': 'fa-desktop',
//         'Children Furniture': 'fa-child',
//         'Kitchen': 'fa-kitchen-set',
//         'Bathroom': 'fa-bath'
//     };

//     const THUMB_COUNT = 12;

//     function hideAllSubViews() {
//         document.querySelectorAll('.subcategory-view').forEach(v => v.style.display = 'none');
//         const dyn = document.getElementById('dynamicCategoryView');
//         if (dyn) dyn.remove();
//     }

//     function showBuiltView(viewId) {
//         hideAllSubViews();
//         if (categoriesDiv) categoriesDiv.style.display = 'none';
//         const view = document.getElementById(viewId);
//         if (view) {
//             view.style.display = 'block';
//             setupFurnitureCardImages(view);
//             return true;
//         }
//         return false;
//     }

//     function generateDynamicView(category) {
//         const oldDyn = document.getElementById('dynamicCategoryView');
//         if (oldDyn) oldDyn.remove();

//         hideAllSubViews();
//         if (categoriesDiv) categoriesDiv.style.display = 'none';

//         const view = document.createElement('div');
//         view.id = 'dynamicCategoryView';
//         view.className = 'subcategory-view';
//         view.style.display = 'block';

//         const heading = document.createElement('div');
//         heading.className = 'subcategory-heading';
//         heading.innerHTML = `<span>${DISPLAY_NAMES[category] || category}</span>`;
//         view.appendChild(heading);

//         const grid = document.createElement('div');
//         grid.className = 'furniture-grid';

//         const iconClass = ICON_MAP[category] || 'fa-cube';
//         const displayName = DISPLAY_NAMES[category] || category;
//         const folder = category.toLowerCase().replace(/\s/g, '');

//         for (let i = 1; i <= THUMB_COUNT; i++) {
//             const card = document.createElement('div');
//             card.className = 'furniture-card';
//             card.draggable = true;
//             card.dataset.type = category;
//             card.dataset.model = `models/${folder}/${folder}${i}.glb`;

//             const imageDiv = document.createElement('div');
//             imageDiv.className = 'card-image';

//             const img = document.createElement('img');
//             img.src = `models/${folder}/${folder}${i}.png`;
//             img.alt = `${displayName} ${i}`;
//             img.className = 'furniture-thumbnail';
//             img.loading = 'lazy';

//             // Use our enhanced image loader
//             loadImageWithFallback(img, img.src, category, i);

//             imageDiv.appendChild(img);

//             const fallback = document.createElement('i');
//             fallback.className = `fa-solid ${iconClass} thumbnail-fallback`;
//             fallback.style.display = 'none';
//             imageDiv.appendChild(fallback);

//             card.appendChild(imageDiv);

//             const nameSpan = document.createElement('div');
//             nameSpan.className = 'card-name';
//             nameSpan.textContent = `${displayName} ${i}`;
//             card.appendChild(nameSpan);

//             grid.appendChild(card);
//         }

//         view.appendChild(grid);

//         const panel = furniturePanel || document.getElementById('furniturePanel');
//         const lastView = panel.querySelector('.subcategory-view:last-of-type');
//         if (lastView) {
//             lastView.parentNode.insertBefore(view, lastView.nextSibling);
//         } else {
//             panel.appendChild(view);
//         }

//         setupFurnitureCardImages(view);
//         return view;
//     }

//     function handleCategoryClick(category) {
//         furnitureItems.forEach(el => el.classList.remove('active'));

//         const target = Array.from(furnitureItems).find(
//             el => (el.dataset.category || el.dataset.type) === category
//         );
//         if (target) target.classList.add('active');

//         const viewId = VIEW_MAP[category];
//         if (viewId) {
//             showBuiltView(viewId);
//             return;
//         }

//         generateDynamicView(category);
//     }

//     function goBackToCategories() {
//         hideAllSubViews();
//         if (categoriesDiv) categoriesDiv.style.display = 'block';
//         furnitureItems.forEach(el => el.classList.remove('active'));
//     }

//     furnitureItems.forEach(item => {
//         item.addEventListener('click', function (e) {
//             e.stopPropagation();

//             const category = this.dataset.category || this.dataset.type;
//             if (!category) return;

//             handleCategoryClick(category);
//         });

//         item.style.cursor = 'pointer';
//         item.setAttribute('role', 'button');
//         item.setAttribute('tabindex', '0');
//         item.addEventListener('keydown', function (e) {
//             if (e.key === 'Enter' || e.key === ' ') {
//                 e.preventDefault();
//                 this.click();
//             }
//         });
//     });

//     if (backBtn) {
//         backBtn.addEventListener('click', function (e) {
//             e.stopPropagation();
//             goBackToCategories();
//         });
//     }

//     console.log('✅ Furniture categories are now clickable!');
// });
/* =====================================================
   DESIGN.JS
   Home Interior Design Project
   2D Fabric.js + 3D Three.js Integration

   FIXES:
   - All category images now load with proper fallbacks
   - Consistent path handling for Furniture, Construction, Outdoor
   - Placeholder generation for missing images
   - Drag & drop works with all items (specific image per card)
   - 3D sync for all objects
   - NEW: 2D images are used as textures in 3D (no GLB needed)
===================================================== */

// =====================================================
// 3D IMAGE TEXTURE MODE (set false to use GLB models)
// =====================================================
window.USE_2D_IMAGE_IN_3D = true;  // true: use 2D image in 3D, false: load GLB model

/* =====================================================
   CREATE FABRIC CANVAS
===================================================== */
const canvas = new fabric.Canvas("floorCanvas", {
    selection: true,
    preserveObjectStacking: true
});

/* =====================================================
   ROOM & INPUT ELEMENTS
===================================================== */
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

/* =====================================================
   ROOM DATA
===================================================== */
let roomData = {
    width: 500,
    depth: 300,
    height: 280,
    angle: 0,
    elevation: 0
};

window.roomData = roomData;

/* =====================================================
   DRAWN WALL DATA
===================================================== */
window.roomWallData = {
    points: [],
    walls: [],
    closed: false,
    shape: "custom"
};

/* =====================================================
   NUMBER HELPER
===================================================== */
function getNumber(value) {
    return parseFloat(
        String(value)
            .replace("cm", "")
            .replace("°", "")
            .trim()
    );
}

/* =====================================================
   SEND ROOM DATA TO THREE.JS
===================================================== */
function sendRoomDataTo3D() {
    window.roomData = {
        width: roomData.width,
        depth: roomData.depth,
        height: roomData.height,
        angle: roomData.angle,
        elevation: roomData.elevation
    };

    window.dispatchEvent(
        new CustomEvent("roomDataUpdated", {
            detail: window.roomData
        })
    );

    if (typeof updateThreeRoom === "function") {
        updateThreeRoom(window.roomData);
    }
    if (typeof update3DRoom === "function") {
        update3DRoom(window.roomData);
    }
    if (typeof rebuildThreeRoom === "function") {
        rebuildThreeRoom(window.roomData);
    }
}

/* =====================================================
   SEND WALL DATA TO THREE.JS
===================================================== */
function sendWallsTo3D() {
    const data = {
        points: window.roomWallData.points,
        walls: window.roomWallData.walls,
        closed: window.roomWallData.closed,
        shape: window.roomWallData.shape,
        room: {
            width: roomData.width,
            depth: roomData.depth,
            height: roomData.height
        }
    };

    window.roomWallData = data;

    window.dispatchEvent(
        new CustomEvent("roomWallsUpdated", {
            detail: data
        })
    );

    if (typeof updateThreeWalls === "function") {
        updateThreeWalls(data);
    }
    if (typeof createThreeWalls === "function") {
        createThreeWalls(data);
    }
    if (typeof rebuildThreeWalls === "function") {
        rebuildThreeWalls(data);
    }
    if (typeof update3DFromWalls === "function") {
        update3DFromWalls(data);
    }
}

/* =====================================================
   UPDATE ROOM
===================================================== */
function updateRoom() {
    if (!room) {
        sendRoomDataTo3D();
        return;
    }

    room.style.width = roomData.width + "px";
    room.style.height = roomData.depth + "px";
    room.style.transform = "rotate(" + roomData.angle + "deg)";

    canvas.setDimensions({
        width: roomData.width,
        height: roomData.depth
    });

    canvas.calcOffset();
    canvas.renderAll();

    if (widthInput) widthInput.value = roomData.width + " cm";
    if (depthInput) depthInput.value = roomData.depth + " cm";
    if (heightInput) heightInput.value = roomData.height + " cm";
    if (angleInput) angleInput.value = roomData.angle + "°";
    if (elevationInput) elevationInput.value = roomData.elevation + " cm";

    const widthMeter = (roomData.width / 100).toFixed(1);
    const depthMeter = (roomData.depth / 100).toFixed(1);

    if (topDimension) topDimension.innerText = widthMeter + " m";
    if (bottomDimension) bottomDimension.innerText = widthMeter + " m";
    if (leftDimension) leftDimension.innerText = depthMeter + " m";
    if (rightDimension) rightDimension.innerText = depthMeter + " m";

    const area = (roomData.width / 100) * (roomData.depth / 100);
    const label = room.querySelector(".label");

    if (label) {
        label.innerText = "Room (" + area.toFixed(1) + " m²)";
    }

    sendRoomDataTo3D();
}

/* =====================================================
   ROOM INPUT LISTENERS
===================================================== */
if (widthInput) {
    widthInput.addEventListener("change", function () {
        const val = getNumber(this.value);
        if (!isNaN(val) && val > 0) {
            roomData.width = val;
        }
        updateRoom();
    });
}

if (depthInput) {
    depthInput.addEventListener("change", function () {
        const val = getNumber(this.value);
        if (!isNaN(val) && val > 0) {
            roomData.depth = val;
        }
        updateRoom();
    });
}

if (heightInput) {
    heightInput.addEventListener("change", function () {
        const val = getNumber(this.value);
        if (!isNaN(val) && val > 0) {
            roomData.height = val;
        }
        updateRoom();
    });
}

if (angleInput) {
    angleInput.addEventListener("change", function () {
        const val = getNumber(this.value);
        if (!isNaN(val)) {
            roomData.angle = val;
        }
        updateRoom();
    });
}

if (elevationInput) {
    elevationInput.addEventListener("change", function () {
        const val = getNumber(this.value);
        if (!isNaN(val) && val >= 0) {
            roomData.elevation = val;
        }
        updateRoom();
    });
}

updateRoom();

/* =====================================================
   IMAGE LOADER WITH PLACEHOLDER GENERATION
===================================================== */
const categoryColors = {
    'Armchair': '#d4a574',
    'Armchairs': '#d4a574',
    'Sofa': '#b8a08a',
    'Sofas': '#b8a08a',
    'Ottoman': '#c9b99a',
    'Bed': '#a8b5c4',
    'Beds': '#a8b5c4',
    'Storage': '#b8a88a',
    'Table': '#c4b8a0',
    'Tables, chairs': '#c4b8a0',
    'Office Desk': '#8a9a8a',
    'Office furniture': '#8a9a8a',
    'Children Furniture': '#f0c8b0',
    "Children's furniture": '#f0c8b0',
    'Kitchen': '#d4c8b0',
    'Bathroom': '#a8d4d4',
    'Door': '#8B7355',
    'Doors': '#8B7355',
    'Window': '#87CEEB',
    'Windows': '#87CEEB',
    'Stairs': '#A0A0A0',
    'Arch': '#c4b0a0',
    'Archs': '#c4b0a0',
    'Partition': '#b8b8c0',
    'Roof': '#8a7a6a',
    'Roofs': '#8a7a6a',
    'Fireplace': '#cc8866',
    'Column': '#b0a898',
    'Terrace': '#a8b89a',
    'Fence': '#8a7a6a',
    'Fences & Gates': '#8a7a6a',
    'Path and Lawn': '#8aba7a',
    'Path and Lawns': '#8aba7a',
    'Patio': '#c4b89a',
    'Tree and Plant': '#6aaa5a',
    'Trees and Plants': '#6aaa5a',
    'Garage': '#8a8a8a',
    'Pool': '#6ac4d4',
    'Outdoor Lighting': '#d4d480',
    'Lighting': '#d4d480',
    'Outdoor Activity': '#d4a86a',
    'Outdoor Activities': '#d4a86a',
    'Garden': '#6aaa5a'
};

function getCategoryColor(category) {
    return categoryColors[category] || '#cccccc';
}

function generatePlaceholderImage(category, index, width = 120, height = 120) {
    const canvasEl = document.createElement('canvas');
    canvasEl.width = width;
    canvasEl.height = height;
    const ctx = canvasEl.getContext('2d');

    const color = getCategoryColor(category);

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, color);
    grad.addColorStop(1, darkenColor(color, 30));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Icon
    const iconMap = {
        'Armchair': 'fa-chair',
        'Armchairs': 'fa-chair',
        'Sofa': 'fa-couch',
        'Sofas': 'fa-couch',
        'Ottoman': 'fa-cube',
        'Bed': 'fa-bed',
        'Beds': 'fa-bed',
        'Storage': 'fa-box',
        'Table': 'fa-table',
        'Tables, chairs': 'fa-table',
        'Office Desk': 'fa-desktop',
        'Office furniture': 'fa-desktop',
        'Children Furniture': 'fa-child',
        "Children's furniture": 'fa-child',
        'Kitchen': 'fa-kitchen-set',
        'Bathroom': 'fa-bath',
        'Door': 'fa-door-open',
        'Doors': 'fa-door-open',
        'Window': 'fa-window-maximize',
        'Windows': 'fa-window-maximize',
        'Stairs': 'fa-stairs',
        'Arch': 'fa-archway',
        'Archs': 'fa-archway',
        'Partition': 'fa-table-columns',
        'Roof': 'fa-house',
        'Roofs': 'fa-house',
        'Fireplace': 'fa-fire',
        'Column': 'fa-building-columns',
        'Terrace': 'fa-umbrella-beach',
        'Fence': 'fa-fence',
        'Fences & Gates': 'fa-fence',
        'Path and Lawn': 'fa-road',
        'Path and Lawns': 'fa-road',
        'Patio': 'fa-umbrella-beach',
        'Tree and Plant': 'fa-tree',
        'Trees and Plants': 'fa-tree',
        'Garage': 'fa-warehouse',
        'Pool': 'fa-person-swimming',
        'Outdoor Lighting': 'fa-lightbulb',
        'Lighting': 'fa-lightbulb',
        'Outdoor Activity': 'fa-volleyball',
        'Outdoor Activities': 'fa-volleyball',
        'Garden': 'fa-seedling'
    };

    const iconClass = iconMap[category] || 'fa-cube';

    // Draw icon (simplified using canvas text as we can't load FontAwesome here)
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪑', width / 2, height / 2 - 10);

    // Category name
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const displayName = category.length > 12 ? category.substring(0, 10) + '…' : category;
    ctx.fillText(displayName, width / 2, height - 8);

    // Number
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '9px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText('#' + index, width / 2, 6);

    return canvasEl.toDataURL('image/png');
}

function darkenColor(hex, amount) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
        c = c.split('').map(ch => ch + ch).join('');
    }
    let r = parseInt(c.substring(0, 2), 16);
    let g = parseInt(c.substring(2, 4), 16);
    let b = parseInt(c.substring(4, 6), 16);
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/* =====================================================
   SMART IMAGE LOADER
===================================================== */
function loadImageWithFallback(imgElement, src, category, index) {
    if (!imgElement) return;

    imgElement.crossOrigin = 'anonymous';
    imgElement.loading = 'lazy';

    const fallbackSrc = generatePlaceholderImage(category, index);

    imgElement.src = src;
    imgElement.onerror = function () {
        this.style.display = 'none';
        const fallbackIcon = this.nextElementSibling;
        if (fallbackIcon) {
            fallbackIcon.style.display = 'block';
            // Use the placeholder as background if possible
            this.style.display = 'block';
            this.style.backgroundImage = `url(${fallbackSrc})`;
            this.style.backgroundSize = 'cover';
            this.style.backgroundPosition = 'center';
            this.src = fallbackSrc;
            this.onerror = null;
        }
    };

    // Also handle if image loads successfully
    imgElement.onload = function () {
        this.style.display = 'block';
        const fallbackIcon = this.nextElementSibling;
        if (fallbackIcon) {
            fallbackIcon.style.display = 'none';
        }
    };
}

/* =====================================================
   FURNITURE ITEM IMAGE LOADING (for all categories)
===================================================== */
function setupFurnitureCardImages(container) {
    const cards = container.querySelectorAll('.furniture-card');
    cards.forEach(function (card) {
        const img = card.querySelector('.furniture-thumbnail');
        if (!img) return;

        const type = card.dataset.type || card.dataset.category || 'Furniture';
        const alt = img.alt || type;
        const src = img.getAttribute('src');

        // Extract category and index from alt or src
        let category = type;
        let index = 1;

        const altMatch = alt.match(/(.+?)\s*(\d+)$/);
        if (altMatch) {
            category = altMatch[1];
            index = parseInt(altMatch[2]) || 1;
        }

        // Clean up category name
        category = category.trim();

        loadImageWithFallback(img, src, category, index);
    });
}

/* =====================================================
   DRAW WALLS
===================================================== */
let isDrawingWallMode = false;
let isDrawing = false;
let activeLine = null;
let activePoints = [];
let currentWallGroup = null;

const WALL_WIDTH = 10;

function startWallDrawing() {
    isDrawingWallMode = true;
    isDrawing = false;
    activePoints = [];
    window.roomWallData = {
        points: [],
        walls: [],
        closed: false,
        shape: "custom"
    };

    canvas.defaultCursor = "crosshair";
    canvas.selection = false;

    canvas.forEachObject(function (obj) {
        obj.selectable = false;
    });

    if (activeLine) {
        canvas.remove(activeLine);
        activeLine = null;
    }

    showDesignMessage(
        "Draw Walls: Click points to create your room. Double-click or press Enter to finish."
    );
}

function stopWallDrawing() {
    isDrawingWallMode = false;
    isDrawing = false;

    if (activeLine) {
        canvas.remove(activeLine);
        activeLine = null;
    }

    canvas.defaultCursor = "default";
    canvas.selection = true;

    canvas.forEachObject(function (obj) {
        obj.selectable = true;
    });

    canvas.renderAll();

    sendWallsTo3D();
    hideDesignMessage();
}

function toggleWallDrawing(enable) {
    if (enable === undefined) {
        enable = !isDrawingWallMode;
    }

    if (enable) {
        startWallDrawing();
    } else {
        stopWallDrawing();
    }
}

/* =====================================================
   FABRIC MOUSE DOWN
===================================================== */
canvas.on("mouse:down", function (o) {
    if (!isDrawingWallMode) return;

    const pointer = canvas.getPointer(o.e);

    if (activePoints.length === 0) {
        activePoints.push({
            x: pointer.x,
            y: pointer.y
        });
        isDrawing = true;

        createTemporaryWall(
            pointer.x,
            pointer.y,
            pointer.x,
            pointer.y
        );
        return;
    }

    const previous = activePoints[activePoints.length - 1];
    const newPoint = {
        x: pointer.x,
        y: pointer.y
    };

    activePoints.push(newPoint);

    createPermanentWall(previous, newPoint);

    window.roomWallData.walls.push({
        x1: previous.x,
        y1: previous.y,
        x2: newPoint.x,
        y2: newPoint.y
    });

    window.roomWallData.points = activePoints.map(function (p) {
        return {
            x: p.x,
            y: p.y
        };
    });

    sendWallsTo3D();

    if (activeLine) {
        canvas.remove(activeLine);
    }

    createTemporaryWall(
        pointer.x,
        pointer.y,
        pointer.x,
        pointer.y
    );

    canvas.renderAll();
});

function createPermanentWall(p1, p2) {
    const wallLine = new fabric.Line(
        [p1.x, p1.y, p2.x, p2.y],
        {
            stroke: "#586a6d",
            strokeWidth: WALL_WIDTH,
            strokeLineCap: "round",
            selectable: false,
            evented: false,
            itemType: "Wall",
            wallType: "room-wall"
        }
    );

    canvas.add(wallLine);
}

function createTemporaryWall(x1, y1, x2, y2) {
    if (activeLine) {
        canvas.remove(activeLine);
    }

    activeLine = new fabric.Line(
        [x1, y1, x2, y2],
        {
            stroke: "#198754",
            strokeWidth: 6,
            strokeDashArray: [5, 5],
            selectable: false,
            evented: false
        }
    );

    canvas.add(activeLine);
}

canvas.on("mouse:move", function (o) {
    if (!isDrawingWallMode || !isDrawing || !activeLine) {
        return;
    }

    const pointer = canvas.getPointer(o.e);

    activeLine.set({
        x2: pointer.x,
        y2: pointer.y
    });

    canvas.renderAll();
});

canvas.on("mouse:dblclick", function () {
    if (!isDrawingWallMode) return;
    finishWallDrawing();
});

function finishWallDrawing() {
    if (activePoints.length < 2) {
        stopWallDrawing();
        return;
    }

    const first = activePoints[0];
    const last = activePoints[activePoints.length - 1];

    const distance = Math.sqrt(
        Math.pow(first.x - last.x, 2) + Math.pow(first.y - last.y, 2)
    );

    if (distance > 15) {
        createPermanentWall(last, first);

        window.roomWallData.walls.push({
            x1: last.x,
            y1: last.y,
            x2: first.x,
            y2: first.y
        });
    }

    window.roomWallData.points = activePoints.map(function (p) {
        return {
            x: p.x,
            y: p.y
        };
    });

    window.roomWallData.closed = true;
    window.roomWallData.shape = "custom";

    sendWallsTo3D();
    canvas.renderAll();
    stopWallDrawing();
}

document.addEventListener("keydown", function (e) {
    if (!isDrawingWallMode) return;

    if (e.key === "Escape") {
        stopWallDrawing();
    }

    if (e.key === "Enter") {
        finishWallDrawing();
    }
});

function showDesignMessage(text) {
    let message = document.getElementById("designMessage");

    if (!message) {
        message = document.createElement("div");
        message.id = "designMessage";
        message.style.position = "fixed";
        message.style.left = "50%";
        message.style.top = "75px";
        message.style.transform = "translateX(-50%)";
        message.style.background = "#198754";
        message.style.color = "#fff";
        message.style.padding = "10px 18px";
        message.style.borderRadius = "8px";
        message.style.zIndex = "999999";
        message.style.fontSize = "13px";
        message.style.boxShadow = "0 4px 15px rgba(0,0,0,.2)";

        document.body.appendChild(message);
    }

    message.innerText = text;
    message.style.display = "block";
}

function hideDesignMessage() {
    const message = document.getElementById("designMessage");
    if (message) {
        message.style.display = "none";
    }
}

/* =====================================================
   ROOM SHAPES
===================================================== */
function clearCanvasFurnitureAndWalls() {
    const objects = canvas.getObjects();

    objects.forEach(function (obj) {
        if (obj.itemType === "Wall" || obj.itemType === "RoomShape") {
            canvas.remove(obj);
        }
    });

    activePoints = [];
    window.roomWallData = {
        points: [],
        walls: [],
        closed: false,
        shape: "custom"
    };
}

function createRoomShape(shape) {
    clearCanvasFurnitureAndWalls();

    const w = roomData.width;
    const h = roomData.depth;
    const cx = w / 2;
    const cy = h / 2;

    let points = [];

    if (shape === "rectangle") {
        points = [
            { x: 40, y: 40 },
            { x: w - 40, y: 40 },
            { x: w - 40, y: h - 40 },
            { x: 40, y: h - 40 }
        ];
    } else if (shape === "square") {
        const size = Math.min(w, h) - 80;
        const left = (w - size) / 2;
        const top = (h - size) / 2;

        points = [
            { x: left, y: top },
            { x: left + size, y: top },
            { x: left + size, y: top + size },
            { x: left, y: top + size }
        ];
    } else if (shape === "lshape") {
        points = [
            { x: 40, y: 40 },
            { x: w - 40, y: 40 },
            { x: w - 40, y: h * 0.55 },
            { x: w * 0.60, y: h * 0.55 },
            { x: w * 0.60, y: h - 40 },
            { x: 40, y: h - 40 }
        ];
    } else if (shape === "tshape") {
        points = [
            { x: w * 0.30, y: 40 },
            { x: w * 0.70, y: 40 },
            { x: w * 0.70, y: h * 0.35 },
            { x: w - 40, y: h * 0.35 },
            { x: w - 40, y: h - 40 },
            { x: 40, y: h - 40 },
            { x: 40, y: h * 0.35 },
            { x: w * 0.30, y: h * 0.35 }
        ];
    } else if (shape === "ushape") {
        points = [
            { x: 40, y: 40 },
            { x: w - 40, y: 40 },
            { x: w - 40, y: h - 40 },
            { x: w * 0.65, y: h - 40 },
            { x: w * 0.65, y: h * 0.45 },
            { x: w * 0.35, y: h * 0.45 },
            { x: w * 0.35, y: h - 40 },
            { x: 40, y: h - 40 }
        ];
    } else {
        return createRoomShape("rectangle");
    }

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];

        const wall = new fabric.Line(
            [p1.x, p1.y, p2.x, p2.y],
            {
                stroke: "#586a6d",
                strokeWidth: WALL_WIDTH,
                strokeLineCap: "round",
                selectable: false,
                evented: false,
                itemType: "RoomShape",
                roomShape: shape
            }
        );

        canvas.add(wall);
    }

    window.roomWallData = {
        points: points,
        walls: points.map(function (p, index) {
            const next = points[(index + 1) % points.length];
            return {
                x1: p.x,
                y1: p.y,
                x2: next.x,
                y2: next.y
            };
        }),
        closed: true,
        shape: shape
    };

    canvas.renderAll();

    sendWallsTo3D();
    showDesignMessage(
        shape.toUpperCase() + " room created in 2D and sent to 3D."
    );
    setTimeout(hideDesignMessage, 1800);
}

function showRoomShapes() {
    let panel = document.getElementById("roomShapesFloatingPanel");
    if (panel) {
        panel.remove();
    }

    panel = document.createElement("div");
    panel.id = "roomShapesFloatingPanel";
    panel.innerHTML = `
        <div class="room-shapes-header">
            <strong>Room Shapes</strong>
            <button id="closeRoomShapes">×</button>
        </div>
        <div class="room-shapes-grid">
            <button data-shape="rectangle"><span>▭</span>Rectangle</button>
            <button data-shape="square"><span>□</span>Square</button>
            <button data-shape="lshape"><span>⌞</span>L Shape</button>
            <button data-shape="tshape"><span>⊤</span>T Shape</button>
            <button data-shape="ushape"><span>∪</span>U Shape</button>
        </div>
    `;

    document.body.appendChild(panel);

    panel.querySelectorAll("[data-shape]").forEach(function (button) {
        button.addEventListener("click", function () {
            createRoomShape(this.dataset.shape);
        });
    });

    document.getElementById("closeRoomShapes").addEventListener("click", function () {
        panel.remove();
    });

    addRoomShapeStyles();
}

function addRoomShapeStyles() {
    if (document.getElementById("roomShapeStyles")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "roomShapeStyles";
    style.innerHTML = `
        #roomShapesFloatingPanel {
            position: fixed;
            left: 400px;
            top: 100px;
            width: 300px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 12px;
            z-index: 99999;
            box-shadow: 0 8px 30px rgba(0,0,0,.18);
        }
        .room-shapes-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .room-shapes-header button {
            border: none;
            background: transparent;
            font-size: 22px;
            cursor: pointer;
        }
        .room-shapes-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        .room-shapes-grid button {
            border: 1px solid #ddd;
            background: #fff;
            border-radius: 8px;
            padding: 12px 6px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }
        .room-shapes-grid button:hover {
            border-color: #198754;
            color: #198754;
            background: #f5fbf7;
        }
        .room-shapes-grid span {
            font-size: 28px;
        }
    `;

    document.head.appendChild(style);
}

/* =====================================================
   FORMS
===================================================== */
function showFormsPanel() {
    let panel = document.getElementById("formsFloatingPanel");
    if (panel) {
        panel.remove();
    }

    panel = document.createElement("div");
    panel.id = "formsFloatingPanel";
    panel.innerHTML = `
        <div class="forms-header">
            <strong>Forms</strong>
            <button id="closeForms">×</button>
        </div>
        <div class="forms-grid">
            <button data-form="rectangle">▭ Rectangle</button>
            <button data-form="circle">● Circle</button>
            <button data-form="triangle">△ Triangle</button>
            <button data-form="square">□ Square</button>
        </div>
    `;

    document.body.appendChild(panel);

    panel.querySelectorAll("[data-form]").forEach(function (button) {
        button.addEventListener("click", function () {
            createForm(this.dataset.form);
        });
    });

    document.getElementById("closeForms").addEventListener("click", function () {
        panel.remove();
    });

    addFormsStyles();
}

function createForm(type) {
    let object;

    if (type === "circle") {
        object = new fabric.Circle({
            radius: 40,
            fill: "#9e9e9e",
            left: roomData.width / 2,
            top: roomData.depth / 2,
            originX: "center",
            originY: "center"
        });
    } else if (type === "triangle") {
        object = new fabric.Triangle({
            width: 80,
            height: 80,
            fill: "#9e9e9e",
            left: roomData.width / 2,
            top: roomData.depth / 2,
            originX: "center",
            originY: "center"
        });
    } else {
        object = new fabric.Rect({
            width: type === "square" ? 80 : 120,
            height: type === "square" ? 80 : 60,
            fill: "#9e9e9e",
            stroke: "#555",
            strokeWidth: 2,
            rx: 6,
            ry: 6,
            left: roomData.width / 2,
            top: roomData.depth / 2,
            originX: "center",
            originY: "center"
        });
    }

    object.itemType = "Form";
    object.formType = type;
    object.furnitureName = type;

    canvas.add(object);
    canvas.setActiveObject(object);
    canvas.renderAll();
    updateFurnitureToolbar();
}

function addFormsStyles() {
    if (document.getElementById("formsStyles")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "formsStyles";
    style.innerHTML = `
        #formsFloatingPanel {
            position: fixed;
            left: 400px;
            top: 100px;
            width: 280px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 12px;
            z-index: 99999;
            box-shadow: 0 8px 30px rgba(0,0,0,.18);
        }
        .forms-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
        }
        .forms-header button {
            border: none;
            background: transparent;
            font-size: 22px;
            cursor: pointer;
        }
        .forms-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        .forms-grid button {
            padding: 12px 5px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
        }
        .forms-grid button:hover {
            border-color: #198754;
            color: #198754;
        }
    `;

    document.head.appendChild(style);
}

/* =====================================================
   SMART WIZARD
===================================================== */
function openSmartWizard() {
    let modal = document.getElementById("smartWizardModal");
    if (modal) {
        modal.remove();
    }

    const selectedStyle =
        localStorage.getItem("selectedStyle") ||
        localStorage.getItem("roomStyle") ||
        "Modern";

    const selectedRoom =
        localStorage.getItem("selectedRoom") ||
        localStorage.getItem("roomType") ||
        "Bedroom";

    modal = document.createElement("div");
    modal.id = "smartWizardModal";
    modal.innerHTML = `
        <div class="smart-wizard-box">
            <div class="smart-wizard-header">
                <div>
                    <h3>Smart Wizard</h3>
                    <small>AI Room Designer</small>
                </div>
                <button id="closeSmartWizard">×</button>
            </div>
            <div class="wizard-info">
                <div>
                    <strong>Style</strong>
                    <span>${selectedStyle}</span>
                </div>
                <div>
                    <strong>Room</strong>
                    <span>${selectedRoom}</span>
                </div>
            </div>
            <label>Describe your room</label>
            <textarea
                id="smartWizardPrompt"
                rows="5"
                placeholder="Example: Create a modern bedroom with a king bed, two side tables, warm lighting and neutral colors."
            ></textarea>
            <button id="generateSmartRoom" class="smart-generate-btn">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Room
            </button>
            <div id="smartWizardResult" class="smart-wizard-result"></div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("closeSmartWizard").addEventListener("click", function () {
        modal.remove();
    });

    document.getElementById("generateSmartRoom").addEventListener("click", function () {
        generateSmartRoom(selectedStyle, selectedRoom);
    });

    addSmartWizardStyles();
}

function generateSmartRoom(style, roomType) {
    const prompt = document.getElementById("smartWizardPrompt");
    const result = document.getElementById("smartWizardResult");
    const userPrompt = prompt ? prompt.value.trim() : "";

    window.smartRoomData = {
        style: style,
        roomType: roomType,
        prompt: userPrompt
    };

    const lowerRoom = roomType.toLowerCase();

    if (lowerRoom.includes("bedroom")) {
        roomData.width = 500;
        roomData.depth = 400;
    } else if (lowerRoom.includes("living")) {
        roomData.width = 600;
        roomData.depth = 450;
    } else if (lowerRoom.includes("kitchen")) {
        roomData.width = 500;
        roomData.depth = 350;
    } else if (lowerRoom.includes("office")) {
        roomData.width = 450;
        roomData.depth = 350;
    }

    updateRoom();
    createRoomShape("rectangle");

    if (lowerRoom.includes("bedroom")) {
        createBed(roomData.width / 2, roomData.depth / 2);
    } else if (lowerRoom.includes("living")) {
        createSofa(roomData.width / 2, roomData.depth / 2);
    }

    window.dispatchEvent(
        new CustomEvent("smartRoomGenerated", {
            detail: window.smartRoomData
        })
    );

    if (result) {
        result.innerHTML = `
            <strong>Room Generated</strong><br>
            Style: ${style}<br>
            Room: ${roomType}
            ${userPrompt ? "<br>Prompt: " + userPrompt : ""}
        `;
    }
}

function addSmartWizardStyles() {
    if (document.getElementById("smartWizardStyles")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "smartWizardStyles";
    style.innerHTML = `
        #smartWizardModal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.35);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .smart-wizard-box {
            width: 420px;
            max-width: 90vw;
            background: #fff;
            border-radius: 14px;
            padding: 20px;
            box-shadow: 0 15px 50px rgba(0,0,0,.25);
        }
        .smart-wizard-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
        }
        .smart-wizard-header h3 {
            margin: 0;
            font-size: 20px;
        }
        .smart-wizard-header small {
            color: #777;
        }
        .smart-wizard-header button {
            border: none;
            background: transparent;
            font-size: 25px;
            cursor: pointer;
        }
        .wizard-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 16px;
        }
        .wizard-info div {
            background: #f5faf6;
            padding: 10px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
        }
        .wizard-info span {
            color: #198754;
            margin-top: 3px;
        }
        #smartWizardPrompt {
            width: 100%;
            resize: vertical;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            margin-top: 6px;
            margin-bottom: 12px;
        }
        #smartWizardPrompt:focus {
            outline: none;
            border-color: #198754;
        }
        .smart-generate-btn {
            width: 100%;
            border: none;
            background: #198754;
            color: white;
            padding: 11px;
            border-radius: 8px;
            cursor: pointer;
        }
        .smart-generate-btn:hover {
            background: #146c43;
        }
        .smart-wizard-result {
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.6;
        }
    `;

    document.head.appendChild(style);
}

/* =====================================================
   FURNITURE TOOLBAR
===================================================== */
let furnitureToolbar = null;

function createFurnitureToolbar() {
    if (furnitureToolbar) {
        furnitureToolbar.remove();
    }

    furnitureToolbar = document.createElement("div");
    furnitureToolbar.id = "furnitureToolbar";
    furnitureToolbar.innerHTML = `
    <button type="button" id="rotateLeftBtn" title="Rotate Left">
    <i class="fa-solid fa-rotate-left"></i>
</button>
<button type="button" id="rotateRightBtn" title="Rotate Right">
    <i class="fa-solid fa-rotate-right"></i>
</button>
<button type="button" id="deleteSelectedBtn" title="Delete">
    <i class="fa-solid fa-trash"></i>
</button>
    `;

    document.body.appendChild(furnitureToolbar);

    document.getElementById("rotateLeftBtn").addEventListener("click", function () {
        const object = canvas.getActiveObject();
        if (!object) return;

        object.rotate((object.angle || 0) - 15);
        object.setCoords();
        canvas.renderAll();
        updateFurnitureToolbar();
        updatePropertiesFromObject(object);
    });

    document.getElementById("rotateRightBtn").addEventListener("click", function () {
        const object = canvas.getActiveObject();
        if (!object) return;

        object.rotate((object.angle || 0) + 15);
        object.setCoords();
        canvas.renderAll();
        updateFurnitureToolbar();
        updatePropertiesFromObject(object);
    });

    document.getElementById("deleteSelectedBtn").addEventListener(
        "click",
        deleteSelectedFurniture
    );
}

function updateFurnitureToolbar() {
    if (!furnitureToolbar) return;

    const object = canvas.getActiveObject();
    if (!object) {
        furnitureToolbar.style.display = "none";
        return;
    }

    furnitureToolbar.style.display = "flex";

    const rect = canvas.upperCanvasEl.getBoundingClientRect();
    const bounds = object.getBoundingRect();
    const left = rect.left + bounds.left;
    const top = rect.top + bounds.top - 45;

    furnitureToolbar.style.left = left + "px";
    furnitureToolbar.style.top = Math.max(5, top) + "px";
}

function hideFurnitureToolbar() {
    if (furnitureToolbar) {
        furnitureToolbar.style.display = "none";
    }
}

function deleteSelectedFurniture() {
    const object = canvas.getActiveObject();
    if (!object) return;

    canvas.remove(object);
    canvas.discardActiveObject();
    canvas.renderAll();
    hideFurnitureToolbar();
}

/* =====================================================
   FURNITURE CREATION FUNCTIONS
===================================================== */
function createGenericFurniture(type, x = 200, y = 150) {
    const object = new fabric.Group(
        [
            new fabric.Rect({
                left: -40,
                top: -30,
                width: 80,
                height: 60,
                fill: "#9e9e9e",
                stroke: "#555",
                strokeWidth: 2,
                rx: 6,
                ry: 6
            }),
            new fabric.Text(type, {
                left: -30,
                top: -8,
                fontSize: 10,
                fill: "white"
            })
        ],
        {
            left: x,
            top: y,
            originX: "center",
            originY: "center"
        }
    );

    object.itemType = type;
    object.furnitureName = type;

    canvas.add(object);
    canvas.setActiveObject(object);
    canvas.renderAll();
    updateFurnitureToolbar();

    return object;
}
function createFurnitureFromImage(src, type, modelPath, x = 200, y = 150) {
    fabric.Image.fromURL(
        src,
        function (img) {
            if (!img) {
                createGenericFurniture(type, x, y);
                return;
            }

            const maxWidth = 80;
            const maxHeight = 80;
            const scale = Math.min(
                maxWidth / img.width,
                maxHeight / img.height
            );

            img.set({
                left: x,
                top: y,
                originX: "center",
                originY: "center",
                scaleX: scale,
                scaleY: scale
            });

            img.glbModel = modelPath || "";
            img.imageUrl = src;               // store image URL for 3D texture
            img.furnitureName = type;
            img.itemType = type;

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
            updateFurnitureToolbar();

            // Immediately sync to 3D
            syncAllFurniture3D();
        },
        { crossOrigin: "anonymous" }
    );
}

function createArmchair(modelPath, left = 200, top = 150) {
    const imagePath = "models/armchair1.png";
    createFurnitureFromImage(imagePath, "Armchair", modelPath || "models/armchair1.glb", left, top);
}

function createBed(x = 200, y = 150) {
    const imagePath = "models/bed1.png";
    createFurnitureFromImage(imagePath, "Bed", "models/bed1.glb", x, y);
}

function createSofa(x = 200, y = 150) {
    const imagePath = "models/sofa1.png";
    createFurnitureFromImage(imagePath, "Sofa", "models/sofa1.glb", x, y);
}

/* =====================================================
   GET SELECTED FURNITURE DATA FOR 3D (UPDATED)
===================================================== */
function getSelectedFurniture3DData() {
    const object = canvas.getActiveObject();
    if (!object || !object.itemType) {
        return null;
    }

    let modelPath = object.glbModel || "";
    // If 2D image mode is enabled, we don't send a GLB model path
    if (window.USE_2D_IMAGE_IN_3D) {
        modelPath = null;  // signal to 3D that we only use image texture
    }

    return {
        type: object.itemType,
        name: object.furnitureName || object.itemType,
        model: modelPath,                    // null if using image
        imageUrl: object.imageUrl || null,   // the 2D image path for texture
        useImageTexture: window.USE_2D_IMAGE_IN_3D, // tell 3D to use image
        x: object.left || 0,
        y: object.top || 0,
        rotation: object.angle || 0,
        width: object.getScaledWidth(),
        height: object.getScaledHeight(),
        scaleX: object.scaleX || 1,
        scaleY: object.scaleY || 1
    };
}

/**
 * Toggle between using 2D images as textures in 3D (true)
 * or loading GLB models (false).
 */
function setUse2DImageIn3D(use) {
    window.USE_2D_IMAGE_IN_3D = use;
    syncAllFurniture3D(); // refresh 3D if something is selected
}

/* =====================================================
   MODIFIED: createFurnitureAt now accepts imageSrc
===================================================== */
function createFurnitureAt(type, x, y, model, imageSrc) {
    // If imageSrc is provided, use it directly
    if (imageSrc) {
        // Determine model path: if model ends with .glb, use it; else try to find from imageMap
        let modelPath = (model && model.endsWith('.glb')) ? model : '';
        if (!modelPath) {
            // Try to get from imageMap
            const fallback = imageMap[type];
            if (fallback) {
                modelPath = fallback.model;
            }
        }
        createFurnitureFromImage(imageSrc, type, modelPath || '', x, y);
        return;
    }

    // Otherwise use the default imageMap
    const fallback = imageMap[type];
    if (fallback) {
        const imgPath = model && model.endsWith('.png') ? model : fallback.img;
        const modelPath = model && model.endsWith('.glb') ? model : fallback.model;
        createFurnitureFromImage(imgPath, type, modelPath, x, y);
    } else {
        createGenericFurniture(type, x, y);
    }
}

// Global imageMap for fallback
const imageMap = {
    'Armchair': { img: 'models/armchair1.png', model: 'models/armchair1.glb' },
    'Sofa': { img: 'models/sofa1.png', model: 'models/sofa1.glb' },
    'Bed': { img: 'models/bed1.png', model: 'models/bed1.glb' },
    'Ottoman': { img: 'models/ottoman1.png', model: 'models/ottoman1.glb' },
    'Storage': { img: 'models/storage1.png', model: 'models/storage1.glb' },
    'Table': { img: 'models/table1.png', model: 'models/table1.glb' },
    'Office Desk': { img: 'models/officedesk1.png', model: 'models/officedesk1.glb' },
    'Children Furniture': { img: 'models/children1.png', model: 'models/children1.glb' },
    'Kitchen': { img: 'models/kitchen1.png', model: 'models/kitchen1.glb' },
    'Bathroom': { img: 'models/bathroom1.png', model: 'models/bathroom1.glb' },
    'Door': { img: 'models/construction/door/door1.png', model: 'models/construction/doors/door1.glb' },
    'Window': { img: 'models/construction/window/window1.png', model: 'models/construction/windows/window1.glb' },
    'Stairs': { img: 'models/construction/stairs/stair1.png', model: 'models/construction/stairs/stair1.glb' },
    'Arch': { img: 'models/construction/archs/arch1.png', model: 'models/construction/archs/arch1.glb' },
    'Partition': { img: 'models/construction/partition/partition1.png', model: 'models/construction/partition/partition1.glb' },
    'Roof': { img: 'models/construction/roofs/roof1.png', model: 'models/construction/roofs/roof1.glb' },
    'Fireplace': { img: 'models/construction/fireplace/fire1.png', model: 'models/construction/fireplace/fire1.glb' },
    'Column': { img: 'models/construction/column/column1.png', model: 'models/construction/column/column1.glb' },
    'Terrace': { img: 'models/construction/terrace/terrace1.png', model: 'models/construction/terrace/terrace1.glb' },
    'Fence': { img: 'models/construction/fences/fence1.png', model: 'models/construction/fences/fence1.glb' },
    'Path and Lawn': { img: 'models/outdoor/path and lawns/path1.png', model: 'models/outdoor/path and lawns/path1.glb' },
    'Patio': { img: 'models/outdoor/patio/patio1.png', model: 'models/outdoor/patio/patio1.glb' },
    'Tree and Plant': { img: 'models/outdoor/trees/tree1.png', model: 'models/outdoor/trees/tree1.glb' },
    'Garage': { img: 'models/outdoor/garage/garage1.png', model: 'models/outdoor/garage/garage1.glb' },
    'Pool': { img: 'models/outdoor/pool/pool1.png', model: 'models/outdoor/pool/pool1.glb' },
    'Outdoor Lighting': { img: 'models/outdoor/lighting/lighting1.png', model: 'models/outdoor/lighting/lighting1.glb' },
    'Outdoor Activity': { img: 'models/outdoor/activity/activity1.png', model: 'models/outdoor/activity/activity1.glb' },
    'Garden': { img: 'models/outdoor/garden/garden1.png', model: 'models/outdoor/garden/garden1.glb' }
};

/* =====================================================
   FURNITURE CATEGORY NAVIGATION
===================================================== */
const furnitureCategories = document.querySelectorAll(".furniture-category");
const categoryView = document.getElementById("categoryView");
const armchairsView = document.getElementById("armchairsView");
const sofasView = document.getElementById("sofasView");
const panelBack = document.getElementById("panelBack");
const panelTitle = document.getElementById("panelTitle");

function hideAllSubcategories() {
    if (armchairsView) armchairsView.style.display = "none";
    if (sofasView) sofasView.style.display = "none";
    document.querySelectorAll('.subcategory-view').forEach(v => {
        if (v.id !== 'armchairsView' && v.id !== 'sofasView') {
            v.style.display = 'none';
        }
    });
}

furnitureCategories.forEach(function (category) {
    category.addEventListener("click", function () {
        const categoryName = this.dataset.category;

        if (categoryView) categoryView.style.display = "none";
        hideAllSubcategories();

        if (categoryName === "Armchairs") {
            if (armchairsView) armchairsView.style.display = "block";
            if (panelTitle) panelTitle.innerText = "Armchairs";
            setupFurnitureCardImages(armchairsView);
        } else if (categoryName === "Sofa") {
            if (sofasView) sofasView.style.display = "block";
            if (panelTitle) panelTitle.innerText = "Sofas";
            setupFurnitureCardImages(sofasView);
        }
    });
});

if (panelBack) {
    panelBack.addEventListener("click", function () {
        hideAllSubcategories();
        if (categoryView) categoryView.style.display = "block";
        if (panelTitle) panelTitle.innerText = "Furniture";
        if (panelBack) panelBack.style.display = "none";
    });
}

/* =====================================================
   DRAG & DROP - UPDATED with imageSrc
===================================================== */
// Delegated dragstart on document for all .furniture-card
document.addEventListener('dragstart', function(event) {
    const card = event.target.closest('.furniture-card');
    if (!card) return;
    
    const type = card.dataset.type || card.dataset.category || "";
    const model = card.dataset.model || "";
    const img = card.querySelector('.furniture-thumbnail');
    const imageSrc = img ? img.getAttribute('src') || '' : '';
    
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("furnitureType", type);
    event.dataTransfer.setData("furnitureModel", model);
    event.dataTransfer.setData("imageSrc", imageSrc);
});

const fabricDropArea = canvas.wrapperEl;

if (fabricDropArea) {
    fabricDropArea.addEventListener("dragover", function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    });

    fabricDropArea.addEventListener("drop", function (event) {
        event.preventDefault();

        const type = event.dataTransfer.getData("furnitureType");
        const model = event.dataTransfer.getData("furnitureModel");
        const imageSrc = event.dataTransfer.getData("imageSrc"); // new

        if (!type) return;

        const rect = fabricDropArea.getBoundingClientRect();
        const x = (event.clientX - rect.left) / zoom;
        const y = (event.clientY - rect.top) / zoom;

        createFurnitureAt(type, x, y, model, imageSrc);
    });
}

/* =====================================================
   OBJECT SELECTION
===================================================== */
canvas.on("selection:created", function (e) {
    updateProperties(e);
    syncAllFurniture3D();
});

canvas.on("selection:updated", function (e) {
    updateProperties(e);
    syncAllFurniture3D();
});

canvas.on("selection:cleared", function () {
    showRoomProperties();
    hideFurnitureToolbar();

    if (typeof clearSelectedFurniture3D === "function") {
        clearSelectedFurniture3D();
    }
});

function syncSelectedFurniture3D() {
    const data = getSelectedFurniture3DData();
    if (!data) return;

    window.selectedFurniture3D = data;
    window.dispatchEvent(
        new CustomEvent("selectedFurniture3DUpdated", {
            detail: data
        })
    );
}

canvas.on("object:moving", updateFurnitureToolbar);

canvas.on("object:scaling", function (e) {
    updateFurnitureToolbar();
    updatePropertiesFromObject(e.target);
});

canvas.on("object:rotating", function (e) {
    updateFurnitureToolbar();
    updatePropertiesFromObject(e.target);
});

canvas.on("object:modified", function (e) {
    if (!e.target) return;
    e.target.setCoords();
    updateFurnitureToolbar();
    updatePropertiesFromObject(e.target);
    syncAllFurniture3D();

    if (typeof updateSelectedFurniture3D === "function") {
        updateSelectedFurniture3D(window.selectedFurniture3D);
    }
});

function showRoomProperties() {
    if (widthInput) widthInput.value = roomData.width + " cm";
    if (depthInput) depthInput.value = roomData.depth + " cm";
    if (heightInput) heightInput.value = roomData.height + " cm";
    if (angleInput) angleInput.value = roomData.angle + "°";
    if (elevationInput) elevationInput.value = roomData.elevation + " cm";
}

function updateProperties(event) {
    const object = event.selected && event.selected[0];
    if (object) {
        updatePropertiesFromObject(object);
    }
}

function updatePropertiesFromObject(object) {
    if (!object) return;

    if (widthInput)
        widthInput.value = Math.round(object.getScaledWidth()) + " cm";
    if (depthInput)
        depthInput.value = Math.round(object.getScaledHeight()) + " cm";
    if (heightInput) heightInput.value = "65 cm";
    if (angleInput) angleInput.value = Math.round(object.angle || 0) + "°";
    if (elevationInput) elevationInput.value = "0 cm";
}

/* =====================================================
   DELETE BUTTON
===================================================== */
const deleteButton = document.getElementById("deleteFurniture");

if (deleteButton) {
    deleteButton.addEventListener("click", function () {
        const object = canvas.getActiveObject();

        if (object) {
            deleteSelectedFurniture();
            return;
        }

        if (room && confirm("Do you want to delete the room?")) {
            room.remove();
        }
    });
}

/* =====================================================
   ZOOM
===================================================== */
let zoom = 1;

const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

function updateZoomText() {
    const zoomValue = document.getElementById("zoomValue");
    if (zoomValue) {
        zoomValue.innerText = Math.round(zoom * 100) + "%";
    }
    updateFurnitureToolbar();
}

if (zoomInButton) {
    zoomInButton.addEventListener("click", function () {
        zoom = Math.min(2, zoom + 0.1);
        canvas.setZoom(zoom);
        updateZoomText();
    });
}

if (zoomOutButton) {
    zoomOutButton.addEventListener("click", function () {
        zoom = Math.max(0.5, zoom - 0.1);
        canvas.setZoom(zoom);
        updateZoomText();
    });
}

canvas.on("mouse:wheel", function (opt) {
    if (isDrawingWallMode) return;

    const delta = opt.e.deltaY;
    zoom *= 0.999 ** delta;
    zoom = Math.min(Math.max(0.5, zoom), 2);

    canvas.zoomToPoint(
        { x: opt.e.offsetX, y: opt.e.offsetY },
        zoom
    );

    updateZoomText();
    opt.e.preventDefault();
    opt.e.stopPropagation();
});

/* =====================================================
   2D / 3D SWITCH
===================================================== */
const btn2D = document.getElementById("btn2D");
const btn3D = document.getElementById("btn3D");
const workspace = document.querySelector(".workspace");

if (btn2D) {
    btn2D.addEventListener("click", function () {
        btn2D.classList.add("active");
        if (btn3D) btn3D.classList.remove("active");
        if (workspace) workspace.classList.remove("three-mode");
    });
}

if (btn3D) {
    btn3D.addEventListener("click", function () {
        btn3D.classList.add("active");
        if (btn2D) btn2D.classList.remove("active");
        if (workspace) workspace.classList.add("three-mode");

        sendRoomDataTo3D();
        sendWallsTo3D();

        setTimeout(function () {
            if (typeof initThreeView === "function") {
                initThreeView();
            }

            sendWallsTo3D();

            const selected = getSelectedFurniture3DData();
            if (selected) {
                window.selectedFurniture3D = selected;
                if (typeof showSelectedFurniture3D === "function") {
                    showSelectedFurniture3D(selected);
                }
            }

            window.dispatchEvent(new Event("resize"));
        }, 250);
    });
}

/* =====================================================
   SELECT BUILD OPTION
===================================================== */
function selectOption(optionName) {
    console.log("Selected Action:", optionName);

    document.querySelectorAll(".cards-grid .card").forEach(function (card) {
        card.classList.remove("active-card");
    });

    const cards = document.querySelectorAll(".cards-grid .card");
    cards.forEach(function (card) {
        const title = card.querySelector(".card-title");
        if (title && title.innerText.trim() === optionName) {
            card.classList.add("active-card");
        }
    });

    if (optionName === "Draw Walls") {
        showDesignMessage("Draw Walls selected.");
        setTimeout(function () {
            startWallDrawing();
        }, 100);
        return;
    }

    if (optionName === "Rooms") {
        stopWallDrawing();
        showRoomShapes();
        return;
    }

    if (optionName === "Smart Wizard") {
        stopWallDrawing();
        openSmartWizard();
        return;
    }

    if (optionName === "Forms") {
        stopWallDrawing();
        showFormsPanel();
        return;
    }

    stopWallDrawing();
}

/* =====================================================
   LEFT SIDEBAR
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const sideIcons = document.querySelectorAll(".side-icon[data-panel]");
    const sidePanels = document.querySelector(".side-panels");
    const closeSidePanel = document.getElementById("closeSidePanel");

    function openSidePanel(panelId, clickedIcon) {
        if (sidePanels) {
            sidePanels.classList.remove("panel-hidden");
        }

        sideIcons.forEach(function (icon) {
            icon.classList.remove("active");
        });

        if (clickedIcon) {
            clickedIcon.classList.add("active");
        }

        document.querySelectorAll(".side-panel").forEach(function (panel) {
            panel.classList.remove("active");
        });

        const selectedPanel = document.getElementById(panelId);
        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }
    }

    sideIcons.forEach(function (icon) {
        icon.addEventListener("click", function () {
            const panelId = this.getAttribute("data-panel");
            openSidePanel(panelId, this);
        });
    });

    if (closeSidePanel) {
        closeSidePanel.addEventListener("click", function () {
            if (sidePanels) {
                sidePanels.classList.add("panel-hidden");
            }

            sideIcons.forEach(function (icon) {
                icon.classList.remove("active");
            });
        });
    }

    const defaultIcon = document.getElementById("searchBtn");
    const defaultPanel = document.getElementById("searchPanel");

    if (defaultIcon && defaultPanel) {
        if (sidePanels) {
            sidePanels.classList.remove("panel-hidden");
        }

        sideIcons.forEach(function (icon) {
            icon.classList.remove("active");
        });

        document.querySelectorAll(".side-panel").forEach(function (panel) {
            panel.classList.remove("active");
        });

        defaultIcon.classList.add("active");
        defaultPanel.classList.add("active");
    }

    const furnitureBackBtn = document.getElementById("furnitureBackBtn");
    if (furnitureBackBtn) {
        furnitureBackBtn.addEventListener("click", function () {
            if (categoryView) categoryView.style.display = "block";
            if (armchairsView) armchairsView.style.display = "none";
            if (sofasView) sofasView.style.display = "none";
        });
    }

    // Setup all furniture card images after DOM is ready
    setTimeout(function () {
        document.querySelectorAll('.subcategory-view').forEach(function (view) {
            setupFurnitureCardImages(view);
        });
        // Also setup armchairs and sofas
        if (armchairsView) setupFurnitureCardImages(armchairsView);
        if (sofasView) setupFurnitureCardImages(sofasView);
    }, 500);
});

/* =====================================================
   TOOLBAR STYLE
===================================================== */
const toolbarStyle = document.createElement("style");
toolbarStyle.innerHTML = `
    #furnitureToolbar {
        position: fixed;
        display: none;
        align-items: center;
        gap: 4px;
        padding: 5px;
        background: #ffffff;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.18);
        z-index: 99999;
    }
    #furnitureToolbar button {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        background: #f4f4f4;
        color: #333;
        cursor: pointer;
        font-size: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #furnitureToolbar button:hover {
        background: #e5e5e5;
    }
    #furnitureToolbar button:last-child:hover {
        background: #ffe1e1;
    }
`;

document.head.appendChild(toolbarStyle);

/* =====================================================
   GET SELECTED FURNITURE DATA (already updated above)
===================================================== */

/* =====================================================
   INITIALIZE
===================================================== */
createFurnitureToolbar();
canvas.renderAll();
updateZoomText();
showRoomProperties();
hideFurnitureToolbar();

/* =====================================================
   GLOBAL ACCESS
===================================================== */
window.designApp = {
    canvas: canvas,
    roomData: roomData,
    roomWallData: window.roomWallData,
    drawWalls: startWallDrawing,
    finishWalls: finishWallDrawing,
    createRoomShape: createRoomShape,
    openSmartWizard: openSmartWizard,
    createForm: createForm,
    sendWallsTo3D: sendWallsTo3D,
    sendRoomDataTo3D: sendRoomDataTo3D,
    generatePlaceholder: generatePlaceholderImage,
    setupFurnitureCardImages: setupFurnitureCardImages,
    setUse2DImageIn3D: setUse2DImageIn3D
};

/* =====================================================
   FINAL INITIAL SYNC
===================================================== */
setTimeout(function () {
    sendRoomDataTo3D();
    sendWallsTo3D();
}, 300);

/* =====================================================
   ROOMS / CATEGORIES TAB
===================================================== */
function showTab(tabName, clickedTab) {
    const rooms = document.getElementById("rooms");
    const categories = document.getElementById("categories");

    rooms.style.display = "none";
    categories.style.display = "none";

    document.querySelectorAll(".tab").forEach(function (tab) {
        tab.classList.remove("active-tab");
    });

    if (tabName === "rooms") {
        rooms.style.display = "block";
    }

    if (tabName === "categories") {
        categories.style.display = "block";
    }

    clickedTab.classList.add("active-tab");
}

/* =====================================================
   ROOM FURTHER CATEGORIES
===================================================== */
const roomCategories = {
    bedroom: [
        ["Beds", "fa-bed"],
        ["Wardrobes", "fa-box"],
        ["Bedside Tables", "fa-table"],
        ["Chairs", "fa-chair"]
    ],
    "living-room": [
        ["Sofas", "fa-couch"],
        ["Armchairs", "fa-chair"],
        ["Coffee Tables", "fa-table"],
        ["TV Units", "fa-tv"]
    ],
    kitchen: [
        ["Kitchen Cabinets", "fa-kitchen-set"],
        ["Kitchen Tables", "fa-table"],
        ["Kitchen Chairs", "fa-chair"],
        ["Kitchen Storage", "fa-box"]
    ],
    office: [
        ["Office Desks", "fa-desktop"],
        ["Office Chairs", "fa-chair"],
        ["Office Storage", "fa-box"]
    ],
    "kids-room": [
        ["Kids Beds", "fa-bed"],
        ["Kids Tables", "fa-table"],
        ["Kids Chairs", "fa-chair"],
        ["Kids Storage", "fa-box"]
    ],
    "dining-room": [
        ["Dining Tables", "fa-table"],
        ["Dining Chairs", "fa-chair"],
        ["Dining Storage", "fa-box"]
    ],
    bathroom: [
        ["Bathroom Cabinets", "fa-box"],
        ["Bathroom Storage", "fa-box"]
    ],
    hallway: [
        ["Hallway Tables", "fa-table"],
        ["Hallway Storage", "fa-box"],
        ["Hallway Chairs", "fa-chair"]
    ],
    "public-space": [
        ["Sofas", "fa-couch"],
        ["Chairs", "fa-chair"],
        ["Tables", "fa-table"]
    ],
    decor: [
        ["Wall Decor", "fa-image"],
        ["Lamps", "fa-lightbulb"],
        ["Plants", "fa-leaf"],
        ["Rugs", "fa-rug"]
    ]
};

function openRoom(roomName) {
    const rooms = document.getElementById("rooms");
    const roomCategoryView = document.getElementById("roomCategoryView");
    const roomCategoryTitle = document.getElementById("roomCategoryTitle");
    const roomCategoryList = document.getElementById("roomCategoryList");

    if (!rooms || !roomCategoryView || !roomCategoryTitle || !roomCategoryList) {
        console.error("Room category elements not found.");
        return;
    }

    const categories = roomCategories[roomName];

    if (!categories) {
        console.error("Categories not found for:", roomName);
        return;
    }

    rooms.style.display = "none";
    roomCategoryView.style.display = "block";

    roomCategoryTitle.textContent =
        roomName
            .replace(/-/g, " ")
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });

    roomCategoryList.innerHTML = "";

    categories.forEach(function (category) {
        const categoryName = category[0];
        const categoryIcon = category[1];

        const item = document.createElement("div");
        item.className = "room-category-item";

        item.innerHTML = `
            <div class="room-category-icon">
                <i class="fa-solid ${categoryIcon}"></i>
            </div>
            <span>${categoryName}</span>
            <i class="fa-solid fa-chevron-right"></i>
        `;

        item.addEventListener("click", function () {
            showFurniturePictures(roomName, categoryName);
        });

        roomCategoryList.appendChild(item);
    });
}

function backToRooms() {
    const rooms = document.getElementById("rooms");
    const roomCategoryView = document.getElementById("roomCategoryView");

    if (!rooms || !roomCategoryView) {
        console.error("Rooms view not found.");
        return;
    }

    roomCategoryView.style.display = "none";
    rooms.style.display = "block";
}

/* =========================================================
   CONSTRUCTION CATEGORY CLICK FIX + DRAG with imageSrc
========================================================= */
(function () {
    function initConstructionCategoryClick() {
        const constructionSection = document.querySelector(".construction-section");
        if (!constructionSection) {
            console.error("ERROR: .construction-section not found");
            return;
        }

        const categoryViews = {
            "Doors": "constructionDoorsView",
            "Windows": "constructionWindowsView",
            "Stairs": "constructionStairsView",
            "Archs": "constructionArchsView",
            "Partition": "constructionPartitionView",
            "Roofs": "constructionRoofsView",
            "Fireplace": "constructionFireplaceView",
            "Column": "constructionColumnView",
            "Terrace": "constructionTerraceView",
            "Fences & Gates": "constructionFencesView"
        };

        const buttons = constructionSection.querySelectorAll(".construction-grid .build-option");

        console.log("Construction buttons found:", buttons.length);

        buttons.forEach(function (button) {
            const span = button.querySelector("span");
            if (!span) {
                console.warn("Category button has no span:", button);
                return;
            }

            const category = span.textContent.trim();
            console.log("Construction category detected:", category);

            button.removeAttribute("onclick");
            button.style.cursor = "pointer";

            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                console.log("CLICKED:", category);

                const viewId = categoryViews[category];

                if (!viewId) {
                    console.error("No view mapped for:", category);
                    return;
                }

                const selectedView = document.getElementById(viewId);

                if (!selectedView) {
                    console.error("View not found:", viewId);
                    return;
                }

                constructionSection.style.display = "none";

                Object.values(categoryViews).forEach(function (id) {
                    const view = document.getElementById(id);
                    if (view) {
                        view.style.display = "none";
                        view.classList.remove("active");
                    }
                });

                selectedView.style.display = "block";
                selectedView.classList.add("active");

                selectedView.dataset.category = category;
                window.currentConstructionCategory = category;

                console.log("OPENED:", category, "->", viewId);

                setupConstructionDragDrop(selectedView);
            }, true);
        });

        Object.values(categoryViews).forEach(function (viewId) {
            const view = document.getElementById(viewId);
            if (view) {
                setupConstructionDragDrop(view);
            }
        });
    }

    function setupConstructionDragDrop(view) {
        if (!view) return;

        const cards = view.querySelectorAll(".furniture-card");

        cards.forEach(function (card) {
            card.setAttribute("draggable", "true");

            if (card.dataset.dragSetup === "true") {
                return;
            }

            card.dataset.dragSetup = "true";

            card.addEventListener("dragstart", function (event) {
                const model = card.dataset.model;
                const type = card.dataset.type;
                const category = view.dataset.category || window.currentConstructionCategory || "";
                const img = card.querySelector('.furniture-thumbnail');
                const imageSrc = img ? img.getAttribute('src') || '' : '';

                const data = { type, model, category, source: "construction" };

                window.selectedConstructionModel = model;
                window.selectedConstructionType = type;
                window.selectedConstructionCategory = category;
                window.selectedFurnitureModel = model;
                window.selectedFurnitureType = type;
                window.currentDraggedConstruction = data;

                event.dataTransfer.effectAllowed = "copy";
                event.dataTransfer.setData("text/plain", JSON.stringify(data));
                event.dataTransfer.setData("application/json", JSON.stringify(data));
                event.dataTransfer.setData("model", model || "");
                event.dataTransfer.setData("type", type || "");
                event.dataTransfer.setData("imageSrc", imageSrc); // important

                console.log("DRAGGING Construction:", data);
            });
        });

        // Setup images for construction cards
        setupFurnitureCardImages(view);
    }

    window.backToConstruction = function () {
        const constructionSection = document.querySelector(".construction-section");

        if (constructionSection) {
            constructionSection.style.display = "block";
        }

        document.querySelectorAll(".subcategory-view").forEach(function (view) {
            if (view.id && view.id.indexOf("construction") === 0) {
                view.style.display = "none";
                view.classList.remove("active");
            }
        });

        window.currentConstructionCategory = null;
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initConstructionCategoryClick);
    } else {
        initConstructionCategoryClick();
    }
})();

/* =========================================================
   OUTDOOR CATEGORY SYSTEM + DRAG with imageSrc
========================================================= */
(function () {
    "use strict";

    const outdoorViews = {
        "Path and Lawns": "outdoorPathLawnsView",
        "Patio": "outdoorPatioView",
        "Trees and Plants": "outdoorTreesView",
        "Garage": "outdoorGarageView",
        "Pool": "outdoorPoolView",
        "Lighting": "outdoorLightingView",
        "Outdoor Activities": "outdoorActivitiesView",
        "Garden": "outdoorGardenView"
    };

    window.openOutdoorCategory = function (category) {
        console.log("Outdoor category:", category);

        const outdoorPanel = document.getElementById("outdoorPanel");
        const viewId = outdoorViews[category];

        if (!viewId) {
            console.error("Outdoor category not found:", category);
            return;
        }

        const selectedView = document.getElementById(viewId);

        if (!selectedView) {
            console.error("Outdoor view not found:", viewId);
            return;
        }

        if (outdoorPanel) {
            outdoorPanel.style.display = "none";
        }

        Object.values(outdoorViews).forEach(function (id) {
            const view = document.getElementById(id);
            if (view) {
                view.style.display = "none";
                view.classList.remove("active");
            }
        });

        selectedView.style.display = "block";
        selectedView.classList.add("active");

        selectedView.dataset.category = category;
        window.currentOutdoorCategory = category;

        addOutdoorBackButton(selectedView);
        setupOutdoorCards(selectedView);
    };

    function initializeOutdoorCategories() {
        const outdoorPanel = document.getElementById("outdoorPanel");

        if (!outdoorPanel) {
            console.warn("#outdoorPanel not found");
            return;
        }

        const buttons = outdoorPanel.querySelectorAll(".build-option");

        console.log("Outdoor categories found:", buttons.length);

        buttons.forEach(function (button) {
            const span = button.querySelector("span");

            if (!span) return;

            const category = span.textContent.trim();

            button.style.cursor = "pointer";
            button.removeAttribute("onclick");

            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                openOutdoorCategory(category);
            }, true);
        });
    }

    function addOutdoorBackButton(view) {
        if (!view) return;

        const heading = view.querySelector(".subcategory-heading");

        if (!heading) return;

        if (heading.querySelector(".outdoor-back-button")) {
            return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "outdoor-back-button";
        button.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';

        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            closeOutdoorCategory();
        });

        heading.prepend(button);
    }

    window.closeOutdoorCategory = function () {
        Object.values(outdoorViews).forEach(function (id) {
            const view = document.getElementById(id);
            if (view) {
                view.style.display = "none";
                view.classList.remove("active");
            }
        });

        const outdoorPanel = document.getElementById("outdoorPanel");
        if (outdoorPanel) {
            outdoorPanel.style.display = "block";
        }

        window.currentOutdoorCategory = null;
    };

    function setupOutdoorCards(view) {
        if (!view) return;

        const cards = view.querySelectorAll(".furniture-card");

        cards.forEach(function (card) {
            card.setAttribute("draggable", "true");

            if (card.dataset.outdoorReady === "true") {
                return;
            }

            card.dataset.outdoorReady = "true";

            card.addEventListener("dragstart", function (event) {
                const model = card.getAttribute("data-model");
                const type = card.getAttribute("data-type");
                const category = view.dataset.category || window.currentOutdoorCategory || "";
                const img = card.querySelector('.furniture-thumbnail');
                const imageSrc = img ? img.getAttribute('src') || '' : '';

                const itemData = { type, model, category, source: "outdoor" };

                window.selectedOutdoorModel = model;
                window.selectedOutdoorType = type;
                window.selectedOutdoorCategory = category;
                window.selectedFurnitureModel = model;
                window.selectedFurnitureType = type;
                window.currentDraggedOutdoor = itemData;

                if (event.dataTransfer) {
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData("text/plain", JSON.stringify(itemData));
                    event.dataTransfer.setData("application/json", JSON.stringify(itemData));
                    event.dataTransfer.setData("model", model || "");
                    event.dataTransfer.setData("type", type || "");
                    event.dataTransfer.setData("imageSrc", imageSrc); // important
                }

                console.log("Outdoor item dragging:", itemData);
            });
        });

        // Setup images for outdoor cards
        setupFurnitureCardImages(view);
    }

    function initializeOutdoorCards() {
        Object.values(outdoorViews).forEach(function (viewId) {
            const view = document.getElementById(viewId);
            if (view) {
                setupOutdoorCards(view);
            }
        });
    }

    function initializeOutdoorSystem() {
        initializeOutdoorCategories();
        initializeOutdoorCards();
        console.log("Outdoor system initialized.");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeOutdoorSystem);
    } else {
        initializeOutdoorSystem();
    }
})();

/* =========================================================
   CONSTRUCTION BACK BUTTON
========================================================= */
function closeConstructionCategory() {
    console.log("Construction Back clicked");

    const constructionViews = [
        "constructionDoorsView",
        "constructionWindowsView",
        "constructionStairsView",
        "constructionArchsView",
        "constructionPartitionView",
        "constructionRoofsView",
        "constructionFireplaceView",
        "constructionColumnView",
        "constructionTerraceView",
        "constructionFencesView"
    ];

    constructionViews.forEach(function (viewId) {
        const view = document.getElementById(viewId);
        if (view) {
            view.style.display = "none";
            view.classList.remove("active");
        }
    });

    const constructionSection = document.querySelector(".construction-section");
    if (constructionSection) {
        constructionSection.style.display = "block";
    }

    window.currentConstructionCategory = null;
    window.selectedConstructionModel = null;
    window.selectedConstructionType = null;

    console.log("Back to Construction categories");
}

/* =====================================================
   ROOM + WALL SELECTION SYSTEM
===================================================== */
const propertiesBar = document.getElementById("propertiesBar");
const selectionToolbar = document.getElementById("selectionToolbar");
const roomSelectionBox = document.getElementById("roomSelectionBox");
const roomElement = document.getElementById("room");
const actionMove = document.getElementById("actionMove");
const actionRotate = document.getElementById("actionRotate");
const actionDuplicate = document.getElementById("actionDuplicate");
const actionDelete = document.getElementById("actionDelete");

let currentSelectionType = null;
let currentWallObject = null;

function hideSelectionUI() {
    if (propertiesBar) {
        propertiesBar.classList.remove("room-properties-visible");
    }
    if (selectionToolbar) {
        selectionToolbar.style.display = "none";
    }
    if (roomSelectionBox) {
        roomSelectionBox.style.display = "none";
    }
    if (roomElement) {
        roomElement.classList.remove("room-selected");
    }
    removeWallHighlight();
    currentSelectionType = null;
    currentWallObject = null;
}

function showRoomPropertiesOnly() {
    if (!propertiesBar) return;

    propertiesBar.classList.add("room-properties-visible");

    if (widthInput) {
        widthInput.value = roomData.width + " cm";
    }
    if (depthInput) {
        depthInput.value = roomData.depth + " cm";
    }
    if (heightInput) {
        heightInput.value = roomData.height + " cm";
    }
    if (angleInput) {
        angleInput.value = roomData.angle + "°";
    }
    if (elevationInput) {
        elevationInput.value = roomData.elevation + " cm";
    }
}

function updateRoomSelectionBox() {
    if (!roomElement || !roomSelectionBox) {
        return;
    }

    const rect = roomElement.getBoundingClientRect();

    roomSelectionBox.style.display = "block";
    roomSelectionBox.style.left = rect.left + "px";
    roomSelectionBox.style.top = rect.top + "px";
    roomSelectionBox.style.width = rect.width + "px";
    roomSelectionBox.style.height = rect.height + "px";
}

function positionToolbar(left, top) {
    if (!selectionToolbar) return;

    selectionToolbar.style.display = "flex";
    selectionToolbar.style.left = left + "px";
    selectionToolbar.style.top = top + "px";
}

function selectCompleteRoom() {
    hideSelectionUI();

    currentSelectionType = "room";

    if (roomElement) {
        roomElement.classList.add("room-selected");
    }

    if (canvas) {
        canvas.discardActiveObject();
        canvas.renderAll();
    }

    showRoomPropertiesOnly();

    requestAnimationFrame(function () {
        updateRoomSelectionBox();

        const rect = roomElement.getBoundingClientRect();

        positionToolbar(
            rect.left + rect.width / 2 - 90,
            rect.top - 55
        );
    });
}

if (roomElement) {
    roomElement.addEventListener("click", function (event) {
        event.stopPropagation();
        selectCompleteRoom();
    });
}

let wallHighlight = null;

function createWallHighlight() {
    if (wallHighlight) return;

    wallHighlight = document.createElement("div");
    wallHighlight.className = "wall-selected-highlight";
    document.body.appendChild(wallHighlight);
}

function removeWallHighlight() {
    if (wallHighlight) {
        wallHighlight.remove();
        wallHighlight = null;
    }
}

function selectWall(object) {
    hideSelectionUI();

    currentSelectionType = "wall";
    currentWallObject = object;

    createWallHighlight();

    const rect = object.getBoundingRect();
    const canvasRect = canvas.upperCanvasEl.getBoundingClientRect();
    const left = canvasRect.left + rect.left;
    const top = canvasRect.top + rect.top;

    wallHighlight.style.left = left + "px";
    wallHighlight.style.top = top + "px";
    wallHighlight.style.width = rect.width + "px";
    wallHighlight.style.height = rect.height + "px";

    positionToolbar(
        left + rect.width / 2 - 90,
        Math.max(10, top - 55)
    );

    if (propertiesBar) {
        propertiesBar.classList.remove("room-properties-visible");
    }
}

canvas.on("selection:created", function (event) {
    const object = event.selected && event.selected[0];

    if (!object) return;

    if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
        selectWall(object);
        return;
    }

    if (object.itemType === "RoomShape" || object.isRoomShape === true) {
        selectCompleteRoom();
        return;
    }

    hideSelectionUI();
    currentSelectionType = "furniture";
    updateFurnitureProperties(object);
});

canvas.on("selection:updated", function (event) {
    const object = event.selected && event.selected[0];

    if (!object) return;

    if (object.itemType === "Wall" || object.type === "wall" || object.isWall === true) {
        selectWall(object);
        return;
    }

    if (object.itemType === "RoomShape" || object.isRoomShape === true) {
        selectCompleteRoom();
        return;
    }

    hideSelectionUI();
    currentSelectionType = "furniture";
    updateFurnitureProperties(object);
});

canvas.on("selection:cleared", function () {
    if (currentSelectionType !== "room") {
        hideSelectionUI();
    }
});

function updateFurnitureProperties(object) {
    if (widthInput) {
        widthInput.value = Math.round(object.getScaledWidth()) + " cm";
    }
    if (depthInput) {
        depthInput.value = Math.round(object.getScaledHeight()) + " cm";
    }
    if (heightInput) {
        heightInput.value = object.objectHeight || "65 cm";
    }
    if (angleInput) {
        angleInput.value = Math.round(object.angle || 0) + "°";
    }
    if (elevationInput) {
        elevationInput.value = object.elevation || "0 cm";
    }

    if (propertiesBar) {
        propertiesBar.classList.add("room-properties-visible");
    }
}

if (actionMove) {
    actionMove.addEventListener("click", function (event) {
        event.stopPropagation();

        if (currentSelectionType === "room") {
            roomElement.style.cursor = "move";
            return;
        }

        if (currentSelectionType === "wall" && currentWallObject) {
            canvas.setActiveObject(currentWallObject);
            currentWallObject.set({
                selectable: true,
                evented: true
            });
            canvas.renderAll();
        }
    });
}

if (actionRotate) {
    actionRotate.addEventListener("click", function (event) {
        event.stopPropagation();

        if (currentSelectionType === "room") {
            roomData.angle = (roomData.angle + 90) % 360;
            updateRoom();
            sendRoomDataTo3D();
            updateRoomSelectionBox();
            return;
        }

        if (currentWallObject) {
            currentWallObject.rotate((currentWallObject.angle || 0) + 90);
            currentWallObject.setCoords();
            canvas.renderAll();
        }
    });
}

if (actionDuplicate) {
    actionDuplicate.addEventListener("click", function (event) {
        event.stopPropagation();

        if (currentSelectionType === "wall" && currentWallObject) {
            currentWallObject.clone(function (cloned) {
                cloned.set({
                    left: (cloned.left || 0) + 20,
                    top: (cloned.top || 0) + 20
                });
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
            return;
        }

        const activeObject = canvas.getActiveObject();
        if (activeObject && currentSelectionType === "furniture") {
            activeObject.clone(function (cloned) {
                cloned.set({
                    left: (cloned.left || 0) + 20,
                    top: (cloned.top || 0) + 20
                });
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.renderAll();
            });
        }
    });
}

if (actionDelete) {
    actionDelete.addEventListener("click", function (event) {
        event.stopPropagation();

        if (currentSelectionType === "wall" && currentWallObject) {
            canvas.remove(currentWallObject);
            canvas.discardActiveObject();
            canvas.renderAll();
            removeWallHighlight();
            sendWallsTo3D();
            hideSelectionUI();
            return;
        }

        const activeObject = canvas.getActiveObject();
        if (activeObject && currentSelectionType === "furniture") {
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.renderAll();
            hideSelectionUI();
        }

        if (currentSelectionType === "room") {
            console.log("Room cannot be deleted.");
        }
    });
}

const bottomDelete = document.getElementById("deleteFurniture");

if (bottomDelete) {
    bottomDelete.addEventListener("click", function (event) {
        event.stopPropagation();

        if (currentSelectionType === "wall" && currentWallObject) {
            canvas.remove(currentWallObject);
            canvas.discardActiveObject();
            canvas.renderAll();
            sendWallsTo3D();
            hideSelectionUI();
            return;
        }

        const object = canvas.getActiveObject();
        if (object && currentSelectionType === "furniture") {
            canvas.remove(object);
            canvas.discardActiveObject();
            canvas.renderAll();
            hideSelectionUI();
        }
    });
}

canvas.on("mouse:down", function (event) {
    if (!event.target) {
        hideSelectionUI();
    }
});

window.addEventListener("resize", function () {
    if (currentSelectionType === "room") {
        updateRoomSelectionBox();
    }
});

function refreshRoomSelection() {
    if (currentSelectionType === "room") {
        updateRoomSelectionBox();
        showRoomPropertiesOnly();
    }
}

/* =========================================================
   ROOM & WALL SELECTION (INDEPENDENT SYSTEM)
========================================================= */
(function () {
    "use strict";

    const roomEl = document.getElementById('room');
    const canvasEl = canvas;

    if (!roomEl || !canvasEl) {
        console.warn('Room or Canvas not found');
        return;
    }

    let isRoomSelected = false;
    let selectedWall = null;
    let wallHighlightDiv = null;
    let wallIconDiv = null;
    let roomBadge = null;

    function getAllWalls() {
        return canvasEl.getObjects().filter(obj => {
            return obj.itemType === 'Wall' ||
                obj.itemType === 'RoomShape' ||
                obj.type === 'line' ||
                obj.isWall === true;
        });
    }

    function setWallColor(wall, color) {
        if (!wall) return;
        wall.set({ stroke: color });
        wall.setCoords();
    }

    function resetWallColor(wall) {
        setWallColor(wall, '#586a6d');
    }

    function highlightWall(wall) {
        setWallColor(wall, '#00cc44');
    }

    function resetAllWalls() {
        getAllWalls().forEach(w => resetWallColor(w));
        canvasEl.renderAll();
    }

    function distToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lenSq = dx * dx + dy * dy;
        if (lenSq === 0) {
            return Math.hypot(px - x1, py - y1);
        }
        let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
        t = Math.max(0, Math.min(1, t));
        const nearX = x1 + t * dx;
        const nearY = y1 + t * dy;
        return Math.hypot(px - nearX, py - nearY);
    }

    function findWallAtPointer(e) {
        const pointer = canvasEl.getPointer(e);
        const walls = getAllWalls();
        const threshold = 15;

        for (let i = walls.length - 1; i >= 0; i--) {
            const wall = walls[i];
            let x1, y1, x2, y2;
            if (wall.type === 'line') {
                x1 = wall.x1;
                y1 = wall.y1;
                x2 = wall.x2;
                y2 = wall.y2;
            } else {
                const rect = wall.getBoundingRect();
                x1 = rect.left;
                y1 = rect.top;
                x2 = rect.left + rect.width;
                y2 = rect.top + rect.height;
            }
            const dist = distToSegment(pointer.x, pointer.y, x1, y1, x2, y2);
            if (dist < threshold) {
                return wall;
            }
        }
        return null;
    }

    function clearSelectionUI() {
        if (roomBadge) {
            roomBadge.remove();
            roomBadge = null;
        }
        roomEl.classList.remove('room-selected');
        isRoomSelected = false;

        if (wallHighlightDiv) {
            wallHighlightDiv.remove();
            wallHighlightDiv = null;
        }
        if (wallIconDiv) {
            wallIconDiv.remove();
            wallIconDiv = null;
        }
        if (selectedWall) {
            resetWallColor(selectedWall);
            selectedWall = null;
        }
        resetAllWalls();
        canvasEl.renderAll();
    }

    function showWallUI(wall) {
        if (wallHighlightDiv) wallHighlightDiv.remove();
        if (wallIconDiv) wallIconDiv.remove();

        const rect = wall.getBoundingRect();
        const canvasRect = canvasEl.upperCanvasEl.getBoundingClientRect();
        const left = canvasRect.left + rect.left;
        const top = canvasRect.top + rect.top;
        const width = rect.width || 20;
        const height = rect.height || 20;

        wallHighlightDiv = document.createElement('div');
        wallHighlightDiv.className = 'wall-selected-highlight';
        wallHighlightDiv.style.left = (left - 4) + 'px';
        wallHighlightDiv.style.top = (top - 4) + 'px';
        wallHighlightDiv.style.width = (width + 8) + 'px';
        wallHighlightDiv.style.height = (height + 8) + 'px';
        document.body.appendChild(wallHighlightDiv);

        wallIconDiv = document.createElement('div');
        wallIconDiv.className = 'wall-selection-icon';
        wallIconDiv.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
        wallIconDiv.style.left = (left + width + 4) + 'px';
        wallIconDiv.style.top = (top - 14) + 'px';
        document.body.appendChild(wallIconDiv);
    }

    function selectWall(wall) {
        if (isRoomSelected) {
            clearSelectionUI();
        }

        if (selectedWall === wall) {
            resetWallColor(wall);
            selectedWall = null;
            if (wallHighlightDiv) wallHighlightDiv.remove();
            if (wallIconDiv) wallIconDiv.remove();
            wallHighlightDiv = null;
            wallIconDiv = null;
            canvasEl.renderAll();
            return;
        }

        if (selectedWall) {
            resetWallColor(selectedWall);
        }

        selectedWall = wall;
        highlightWall(wall);
        showWallUI(wall);
        canvasEl.renderAll();
    }

    function selectRoom() {
        if (selectedWall) {
            resetWallColor(selectedWall);
            selectedWall = null;
            if (wallHighlightDiv) wallHighlightDiv.remove();
            if (wallIconDiv) wallIconDiv.remove();
            wallHighlightDiv = null;
            wallIconDiv = null;
        }

        isRoomSelected = !isRoomSelected;

        if (isRoomSelected) {
            getAllWalls().forEach(w => highlightWall(w));
            canvasEl.renderAll();

            if (!roomBadge) {
                roomBadge = document.createElement('div');
                roomBadge.className = 'room-selection-badge';
                roomBadge.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Room Selected';
                roomEl.style.position = 'relative';
                roomEl.appendChild(roomBadge);
            }
            roomEl.classList.add('room-selected');
        } else {
            resetAllWalls();
            canvasEl.renderAll();
            if (roomBadge) {
                roomBadge.remove();
                roomBadge = null;
            }
            roomEl.classList.remove('room-selected');
        }
    }

    roomEl.addEventListener('click', function (e) {
        if (e.target.closest('.room-selection-badge') ||
            e.target.closest('.wall-selection-icon')) {
            return;
        }
        e.stopPropagation();
        selectRoom();
    }, true);

    canvasEl.on('mouse:down', function (opt) {
        const e = opt.e;
        const target = opt.target;

        if (target && target.itemType &&
            target.itemType !== 'Wall' &&
            target.itemType !== 'RoomShape' &&
            target.type !== 'line') {
            clearSelectionUI();
            return;
        }

        const wall = findWallAtPointer(e);
        if (wall) {
            e.stopPropagation && e.stopPropagation();
            selectWall(wall);
        } else {
            clearSelectionUI();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (selectedWall) {
                showWallUI(selectedWall);
            }
        }, 100);
    });

    clearSelectionUI();
    console.log('✅ Room & Wall Selection (Independent) loaded successfully!');
})();

// ============================================================
//  UNDO / REDO SYSTEM
// ============================================================
(function () {
    "use strict";

    const MAX_HISTORY = 50;
    let undoStack = [];
    let redoStack = [];
    let isRestoring = false;

    function saveState() {
        if (isRestoring) return;

        const json = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
        if (undoStack.length > 0) {
            const last = undoStack[undoStack.length - 1];
            if (JSON.stringify(last) === JSON.stringify(json)) {
                return;
            }
        }
        undoStack.push(json);
        if (undoStack.length > MAX_HISTORY) {
            undoStack.shift();
        }
        redoStack = [];
        updateUndoRedoButtons();
    }

    function undo() {
        if (undoStack.length <= 1) {
            console.log('Nothing to undo');
            return;
        }
        const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
        redoStack.push(current);

        const target = undoStack[undoStack.length - 2];
        if (!target) return;

        isRestoring = true;
        canvas.clear();
        canvas.loadFromJSON(target, function () {
            canvas.renderAll();
            isRestoring = false;
            if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
            if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
            updateUndoRedoButtons();
        });
    }

    function redo() {
        if (redoStack.length === 0) {
            console.log('Nothing to redo');
            return;
        }
        const current = canvas.toJSON(['itemType', 'furnitureName', 'glbModel', 'formType', 'roomShape']);
        undoStack.push(current);

        const next = redoStack.pop();
        isRestoring = true;
        canvas.clear();
        canvas.loadFromJSON(next, function () {
            canvas.renderAll();
            isRestoring = false;
            if (typeof sendWallsTo3D === 'function') sendWallsTo3D();
            if (typeof sendRoomDataTo3D === 'function') sendRoomDataTo3D();
            updateUndoRedoButtons();
        });
    }

    function updateUndoRedoButtons() {
        const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
        const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
        if (undoBtn) {
            undoBtn.style.opacity = (undoStack.length > 1) ? '1' : '0.4';
            undoBtn.style.pointerEvents = (undoStack.length > 1) ? 'auto' : 'none';
        }
        if (redoBtn) {
            redoBtn.style.opacity = (redoStack.length > 0) ? '1' : '0.4';
            redoBtn.style.pointerEvents = (redoStack.length > 0) ? 'auto' : 'none';
        }
    }

    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);

    setTimeout(function () {
        saveState();
        updateUndoRedoButtons();
    }, 100);

    window.undoAction = undo;
    window.redoAction = redo;
    window.saveCanvasState = saveState;

    document.addEventListener('DOMContentLoaded', function () {
        const undoBtn = document.querySelector('.nav-icon[title="Undo"]');
        const redoBtn = document.querySelector('.nav-icon[title="Redo"]');
        if (undoBtn) {
            undoBtn.addEventListener('click', function (e) {
                e.preventDefault();
                undo();
            });
        }
        if (redoBtn) {
            redoBtn.addEventListener('click', function (e) {
                e.preventDefault();
                redo();
            });
        }
        updateUndoRedoButtons();
    });
})();

/**
 * FURNITURE CATEGORY CLICK HANDLER
 * Makes all categories clickable and shows thumbnails.
 */
document.addEventListener('DOMContentLoaded', function () {
    const furnitureItems = document.querySelectorAll('.furniture-item');
    const categoriesDiv = document.getElementById('categories');
    const furniturePanel = document.getElementById('furniturePanel');
    const backBtn = document.getElementById('furnitureBackBtn');

    const VIEW_MAP = {
        'Armchairs': 'armchairsView',
        'Sofa': 'sofasView'
    };

    const DISPLAY_NAMES = {
        'Armchairs': 'Armchairs',
        'Sofa': 'Sofas',
        'Ottoman': 'Ottoman',
        'Bed': 'Beds',
        'Storage': 'Storage',
        'Table': 'Tables, chairs',
        'Office Desk': 'Office furniture',
        'Children Furniture': "Children's furniture",
        'Kitchen': 'Kitchen',
        'Bathroom': 'Bathroom'
    };

    const ICON_MAP = {
        'Armchairs': 'fa-chair',
        'Sofa': 'fa-couch',
        'Ottoman': 'fa-cube',
        'Bed': 'fa-bed',
        'Storage': 'fa-box',
        'Table': 'fa-table',
        'Office Desk': 'fa-desktop',
        'Children Furniture': 'fa-child',
        'Kitchen': 'fa-kitchen-set',
        'Bathroom': 'fa-bath'
    };

    const THUMB_COUNT = 12;

    function hideAllSubViews() {
        document.querySelectorAll('.subcategory-view').forEach(v => v.style.display = 'none');
        const dyn = document.getElementById('dynamicCategoryView');
        if (dyn) dyn.remove();
    }

    function showBuiltView(viewId) {
        hideAllSubViews();
        if (categoriesDiv) categoriesDiv.style.display = 'none';
        const view = document.getElementById(viewId);
        if (view) {
            view.style.display = 'block';
            setupFurnitureCardImages(view);
            return true;
        }
        return false;
    }

    function generateDynamicView(category) {
        const oldDyn = document.getElementById('dynamicCategoryView');
        if (oldDyn) oldDyn.remove();

        hideAllSubViews();
        if (categoriesDiv) categoriesDiv.style.display = 'none';

        const view = document.createElement('div');
        view.id = 'dynamicCategoryView';
        view.className = 'subcategory-view';
        view.style.display = 'block';

        const heading = document.createElement('div');
        heading.className = 'subcategory-heading';
        heading.innerHTML = `<span>${DISPLAY_NAMES[category] || category}</span>`;
        view.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'furniture-grid';

        const iconClass = ICON_MAP[category] || 'fa-cube';
        const displayName = DISPLAY_NAMES[category] || category;
        const folder = category.toLowerCase().replace(/\s/g, '');

        for (let i = 1; i <= THUMB_COUNT; i++) {
            const card = document.createElement('div');
            card.className = 'furniture-card';
            card.draggable = true;
            card.dataset.type = category;
            card.dataset.model = `models/${folder}/${folder}${i}.glb`;

            const imageDiv = document.createElement('div');
            imageDiv.className = 'card-image';

            const img = document.createElement('img');
            img.src = `models/${folder}/${folder}${i}.png`;
            img.alt = `${displayName} ${i}`;
            img.className = 'furniture-thumbnail';
            img.loading = 'lazy';

            // Use our enhanced image loader
            loadImageWithFallback(img, img.src, category, i);

            imageDiv.appendChild(img);

            const fallback = document.createElement('i');
            fallback.className = `fa-solid ${iconClass} thumbnail-fallback`;
            fallback.style.display = 'none';
            imageDiv.appendChild(fallback);

            card.appendChild(imageDiv);

            const nameSpan = document.createElement('div');
            nameSpan.className = 'card-name';
            nameSpan.textContent = `${displayName} ${i}`;
            card.appendChild(nameSpan);

            grid.appendChild(card);
        }

        view.appendChild(grid);

        const panel = furniturePanel || document.getElementById('furniturePanel');
        const lastView = panel.querySelector('.subcategory-view:last-of-type');
        if (lastView) {
            lastView.parentNode.insertBefore(view, lastView.nextSibling);
        } else {
            panel.appendChild(view);
        }

        setupFurnitureCardImages(view);
        return view;
    }

    function handleCategoryClick(category) {
        furnitureItems.forEach(el => el.classList.remove('active'));

        const target = Array.from(furnitureItems).find(
            el => (el.dataset.category || el.dataset.type) === category
        );
        if (target) target.classList.add('active');

        const viewId = VIEW_MAP[category];
        if (viewId) {
            showBuiltView(viewId);
            return;
        }

        generateDynamicView(category);
    }

    function goBackToCategories() {
        hideAllSubViews();
        if (categoriesDiv) categoriesDiv.style.display = 'block';
        furnitureItems.forEach(el => el.classList.remove('active'));
    }

    furnitureItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();

            const category = this.dataset.category || this.dataset.type;
            if (!category) return;

            handleCategoryClick(category);
        });

        item.style.cursor = 'pointer';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            goBackToCategories();
        });
    }

    console.log('✅ Furniture categories are now clickable!');
});
/* =====================================================
   ROOM FULLSCREEN  —  expand button pe click → room fullscreen
===================================================== */
const roomFullscreenBtn = document.getElementById("roomFullscreen");
const roomElFull = document.getElementById("room");

if (roomFullscreenBtn && roomElFull) {
    roomFullscreenBtn.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            // Fullscreen me jao
            if (roomElFull.requestFullscreen) {
                roomElFull.requestFullscreen();
            } else if (roomElFull.webkitRequestFullscreen) {
                roomElFull.webkitRequestFullscreen();       // Safari
            } else if (roomElFull.msRequestFullscreen) {
                roomElFull.msRequestFullscreen();           // IE/Edge
            }
        } else {
            // Fullscreen se bahar aao
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    });

    // Fullscreen state change → icon badlo
    document.addEventListener("fullscreenchange", function () {
        const icon = roomFullscreenBtn.querySelector("i");
        if (document.fullscreenElement) {
            icon.className = "fa-solid fa-compress";   // chhota karne ka icon
            roomElFull.style.width = "100vw";
            roomElFull.style.height = "100vh";
        } else {
            icon.className = "fa-solid fa-expand";     // expand icon
            roomElFull.style.width = "";
            roomElFull.style.height = "";
            if (typeof canvas !== "undefined" && canvas) {
                setTimeout(() => {
                    canvas.setDimensions({
                        width: roomElFull.clientWidth,
                        height: roomElFull.clientHeight
                    });
                    canvas.renderAll();
                }, 100);
            }
        }
    });
}
/* =====================================================
   MOBILE — Close side panel when tapping outside
   ===================================================== */
   document.addEventListener('click', function (e) {
    if (window.innerWidth > 900) return;
  
    const sidePanels = document.querySelector('.side-panels');
    const iconSidebar = document.querySelector('.icon-sidebar');
    if (!sidePanels || !iconSidebar) return;
  
    // Agar panel hidden hai to kuch na karein
    if (sidePanels.classList.contains('panel-hidden')) return;
  
    // Agar click icon sidebar ya panel ke andar hua to skip
    if (iconSidebar.contains(e.target)) return;
    if (sidePanels.contains(e.target)) return;
  
    // Warna panel band kar dein
    sidePanels.classList.add('panel-hidden');
    document.querySelectorAll('.side-icon').forEach(function (ic) {
      ic.classList.remove('active');
    });
  });
  
  /* =====================================================
     MOBILE — Auto-hide panel on page load
     ===================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 900) {
      const sidePanels = document.querySelector('.side-panels');
      if (sidePanels) sidePanels.classList.add('panel-hidden');
    }
  });
  
  /* =====================================================
     RESIZE — Reset panel state when switching to desktop
     ===================================================== */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      const sidePanels = document.querySelector('.side-panels');
      if (sidePanels) sidePanels.classList.remove('panel-hidden');
    }
  });
  /* =====================================================
   SYNC ALL FURNITURE TO 3D
   Har furniture ko unique ID deta hai aur
   saare items 3D mein render karta hai
===================================================== */
function syncAllFurniture3D() {
    if (!canvas) return;

    const allItems = [];
    const objects = canvas.getObjects();

    objects.forEach(function (obj) {
        // Walls, RoomShapes, Forms skip karein
        if (!obj.itemType) return;
        if (obj.itemType === "Wall") return;
        if (obj.itemType === "RoomShape") return;
        if (obj.itemType === "Form") return;

        // Har object ko unique ID dein (ek hi baar)
        if (!obj.__uniqueId) {
            obj.__uniqueId =
                "furn_" +
                Date.now() +
                "_" +
                Math.random().toString(36).slice(2, 8);
        }

        allItems.push({
            id: obj.__uniqueId,
            type: obj.itemType,
            name: obj.furnitureName || obj.itemType,
            model: obj.glbModel || null,
            imageUrl: obj.imageUrl || null,
            useImageTexture: window.USE_2D_IMAGE_IN_3D,
            x: obj.left || 0,
            y: obj.top || 0,
            rotation: obj.angle || 0,
            width: obj.getScaledWidth(),
            height: obj.getScaledHeight(),
            scaleX: obj.scaleX || 1,
            scaleY: obj.scaleY || 1
        });
    });

    window.allFurniture3D = allItems;

    // Event bhejein threeview.js ko
    window.dispatchEvent(
        new CustomEvent("allFurniture3DUpdated", {
            detail: allItems
        })
    );

    // Direct function call (agar mojood hai)
    if (typeof renderAllFurniture3D === "function") {
        renderAllFurniture3D(allItems);
    }
}