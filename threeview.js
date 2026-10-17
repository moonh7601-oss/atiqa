
// // /* =====================================================
// //    THREEVIEW.JS
// //    Home Interior Design Project
// //    -----------------------------------------------------
// //    Compatible with existing design.js

// //    FEATURES
// //    -----------------------------------------------------
// //    1. Dynamic room width / depth / height
// //    2. Dynamic room angle / elevation
// //    3. Rectangle / Square / L / T / U / Custom walls
// //    4. design.js wall synchronization
// //    5. 2D selected furniture -> 3D
// //    6. GLB furniture loading
// //    7. Armchair GLB support
// //    8. Correct furniture floor placement
// //    9. Furniture rotation
// //    10. Furniture proportional scaling
// //    11. 2D -> 3D coordinate conversion
// //    12. Camera reset
// //    13. Fullscreen
// // ===================================================== */


// // /* =====================================================
// //    THREE.JS GLOBAL VARIABLES
// // ===================================================== */

// // let scene = null;
// // let camera = null;
// // let renderer = null;
// // let controls = null;

// // let roomGroup = null;
// // let furnitureGroup = null;
// // let currentFurnitureMesh = null;

// // let threeInitialized = false;
// // let gltfLoader = null;


// // /* =====================================================
// //    DEFAULT ROOM
// // ===================================================== */

// // const DEFAULT_ROOM_WIDTH = 500;
// // const DEFAULT_ROOM_DEPTH = 300;
// // const DEFAULT_ROOM_HEIGHT = 280;

// // const THREE_WALL_THICKNESS = 0.15;
// // const FLOOR_THICKNESS = 0.12;


// // /* =====================================================
// //    CURRENT ROOM DATA
// // ===================================================== */

// // let threeRoomData = {
// //     width: DEFAULT_ROOM_WIDTH,
// //     depth: DEFAULT_ROOM_DEPTH,
// //     height: DEFAULT_ROOM_HEIGHT,
// //     angle: 0,
// //     elevation: 0
// // };


// // /* =====================================================
// //    CURRENT WALL DATA
// // ===================================================== */

// // let threeWallData = {
// //     points: [],
// //     walls: [],
// //     closed: false,
// //     shape: "custom"
// // };


// // /* =====================================================
// //    INITIALIZE THREE VIEW
// // ===================================================== */

// // function initThreeView() {

// //     const container = document.getElementById("threeView");

// //     if (!container) {
// //         console.warn("Three.js container #threeView not found.");
// //         return;
// //     }


// //     /* -------------------------------------------------
// //        Already initialized
// //     ------------------------------------------------- */

// //     if (threeInitialized) {

// //         resizeThreeView();

// //         updateThreeRoom(
// //             window.roomData || threeRoomData
// //         );

// //         updateThreeWalls(
// //             window.roomWallData || threeWallData
// //         );

// //         return;
// //     }


// //     /* =================================================
// //        SCENE
// //     ================================================= */

// //     scene = new THREE.Scene();

// //     scene.background = new THREE.Color(0xe7eaed);


// //     /* =================================================
// //        GLTF LOADER
// //     ================================================= */

// //     gltfLoader = new THREE.GLTFLoader();


// //     /* =================================================
// //        CAMERA
// //     ================================================= */

// //     const width =
// //         Math.max(container.clientWidth, 1);

// //     const height =
// //         Math.max(container.clientHeight, 1);

// //     camera = new THREE.PerspectiveCamera(
// //         50,
// //         width / height,
// //         0.1,
// //         1000
// //     );

// //     camera.position.set(7, 5.5, 7);


// //     /* =================================================
// //        RENDERER
// //     ================================================= */

// //     renderer = new THREE.WebGLRenderer({
// //         antialias: true,
// //         alpha: false
// //     });

// //     renderer.setPixelRatio(
// //         Math.min(window.devicePixelRatio || 1, 2)
// //     );

// //     renderer.setSize(width, height);

// //     renderer.shadowMap.enabled = true;
// //     renderer.shadowMap.type =
// //         THREE.PCFSoftShadowMap;

// //     renderer.outputColorSpace =
// //         THREE.SRGBColorSpace;

// //     container.appendChild(
// //         renderer.domElement
// //     );


// //     /* =================================================
// //        ORBIT CONTROLS
// //     ================================================= */

// //     controls = new THREE.OrbitControls(
// //         camera,
// //         renderer.domElement
// //     );

// //     controls.enableDamping = true;
// //     controls.dampingFactor = 0.08;

// //     controls.minDistance = 1;
// //     controls.maxDistance = 50;

// //     controls.target.set(0, 1, 0);

// //     controls.update();


// //     /* =================================================
// //        FURNITURE GROUP
// //     ================================================= */

// //     furnitureGroup = new THREE.Group();

// //     furnitureGroup.name =
// //         "FurnitureGroup";

// //     scene.add(furnitureGroup);


// //     /* =================================================
// //        LIGHTS
// //     ================================================= */

// //     threeCreateLights();


// //     /* =================================================
// //        CREATE INITIAL ROOM
// //     ================================================= */

// //     threeCreateRoom(
// //         window.roomData || threeRoomData
// //     );


// //     /* =================================================
// //        EVENTS
// //     ================================================= */

// //     window.addEventListener(
// //         "resize",
// //         resizeThreeView
// //     );


// //     /* -------------------------------------------------
// //        Room data event
// //        From design.js
// //     ------------------------------------------------- */

// //     window.addEventListener(
// //         "roomDataUpdated",
// //         function (event) {

// //             if (!event.detail) return;

// //             updateThreeRoom(
// //                 event.detail
// //             );
// //         }
// //     );


// //     /* -------------------------------------------------
// //        Wall data event
// //        From design.js
// //     ------------------------------------------------- */

// //     window.addEventListener(
// //         "roomWallsUpdated",
// //         function (event) {

// //             if (!event.detail) return;

// //             updateThreeWalls(
// //                 event.detail
// //             );
// //         }
// //     );


// //     /* -------------------------------------------------
// //        Selected furniture event
// //        From design.js
// //     ------------------------------------------------- */

// //     window.addEventListener(
// //         "selectedFurniture3DUpdated",
// //         function (event) {

// //             if (!event.detail) return;

// //             showSelectedFurniture3D(
// //                 event.detail
// //             );
// //         }
// //     );


// //     /* -------------------------------------------------
// //        Smart room event
// //        From design.js
// //     ------------------------------------------------- */

// //     window.addEventListener(
// //         "smartRoomGenerated",
// //         function () {

// //             if (window.roomData) {

// //                 updateThreeRoom(
// //                     window.roomData
// //                 );
// //             }

// //             if (window.roomWallData) {

// //                 updateThreeWalls(
// //                     window.roomWallData
// //                 );
// //             }
// //         }
// //     );


// //     /* =================================================
// //        BUTTONS
// //     ================================================= */

// //     const resetButton =
// //         document.getElementById(
// //             "cameraReset"
// //         );

// //     if (resetButton) {

// //         resetButton.addEventListener(
// //             "click",
// //             resetCamera
// //         );
// //     }


// //     const fullscreenButton =
// //         document.getElementById(
// //             "threeFullscreen"
// //         );

// //     if (fullscreenButton) {

// //         fullscreenButton.addEventListener(
// //             "click",
// //             fullscreenThreeView
// //         );
// //     }


// //     /* =================================================
// //        INITIALIZED
// //     ================================================= */

// //     threeInitialized = true;


// //     const loading =
// //         document.getElementById(
// //             "threeLoading"
// //         );

// //     if (loading) {

// //         loading.style.display =
// //             "none";
// //     }


// //     /* =================================================
// //        INITIAL ROOM/WALL SYNC
// //     ================================================= */

// //     if (window.roomData) {

// //         updateThreeRoom(
// //             window.roomData
// //         );
// //     }

// //     if (window.roomWallData) {

// //         updateThreeWalls(
// //             window.roomWallData
// //         );
// //     }


// //     /* =================================================
// //        START RENDER LOOP
// //     ================================================= */

// //     animateThree();
// // }


// // /* =====================================================
// //    LIGHTS
// // ===================================================== */

// // function threeCreateLights() {

// //     if (!scene) return;


// //     /* Ambient */

// //     const ambientLight =
// //         new THREE.AmbientLight(
// //             0xffffff,
// //             0.65
// //         );

// //     scene.add(
// //         ambientLight
// //     );


// //     /* Main directional light */

// //     const mainLight =
// //         new THREE.DirectionalLight(
// //             0xffffff,
// //             1.2
// //         );

// //     mainLight.position.set(
// //         5,
// //         8,
// //         5
// //     );

// //     mainLight.castShadow = true;

// //     mainLight.shadow.mapSize.width =
// //         2048;

// //     mainLight.shadow.mapSize.height =
// //         2048;

// //     scene.add(
// //         mainLight
// //     );


// //     /* Fill */

// //     const fillLight =
// //         new THREE.HemisphereLight(
// //             0xffffff,
// //             0x777777,
// //             0.45
// //         );

// //     scene.add(
// //         fillLight
// //     );
// // }


// // /* =====================================================
// //    CONVERT CM TO METERS
// // ===================================================== */

// // function cmToMeters(value) {

// //     const number =
// //         Number(value);

// //     if (!isFinite(number)) {
// //         return 0;
// //     }

// //     return number / 100;
// // }


// // /* =====================================================
// //    GET ROOM DIMENSIONS IN METERS
// // ===================================================== */

// // function getRoomWidthMeters() {

// //     return cmToMeters(
// //         threeRoomData.width
// //     );
// // }


// // function getRoomDepthMeters() {

// //     return cmToMeters(
// //         threeRoomData.depth
// //     );
// // }


// // function getRoomHeightMeters() {

// //     return cmToMeters(
// //         threeRoomData.height
// //     );
// // }


// // /* =====================================================
// //    UPDATE THREE ROOM
// // ===================================================== */

// // function updateThreeRoom(data) {

// //     if (!data) return;

// //     threeRoomData = {

// //         width:
// //             Number(data.width) ||
// //             DEFAULT_ROOM_WIDTH,

// //         depth:
// //             Number(data.depth) ||
// //             DEFAULT_ROOM_DEPTH,

// //         height:
// //             Number(data.height) ||
// //             DEFAULT_ROOM_HEIGHT,

// //         angle:
// //             Number(data.angle) || 0,

// //         elevation:
// //             Number(data.elevation) || 0
// //     };


// //     /* -------------------------------------------------
// //        If Three.js is not initialized yet,
// //        save data only.
// //     ------------------------------------------------- */

// //     if (!scene) {
// //         return;
// //     }


// //     threeCreateRoom(
// //         threeRoomData
// //     );
// // }


// // /* =====================================================
// //    CREATE / REBUILD ROOM
// // ===================================================== */

// // function threeCreateRoom(data) {

// //     if (!scene) return;


// //     /* =================================================
// //        REMOVE OLD ROOM
// //     ================================================= */

// //     if (roomGroup) {

// //         scene.remove(
// //             roomGroup
// //         );

// //         roomGroup = null;
// //     }


// //     /* =================================================
// //        ROOM DIMENSIONS
// //     ================================================= */

// //     const roomWidth =
// //         cmToMeters(
// //             data.width
// //         );

// //     const roomDepth =
// //         cmToMeters(
// //             data.depth
// //         );

// //     const roomHeight =
// //         cmToMeters(
// //             data.height
// //         );


// //     /* =================================================
// //        ROOM GROUP
// //     ================================================= */

// //     roomGroup =
// //         new THREE.Group();

// //     roomGroup.name =
// //         "RoomGroup";


// //     /* =================================================
// //        FLOOR
// //     ================================================= */

// //     const floorGeometry =
// //         new THREE.BoxGeometry(
// //             roomWidth,
// //             FLOOR_THICKNESS,
// //             roomDepth
// //         );

// //     const floorMaterial =
// //         new THREE.MeshStandardMaterial({
// //             color: 0xd8c4a8,
// //             roughness: 0.75,
// //             metalness: 0
// //         });

// //     const floorMesh =
// //         new THREE.Mesh(
// //             floorGeometry,
// //             floorMaterial
// //         );

// //     floorMesh.position.y =
// //         -FLOOR_THICKNESS / 2;

// //     floorMesh.receiveShadow = true;

// //     floorMesh.name =
// //         "RoomFloor";

// //     roomGroup.add(
// //         floorMesh
// //     );


// //     /* =================================================
// //        GRID
// //     ================================================= */

// //     const gridSize =
// //         Math.max(
// //             roomWidth,
// //             roomDepth
// //         );

// //     const gridDivisions =
// //         Math.max(
// //             10,
// //             Math.round(
// //                 gridSize * 10
// //             )
// //         );

// //     const grid =
// //         new THREE.GridHelper(
// //             gridSize,
// //             gridDivisions,
// //             0x999999,
// //             0xcccccc
// //         );

// //     grid.scale.z =
// //         roomDepth / gridSize;

// //     grid.position.y =
// //         0.003;

// //     grid.name =
// //         "RoomGrid";

// //     roomGroup.add(
// //         grid
// //     );


// //     /* =================================================
// //        STANDARD ROOM WALLS
// //        Only shown when there is no custom wall data.
// //     ================================================= */

// //     const hasCustomWalls =
// //         threeWallData &&
// //         Array.isArray(
// //             threeWallData.walls
// //         ) &&
// //         threeWallData.walls.length > 0;


// //     if (!hasCustomWalls) {

// //         createDefaultWalls(
// //             roomGroup,
// //             roomWidth,
// //             roomDepth,
// //             roomHeight
// //         );
// //     }


// //     /* =================================================
// //        ADD ROOM TO SCENE
// //     ================================================= */

// //     scene.add(
// //         roomGroup
// //     );


// //     /* =================================================
// //        CUSTOM WALLS
// //     ================================================= */

// //     if (hasCustomWalls) {

// //         createThreeWalls(
// //             threeWallData
// //         );
// //     }


// //     /* =================================================
// //        ROOM ROTATION
// //     ================================================= */

// //     roomGroup.rotation.y =
// //         THREE.MathUtils.degToRad(
// //             data.angle || 0
// //         );


// //     /* =================================================
// //        CAMERA TARGET
// //     ================================================= */

// //     if (controls) {

// //         controls.target.set(
// //             0,
// //             Math.min(
// //                 roomHeight / 2,
// //                 1.5
// //             ),
// //             0
// //         );

// //         controls.update();
// //     }


// //     /* =================================================
// //        UPDATE FURNITURE POSITION
// //     ================================================= */

// //     if (window.selectedFurniture3D) {

// //         showSelectedFurniture3D(
// //             window.selectedFurniture3D
// //         );
// //     }
// // }


// // /* =====================================================
// //    DEFAULT WALLS
// // ===================================================== */

// // function createDefaultWalls(
// //     group,
// //     roomWidth,
// //     roomDepth,
// //     roomHeight
// // ) {

// //     const wallMaterial =
// //         new THREE.MeshStandardMaterial({
// //             color: 0xf3f0ea,
// //             roughness: 0.9
// //         });


// //     /* -------------------------------------------------
// //        BACK WALL
// //     ------------------------------------------------- */

// //     const backWall =
// //         new THREE.Mesh(
// //             new THREE.BoxGeometry(
// //                 roomWidth +
// //                     THREE_WALL_THICKNESS,
// //                 roomHeight,
// //                 THREE_WALL_THICKNESS
// //             ),
// //             wallMaterial
// //         );

// //     backWall.position.set(
// //         0,
// //         roomHeight / 2,
// //         -roomDepth / 2
// //     );

// //     backWall.castShadow = true;
// //     backWall.receiveShadow = true;

// //     backWall.name =
// //         "BackWall";

// //     group.add(
// //         backWall
// //     );


// //     /* -------------------------------------------------
// //        LEFT WALL
// //     ------------------------------------------------- */

// //     const leftWall =
// //         new THREE.Mesh(
// //             new THREE.BoxGeometry(
// //                 THREE_WALL_THICKNESS,
// //                 roomHeight,
// //                 roomDepth
// //             ),
// //             wallMaterial
// //         );

// //     leftWall.position.set(
// //         -roomWidth / 2,
// //         roomHeight / 2,
// //         0
// //     );

// //     leftWall.castShadow = true;
// //     leftWall.receiveShadow = true;

// //     leftWall.name =
// //         "LeftWall";

// //     group.add(
// //         leftWall
// //     );


// //     /* -------------------------------------------------
// //        RIGHT WALL
// //     ------------------------------------------------- */

// //     const rightWall =
// //         new THREE.Mesh(
// //             new THREE.BoxGeometry(
// //                 THREE_WALL_THICKNESS,
// //                 roomHeight,
// //                 roomDepth
// //             ),
// //             wallMaterial
// //         );

// //     rightWall.position.set(
// //         roomWidth / 2,
// //         roomHeight / 2,
// //         0
// //     );

// //     rightWall.castShadow = true;
// //     rightWall.receiveShadow = true;

// //     rightWall.name =
// //         "RightWall";

// //     group.add(
// //         rightWall
// //     );


// //     /* -------------------------------------------------
// //        FRONT WALL
// //        Kept slightly transparent/open visually so
// //        furniture can still be seen.
// //     ------------------------------------------------- */

// //     const frontMaterial =
// //         new THREE.MeshStandardMaterial({
// //             color: 0xf3f0ea,
// //             roughness: 0.9,
// //             transparent: true,
// //             opacity: 0.12
// //         });

// //     const frontWall =
// //         new THREE.Mesh(
// //             new THREE.BoxGeometry(
// //                 roomWidth +
// //                     THREE_WALL_THICKNESS,
// //                 roomHeight,
// //                 THREE_WALL_THICKNESS
// //             ),
// //             frontMaterial
// //         );

// //     frontWall.position.set(
// //         0,
// //         roomHeight / 2,
// //         roomDepth / 2
// //     );

// //     frontWall.name =
// //         "FrontWall";

// //     group.add(
// //         frontWall
// //     );
// // }


// // /* =====================================================
// //    UPDATE THREE WALLS
// // ===================================================== */

// // function updateThreeWalls(data) {

// //     if (!data) return;


// //     threeWallData = {

// //         points:
// //             Array.isArray(data.points)
// //                 ? data.points
// //                 : [],

// //         walls:
// //             Array.isArray(data.walls)
// //                 ? data.walls
// //                 : [],

// //         closed:
// //             !!data.closed,

// //         shape:
// //             data.shape || "custom"
// //     };


// //     /* -------------------------------------------------
// //        Nothing initialized yet
// //     ------------------------------------------------- */

// //     if (!scene) {
// //         return;
// //     }


// //     /* -------------------------------------------------
// //        Rebuild room so default/custom walls update
// //     ------------------------------------------------- */

// //     threeCreateRoom(
// //         threeRoomData
// //     );
// // }


// // /* =====================================================
// //    ALIAS:
// //    design.js checks for updateThreeWalls
// // ===================================================== */

// // function updateThreeWalls(data) {

// //     updateThreeWallsInternal(
// //         data
// //     );
// // }


// // /* =====================================================
// //    INTERNAL WALL UPDATE
// // ===================================================== */

// // function updateThreeWallsInternal(data) {

// //     if (!data) return;


// //     threeWallData = {

// //         points:
// //             Array.isArray(data.points)
// //                 ? data.points
// //                 : [],

// //         walls:
// //             Array.isArray(data.walls)
// //                 ? data.walls
// //                 : [],

// //         closed:
// //             !!data.closed,

// //         shape:
// //             data.shape || "custom"
// //     };


// //     if (!scene) return;


// //     threeCreateRoom(
// //         threeRoomData
// //     );
// // }


// // /* =====================================================
// //    CREATE THREE CUSTOM WALLS
// // ===================================================== */

// // function createThreeWalls(data) {

// //     if (!scene) return;

// //     if (!data) return;


// //     /* -------------------------------------------------
// //        Remove old custom walls
// //     ------------------------------------------------- */

// //     if (roomGroup) {

// //         const oldWalls =
// //             roomGroup.children.filter(
// //                 function (child) {

// //                     return (
// //                         child.userData &&
// //                         child.userData.customWall === true
// //                     );
// //                 }
// //             );

// //         oldWalls.forEach(
// //             function (wall) {

// //                 roomGroup.remove(
// //                     wall
// //                 );

// //                 if (wall.geometry) {
// //                     wall.geometry.dispose();
// //                 }

// //                 if (wall.material) {
// //                     wall.material.dispose();
// //                 }
// //             }
// //         );
// //     }


// //     const walls =
// //         Array.isArray(data.walls)
// //             ? data.walls
// //             : [];


// //     if (walls.length === 0) {
// //         return;
// //     }


// //     /* =================================================
// //        SCALE
// //        Fabric canvas:
// //        1 pixel = 1 cm

// //        Three.js:
// //        100 cm = 1 meter
// //     ================================================= */

// //     const roomWidthCm =
// //         threeRoomData.width;

// //     const roomDepthCm =
// //         threeRoomData.depth;


// //     const wallHeight =
// //         getRoomHeightMeters();


// //     const wallMaterial =
// //         new THREE.MeshStandardMaterial({
// //             color: 0xf3f0ea,
// //             roughness: 0.9
// //         });


// //     walls.forEach(
// //         function (wallData, index) {

// //             if (!wallData) return;


// //             const x1 =
// //                 Number(wallData.x1) || 0;

// //             const y1 =
// //                 Number(wallData.y1) || 0;

// //             const x2 =
// //                 Number(wallData.x2) || 0;

// //             const y2 =
// //                 Number(wallData.y2) || 0;


// //             /* ------------------------------------------------
// //                Convert Fabric X/Y to Three X/Z

// //                Fabric:
// //                   X -> right
// //                   Y -> down

// //                Three:
// //                   X -> right
// //                   Z -> depth
// //             ------------------------------------------------ */

// //             const startX =
// //                 cmToMeters(
// //                     x1 - roomWidthCm / 2
// //                 );

// //             const startZ =
// //                 cmToMeters(
// //                     y1 - roomDepthCm / 2
// //                 );

// //             const endX =
// //                 cmToMeters(
// //                     x2 - roomWidthCm / 2
// //                 );

// //             const endZ =
// //                 cmToMeters(
// //                     y2 - roomDepthCm / 2
// //                 );


// //             const dx =
// //                 endX - startX;

// //             const dz =
// //                 endZ - startZ;


// //             const length =
// //                 Math.sqrt(
// //                     dx * dx +
// //                     dz * dz
// //                 );


// //             if (length <= 0.001) {
// //                 return;
// //             }


// //             /* =================================================
// //                WALL GEOMETRY
// //             ================================================= */

// //             const geometry =
// //                 new THREE.BoxGeometry(
// //                     length,
// //                     wallHeight,
// //                     THREE_WALL_THICKNESS
// //                 );


// //             const mesh =
// //                 new THREE.Mesh(
// //                     geometry,
// //                     wallMaterial.clone()
// //                 );


// //             /* =================================================
// //                WALL POSITION
// //             ================================================= */

// //             mesh.position.set(
// //                 (startX + endX) / 2,
// //                 wallHeight / 2,
// //                 (startZ + endZ) / 2
// //             );


// //             /* =================================================
// //                WALL ROTATION
// //             ================================================= */

// //             mesh.rotation.y =
// //                 -Math.atan2(
// //                     dz,
// //                     dx
// //                 );


// //             mesh.castShadow = true;
// //             mesh.receiveShadow = true;


// //             mesh.userData.customWall =
// //                 true;

// //             mesh.userData.wallIndex =
// //                 index;


// //             mesh.name =
// //                 "CustomWall_" +
// //                 index;


// //             if (roomGroup) {

// //                 roomGroup.add(
// //                     mesh
// //                 );
// //             }
// //         }
// //     );
// // }


// // /* =====================================================
// //    ALIAS FOR design.js
// // ===================================================== */

// // function rebuildThreeWalls(data) {

// //     updateThreeWalls(
// //         data
// //     );
// // }


// // function update3DFromWalls(data) {

// //     updateThreeWalls(
// //         data
// //     );
// // }


// // /* =====================================================
// //    REBUILD ROOM ALIAS
// // ===================================================== */

// // function rebuildThreeRoom(data) {

// //     updateThreeRoom(
// //         data
// //     );
// // }


// // /* =====================================================
// //    update3DRoom ALIAS
// // ===================================================== */

// // function update3DRoom(data) {

// //     updateThreeRoom(
// //         data
// //     );
// // }


// // /* =====================================================
// //    FURNITURE 2D -> 3D COORDINATE
// // ===================================================== */

// // function convert2DPositionTo3D(
// //     data
// // ) {

// //     const roomWidthCm =
// //         threeRoomData.width;

// //     const roomDepthCm =
// //         threeRoomData.depth;


// //     const xCm =
// //         Number(data.x) || 0;

// //     const yCm =
// //         Number(data.y) || 0;


// //     /* -------------------------------------------------
// //        Fabric origin is normally center of canvas.

// //        Example:
// //        Room width 500
// //        Room depth 300

// //        Center = 250 / 150

// //        Therefore:
// //        x=250 -> Three x=0
// //        y=150 -> Three z=0
// //     ------------------------------------------------- */

// //     const x =
// //         cmToMeters(
// //             xCm -
// //             roomWidthCm / 2
// //         );

// //     const z =
// //         cmToMeters(
// //             yCm -
// //             roomDepthCm / 2
// //         );


// //     return {
// //         x: x,
// //         z: z
// //     };
// // }


// // /* =====================================================
// //    GET MODEL SIZE
// // ===================================================== */

// // function getModelSize(
// //     object
// // ) {

// //     const box =
// //         new THREE.Box3()
// //             .setFromObject(
// //                 object
// //             );

// //     const size =
// //         new THREE.Vector3();

// //     box.getSize(
// //         size
// //     );

// //     return {
// //         box: box,
// //         size: size
// //     };
// // }


// // /* =====================================================
// //    NORMALIZE GLB MODEL

// //    This fixes the common problem where:
// //    chair is half above / half below floor.
// // ===================================================== */

// // function normalizeFurnitureModel(
// //     model,
// //     data
// // ) {

// //     if (!model) return;


// //     /* =================================================
// //        UPDATE WORLD MATRIX
// //     ================================================= */

// //     model.updateMatrixWorld(
// //         true
// //     );


// //     let result =
// //         getModelSize(
// //             model
// //         );

// //     let size =
// //         result.size;


// //     /* =================================================
// //        APPLY 2D WIDTH SCALE
// //     ================================================= */

// //     const targetWidth =
// //         cmToMeters(
// //             Number(data.width) || 80
// //         );


// //     const targetDepth =
// //         cmToMeters(
// //             Number(data.height) || 80
// //         );


// //     /* -------------------------------------------------
// //        Prefer model's largest horizontal dimension
// //     ------------------------------------------------- */

// //     const currentHorizontal =
// //         Math.max(
// //             size.x,
// //             size.z
// //         );


// //     if (
// //         currentHorizontal > 0.0001 &&
// //         targetWidth > 0.0001
// //     ) {

// //         const ratio =
// //             targetWidth /
// //             currentHorizontal;

// //         model.scale.multiplyScalar(
// //             ratio
// //         );
// //     }


// //     /* =================================================
// //        UPDATE MATRIX AGAIN
// //     ================================================= */

// //     model.updateMatrixWorld(
// //         true
// //     );


// //     result =
// //         getModelSize(
// //             model
// //         );

// //     const box =
// //         result.box;


// //     /* =================================================
// //        MOVE MODEL SO BOTTOM = FLOOR
// //     ================================================= */

// //     const bottomY =
// //         box.min.y;


// //     model.position.y -=
// //         bottomY;


// //     /* =================================================
// //        SMALL FLOAT PROTECTION
// //     ================================================= */

// //     model.position.y +=
// //         0.002;


// //     /* =================================================
// //        SHADOWS
// //     ================================================= */

// //     model.traverse(
// //         function (child) {

// //             if (!child.isMesh) {
// //                 return;
// //             }

// //             child.castShadow = true;
// //             child.receiveShadow = true;


// //             if (child.material) {

// //                 child.material.side =
// //                     THREE.FrontSide;
// //             }
// //         }
// //     );
// // }


// // /* =====================================================
// //    SHOW SELECTED FURNITURE 3D
// // ===================================================== */

// // function showSelectedFurniture3D(
// //     data
// // ) {

// //     if (!scene || !data) {
// //         return;
// //     }


// //     /* =================================================
// //        REMOVE PREVIOUS MODEL
// //     ================================================= */

// //     clearSelectedFurniture3D();


// //     /* =================================================
// //        POSITION
// //     ================================================= */

// //     const position =
// //         convert2DPositionTo3D(
// //             data
// //         );


// //     /* =================================================
// //        MODEL PATH
// //     ================================================= */

// //     let modelPath =
// //         data.model || "";


// //     if (
// //         data.type === "Armchair" &&
// //         !modelPath
// //     ) {

// //         modelPath =
// //             "models/armchair1.glb";
// //     }


// //     /* =================================================
// //        GLB
// //     ================================================= */

// //     if (
// //         modelPath &&
// //         gltfLoader
// //     ) {

// //         gltfLoader.load(

// //             modelPath,

// //             function (gltf) {

// //                 const model =
// //                     gltf.scene;


// //                 if (!model) {
// //                     createFallbackMesh(
// //                         data
// //                     );
// //                     return;
// //                 }


// //                 currentFurnitureMesh =
// //                     model;


// //                 currentFurnitureMesh.name =
// //                     "SelectedFurniture3D";


// //                 /* -----------------------------------------
// //                    Position
// //                 ----------------------------------------- */

// //                 currentFurnitureMesh.position.set(
// //                     position.x,
// //                     0,
// //                     position.z
// //                 );


// //                 /* -----------------------------------------
// //                    Rotation

// //                    Fabric rotation is clockwise visually.
// //                    Three Y rotation uses opposite direction.
// //                 ----------------------------------------- */

// //                 currentFurnitureMesh.rotation.y =
// //                     -THREE.MathUtils.degToRad(
// //                         Number(data.rotation) || 0
// //                     );


// //                 /* -----------------------------------------
// //                    Add to furniture group
// //                 ----------------------------------------- */

// //                 furnitureGroup.add(
// //                     currentFurnitureMesh
// //                 );


// //                 /* -----------------------------------------
// //                    Normalize size + floor position
// //                 ----------------------------------------- */

// //                 normalizeFurnitureModel(
// //                     currentFurnitureMesh,
// //                     data
// //                 );


// //                 /* -----------------------------------------
// //                    Save reference
// //                 ----------------------------------------- */

// //                 window.current3DFurniture =
// //                     currentFurnitureMesh;


// //                 /* -----------------------------------------
// //                    Render
// //                 ----------------------------------------- */

// //                 if (renderer) {
// //                     renderer.render(
// //                         scene,
// //                         camera
// //                     );
// //                 }
// //             },

// //             function () {

// //                 /* Loading progress */
// //             },

// //             function (error) {

// //                 console.error(
// //                     "GLB loading failed:",
// //                     modelPath,
// //                     error
// //                 );

// //                 createFallbackMesh(
// //                     data
// //                 );
// //             }
// //         );

// //         return;
// //     }


// //     /* =================================================
// //        FALLBACK
// //     ================================================= */

// //     createFallbackMesh(
// //         data
// //     );
// // }


// // /* =====================================================
// //    FALLBACK FURNITURE
// // ===================================================== */

// // function createFallbackMesh(
// //     data
// // ) {

// //     if (!scene) return;


// //     clearSelectedFurniture3D();


// //     const width =
// //         Math.max(
// //             cmToMeters(
// //                 Number(data.width) || 80
// //             ),
// //             0.3
// //         );


// //     const depth =
// //         Math.max(
// //             cmToMeters(
// //                 Number(data.height) || 80
// //             ),
// //             0.3
// //         );


// //     /* Default furniture height */

// //     let furnitureHeight =
// //         0.8;


// //     if (data.type === "Bed") {
// //         furnitureHeight = 0.45;
// //     }

// //     if (data.type === "Sofa") {
// //         furnitureHeight = 0.85;
// //     }

// //     if (data.type === "Armchair") {
// //         furnitureHeight = 0.85;
// //     }


// //     const geometry =
// //         new THREE.BoxGeometry(
// //             width,
// //             furnitureHeight,
// //             depth
// //         );


// //     const material =
// //         new THREE.MeshStandardMaterial({
// //             color: 0x2e7d32,
// //             roughness: 0.75
// //         });


// //     currentFurnitureMesh =
// //         new THREE.Mesh(
// //             geometry,
// //             material
// //         );


// //     currentFurnitureMesh.name =
// //         "FurnitureFallback";


// //     const position =
// //         convert2DPositionTo3D(
// //             data
// //         );


// //     currentFurnitureMesh.position.set(
// //         position.x,
// //         furnitureHeight / 2,
// //         position.z
// //     );


// //     currentFurnitureMesh.rotation.y =
// //         -THREE.MathUtils.degToRad(
// //             Number(data.rotation) || 0
// //         );


// //     currentFurnitureMesh.castShadow =
// //         true;

// //     currentFurnitureMesh.receiveShadow =
// //         true;


// //     furnitureGroup.add(
// //         currentFurnitureMesh
// //     );


// //     window.current3DFurniture =
// //         currentFurnitureMesh;
// // }


// // /* =====================================================
// //    UPDATE SELECTED FURNITURE
// // ===================================================== */

// // function updateSelectedFurniture3D(
// //     data
// // ) {

// //     if (!data) return;

// //     showSelectedFurniture3D(
// //         data
// //     );
// // }


// // /* =====================================================
// //    CLEAR SELECTED FURNITURE
// // ===================================================== */

// // function clearSelectedFurniture3D() {

// //     if (
// //         !currentFurnitureMesh
// //     ) {
// //         return;
// //     }


// //     /* Remove from furniture group */

// //     if (
// //         furnitureGroup &&
// //         furnitureGroup.children.includes(
// //             currentFurnitureMesh
// //         )
// //     ) {

// //         furnitureGroup.remove(
// //             currentFurnitureMesh
// //         );

// //     } else if (scene) {

// //         scene.remove(
// //             currentFurnitureMesh
// //         );
// //     }


// //     /* Dispose resources */

// //     currentFurnitureMesh.traverse(
// //         function (child) {

// //             if (child.geometry) {

// //                 child.geometry.dispose();
// //             }


// //             if (child.material) {

// //                 if (
// //                     Array.isArray(
// //                         child.material
// //                     )
// //                 ) {

// //                     child.material.forEach(
// //                         function (material) {

// //                             if (
// //                                 material.map
// //                             ) {

// //                                 material.map.dispose();
// //                             }

// //                             material.dispose();
// //                         }
// //                     );

// //                 } else {

// //                     if (
// //                         child.material.map
// //                     ) {

// //                         child.material.map.dispose();
// //                     }

// //                     child.material.dispose();
// //                 }
// //             }
// //         }
// //     );


// //     currentFurnitureMesh =
// //         null;

// //     window.current3DFurniture =
// //         null;
// // }


// // /* =====================================================
// //    RESIZE THREE VIEW
// // ===================================================== */

// // function resizeThreeView() {

// //     const container =
// //         document.getElementById(
// //             "threeView"
// //         );


// //     if (
// //         !container ||
// //         !renderer ||
// //         !camera
// //     ) {

// //         return;
// //     }


// //     const width =
// //         Math.max(
// //             container.clientWidth,
// //             1
// //         );

// //     const height =
// //         Math.max(
// //             container.clientHeight,
// //             1
// //         );


// //     camera.aspect =
// //         width / height;

// //     camera.updateProjectionMatrix();


// //     renderer.setSize(
// //         width,
// //         height
// //     );
// // }


// // /* =====================================================
// //    RESET CAMERA
// // ===================================================== */

// // function resetCamera() {

// //     if (
// //         !camera ||
// //         !controls
// //     ) {

// //         return;
// //     }


// //     const width =
// //         getRoomWidthMeters();

// //     const depth =
// //         getRoomDepthMeters();

// //     const height =
// //         getRoomHeightMeters();


// //     const maxDimension =
// //         Math.max(
// //             width,
// //             depth,
// //             height
// //         );


// //     const distance =
// //         Math.max(
// //             5,
// //             maxDimension * 1.7
// //         );


// //     camera.position.set(
// //         distance,
// //         distance * 0.9,
// //         distance
// //     );


// //     controls.target.set(
// //         0,
// //         Math.min(
// //             height / 2,
// //             1.4
// //         ),
// //         0
// //     );


// //     controls.update();
// // }


// // /* =====================================================
// //    FULLSCREEN
// // ===================================================== */

// // function fullscreenThreeView() {

// //     const container =
// //         document.getElementById(
// //             "threeView"
// //         );


// //     if (
// //         container &&
// //         container.requestFullscreen
// //     ) {

// //         container.requestFullscreen();
// //     }
// // }


// // /* =====================================================
// //    ANIMATION LOOP
// // ===================================================== */

// // function animateThree() {

// //     requestAnimationFrame(
// //         animateThree
// //     );


// //     if (controls) {

// //         controls.update();
// //     }


// //     if (
// //         renderer &&
// //         scene &&
// //         camera
// //     ) {

// //         renderer.render(
// //             scene,
// //             camera
// //         );
// //     }
// // }


// // /* =====================================================
// //    GLOBAL ACCESS
// // ===================================================== */

// // window.initThreeView =
// //     initThreeView;

// // window.updateThreeRoom =
// //     updateThreeRoom;

// // window.update3DRoom =
// //     update3DRoom;

// // window.rebuildThreeRoom =
// //     rebuildThreeRoom;

// // window.updateThreeWalls =
// //     updateThreeWalls;

// // window.createThreeWalls =
// //     createThreeWalls;

// // window.rebuildThreeWalls =
// //     rebuildThreeWalls;

// // window.update3DFromWalls =
// //     update3DFromWalls;

// // window.showSelectedFurniture3D =
// //     showSelectedFurniture3D;

// // window.updateSelectedFurniture3D =
// //     updateSelectedFurniture3D;

// // window.clearSelectedFurniture3D =
// //     clearSelectedFurniture3D;


// // /* =====================================================
// //    INITIAL DATA SYNC
// // ===================================================== */

// // setTimeout(
// //     function () {

// //         if (window.roomData) {

// //             threeRoomData = {

// //                 width:
// //                     Number(
// //                         window.roomData.width
// //                     ) ||
// //                     DEFAULT_ROOM_WIDTH,

// //                 depth:
// //                     Number(
// //                         window.roomData.depth
// //                     ) ||
// //                     DEFAULT_ROOM_DEPTH,

// //                 height:
// //                     Number(
// //                         window.roomData.height
// //                     ) ||
// //                     DEFAULT_ROOM_HEIGHT,

// //                 angle:
// //                     Number(
// //                         window.roomData.angle
// //                     ) || 0,

// //                 elevation:
// //                     Number(
// //                         window.roomData.elevation
// //                     ) || 0
// //             };
// //         }


// //         if (window.roomWallData) {

// //             threeWallData = {

// //                 points:
// //                     Array.isArray(
// //                         window.roomWallData.points
// //                     )
// //                         ? window.roomWallData.points
// //                         : [],

// //                 walls:
// //                     Array.isArray(
// //                         window.roomWallData.walls
// //                     )
// //                         ? window.roomWallData.walls
// //                         : [],

// //                 closed:
// //                     !!window.roomWallData.closed,

// //                 shape:
// //                     window.roomWallData.shape ||
// //                     "custom"
// //             };
// //         }


// //         if (threeInitialized) {

// //             updateThreeRoom(
// //                 threeRoomData
// //             );

// //             updateThreeWalls(
// //                 threeWallData
// //             );
// //         }

// //     },
// //     300
// // );
// /* =====================================================
//    THREEVIEW.JS
//    Home Interior Design Project
//    -----------------------------------------------------
//    Compatible with existing design.js

//    FEATURES
//    -----------------------------------------------------
//    1. Dynamic room width / depth / height
//    2. Dynamic room angle / elevation
//    3. Rectangle / Square / L / T / U / Custom walls
//    4. design.js wall synchronization
//    5. 2D selected furniture -> 3D (sprites for images)
//    6. GLB furniture loading (fallback)
//    7. 3D drag & drop for furniture sprites
//    8. Correct floor placement
//    9. Furniture rotation
//    10. 2D ↔ 3D coordinate conversion
//    11. Camera reset & fullscreen
// ===================================================== */


// /* =====================================================
//    THREE.JS GLOBAL VARIABLES
// ===================================================== */

// let scene = null;
// let camera = null;
// let renderer = null;
// let controls = null;

// let roomGroup = null;
// let furnitureGroup = null;
// let currentFurnitureMesh = null;

// let threeInitialized = false;
// let gltfLoader = null;

// // Sprite tracking
// let furnitureSprites = {};
// let currentSpriteId = 0;

// // 3D drag state
// let selectedSprite = null;
// let isDragging = false;
// let dragOffset = new THREE.Vector3();
// let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
// let raycaster = new THREE.Raycaster();
// let mouse = new THREE.Vector2();


// /* =====================================================
//    DEFAULT ROOM
// ===================================================== */

// const DEFAULT_ROOM_WIDTH = 500;
// const DEFAULT_ROOM_DEPTH = 300;
// const DEFAULT_ROOM_HEIGHT = 280;

// const THREE_WALL_THICKNESS = 0.15;
// const FLOOR_THICKNESS = 0.12;


// /* =====================================================
//    CURRENT ROOM DATA
// ===================================================== */

// let threeRoomData = {
//     width: DEFAULT_ROOM_WIDTH,
//     depth: DEFAULT_ROOM_DEPTH,
//     height: DEFAULT_ROOM_HEIGHT,
//     angle: 0,
//     elevation: 0
// };


// /* =====================================================
//    CURRENT WALL DATA
// ===================================================== */

// let threeWallData = {
//     points: [],
//     walls: [],
//     closed: false,
//     shape: "custom"
// };


// /* =====================================================
//    SPRITE HELPERS
// ===================================================== */

// function createFurnitureSprite(imageUrl, widthMeters, heightMeters) {
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load(imageUrl);
    
//     const material = new THREE.SpriteMaterial({
//         map: texture,
//         transparent: true,
//         depthTest: true,
//         depthWrite: false,
//         side: THREE.DoubleSide
//     });
    
//     const sprite = new THREE.Sprite(material);
//     const w = Math.max(widthMeters, 0.1);
//     const h = Math.max(heightMeters, 0.1);
//     sprite.scale.set(w, h, 1);
    
//     sprite.userData.isFurniture = true;
//     sprite.userData.isSprite = true;
//     sprite.userData.imageUrl = imageUrl;
//     sprite.userData.id = ++currentSpriteId;
    
//     return sprite;
// }

// // Convert 2D (x,y) in cm to 3D (x,z) in meters
// function convert2DPositionTo3D(xCm, yCm) {
//     const roomWidthCm = threeRoomData.width || 500;
//     const roomDepthCm = threeRoomData.depth || 300;
//     return {
//         x: cmToMeters(xCm - roomWidthCm / 2),
//         z: cmToMeters(yCm - roomDepthCm / 2)
//     };
// }


// /* =====================================================
//    INITIALIZE THREE VIEW
// ===================================================== */

// function initThreeView() {

//     const container = document.getElementById("threeView");

//     if (!container) {
//         console.warn("Three.js container #threeView not found.");
//         return;
//     }

//     /* -------------------------------------------------
//        Already initialized
//     ------------------------------------------------- */

//     if (threeInitialized) {

//         resizeThreeView();

//         updateThreeRoom(
//             window.roomData || threeRoomData
//         );

//         updateThreeWalls(
//             window.roomWallData || threeWallData
//         );

//         return;
//     }


//     /* =================================================
//        SCENE
//     ================================================= */

//     scene = new THREE.Scene();

//     scene.background = new THREE.Color(0xe7eaed);


//     /* =================================================
//        GLTF LOADER
//     ================================================= */

//     gltfLoader = new THREE.GLTFLoader();


//     /* =================================================
//        CAMERA
//     ================================================= */

//     const width =
//         Math.max(container.clientWidth, 1);

//     const height =
//         Math.max(container.clientHeight, 1);

//     camera = new THREE.PerspectiveCamera(
//         50,
//         width / height,
//         0.1,
//         1000
//     );

//     camera.position.set(7, 5.5, 7);


//     /* =================================================
//        RENDERER
//     ================================================= */

//     renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: false
//     });

//     renderer.setPixelRatio(
//         Math.min(window.devicePixelRatio || 1, 2)
//     );

//     renderer.setSize(width, height);

//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type =
//         THREE.PCFSoftShadowMap;

//     renderer.outputColorSpace =
//         THREE.SRGBColorSpace;

//     container.appendChild(
//         renderer.domElement
//     );


//     /* =================================================
//        ORBIT CONTROLS
//     ================================================= */

//     controls = new THREE.OrbitControls(
//         camera,
//         renderer.domElement
//     );

//     controls.enableDamping = true;
//     controls.dampingFactor = 0.08;

//     controls.minDistance = 1;
//     controls.maxDistance = 50;

//     controls.target.set(0, 1, 0);

//     controls.update();


//     /* =================================================
//        FURNITURE GROUP
//     ================================================= */

//     furnitureGroup = new THREE.Group();

//     furnitureGroup.name =
//         "FurnitureGroup";

//     scene.add(furnitureGroup);


//     /* =================================================
//        LIGHTS
//     ================================================= */

//     threeCreateLights();


//     /* =================================================
//        CREATE INITIAL ROOM
//     ================================================= */

//     threeCreateRoom(
//         window.roomData || threeRoomData
//     );


//     /* =================================================
//        3D DRAG & DROP FOR SPRITES
//     ================================================= */

//     function onPointerDown(event) {
//         const rect = renderer.domElement.getBoundingClientRect();
//         const clientX = event.clientX || (event.touches && event.touches[0].clientX);
//         const clientY = event.clientY || (event.touches && event.touches[0].clientY);
//         if (clientX === undefined) return;

//         mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
//         mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersects = raycaster.intersectObjects(furnitureGroup.children, true);

//         for (let i = 0; i < intersects.length; i++) {
//             let obj = intersects[i].object;
//             while (obj) {
//                 if (obj.isSprite && obj.userData.isFurniture) {
//                     selectedSprite = obj;
//                     isDragging = true;

//                     const intersectPoint = new THREE.Vector3();
//                     raycaster.ray.intersectPlane(dragPlane, intersectPoint);
//                     if (intersectPoint) {
//                         dragOffset.copy(selectedSprite.position).sub(intersectPoint);
//                     }

//                     renderer.domElement.style.cursor = 'grabbing';
//                     return;
//                 }
//                 obj = obj.parent;
//             }
//         }
//     }

//     function onPointerMove(event) {
//         if (!isDragging || !selectedSprite) {
//             // Hover effect
//             const rect = renderer.domElement.getBoundingClientRect();
//             const clientX = event.clientX || (event.touches && event.touches[0].clientX);
//             const clientY = event.clientY || (event.touches && event.touches[0].clientY);
//             if (clientX === undefined) return;

//             mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
//             mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

//             raycaster.setFromCamera(mouse, camera);
//             const intersects = raycaster.intersectObjects(furnitureGroup.children, true);
//             let found = false;
//             for (let i = 0; i < intersects.length; i++) {
//                 let obj = intersects[i].object;
//                 while (obj) {
//                     if (obj.isSprite && obj.userData.isFurniture) {
//                         renderer.domElement.style.cursor = 'grab';
//                         found = true;
//                         break;
//                     }
//                     obj = obj.parent;
//                 }
//                 if (found) break;
//             }
//             if (!found) renderer.domElement.style.cursor = 'default';
//             return;
//         }

//         const rect = renderer.domElement.getBoundingClientRect();
//         const clientX = event.clientX || (event.touches && event.touches[0].clientX);
//         const clientY = event.clientY || (event.touches && event.touches[0].clientY);
//         if (clientX === undefined) return;

//         mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
//         mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersectPoint = new THREE.Vector3();
//         raycaster.ray.intersectPlane(dragPlane, intersectPoint);

//         if (intersectPoint) {
//             selectedSprite.position.x = intersectPoint.x + dragOffset.x;
//             selectedSprite.position.z = intersectPoint.z + dragOffset.z;

//             // Update 2D canvas position
//             update2DFrom3D(selectedSprite);
//         }
//     }

//     function onPointerUp(event) {
//         if (isDragging && selectedSprite) {
//             // Final sync
//             update2DFrom3D(selectedSprite);
//         }
//         isDragging = false;
//         selectedSprite = null;
//         renderer.domElement.style.cursor = 'default';
//     }

//     // Helper: sync 3D sprite position back to Fabric canvas
//     function update2DFrom3D(sprite) {
//         if (!sprite || !window.designApp) return;
//         const fabricCanvas = window.designApp.canvas;
//         if (!fabricCanvas) return;

//         const roomW = threeRoomData.width || 500;
//         const roomD = threeRoomData.depth || 300;
//         const x2d = (sprite.position.x * 100) + roomW / 2;
//         const y2d = (sprite.position.z * 100) + roomD / 2;

//         // Find the corresponding 2D object (by imageUrl)
//         const objects = fabricCanvas.getObjects();
//         for (let obj of objects) {
//             if (obj.imageUrl === sprite.userData.imageUrl) {
//                 obj.set({ left: x2d, top: y2d });
//                 obj.setCoords();
//                 fabricCanvas.renderAll();
//                 break;
//             }
//         }
//     }

//     // Register events
//     renderer.domElement.addEventListener('mousedown', onPointerDown);
//     renderer.domElement.addEventListener('mousemove', onPointerMove);
//     renderer.domElement.addEventListener('mouseup', onPointerUp);
//     renderer.domElement.addEventListener('touchstart', onPointerDown, { passive: false });
//     renderer.domElement.addEventListener('touchmove', onPointerMove, { passive: false });
//     renderer.domElement.addEventListener('touchend', onPointerUp, { passive: false });


//     /* =================================================
//        EVENTS
//     ================================================= */

//     window.addEventListener(
//         "resize",
//         resizeThreeView
//     );


//     /* -------------------------------------------------
//        Room data event
//        From design.js
//     ------------------------------------------------- */

//     window.addEventListener(
//         "roomDataUpdated",
//         function (event) {

//             if (!event.detail) return;

//             updateThreeRoom(
//                 event.detail
//             );
//         }
//     );


//     /* -------------------------------------------------
//        Wall data event
//        From design.js
//     ------------------------------------------------- */

//     window.addEventListener(
//         "roomWallsUpdated",
//         function (event) {

//             if (!event.detail) return;

//             updateThreeWalls(
//                 event.detail
//             );
//         }
//     );


//     /* -------------------------------------------------
//        Selected furniture event
//        From design.js
//     ------------------------------------------------- */

//     window.addEventListener(
//         "selectedFurniture3DUpdated",
//         function (event) {

//             if (!event.detail) return;

//             showSelectedFurniture3D(
//                 event.detail
//             );
//         }
//     );


//     /* -------------------------------------------------
//        Smart room event
//        From design.js
//     ------------------------------------------------- */

//     window.addEventListener(
//         "smartRoomGenerated",
//         function () {

//             if (window.roomData) {

//                 updateThreeRoom(
//                     window.roomData
//                 );
//             }

//             if (window.roomWallData) {

//                 updateThreeWalls(
//                     window.roomWallData
//                 );
//             }
//         }
//     );


//     /* =================================================
//        BUTTONS
//     ================================================= */

//     const resetButton =
//         document.getElementById(
//             "cameraReset"
//         );

//     if (resetButton) {

//         resetButton.addEventListener(
//             "click",
//             resetCamera
//         );
//     }


//     const fullscreenButton =
//         document.getElementById(
//             "threeFullscreen"
//         );

//     if (fullscreenButton) {

//         fullscreenButton.addEventListener(
//             "click",
//             fullscreenThreeView
//         );
//     }


//     /* =================================================
//        INITIALIZED
//     ================================================= */

//     threeInitialized = true;


//     const loading =
//         document.getElementById(
//             "threeLoading"
//         );

//     if (loading) {

//         loading.style.display =
//             "none";
//     }


//     /* =================================================
//        INITIAL ROOM/WALL SYNC
//     ================================================= */

//     if (window.roomData) {

//         updateThreeRoom(
//             window.roomData
//         );
//     }

//     if (window.roomWallData) {

//         updateThreeWalls(
//             window.roomWallData
//         );
//     }


//     /* =================================================
//        START RENDER LOOP
//     ================================================= */

//     animateThree();
// }


// /* =====================================================
//    LIGHTS
// ===================================================== */

// function threeCreateLights() {

//     if (!scene) return;


//     /* Ambient */

//     const ambientLight =
//         new THREE.AmbientLight(
//             0xffffff,
//             0.65
//         );

//     scene.add(
//         ambientLight
//     );


//     /* Main directional light */

//     const mainLight =
//         new THREE.DirectionalLight(
//             0xffffff,
//             1.2
//         );

//     mainLight.position.set(
//         5,
//         8,
//         5
//     );

//     mainLight.castShadow = true;

//     mainLight.shadow.mapSize.width =
//         2048;

//     mainLight.shadow.mapSize.height =
//         2048;

//     scene.add(
//         mainLight
//     );


//     /* Fill */

//     const fillLight =
//         new THREE.HemisphereLight(
//             0xffffff,
//             0x777777,
//             0.45
//         );

//     scene.add(
//         fillLight
//     );
// }


// /* =====================================================
//    CONVERT CM TO METERS
// ===================================================== */

// function cmToMeters(value) {

//     const number =
//         Number(value);

//     if (!isFinite(number)) {
//         return 0;
//     }

//     return number / 100;
// }


// /* =====================================================
//    GET ROOM DIMENSIONS IN METERS
// ===================================================== */

// function getRoomWidthMeters() {

//     return cmToMeters(
//         threeRoomData.width
//     );
// }


// function getRoomDepthMeters() {

//     return cmToMeters(
//         threeRoomData.depth
//     );
// }


// function getRoomHeightMeters() {

//     return cmToMeters(
//         threeRoomData.height
//     );
// }


// /* =====================================================
//    UPDATE THREE ROOM
// ===================================================== */

// function updateThreeRoom(data) {

//     if (!data) return;

//     threeRoomData = {

//         width:
//             Number(data.width) ||
//             DEFAULT_ROOM_WIDTH,

//         depth:
//             Number(data.depth) ||
//             DEFAULT_ROOM_DEPTH,

//         height:
//             Number(data.height) ||
//             DEFAULT_ROOM_HEIGHT,

//         angle:
//             Number(data.angle) || 0,

//         elevation:
//             Number(data.elevation) || 0
//     };


//     /* -------------------------------------------------
//        If Three.js is not initialized yet,
//        save data only.
//     ------------------------------------------------- */

//     if (!scene) {
//         return;
//     }


//     threeCreateRoom(
//         threeRoomData
//     );
// }


// /* =====================================================
//    CREATE / REBUILD ROOM
// ===================================================== */

// function threeCreateRoom(data) {

//     if (!scene) return;


//     /* =================================================
//        REMOVE OLD ROOM
//     ================================================= */

//     if (roomGroup) {

//         scene.remove(
//             roomGroup
//         );

//         roomGroup = null;
//     }


//     /* =================================================
//        ROOM DIMENSIONS
//     ================================================= */

//     const roomWidth =
//         cmToMeters(
//             data.width
//         );

//     const roomDepth =
//         cmToMeters(
//             data.depth
//         );

//     const roomHeight =
//         cmToMeters(
//             data.height
//         );


//     /* =================================================
//        ROOM GROUP
//     ================================================= */

//     roomGroup =
//         new THREE.Group();

//     roomGroup.name =
//         "RoomGroup";


//     /* =================================================
//        FLOOR
//     ================================================= */

//     const floorGeometry =
//         new THREE.BoxGeometry(
//             roomWidth,
//             FLOOR_THICKNESS,
//             roomDepth
//         );

//     const floorMaterial =
//         new THREE.MeshStandardMaterial({
//             color: 0xd8c4a8,
//             roughness: 0.75,
//             metalness: 0
//         });

//     const floorMesh =
//         new THREE.Mesh(
//             floorGeometry,
//             floorMaterial
//         );

//     floorMesh.position.y =
//         -FLOOR_THICKNESS / 2;

//     floorMesh.receiveShadow = true;

//     floorMesh.name =
//         "RoomFloor";

//     roomGroup.add(
//         floorMesh
//     );


//     /* =================================================
//        GRID
//     ================================================= */

//     const gridSize =
//         Math.max(
//             roomWidth,
//             roomDepth
//         );

//     const gridDivisions =
//         Math.max(
//             10,
//             Math.round(
//                 gridSize * 10
//             )
//         );

//     const grid =
//         new THREE.GridHelper(
//             gridSize,
//             gridDivisions,
//             0x999999,
//             0xcccccc
//         );

//     grid.scale.z =
//         roomDepth / gridSize;

//     grid.position.y =
//         0.003;

//     grid.name =
//         "RoomGrid";

//     roomGroup.add(
//         grid
//     );


//     /* =================================================
//        STANDARD ROOM WALLS
//        Only shown when there is no custom wall data.
//     ================================================= */

//     const hasCustomWalls =
//         threeWallData &&
//         Array.isArray(
//             threeWallData.walls
//         ) &&
//         threeWallData.walls.length > 0;


//     if (!hasCustomWalls) {

//         createDefaultWalls(
//             roomGroup,
//             roomWidth,
//             roomDepth,
//             roomHeight
//         );
//     }


//     /* =================================================
//        ADD ROOM TO SCENE
//     ================================================= */

//     scene.add(
//         roomGroup
//     );


//     /* =================================================
//        CUSTOM WALLS
//     ================================================= */

//     if (hasCustomWalls) {

//         createThreeWalls(
//             threeWallData
//         );
//     }


//     /* =================================================
//        ROOM ROTATION
//     ================================================= */

//     roomGroup.rotation.y =
//         THREE.MathUtils.degToRad(
//             data.angle || 0
//         );


//     /* =================================================
//        CAMERA TARGET
//     ================================================= */

//     if (controls) {

//         controls.target.set(
//             0,
//             Math.min(
//                 roomHeight / 2,
//                 1.5
//             ),
//             0
//         );

//         controls.update();
//     }


//     /* =================================================
//        UPDATE FURNITURE POSITION
//     ================================================= */

//     if (window.selectedFurniture3D) {

//         showSelectedFurniture3D(
//             window.selectedFurniture3D
//         );
//     }
// }


// /* =====================================================
//    DEFAULT WALLS
// ===================================================== */

// function createDefaultWalls(
//     group,
//     roomWidth,
//     roomDepth,
//     roomHeight
// ) {

//     const wallMaterial =
//         new THREE.MeshStandardMaterial({
//             color: 0xf3f0ea,
//             roughness: 0.9
//         });


//     /* -------------------------------------------------
//        BACK WALL
//     ------------------------------------------------- */

//     const backWall =
//         new THREE.Mesh(
//             new THREE.BoxGeometry(
//                 roomWidth +
//                     THREE_WALL_THICKNESS,
//                 roomHeight,
//                 THREE_WALL_THICKNESS
//             ),
//             wallMaterial
//         );

//     backWall.position.set(
//         0,
//         roomHeight / 2,
//         -roomDepth / 2
//     );

//     backWall.castShadow = true;
//     backWall.receiveShadow = true;

//     backWall.name =
//         "BackWall";

//     group.add(
//         backWall
//     );


//     /* -------------------------------------------------
//        LEFT WALL
//     ------------------------------------------------- */

//     const leftWall =
//         new THREE.Mesh(
//             new THREE.BoxGeometry(
//                 THREE_WALL_THICKNESS,
//                 roomHeight,
//                 roomDepth
//             ),
//             wallMaterial
//         );

//     leftWall.position.set(
//         -roomWidth / 2,
//         roomHeight / 2,
//         0
//     );

//     leftWall.castShadow = true;
//     leftWall.receiveShadow = true;

//     leftWall.name =
//         "LeftWall";

//     group.add(
//         leftWall
//     );


//     /* -------------------------------------------------
//        RIGHT WALL
//     ------------------------------------------------- */

//     const rightWall =
//         new THREE.Mesh(
//             new THREE.BoxGeometry(
//                 THREE_WALL_THICKNESS,
//                 roomHeight,
//                 roomDepth
//             ),
//             wallMaterial
//         );

//     rightWall.position.set(
//         roomWidth / 2,
//         roomHeight / 2,
//         0
//     );

//     rightWall.castShadow = true;
//     rightWall.receiveShadow = true;

//     rightWall.name =
//         "RightWall";

//     group.add(
//         rightWall
//     );


//     /* -------------------------------------------------
//        FRONT WALL
//        Kept slightly transparent/open visually so
//        furniture can still be seen.
//     ------------------------------------------------- */

//     const frontMaterial =
//         new THREE.MeshStandardMaterial({
//             color: 0xf3f0ea,
//             roughness: 0.9,
//             transparent: true,
//             opacity: 0.12
//         });

//     const frontWall =
//         new THREE.Mesh(
//             new THREE.BoxGeometry(
//                 roomWidth +
//                     THREE_WALL_THICKNESS,
//                 roomHeight,
//                 THREE_WALL_THICKNESS
//             ),
//             frontMaterial
//         );

//     frontWall.position.set(
//         0,
//         roomHeight / 2,
//         roomDepth / 2
//     );

//     frontWall.name =
//         "FrontWall";

//     group.add(
//         frontWall
//     );
// }


// /* =====================================================
//    UPDATE THREE WALLS
// ===================================================== */

// function updateThreeWalls(data) {

//     if (!data) return;


//     threeWallData = {

//         points:
//             Array.isArray(data.points)
//                 ? data.points
//                 : [],

//         walls:
//             Array.isArray(data.walls)
//                 ? data.walls
//                 : [],

//         closed:
//             !!data.closed,

//         shape:
//             data.shape || "custom"
//     };


//     /* -------------------------------------------------
//        Nothing initialized yet
//     ------------------------------------------------- */

//     if (!scene) {
//         return;
//     }


//     /* -------------------------------------------------
//        Rebuild room so default/custom walls update
//     ------------------------------------------------- */

//     threeCreateRoom(
//         threeRoomData
//     );
// }


// /* =====================================================
//    ALIAS:
//    design.js checks for updateThreeWalls
// ===================================================== */

// function updateThreeWalls(data) {

//     updateThreeWallsInternal(
//         data
//     );
// }


// /* =====================================================
//    INTERNAL WALL UPDATE
// ===================================================== */

// function updateThreeWallsInternal(data) {

//     if (!data) return;


//     threeWallData = {

//         points:
//             Array.isArray(data.points)
//                 ? data.points
//                 : [],

//         walls:
//             Array.isArray(data.walls)
//                 ? data.walls
//                 : [],

//         closed:
//             !!data.closed,

//         shape:
//             data.shape || "custom"
//     };


//     if (!scene) return;


//     threeCreateRoom(
//         threeRoomData
//     );
// }
//     /* =================================================
//        CUSTOM WALLS
//     ================================================= */

//     if (hasCustomWalls) {
//         createThreeWalls(threeWallData);
//     }

//     /* =================================================
//        NAYA: Re-render saare furniture (room change hone pe)
//     ================================================= */

//     if (window.allFurniture3D && Array.isArray(window.allFurniture3D)) {
//         // Thoda delay dein taake scene ready ho
//         setTimeout(function () {
//             renderAllFurniture3D(window.allFurniture3D);
//         }, 50);
//     }

// /* =====================================================
//    CREATE THREE CUSTOM WALLS
// ===================================================== */

// function createThreeWalls(data) {

//     if (!scene) return;

//     if (!data) return;


//     /* -------------------------------------------------
//        Remove old custom walls
//     ------------------------------------------------- */

//     if (roomGroup) {

//         const oldWalls =
//             roomGroup.children.filter(
//                 function (child) {

//                     return (
//                         child.userData &&
//                         child.userData.customWall === true
//                     );
//                 }
//             );

//         oldWalls.forEach(
//             function (wall) {

//                 roomGroup.remove(
//                     wall
//                 );

//                 if (wall.geometry) {
//                     wall.geometry.dispose();
//                 }

//                 if (wall.material) {
//                     wall.material.dispose();
//                 }
//             }
//         );
//     }


//     const walls =
//         Array.isArray(data.walls)
//             ? data.walls
//             : [];


//     if (walls.length === 0) {
//         return;
//     }


//     /* =================================================
//        SCALE
//        Fabric canvas:
//        1 pixel = 1 cm

//        Three.js:
//        100 cm = 1 meter
//     ================================================= */

//     const roomWidthCm =
//         threeRoomData.width;

//     const roomDepthCm =
//         threeRoomData.depth;


//     const wallHeight =
//         getRoomHeightMeters();


//     const wallMaterial =
//         new THREE.MeshStandardMaterial({
//             color: 0xf3f0ea,
//             roughness: 0.9
//         });


//     walls.forEach(
//         function (wallData, index) {

//             if (!wallData) return;


//             const x1 =
//                 Number(wallData.x1) || 0;

//             const y1 =
//                 Number(wallData.y1) || 0;

//             const x2 =
//                 Number(wallData.x2) || 0;

//             const y2 =
//                 Number(wallData.y2) || 0;


//             /* ------------------------------------------------
//                Convert Fabric X/Y to Three X/Z

//                Fabric:
//                   X -> right
//                   Y -> down

//                Three:
//                   X -> right
//                   Z -> depth
//             ------------------------------------------------ */

//             const startX =
//                 cmToMeters(
//                     x1 - roomWidthCm / 2
//                 );

//             const startZ =
//                 cmToMeters(
//                     y1 - roomDepthCm / 2
//                 );

//             const endX =
//                 cmToMeters(
//                     x2 - roomWidthCm / 2
//                 );

//             const endZ =
//                 cmToMeters(
//                     y2 - roomDepthCm / 2
//                 );


//             const dx =
//                 endX - startX;

//             const dz =
//                 endZ - startZ;


//             const length =
//                 Math.sqrt(
//                     dx * dx +
//                     dz * dz
//                 );


//             if (length <= 0.001) {
//                 return;
//             }


//             /* =================================================
//                WALL GEOMETRY
//             ================================================= */

//             const geometry =
//                 new THREE.BoxGeometry(
//                     length,
//                     wallHeight,
//                     THREE_WALL_THICKNESS
//                 );


//             const mesh =
//                 new THREE.Mesh(
//                     geometry,
//                     wallMaterial.clone()
//                 );


//             /* =================================================
//                WALL POSITION
//             ================================================= */

//             mesh.position.set(
//                 (startX + endX) / 2,
//                 wallHeight / 2,
//                 (startZ + endZ) / 2
//             );


//             /* =================================================
//                WALL ROTATION
//             ================================================= */

//             mesh.rotation.y =
//                 -Math.atan2(
//                     dz,
//                     dx
//                 );


//             mesh.castShadow = true;
//             mesh.receiveShadow = true;


//             mesh.userData.customWall =
//                 true;

//             mesh.userData.wallIndex =
//                 index;


//             mesh.name =
//                 "CustomWall_" +
//                 index;


//             if (roomGroup) {

//                 roomGroup.add(
//                     mesh
//                 );
//             }
//         }
//     );
// }


// /* =====================================================
//    ALIAS FOR design.js
// ===================================================== */

// function rebuildThreeWalls(data) {

//     updateThreeWalls(
//         data
//     );
// }


// function update3DFromWalls(data) {

//     updateThreeWalls(
//         data
//     );
// }


// /* =====================================================
//    REBUILD ROOM ALIAS
// ===================================================== */

// function rebuildThreeRoom(data) {

//     updateThreeRoom(
//         data
//     );
// }


// /* =====================================================
//    update3DRoom ALIAS
// ===================================================== */

// function update3DRoom(data) {

//     updateThreeRoom(
//         data
//     );
// }


// /* =====================================================
//    FURNITURE 2D -> 3D COORDINATE (overloaded)
//    Supports both (data) and (xCm, yCm)
// ===================================================== */

// function convert2DPositionTo3D(xCm, yCm) {
//     if (typeof xCm === 'object') {
//         // Called with data object
//         const data = xCm;
//         const x = Number(data.x) || 0;
//         const y = Number(data.y) || 0;
//         return convert2DPositionTo3D(x, y);
//     }
//     // Called with numbers
//     const roomWidthCm = threeRoomData.width || 500;
//     const roomDepthCm = threeRoomData.depth || 300;
//     return {
//         x: cmToMeters(xCm - roomWidthCm / 2),
//         z: cmToMeters(yCm - roomDepthCm / 2)
//     };
// }


// /* =====================================================
//    GET MODEL SIZE
// ===================================================== */

// function getModelSize(
//     object
// ) {

//     const box =
//         new THREE.Box3()
//             .setFromObject(
//                 object
//             );

//     const size =
//         new THREE.Vector3();

//     box.getSize(
//         size
//     );

//     return {
//         box: box,
//         size: size
//     };
// }


// /* =====================================================
//    NORMALIZE GLB MODEL

//    This fixes the common problem where:
//    chair is half above / half below floor.
// ===================================================== */

// function normalizeFurnitureModel(
//     model,
//     data
// ) {

//     if (!model) return;


//     /* =================================================
//        UPDATE WORLD MATRIX
//     ================================================= */

//     model.updateMatrixWorld(
//         true
//     );


//     let result =
//         getModelSize(
//             model
//         );

//     let size =
//         result.size;


//     /* =================================================
//        APPLY 2D WIDTH SCALE
//     ================================================= */

//     const targetWidth =
//         cmToMeters(
//             Number(data.width) || 80
//         );


//     const targetDepth =
//         cmToMeters(
//             Number(data.height) || 80
//         );


//     /* -------------------------------------------------
//        Prefer model's largest horizontal dimension
//     ------------------------------------------------- */

//     const currentHorizontal =
//         Math.max(
//             size.x,
//             size.z
//         );


//     if (
//         currentHorizontal > 0.0001 &&
//         targetWidth > 0.0001
//     ) {

//         const ratio =
//             targetWidth /
//             currentHorizontal;

//         model.scale.multiplyScalar(
//             ratio
//         );
//     }


//     /* =================================================
//        UPDATE MATRIX AGAIN
//     ================================================= */

//     model.updateMatrixWorld(
//         true
//     );


//     result =
//         getModelSize(
//             model
//         );

//     const box =
//         result.box;


//     /* =================================================
//        MOVE MODEL SO BOTTOM = FLOOR
//     ================================================= */

//     const bottomY =
//         box.min.y;


//     model.position.y -=
//         bottomY;


//     /* =================================================
//        SMALL FLOAT PROTECTION
//     ================================================= */

//     model.position.y +=
//         0.002;


//     /* =================================================
//        SHADOWS
//     ================================================= */

//     model.traverse(
//         function (child) {

//             if (!child.isMesh) {
//                 return;
//             }

//             child.castShadow = true;
//             child.receiveShadow = true;


//             if (child.material) {

//                 child.material.side =
//                     THREE.FrontSide;
//             }
//         }
//     );
// }


// /* =====================================================
//    SHOW SELECTED FURNITURE 3D
//    (Supports sprites for images and GLB for models)
// ===================================================== */

// function showSelectedFurniture3D(data) {
//     if (!scene || !data) return;

//     // Remove previous furniture (sprite or mesh)
//     clearSelectedFurniture3D();

//     // ---- 1. If we have an image URL, create a sprite ----
//     if (data.imageUrl) {
//         const widthM = cmToMeters(data.width || 80);
//         const heightM = cmToMeters(data.height || 80);
//         const sprite = createFurnitureSprite(data.imageUrl, widthM, heightM);

//         // Position
//         const pos = convert2DPositionTo3D(data.x || 0, data.y || 0);
//         sprite.position.set(pos.x, 0.5, pos.z);   // lift a bit above floor

//         // Rotation (around Y) – sprite rotates around its center
//         sprite.rotation.z = THREE.MathUtils.degToRad(data.rotation || 0);

//         // Store reference to 2D data for syncing back
//         sprite.userData.fabricX = data.x;
//         sprite.userData.fabricY = data.y;
//         sprite.userData.fabricRotation = data.rotation;

//         furnitureGroup.add(sprite);
//         furnitureSprites[sprite.userData.id] = sprite;
//         currentFurnitureMesh = sprite;   // keep as current
//         window.current3DFurniture = sprite;

//         if (renderer) renderer.render(scene, camera);
//         return;
//     }

//     // ---- 2. Otherwise try to load GLB model ----
//     let modelPath = data.model || "";
//     if (data.type === "Armchair" && !modelPath) {
//         modelPath = "models/armchair1.glb";
//     }

//     if (modelPath && gltfLoader) {
//         gltfLoader.load(
//             modelPath,
//             function (gltf) {
//                 const model = gltf.scene;
//                 if (!model) {
//                     createFallbackMesh(data);
//                     return;
//                 }

//                 currentFurnitureMesh = model;
//                 model.name = "SelectedFurniture3D";

//                 const pos = convert2DPositionTo3D(data.x || 0, data.y || 0);
//                 model.position.set(pos.x, 0, pos.z);
//                 model.rotation.y = -THREE.MathUtils.degToRad(data.rotation || 0);

//                 furnitureGroup.add(model);
//                 normalizeFurnitureModel(model, data);
//                 window.current3DFurniture = model;

//                 if (renderer) renderer.render(scene, camera);
//             },
//             undefined,
//             function (error) {
//                 console.error("GLB load failed:", modelPath, error);
//                 createFallbackMesh(data);
//             }
//         );
//         return;
//     }

//     // ---- 3. Fallback ----
//     createFallbackMesh(data);
// }


// /* =====================================================
//    FALLBACK FURNITURE
// ===================================================== */

// function createFallbackMesh(
//     data
// ) {

//     if (!scene) return;


//     clearSelectedFurniture3D();


//     const width =
//         Math.max(
//             cmToMeters(
//                 Number(data.width) || 80
//             ),
//             0.3
//         );


//     const depth =
//         Math.max(
//             cmToMeters(
//                 Number(data.height) || 80
//             ),
//             0.3
//         );


//     /* Default furniture height */

//     let furnitureHeight =
//         0.8;


//     if (data.type === "Bed") {
//         furnitureHeight = 0.45;
//     }

//     if (data.type === "Sofa") {
//         furnitureHeight = 0.85;
//     }

//     if (data.type === "Armchair") {
//         furnitureHeight = 0.85;
//     }


//     const geometry =
//         new THREE.BoxGeometry(
//             width,
//             furnitureHeight,
//             depth
//         );


//     const material =
//         new THREE.MeshStandardMaterial({
//             color: 0x2e7d32,
//             roughness: 0.75
//         });


//     currentFurnitureMesh =
//         new THREE.Mesh(
//             geometry,
//             material
//         );


//     currentFurnitureMesh.name =
//         "FurnitureFallback";


//     const position =
//         convert2DPositionTo3D(
//             data
//         );


//     currentFurnitureMesh.position.set(
//         position.x,
//         furnitureHeight / 2,
//         position.z
//     );


//     currentFurnitureMesh.rotation.y =
//         -THREE.MathUtils.degToRad(
//             Number(data.rotation) || 0
//         );


//     currentFurnitureMesh.castShadow =
//         true;

//     currentFurnitureMesh.receiveShadow =
//         true;


//     furnitureGroup.add(
//         currentFurnitureMesh
//     );


//     window.current3DFurniture =
//         currentFurnitureMesh;
// }


// /* =====================================================
//    UPDATE SELECTED FURNITURE
// ===================================================== */

// function updateSelectedFurniture3D(
//     data
// ) {

//     if (!data) return;

//     showSelectedFurniture3D(
//         data
//     );
// }


// /* =====================================================
//    CLEAR SELECTED FURNITURE
// ===================================================== */

// function clearSelectedFurniture3D() {
//     // Remove sprite if exists
//     if (currentFurnitureMesh && currentFurnitureMesh.isSprite) {
//         const id = currentFurnitureMesh.userData.id;
//         if (furnitureSprites[id]) {
//             furnitureGroup.remove(furnitureSprites[id]);
//             delete furnitureSprites[id];
//         }
//         currentFurnitureMesh = null;
//         window.current3DFurniture = null;
//         return;
//     }

//     // Remove GLB / fallback mesh
//     if (currentFurnitureMesh) {
//         if (furnitureGroup && furnitureGroup.children.includes(currentFurnitureMesh)) {
//             furnitureGroup.remove(currentFurnitureMesh);
//         } else if (scene) {
//             scene.remove(currentFurnitureMesh);
//         }

//         // Dispose resources
//         currentFurnitureMesh.traverse(function (child) {
//             if (child.geometry) child.geometry.dispose();
//             if (child.material) {
//                 if (Array.isArray(child.material)) {
//                     child.material.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
//                 } else {
//                     if (child.material.map) child.material.map.dispose();
//                     child.material.dispose();
//                 }
//             }
//         });

//         currentFurnitureMesh = null;
//         window.current3DFurniture = null;
//     }
// }


// /* =====================================================
//    RESIZE THREE VIEW
// ===================================================== */

// function resizeThreeView() {

//     const container =
//         document.getElementById(
//             "threeView"
//         );


//     if (
//         !container ||
//         !renderer ||
//         !camera
//     ) {

//         return;
//     }


//     const width =
//         Math.max(
//             container.clientWidth,
//             1
//         );

//     const height =
//         Math.max(
//             container.clientHeight,
//             1
//         );


//     camera.aspect =
//         width / height;

//     camera.updateProjectionMatrix();


//     renderer.setSize(
//         width,
//         height
//     );
// }


// /* =====================================================
//    RESET CAMERA
// ===================================================== */

// function resetCamera() {

//     if (
//         !camera ||
//         !controls
//     ) {

//         return;
//     }


//     const width =
//         getRoomWidthMeters();

//     const depth =
//         getRoomDepthMeters();

//     const height =
//         getRoomHeightMeters();


//     const maxDimension =
//         Math.max(
//             width,
//             depth,
//             height
//         );


//     const distance =
//         Math.max(
//             5,
//             maxDimension * 1.7
//         );


//     camera.position.set(
//         distance,
//         distance * 0.9,
//         distance
//     );


//     controls.target.set(
//         0,
//         Math.min(
//             height / 2,
//             1.4
//         ),
//         0
//     );


//     controls.update();
// }


// /* =====================================================
//    FULLSCREEN
// ===================================================== */

// function fullscreenThreeView() {

//     const container =
//         document.getElementById(
//             "threeView"
//         );


//     if (
//         container &&
//         container.requestFullscreen
//     ) {

//         container.requestFullscreen();
//     }
// }


// /* =====================================================
//    ANIMATION LOOP
// ===================================================== */

// function animateThree() {

//     requestAnimationFrame(
//         animateThree
//     );


//     if (controls) {

//         controls.update();
//     }


//     if (
//         renderer &&
//         scene &&
//         camera
//     ) {

//         renderer.render(
//             scene,
//             camera
//         );
//     }
// }


// /* =====================================================
//    GLOBAL ACCESS
// ===================================================== */

// window.initThreeView =
//     initThreeView;

// window.updateThreeRoom =
//     updateThreeRoom;

// window.update3DRoom =
//     update3DRoom;

// window.rebuildThreeRoom =
//     rebuildThreeRoom;

// window.updateThreeWalls =
//     updateThreeWalls;

// window.createThreeWalls =
//     createThreeWalls;

// window.rebuildThreeWalls =
//     rebuildThreeWalls;

// window.update3DFromWalls =
//     update3DFromWalls;

// window.showSelectedFurniture3D =
//     showSelectedFurniture3D;

// window.updateSelectedFurniture3D =
//     updateSelectedFurniture3D;

// window.clearSelectedFurniture3D =
//     clearSelectedFurniture3D;


// /* =====================================================
//    INITIAL DATA SYNC
// ===================================================== */

// setTimeout(
//     function () {

//         if (window.roomData) {

//             threeRoomData = {

//                 width:
//                     Number(
//                         window.roomData.width
//                     ) ||
//                     DEFAULT_ROOM_WIDTH,

//                 depth:
//                     Number(
//                         window.roomData.depth
//                     ) ||
//                     DEFAULT_ROOM_DEPTH,

//                 height:
//                     Number(
//                         window.roomData.height
//                     ) ||
//                     DEFAULT_ROOM_HEIGHT,

//                 angle:
//                     Number(
//                         window.roomData.angle
//                     ) || 0,

//                 elevation:
//                     Number(
//                         window.roomData.elevation
//                     ) || 0
//             };
//         }


//         if (window.roomWallData) {

//             threeWallData = {

//                 points:
//                     Array.isArray(
//                         window.roomWallData.points
//                     )
//                         ? window.roomWallData.points
//                         : [],

//                 walls:
//                     Array.isArray(
//                         window.roomWallData.walls
//                     )
//                         ? window.roomWallData.walls
//                         : [],

//                 closed:
//                     !!window.roomWallData.closed,

//                 shape:
//                     window.roomWallData.shape ||
//                     "custom"
//             };
//         }


//         if (threeInitialized) {

//             updateThreeRoom(
//                 threeRoomData
//             );

//             updateThreeWalls(
//                 threeWallData
//             );
//         }

//     },
//     300
// );
// /* =====================================================
//    ALL FURNITURE 3D SYSTEM
//    Ek saath saare furniture render/update/remove
// ===================================================== */

// let allFurnitureMeshes = {};   // { id: Object3D }

// /* ---------------------------------------------------
//    Main function: saare furniture render karein
// --------------------------------------------------- */
// function renderAllFurniture3D(items) {
//     if (!scene || !furnitureGroup) return;
//     if (!Array.isArray(items)) return;

//     const currentIds = new Set();

//     items.forEach(function (item) {
//         if (!item.id) return;
//         currentIds.add(item.id);

//         // Agar pehle se mojood hai → update karein
//         if (allFurnitureMeshes[item.id]) {
//             updateFurnitureMesh3D(item.id, item);
//             return;
//         }

//         // Nahi hai → naya create karein
//         createFurnitureIn3D(item);
//     });

//     // Jo items canvas se hata diye gaye → 3D se bhi hata dein
//     Object.keys(allFurnitureMeshes).forEach(function (id) {
//         if (!currentIds.has(id)) {
//             removeFurnitureMesh3D(id);
//         }
//     });

//     if (renderer && scene && camera) {
//         renderer.render(scene, camera);
//     }
// }

// /* ---------------------------------------------------
//    Single furniture create karein (sprite ya GLB)
// --------------------------------------------------- */
// function createFurnitureIn3D(item) {
//     if (!furnitureGroup) return;

//     const pos = convert2DPositionTo3D(item.x || 0, item.y || 0);

//     // ---- 1. Image → Sprite ----
//     if (item.imageUrl) {
//         const widthM = Math.max(cmToMeters(item.width || 80), 0.2);
//         const heightM = Math.max(cmToMeters(item.height || 80), 0.2);

//         const sprite = createFurnitureSprite(item.imageUrl, widthM, heightM);

//         sprite.position.set(pos.x, heightM / 2, pos.z);

//         if (item.rotation) {
//             sprite.material.rotation = THREE.MathUtils.degToRad(item.rotation);
//         }

//         sprite.userData.fabricId = item.id;
//         sprite.userData.itemData = item;

//         furnitureGroup.add(sprite);
//         allFurnitureMeshes[item.id] = sprite;
//         return;
//     }

//     // ---- 2. GLB / Fallback ----
//     let modelPath = item.model || "";
//     if (item.type === "Armchair" && !modelPath) {
//         modelPath = "models/armchair1.glb";
//     }

//     if (modelPath && gltfLoader) {
//         gltfLoader.load(
//             modelPath,
//             function (gltf) {
//                 const model = gltf.scene;
//                 if (!model) {
//                     createFallbackForItem(item, pos);
//                     return;
//                 }

//                 model.position.set(pos.x, 0, pos.z);
//                 model.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);
//                 model.userData.fabricId = item.id;

//                 furnitureGroup.add(model);
//                 normalizeFurnitureModel(model, item);

//                 allFurnitureMeshes[item.id] = model;
//             },
//             undefined,
//             function () {
//                 createFallbackForItem(item, pos);
//             }
//         );
//         return;
//     }

//     createFallbackForItem(item, pos);
// }

// /* ---------------------------------------------------
//    Fallback box (agar image/GLB na ho)
// --------------------------------------------------- */
// function createFallbackForItem(item, pos) {
//     const width = Math.max(cmToMeters(item.width || 80), 0.3);
//     const depth = Math.max(cmToMeters(item.height || 80), 0.3);

//     let height = 0.8;
//     if (item.type === "Bed") height = 0.45;
//     if (item.type === "Sofa") height = 0.85;
//     if (item.type === "Armchair") height = 0.85;

//     const geo = new THREE.BoxGeometry(width, height, depth);
//     const mat = new THREE.MeshStandardMaterial({
//         color: 0x2e7d32,
//         roughness: 0.75
//     });

//     const mesh = new THREE.Mesh(geo, mat);

//     const p = pos || convert2DPositionTo3D(item.x || 0, item.y || 0);
//     mesh.position.set(p.x, height / 2, p.z);
//     mesh.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);

//     mesh.castShadow = true;
//     mesh.receiveShadow = true;
//     mesh.userData.fabricId = item.id;

//     furnitureGroup.add(mesh);
//     allFurnitureMeshes[item.id] = mesh;
// }

// /* ---------------------------------------------------
//    Existing mesh update karein (move / rotate)
// --------------------------------------------------- */
// function updateFurnitureMesh3D(id, item) {
//     const obj = allFurnitureMeshes[id];
//     if (!obj) return;

//     const pos = convert2DPositionTo3D(item.x || 0, item.y || 0);

//     if (obj.isSprite) {
//         obj.position.x = pos.x;
//         obj.position.z = pos.z;
//         if (item.rotation !== undefined) {
//             obj.material.rotation = THREE.MathUtils.degToRad(item.rotation);
//         }
//     } else {
//         obj.position.x = pos.x;
//         obj.position.z = pos.z;
//         obj.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);
//     }
// }

// /* ---------------------------------------------------
//    Ek mesh remove karein
// --------------------------------------------------- */
// function removeFurnitureMesh3D(id) {
//     const obj = allFurnitureMeshes[id];
//     if (!obj) return;

//     if (furnitureGroup) {
//         furnitureGroup.remove(obj);
//     }

//     if (obj.traverse) {
//         obj.traverse(function (child) {
//             if (child.geometry) child.geometry.dispose();
//             if (child.material) {
//                 if (Array.isArray(child.material)) {
//                     child.material.forEach(function (m) {
//                         if (m.map) m.map.dispose();
//                         m.dispose();
//                     });
//                 } else {
//                     if (child.material.map) child.material.map.dispose();
//                     child.material.dispose();
//                 }
//             }
//         });
//     }

//     delete allFurnitureMeshes[id];
// }

// /* ---------------------------------------------------
//    Saare furniture clear karein (naya room banate waqt)
// --------------------------------------------------- */
// function clearAllFurniture3D() {
//     Object.keys(allFurnitureMeshes).forEach(function (id) {
//         removeFurnitureMesh3D(id);
//     });
//     allFurnitureMeshes = {};
// }

// /* ---------------------------------------------------
//    Event listener: design.js se aane wala data
// --------------------------------------------------- */
// window.addEventListener("allFurniture3DUpdated", function (event) {
//     if (!event.detail) return;
//     renderAllFurniture3D(event.detail);
// });

// /* ---------------------------------------------------
//    Global access
// --------------------------------------------------- */
// window.renderAllFurniture3D = renderAllFurniture3D;
// window.clearAllFurniture3D = clearAllFurniture3D;
/* =====================================================
   THREEVIEW.JS
   Home Interior Design Project
   -----------------------------------------------------
   - Room rendering (default + custom walls)
   - Furniture rendering (sprites + GLB fallback)
   - Multi-furniture sync from design.js
   - 3D drag for sprites (syncs back to 2D)
   - Camera reset & fullscreen
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let scene = null;
let camera = null;
let renderer = null;
let controls = null;

let roomGroup = null;
let furnitureGroup = null;

let threeInitialized = false;
let gltfLoader = null;

// Multi-furniture tracking
let allFurnitureMeshes = {};   // { fabricId: Object3D }
let currentSpriteId = 0;

// 3D drag state
let selectedSprite = null;
let isDragging = false;
let dragOffset = new THREE.Vector3();
let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


/* =====================================================
   CONSTANTS
===================================================== */

const DEFAULT_ROOM_WIDTH = 500;
const DEFAULT_ROOM_DEPTH = 300;
const DEFAULT_ROOM_HEIGHT = 280;

const THREE_WALL_THICKNESS = 0.15;
const FLOOR_THICKNESS = 0.12;


/* =====================================================
   CURRENT DATA
===================================================== */

let threeRoomData = {
    width: DEFAULT_ROOM_WIDTH,
    depth: DEFAULT_ROOM_DEPTH,
    height: DEFAULT_ROOM_HEIGHT,
    angle: 0,
    elevation: 0
};

let threeWallData = {
    points: [],
    walls: [],
    closed: false,
    shape: "custom"
};


/* =====================================================
   INITIALIZE THREE VIEW
===================================================== */

function initThreeView() {
    const container = document.getElementById("threeView");
    if (!container) {
        console.warn("Three.js container #threeView not found.");
        return;
    }

    // Already initialized → just resize + resync
    if (threeInitialized) {
        resizeThreeView();
        updateThreeRoom(window.roomData || threeRoomData);
        updateThreeWalls(window.roomWallData || threeWallData);
        if (typeof renderAllFurniture3D === "function" && window.allFurniture3D) {
            renderAllFurniture3D(window.allFurniture3D);
        }
        return;
    }

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe7eaed);

    // GLTF loader
    gltfLoader = new THREE.GLTFLoader();

    // Camera
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(7, 5.5, 7);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.target.set(0, 1, 0);
    controls.update();

    // Furniture group
    furnitureGroup = new THREE.Group();
    furnitureGroup.name = "FurnitureGroup";
    scene.add(furnitureGroup);

    // Lights
    threeCreateLights();

    // Initial room
    threeCreateRoom(window.roomData || threeRoomData);

    // 3D drag events
    setup3DDragEvents();

    // Room events
    window.addEventListener("resize", resizeThreeView);

    window.addEventListener("roomDataUpdated", function (e) {
        if (e.detail) updateThreeRoom(e.detail);
    });

    window.addEventListener("roomWallsUpdated", function (e) {
        if (e.detail) updateThreeWalls(e.detail);
    });

    window.addEventListener("smartRoomGenerated", function () {
        if (window.roomData) updateThreeRoom(window.roomData);
        if (window.roomWallData) updateThreeWalls(window.roomWallData);
    });

    // Buttons
    const resetButton = document.getElementById("cameraReset");
    if (resetButton) resetButton.addEventListener("click", resetCamera);

    const fullscreenButton = document.getElementById("threeFullscreen");
    if (fullscreenButton) fullscreenButton.addEventListener("click", fullscreenThreeView);

    // Mark initialized
    threeInitialized = true;

    const loading = document.getElementById("threeLoading");
    if (loading) loading.style.display = "none";

    // Initial sync
    if (window.roomData) updateThreeRoom(window.roomData);
    if (window.roomWallData) updateThreeWalls(window.roomWallData);

    // Initial furniture (if design.js already populated)
    if (window.allFurniture3D && Array.isArray(window.allFurniture3D)) {
        renderAllFurniture3D(window.allFurniture3D);
    }

    // Start render loop
    animateThree();
}


/* =====================================================
   3D DRAG EVENTS (for sprites)
===================================================== */

function setup3DDragEvents() {
    if (!renderer) return;

    function onPointerDown(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        if (clientX === undefined) return;

        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(furnitureGroup.children, true);

        for (let i = 0; i < intersects.length; i++) {
            let obj = intersects[i].object;
            while (obj) {
                if (obj.isSprite && obj.userData.isFurniture) {
                    selectedSprite = obj;
                    isDragging = true;

                    const pt = new THREE.Vector3();
                    raycaster.ray.intersectPlane(dragPlane, pt);
                    if (pt) dragOffset.copy(selectedSprite.position).sub(pt);

                    renderer.domElement.style.cursor = "grabbing";
                    return;
                }
                obj = obj.parent;
            }
        }
    }

    function onPointerMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        if (clientX === undefined) return;

        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        if (!isDragging || !selectedSprite) return;

        raycaster.setFromCamera(mouse, camera);
        const pt = new THREE.Vector3();
        raycaster.ray.intersectPlane(dragPlane, pt);

        if (pt) {
            selectedSprite.position.x = pt.x + dragOffset.x;
            selectedSprite.position.z = pt.z + dragOffset.z;
            update2DFrom3D(selectedSprite);
        }
    }

    function onPointerUp() {
        if (isDragging && selectedSprite) {
            update2DFrom3D(selectedSprite);
        }
        isDragging = false;
        selectedSprite = null;
        if (renderer) renderer.domElement.style.cursor = "default";
    }

    renderer.domElement.addEventListener("mousedown", onPointerDown);
    renderer.domElement.addEventListener("mousemove", onPointerMove);
    renderer.domElement.addEventListener("mouseup", onPointerUp);
    renderer.domElement.addEventListener("touchstart", onPointerDown, { passive: false });
    renderer.domElement.addEventListener("touchmove", onPointerMove, { passive: false });
    renderer.domElement.addEventListener("touchend", onPointerUp, { passive: false });
}

// Sync 3D sprite position back to Fabric canvas
function update2DFrom3D(sprite) {
    if (!sprite || !window.designApp || !window.designApp.canvas) return;

    const fabricCanvas = window.designApp.canvas;
    const roomW = threeRoomData.width || 500;
    const roomD = threeRoomData.depth || 300;

    const x2d = (sprite.position.x * 100) + roomW / 2;
    const y2d = (sprite.position.z * 100) + roomD / 2;

    const objects = fabricCanvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (obj.imageUrl === sprite.userData.imageUrl) {
            obj.set({ left: x2d, top: y2d });
            obj.setCoords();
            fabricCanvas.renderAll();
            break;
        }
    }
}


/* =====================================================
   LIGHTS
===================================================== */

function threeCreateLights() {
    if (!scene) return;

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 0.45));
}


/* =====================================================
   HELPERS
===================================================== */

function cmToMeters(value) {
    const n = Number(value);
    return isFinite(n) ? n / 100 : 0;
}

function getRoomWidthMeters() { return cmToMeters(threeRoomData.width); }
function getRoomDepthMeters() { return cmToMeters(threeRoomData.depth); }
function getRoomHeightMeters() { return cmToMeters(threeRoomData.height); }

// Convert 2D (cm) → 3D (meters). Supports {x,y} or (x,y)
function convert2DPositionTo3D(xOrData, yArg) {
    let xCm, yCm;
    if (typeof xOrData === "object" && xOrData !== null) {
        xCm = Number(xOrData.x) || 0;
        yCm = Number(xOrData.y) || 0;
    } else {
        xCm = Number(xOrData) || 0;
        yCm = Number(yArg) || 0;
    }
    const roomW = threeRoomData.width || 500;
    const roomD = threeRoomData.depth || 300;
    return {
        x: cmToMeters(xCm - roomW / 2),
        z: cmToMeters(yCm - roomD / 2)
    };
}


/* =====================================================
   ROOM: UPDATE / CREATE
===================================================== */

function updateThreeRoom(data) {
    if (!data) return;

    threeRoomData = {
        width: Number(data.width) || DEFAULT_ROOM_WIDTH,
        depth: Number(data.depth) || DEFAULT_ROOM_DEPTH,
        height: Number(data.height) || DEFAULT_ROOM_HEIGHT,
        angle: Number(data.angle) || 0,
        elevation: Number(data.elevation) || 0
    };

    if (!scene) return;
    threeCreateRoom(threeRoomData);
}

function threeCreateRoom(data) {
    if (!scene) return;

    // Remove old room
    if (roomGroup) {
        scene.remove(roomGroup);
        roomGroup = null;
    }

    const roomWidth = cmToMeters(data.width);
    const roomDepth = cmToMeters(data.depth);
    const roomHeight = cmToMeters(data.height);

    roomGroup = new THREE.Group();
    roomGroup.name = "RoomGroup";

    // Floor
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0xd8c4a8,
        roughness: 0.75,
        metalness: 0
    });
    const floorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(roomWidth, FLOOR_THICKNESS, roomDepth),
        floorMat
    );
    floorMesh.position.y = -FLOOR_THICKNESS / 2;
    floorMesh.receiveShadow = true;
    floorMesh.name = "RoomFloor";
    roomGroup.add(floorMesh);

    // Grid
    const gridSize = Math.max(roomWidth, roomDepth);
    const gridDivisions = Math.max(10, Math.round(gridSize * 10));
    const grid = new THREE.GridHelper(gridSize, gridDivisions, 0x999999, 0xcccccc);
    grid.scale.z = roomDepth / gridSize;
    grid.position.y = 0.003;
    grid.name = "RoomGrid";
    roomGroup.add(grid);

    // Default walls if no custom walls
    const hasCustomWalls =
        threeWallData &&
        Array.isArray(threeWallData.walls) &&
        threeWallData.walls.length > 0;

    if (!hasCustomWalls) {
        createDefaultWalls(roomGroup, roomWidth, roomDepth, roomHeight);
    }

    // Add room group to scene
    scene.add(roomGroup);

    // Custom walls
    if (hasCustomWalls) {
        createThreeWalls(threeWallData);
    }

    // Room rotation
    roomGroup.rotation.y = THREE.MathUtils.degToRad(data.angle || 0);

    // Camera target
    if (controls) {
        controls.target.set(0, Math.min(roomHeight / 2, 1.5), 0);
        controls.update();
    }

    // Re-render furniture (positions depend on room size)
    if (window.allFurniture3D && Array.isArray(window.allFurniture3D)) {
        setTimeout(function () {
            renderAllFurniture3D(window.allFurniture3D);
        }, 30);
    }
}

function createDefaultWalls(group, roomWidth, roomDepth, roomHeight) {
    const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf3f0ea,
        roughness: 0.9
    });

    // Back
    const back = new THREE.Mesh(
        new THREE.BoxGeometry(roomWidth + THREE_WALL_THICKNESS, roomHeight, THREE_WALL_THICKNESS),
        wallMat
    );
    back.position.set(0, roomHeight / 2, -roomDepth / 2);
    back.castShadow = true;
    back.receiveShadow = true;
    back.name = "BackWall";
    group.add(back);

    // Left
    const left = new THREE.Mesh(
        new THREE.BoxGeometry(THREE_WALL_THICKNESS, roomHeight, roomDepth),
        wallMat
    );
    left.position.set(-roomWidth / 2, roomHeight / 2, 0);
    left.castShadow = true;
    left.receiveShadow = true;
    left.name = "LeftWall";
    group.add(left);

    // Right
    const right = new THREE.Mesh(
        new THREE.BoxGeometry(THREE_WALL_THICKNESS, roomHeight, roomDepth),
        wallMat
    );
    right.position.set(roomWidth / 2, roomHeight / 2, 0);
    right.castShadow = true;
    right.receiveShadow = true;
    right.name = "RightWall";
    group.add(right);

    // Front (transparent)
    const frontMat = new THREE.MeshStandardMaterial({
        color: 0xf3f0ea,
        roughness: 0.9,
        transparent: true,
        opacity: 0.12
    });
    const front = new THREE.Mesh(
        new THREE.BoxGeometry(roomWidth + THREE_WALL_THICKNESS, roomHeight, THREE_WALL_THICKNESS),
        frontMat
    );
    front.position.set(0, roomHeight / 2, roomDepth / 2);
    front.name = "FrontWall";
    group.add(front);
}


/* =====================================================
   WALLS: UPDATE / CREATE
===================================================== */

function updateThreeWalls(data) {
    if (!data) return;

    threeWallData = {
        points: Array.isArray(data.points) ? data.points : [],
        walls: Array.isArray(data.walls) ? data.walls : [],
        closed: !!data.closed,
        shape: data.shape || "custom"
    };

    if (!scene) return;
    threeCreateRoom(threeRoomData);
}

function createThreeWalls(data) {
    if (!scene || !data) return;

    // Remove old custom walls
    if (roomGroup) {
        const oldWalls = roomGroup.children.filter(function (child) {
            return child.userData && child.userData.customWall === true;
        });
        oldWalls.forEach(function (wall) {
            roomGroup.remove(wall);
            if (wall.geometry) wall.geometry.dispose();
            if (wall.material) wall.material.dispose();
        });
    }

    const walls = Array.isArray(data.walls) ? data.walls : [];
    if (walls.length === 0) return;

    const roomWidthCm = threeRoomData.width;
    const roomDepthCm = threeRoomData.depth;
    const wallHeight = getRoomHeightMeters();

    const wallMat = new THREE.MeshStandardMaterial({
        color: 0xf3f0ea,
        roughness: 0.9
    });

    walls.forEach(function (wallData, index) {
        if (!wallData) return;

        const x1 = Number(wallData.x1) || 0;
        const y1 = Number(wallData.y1) || 0;
        const x2 = Number(wallData.x2) || 0;
        const y2 = Number(wallData.y2) || 0;

        const startX = cmToMeters(x1 - roomWidthCm / 2);
        const startZ = cmToMeters(y1 - roomDepthCm / 2);
        const endX   = cmToMeters(x2 - roomWidthCm / 2);
        const endZ   = cmToMeters(y2 - roomDepthCm / 2);

        const dx = endX - startX;
        const dz = endZ - startZ;
        const length = Math.sqrt(dx * dx + dz * dz);
        if (length <= 0.001) return;

        const geo = new THREE.BoxGeometry(length, wallHeight, THREE_WALL_THICKNESS);
        const mesh = new THREE.Mesh(geo, wallMat.clone());

        mesh.position.set(
            (startX + endX) / 2,
            wallHeight / 2,
            (startZ + endZ) / 2
        );
        mesh.rotation.y = -Math.atan2(dz, dx);

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.customWall = true;
        mesh.userData.wallIndex = index;
        mesh.name = "CustomWall_" + index;

        if (roomGroup) roomGroup.add(mesh);
    });
}


/* =====================================================
   ALIASES (for design.js compatibility)
===================================================== */

function rebuildThreeWalls(data) { updateThreeWalls(data); }
function update3DFromWalls(data) { updateThreeWalls(data); }
function rebuildThreeRoom(data) { updateThreeRoom(data); }
function update3DRoom(data) { updateThreeRoom(data); }


/* =====================================================
   MODEL NORMALIZATION
===================================================== */

function getModelSize(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    return { box: box, size: size };
}

function normalizeFurnitureModel(model, data) {
    if (!model) return;

    model.updateMatrixWorld(true);
    let result = getModelSize(model);
    let size = result.size;

    const targetWidth = cmToMeters(Number(data.width) || 80);
    const currentHorizontal = Math.max(size.x, size.z);

    if (currentHorizontal > 0.0001 && targetWidth > 0.0001) {
        const ratio = targetWidth / currentHorizontal;
        model.scale.multiplyScalar(ratio);
    }

    model.updateMatrixWorld(true);
    result = getModelSize(model);
    const bottomY = result.box.min.y;
    model.position.y -= bottomY;
    model.position.y += 0.002;

    model.traverse(function (child) {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material.side = THREE.FrontSide;
    });
}


/* =====================================================
   SPRITE CREATION
===================================================== */

function createFurnitureSprite(imageUrl, widthMeters, heightMeters) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    const sprite = new THREE.Sprite(material);
    const w = Math.max(widthMeters, 0.1);
    const h = Math.max(heightMeters, 0.1);
    sprite.scale.set(w, h, 1);

    sprite.userData.isFurniture = true;
    sprite.userData.isSprite = true;
    sprite.userData.imageUrl = imageUrl;
    sprite.userData.id = ++currentSpriteId;

    return sprite;
}


/* =====================================================
   MULTI-FURNITURE RENDERING
===================================================== */

function renderAllFurniture3D(items) {
    if (!scene || !furnitureGroup) return;
    if (!Array.isArray(items)) return;

    const currentIds = new Set();

    items.forEach(function (item) {
        if (!item.id) return;
        currentIds.add(item.id);

        if (allFurnitureMeshes[item.id]) {
            updateFurnitureMesh3D(item.id, item);
        } else {
            createFurnitureIn3D(item);
        }
    });

    // Remove items no longer in canvas
    Object.keys(allFurnitureMeshes).forEach(function (id) {
        if (!currentIds.has(id)) {
            removeFurnitureMesh3D(id);
        }
    });

    if (renderer) renderer.render(scene, camera);
}

function createFurnitureIn3D(item) {
    if (!furnitureGroup) return;

    const pos = convert2DPositionTo3D(item.x || 0, item.y || 0);

    // 1) Image → Sprite
    if (item.imageUrl) {
        const widthM = Math.max(cmToMeters(item.width || 80), 0.2);
        const heightM = Math.max(cmToMeters(item.height || 80), 0.2);

        const sprite = createFurnitureSprite(item.imageUrl, widthM, heightM);
        sprite.position.set(pos.x, heightM / 2, pos.z);

        if (item.rotation) {
            sprite.material.rotation = THREE.MathUtils.degToRad(item.rotation);
        }

        sprite.userData.fabricId = item.id;
        sprite.userData.itemData = item;

        furnitureGroup.add(sprite);
        allFurnitureMeshes[item.id] = sprite;
        return;
    }

    // 2) GLB / Fallback
    let modelPath = item.model || "";
    if (item.type === "Armchair" && !modelPath) {
        modelPath = "models/armchair1.glb";
    }

    if (modelPath && gltfLoader) {
        gltfLoader.load(
            modelPath,
            function (gltf) {
                const model = gltf.scene;
                if (!model) {
                    createFallbackForItem(item, pos);
                    return;
                }

                model.position.set(pos.x, 0, pos.z);
                model.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);
                model.userData.fabricId = item.id;

                furnitureGroup.add(model);
                normalizeFurnitureModel(model, item);

                allFurnitureMeshes[item.id] = model;
            },
            undefined,
            function () {
                createFallbackForItem(item, pos);
            }
        );
        return;
    }

    createFallbackForItem(item, pos);
}

function createFallbackForItem(item, pos) {
    const width = Math.max(cmToMeters(item.width || 80), 0.3);
    const depth = Math.max(cmToMeters(item.height || 80), 0.3);

    let height = 0.8;
    if (item.type === "Bed") height = 0.45;
    if (item.type === "Sofa") height = 0.85;
    if (item.type === "Armchair") height = 0.85;

    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x2e7d32,
        roughness: 0.75
    });

    const mesh = new THREE.Mesh(geo, mat);
    const p = pos || convert2DPositionTo3D(item.x || 0, item.y || 0);

    mesh.position.set(p.x, height / 2, p.z);
    mesh.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.fabricId = item.id;

    furnitureGroup.add(mesh);
    allFurnitureMeshes[item.id] = mesh;
}

function updateFurnitureMesh3D(id, item) {
    const obj = allFurnitureMeshes[id];
    if (!obj) return;

    const pos = convert2DPositionTo3D(item.x || 0, item.y || 0);

    if (obj.isSprite) {
        obj.position.x = pos.x;
        obj.position.z = pos.z;
        if (item.rotation !== undefined) {
            obj.material.rotation = THREE.MathUtils.degToRad(item.rotation);
        }
    } else {
        obj.position.x = pos.x;
        obj.position.z = pos.z;
        obj.rotation.y = -THREE.MathUtils.degToRad(item.rotation || 0);
    }
}

function removeFurnitureMesh3D(id) {
    const obj = allFurnitureMeshes[id];
    if (!obj) return;

    if (furnitureGroup) furnitureGroup.remove(obj);

    if (obj.traverse) {
        obj.traverse(function (child) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(function (m) {
                        if (m.map) m.map.dispose();
                        m.dispose();
                    });
                } else {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }
        });
    }

    delete allFurnitureMeshes[id];
}

function clearAllFurniture3D() {
    Object.keys(allFurnitureMeshes).forEach(function (id) {
        removeFurnitureMesh3D(id);
    });
    allFurnitureMeshes = {};
}


/* =====================================================
   EVENT: ALL FURNITURE UPDATE (from design.js)
===================================================== */

window.addEventListener("allFurniture3DUpdated", function (event) {
    if (!event.detail) return;
    renderAllFurniture3D(event.detail);
});


/* =====================================================
   RESIZE / CAMERA / FULLSCREEN
===================================================== */

function resizeThreeView() {
    const container = document.getElementById("threeView");
    if (!container || !renderer || !camera) return;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function resetCamera() {
    if (!camera || !controls) return;

    const maxDim = Math.max(
        getRoomWidthMeters(),
        getRoomDepthMeters(),
        getRoomHeightMeters()
    );
    const distance = Math.max(5, maxDim * 1.7);

    camera.position.set(distance, distance * 0.9, distance);
    controls.target.set(0, Math.min(getRoomHeightMeters() / 2, 1.4), 0);
    controls.update();
}

function fullscreenThreeView() {
    const container = document.getElementById("threeView");
    if (container && container.requestFullscreen) {
        container.requestFullscreen();
    }
}


/* =====================================================
   RENDER LOOP
===================================================== */

function animateThree() {
    requestAnimationFrame(animateThree);

    if (controls) controls.update();

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}


/* =====================================================
   GLOBAL ACCESS
===================================================== */

window.initThreeView = initThreeView;
window.updateThreeRoom = updateThreeRoom;
window.update3DRoom = update3DRoom;
window.rebuildThreeRoom = rebuildThreeRoom;
window.updateThreeWalls = updateThreeWalls;
window.createThreeWalls = createThreeWalls;
window.rebuildThreeWalls = rebuildThreeWalls;
window.update3DFromWalls = update3DFromWalls;

window.renderAllFurniture3D = renderAllFurniture3D;
window.clearAllFurniture3D = clearAllFurniture3D;


/* =====================================================
   INITIAL DATA SYNC (fallback)
===================================================== */

setTimeout(function () {
    if (window.roomData) {
        threeRoomData = {
            width: Number(window.roomData.width) || DEFAULT_ROOM_WIDTH,
            depth: Number(window.roomData.depth) || DEFAULT_ROOM_DEPTH,
            height: Number(window.roomData.height) || DEFAULT_ROOM_HEIGHT,
            angle: Number(window.roomData.angle) || 0,
            elevation: Number(window.roomData.elevation) || 0
        };
    }

    if (window.roomWallData) {
        threeWallData = {
            points: Array.isArray(window.roomWallData.points) ? window.roomWallData.points : [],
            walls: Array.isArray(window.roomWallData.walls) ? window.roomWallData.walls : [],
            closed: !!window.roomWallData.closed,
            shape: window.roomWallData.shape || "custom"
        };
    }

    if (threeInitialized) {
        updateThreeRoom(threeRoomData);
        updateThreeWalls(threeWallData);
    }
}, 300);