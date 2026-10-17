/* =====================================================
   THREE.JS 3D ROOM VIEW
   Home Interior Design Project
===================================================== */

let scene;
let camera;
let renderer;
let controls;

let roomGroup;

let threeInitialized = false;

let armchairModel = null;

let gltfLoader = null;

let selected3DModel = null;


/* =====================================================
   ROOM SETTINGS
===================================================== */

const ROOM_WIDTH = 5;
const ROOM_DEPTH = 5;

const WALL_HEIGHT = 2.8;
const WALL_THICKNESS = 0.15;

/*
   IMPORTANT:
   The top surface of the floor is exactly Y = 0.
*/
const FLOOR_TOP = 0;


/* =====================================================
   INITIALIZE
===================================================== */

function initThreeView() {

    if (threeInitialized) {

        resizeThreeView();

        return;
    }


    const container =
        document.getElementById("threeView");


    if (!container) {

        console.error(
            "threeView container not found."
        );

        return;
    }


    /* =================================================
       SCENE
    ================================================= */

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(0xe7eaed);


    /* =================================================
       GLTF LOADER
    ================================================= */

    gltfLoader =
        new THREE.GLTFLoader();


    /* =================================================
       CAMERA
    ================================================= */

    camera =
        new THREE.PerspectiveCamera(

            50,

            container.clientWidth /
            container.clientHeight,

            0.1,

            1000

        );


    camera.position.set(
        7,
        5.5,
        7
    );


    /* =================================================
       RENDERER
    ================================================= */

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: false

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );


    renderer.shadowMap.enabled =
        true;


    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    /*
       Important for correct transparent PNG
       rendering.
    */
    renderer.sortObjects = true;


    container.appendChild(
        renderer.domElement
    );


    /* =================================================
       ORBIT CONTROLS
    ================================================= */

    controls =
        new THREE.OrbitControls(

            camera,

            renderer.domElement

        );


    controls.enableDamping =
        true;


    controls.dampingFactor =
        0.08;


    controls.target.set(
        0,
        1,
        0
    );


    controls.minDistance =
        2;


    controls.maxDistance =
        20;


    controls.maxPolarAngle =
        Math.PI / 2.05;


    /* =================================================
       LIGHTING
    ================================================= */

    threeCreateLights();


    /* =================================================
       ROOM
    ================================================= */

    threeCreateRoom();


    /* =================================================
       DEFAULT FURNITURE
    ================================================= */

    threeCreateDefaultFurniture();


    /* =================================================
       EVENTS
    ================================================= */

    window.addEventListener(
        "resize",
        resizeThreeView
    );


    const resetButton =
        document.getElementById(
            "cameraReset"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetCamera
        );

    }


    const fullscreenButton =
        document.getElementById(
            "threeFullscreen"
        );


    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            fullscreenThreeView
        );

    }


    threeInitialized =
        true;


    /* =================================================
       REMOVE LOADING
    ================================================= */

    const loading =
        document.getElementById(
            "threeLoading"
        );


    if (loading) {

        loading.style.display =
            "none";

    }


    animateThree();
}


/* =====================================================
   LIGHTS
===================================================== */

function threeCreateLights() {

    /* =================================================
       AMBIENT LIGHT
    ================================================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.65
        );


    scene.add(
        ambientLight
    );


    /* =================================================
       MAIN LIGHT
    ================================================= */

    const mainLight =
        new THREE.DirectionalLight(
            0xffffff,
            1.2
        );


    mainLight.position.set(
        4,
        8,
        4
    );


    mainLight.castShadow =
        true;


    mainLight.shadow.mapSize.width =
        2048;


    mainLight.shadow.mapSize.height =
        2048;


    scene.add(
        mainLight
    );


    /* =================================================
       SOFT LIGHT
    ================================================= */

    const fillLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x777777,
            0.45
        );


    scene.add(
        fillLight
    );
}


/* =====================================================
   CREATE ROOM
===================================================== */

function threeCreateRoom() {

    roomGroup =
        new THREE.Group();


    scene.add(
        roomGroup
    );


    /* =================================================
       FLOOR

       Floor thickness = 0.12
       Floor center = -0.06
       Therefore top surface = 0.
    ================================================= */

    const floorGeometry =
        new THREE.BoxGeometry(
            ROOM_WIDTH,
            0.12,
            ROOM_DEPTH
        );


    const floorMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd8c4a8,

            roughness: 0.75,

            metalness: 0

        });


    const floorMesh =
        new THREE.Mesh(

            floorGeometry,

            floorMaterial

        );


    floorMesh.position.y =
        -0.06;


    floorMesh.receiveShadow =
        true;


    floorMesh.castShadow =
        false;


    floorMesh.name =
        "RoomFloor";


    roomGroup.add(
        floorMesh
    );


    /* =================================================
       FLOOR GRID

       The grid is only visual.
       Keep it slightly above the floor.
    ================================================= */

    const grid =
        new THREE.GridHelper(

            ROOM_WIDTH,

            20,

            0x999999,

            0xcccccc

        );


    grid.position.y =
        0.003;


    grid.name =
        "RoomGrid";


    /*
       Prevent the grid from interfering
       with furniture depth.
    */

    if (grid.material) {

        grid.material.depthTest =
            true;

        grid.material.depthWrite =
            false;

        grid.material.transparent =
            true;

        grid.material.opacity =
            0.55;

    }


    roomGroup.add(
        grid
    );


    /* =================================================
       WALL MATERIAL
    ================================================= */

    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xf3f0ea,

            roughness: 0.9,

            metalness: 0

        });


    /* =================================================
       BACK WALL
    ================================================= */

    const backWall =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                ROOM_WIDTH,

                WALL_HEIGHT,

                WALL_THICKNESS

            ),

            wallMaterial

        );


    backWall.position.set(

        0,

        WALL_HEIGHT / 2,

        -ROOM_DEPTH / 2

    );


    backWall.receiveShadow =
        true;


    roomGroup.add(
        backWall
    );


    /* =================================================
       LEFT WALL
    ================================================= */

    const leftWall =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                WALL_THICKNESS,

                WALL_HEIGHT,

                ROOM_DEPTH

            ),

            wallMaterial

        );


    leftWall.position.set(

        -ROOM_WIDTH / 2,

        WALL_HEIGHT / 2,

        0

    );


    leftWall.receiveShadow =
        true;


    roomGroup.add(
        leftWall
    );


    /* =================================================
       RIGHT WALL
    ================================================= */

    const rightWall =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                WALL_THICKNESS,

                WALL_HEIGHT,

                ROOM_DEPTH

            ),

            wallMaterial

        );


    rightWall.position.set(

        ROOM_WIDTH / 2,

        WALL_HEIGHT / 2,

        0

    );


    rightWall.receiveShadow =
        true;


    roomGroup.add(
        rightWall
    );


    /* =================================================
       CEILING
    ================================================= */

    const ceiling =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                ROOM_WIDTH,

                0.08,

                ROOM_DEPTH

            ),

            new THREE.MeshStandardMaterial({

                color: 0xffffff

            })

        );


    ceiling.position.y =
        WALL_HEIGHT;


    /*
       Ceiling remains disabled.
    */

    // roomGroup.add(ceiling);
}


/* =====================================================
   DEFAULT FURNITURE
===================================================== */

function threeCreateDefaultFurniture() {

    /* =================================================
       SOFA
    ================================================= */

    threeCreateSofa(
        -1.1,
        0,
        -1.5
    );


    /* =================================================
       TABLE
    ================================================= */

    threeCreateTable(
        0,
        0,
        0
    );


    /* =================================================
       BED
    ================================================= */

    threeCreateBed(
        1.4,
        0,
        1.3
    );
}


/* =====================================================
   SOFA
===================================================== */

function threeCreateSofa(
    x,
    y,
    z
) {

    const group =
        new THREE.Group();


    /* =================================================
       SEAT
    ================================================= */

    const seat =
        threeCreateBox(

            2.2,

            0.45,

            0.75,

            0x777777

        );


    seat.position.y =
        0.35;


    group.add(
        seat
    );


    /* =================================================
       BACK
    ================================================= */

    const back =
        threeCreateBox(

            2.2,

            1.0,

            0.25,

            0x666666

        );


    back.position.set(

        0,

        0.85,

        -0.27

    );


    group.add(
        back
    );


    /* =================================================
       LEFT ARM
    ================================================= */

    const leftArm =
        threeCreateBox(

            0.25,

            0.7,

            0.8,

            0x666666

        );


    leftArm.position.set(

        -0.98,

        0.55,

        0

    );


    group.add(
        leftArm
    );


    /* =================================================
       RIGHT ARM
    ================================================= */

    const rightArm =
        threeCreateBox(

            0.25,

            0.7,

            0.8,

            0x666666

        );


    rightArm.position.set(

        0.98,

        0.55,

        0

    );


    group.add(
        rightArm
    );


    group.position.set(

        x,

        y,

        z

    );


    roomGroup.add(
        group
    );
}


/* =====================================================
   TABLE
===================================================== */

function threeCreateTable(
    x,
    y,
    z
) {

    const group =
        new THREE.Group();


    /* =================================================
       TABLE TOP
    ================================================= */

    const top =
        threeCreateBox(

            1.4,

            0.12,

            0.8,

            0x8b5e3c

        );


    top.position.y =
        0.75;


    group.add(
        top
    );


    /* =================================================
       LEGS
    ================================================= */

    const legPositions = [

        [-0.55, 0.35, -0.3],

        [0.55, 0.35, -0.3],

        [-0.55, 0.35, 0.3],

        [0.55, 0.35, 0.3]

    ];


    legPositions.forEach(
        function(pos) {

            const leg =
                threeCreateBox(

                    0.1,

                    0.7,

                    0.1,

                    0x5d4037

                );


            leg.position.set(

                pos[0],

                pos[1],

                pos[2]

            );


            group.add(
                leg
            );

        }
    );


    group.position.set(

        x,

        y,

        z

    );


    roomGroup.add(
        group
    );
}


/* =====================================================
   BED
===================================================== */

function threeCreateBed(
    x,
    y,
    z
) {

    const group =
        new THREE.Group();


    /* =================================================
       MATTRESS
    ================================================= */

    const mattress =
        threeCreateBox(

            1.7,

            0.35,

            2.0,

            0xe9e4dc

        );


    mattress.position.y =
        0.35;


    group.add(
        mattress
    );


    /* =================================================
       HEADBOARD
    ================================================= */

    const headboard =
        threeCreateBox(

            1.8,

            1.2,

            0.15,

            0x795548

        );


    headboard.position.set(

        0,

        0.75,

        -0.95

    );


    group.add(
        headboard
    );


    /* =================================================
       PILLOW
    ================================================= */

    const pillow =
        threeCreateBox(

            0.65,

            0.15,

            0.4,

            0xffffff

        );


    pillow.position.set(

        -0.45,

        0.62,

        -0.65

    );


    group.add(
        pillow
    );


    group.position.set(

        x,

        y,

        z

    );


    roomGroup.add(
        group
    );
}


/* =====================================================
   ARMCHAIR GLB MODEL
   Standalone function
===================================================== */

function threeCreateArmchair(
    x,
    y,
    z
) {

    if (!gltfLoader) {

        console.error(
            "GLTFLoader is not initialized."
        );

        return;
    }


    gltfLoader.load(

        "models/armchair1.glb",

        function(gltf) {

            const model =
                gltf.scene;


            model.name =
                "Armchair1";


            if (roomGroup) {

                roomGroup.add(
                    model
                );

            } else {

                scene.add(
                    model
                );

            }


            armchairModel =
                model;


            model.position.set(
                x,
                0,
                z
            );


            model.rotation.set(
                0,
                0,
                0
            );


            model.scale.set(
                1,
                1,
                1
            );


            model.traverse(
                function(child) {

                    if (child.isMesh) {

                        child.castShadow =
                            true;

                        child.receiveShadow =
                            true;

                    }

                }
            );


            /*
               Put GLB on floor automatically.
            */

            putModelOnFloor(
                model
            );


            console.log(
                "Armchair GLB loaded successfully."
            );

        },

        function(xhr) {

            if (xhr.total) {

                console.log(

                    "Armchair loading:",

                    Math.round(

                        (xhr.loaded /
                        xhr.total) * 100

                    ) + "%"

                );

            }

        },

        function(error) {

            console.error(

                "Error loading armchair1.glb:",

                error

            );

        }

    );
}


/* =====================================================
   PUT ANY MODEL EXACTLY ON FLOOR
===================================================== */

function putModelOnFloor(model) {

    if (!model) {
        return;
    }


    model.updateMatrixWorld(
        true
    );


    const box =
        new THREE.Box3()
            .setFromObject(model);


    const bottom =
        box.min.y;


    /*
       Move model so bottom = FLOOR_TOP.
    */

    model.position.y +=
        FLOOR_TOP - bottom;


    model.updateMatrixWorld(
        true
    );


    /*
       Second correction for
       rotated/scaled models.
    */

    const correctedBox =
        new THREE.Box3()
            .setFromObject(model);


    const correctedBottom =
        correctedBox.min.y;


    if (
        Math.abs(
            correctedBottom -
            FLOOR_TOP
        ) > 0.0001
    ) {

        model.position.y +=
            FLOOR_TOP -
            correctedBottom;

    }
}


/* =====================================================
   CREATE BOX HELPER
===================================================== */

function threeCreateBox(
    width,
    height,
    depth,
    color
) {

    const geometry =
        new THREE.BoxGeometry(

            width,

            height,

            depth

        );


    const material =
        new THREE.MeshStandardMaterial({

            color: color,

            roughness: 0.75,

            metalness: 0

        });


    const mesh =
        new THREE.Mesh(

            geometry,

            material

        );


    mesh.castShadow =
        true;


    mesh.receiveShadow =
        true;


    return mesh;
}


/* =====================================================
   CONVERT 2D POSITION TO 3D ROOM POSITION
===================================================== */

function convert2DTo3DPosition(
    data
) {

    let x = 0;
    let z = 0;


    /*
       If design.js already sends
       normalized 3D coordinates,
       use them directly.
    */

    if (
        data.x3D !== undefined &&
        !isNaN(parseFloat(data.x3D))
    ) {

        x =
            parseFloat(
                data.x3D
            );

    }


    if (
        data.z3D !== undefined &&
        !isNaN(parseFloat(data.z3D))
    ) {

        z =
            parseFloat(
                data.z3D
            );

    }


    /*
       Otherwise use x/z if they are
       already room coordinates.
    */

    else {

        if (
            data.x !== undefined &&
            !isNaN(parseFloat(data.x))
        ) {

            x =
                parseFloat(
                    data.x
                );

        }


        if (
            data.z !== undefined &&
            !isNaN(parseFloat(data.z))
        ) {

            z =
                parseFloat(
                    data.z
                );

        }

    }


    /*
       Keep furniture inside the room.
    */

    x =
        THREE.MathUtils.clamp(

            x,

            -ROOM_WIDTH / 2 + 0.35,

            ROOM_WIDTH / 2 - 0.35

        );


    z =
        THREE.MathUtils.clamp(

            z,

            -ROOM_DEPTH / 2 + 0.35,

            ROOM_DEPTH / 2 - 0.35

        );


    return {
        x: x,
        z: z
    };
}


/* =====================================================
   SHOW SELECTED FURNITURE 3D
   GLB VERSION
===================================================== */

function showSelectedFurniture3D(data) {

    if (!data) {

        console.warn(
            "No furniture data received."
        );

        return;
    }


    if (!scene) {

        console.warn(
            "Three.js scene is not initialized."
        );

        return;
    }


    console.log(
        "Loading selected 3D furniture:",
        data
    );


    /* =================================================
       REMOVE PREVIOUS SELECTED MODEL
    ================================================= */

    if (selected3DModel) {

        if (
            selected3DModel.parent
        ) {

            selected3DModel.parent.remove(
                selected3DModel
            );

        }


        selected3DModel.traverse(
            function(child) {

                if (child.isMesh) {

                    if (
                        child.geometry
                    ) {

                        child.geometry.dispose();

                    }


                    if (
                        child.material
                    ) {

                        if (
                            Array.isArray(
                                child.material
                            )
                        ) {

                            child.material.forEach(
                                function(material) {

                                    material.dispose();

                                }
                            );

                        } else {

                            child.material.dispose();

                        }

                    }

                }

            }
        );


        selected3DModel =
            null;
    }


    /* =================================================
       LOADER
    ================================================= */

    const loader =
        new THREE.GLTFLoader();


    const modelPath =
        data.model ||
        "models/armchair1.glb";


    loader.load(

        modelPath,

        function(gltf) {

            const model =
                gltf.scene;


            model.name =
                data.name ||
                "SelectedFurniture3D";


            /* =================================================
               ADD TO ROOM GROUP
            ================================================= */

            if (roomGroup) {

                roomGroup.add(
                    model
                );

            } else {

                scene.add(
                    model
                );

            }


            selected3DModel =
                model;


            /* =================================================
               RESET TRANSFORM
            ================================================= */

            model.position.set(
                0,
                0,
                0
            );


            model.rotation.set(
                0,
                0,
                0
            );


            model.scale.set(
                1,
                1,
                1
            );


            /* =================================================
               SHADOWS
            ================================================= */

            model.traverse(
                function(child) {

                    if (child.isMesh) {

                        child.castShadow =
                            true;

                        child.receiveShadow =
                            true;

                        /*
                           Make sure GLB uses
                           normal depth testing.
                        */

                        if (
                            child.material
                        ) {

                            if (
                                Array.isArray(
                                    child.material
                                )
                            ) {

                                child.material.forEach(
                                    function(material) {

                                        material.depthTest =
                                            true;

                                        material.depthWrite =
                                            true;

                                    }
                                );

                            } else {

                                child.material.depthTest =
                                    true;

                                child.material.depthWrite =
                                    true;

                            }

                        }

                    }

                }
            );


            /* =================================================
               ORIGINAL BOUNDING BOX
            ================================================= */

            model.updateMatrixWorld(
                true
            );


            const originalBox =
                new THREE.Box3()
                    .setFromObject(
                        model
                    );


            const originalSize =
                new THREE.Vector3();


            originalBox.getSize(
                originalSize
            );


            console.log(
                "Original GLB size:",
                originalSize
            );


            /* =================================================
               NORMALIZE
            ================================================= */

            const maxDimension =
                Math.max(

                    originalSize.x,

                    originalSize.y,

                    originalSize.z

                );


            if (
                maxDimension > 0
            ) {

                const normalizeScale =
                    1 /
                    maxDimension;


                model.scale.set(

                    normalizeScale,

                    normalizeScale,

                    normalizeScale

                );

            }


            model.updateMatrixWorld(
                true
            );


            /* =================================================
               NORMALIZED SIZE
            ================================================= */

            const normalizedBox =
                new THREE.Box3()
                    .setFromObject(
                        model
                    );


            const normalizedSize =
                new THREE.Vector3();


            normalizedBox.getSize(
                normalizedSize
            );


            console.log(
                "Normalized GLB size:",
                normalizedSize
            );


            /* =================================================
               TARGET WIDTH
            ================================================= */

            let targetWidth =
                1.2;


            if (

                data.width !== undefined &&

                data.width !== null &&

                !isNaN(
                    parseFloat(
                        data.width
                    )
                )

            ) {

                targetWidth =
                    parseFloat(
                        data.width
                    ) / 100;

            }


            /*
               Safe furniture size.
            */

            targetWidth =
                THREE.MathUtils.clamp(

                    targetWidth,

                    0.5,

                    2.0

                );


            /* =================================================
               APPLY WIDTH
            ================================================= */

            if (
                normalizedSize.x > 0
            ) {

                const widthScale =
                    targetWidth /
                    normalizedSize.x;


                model.scale.multiplyScalar(
                    widthScale
                );

            }


            /* =================================================
               ROTATION
            ================================================= */

            let rotation =
                parseFloat(
                    data.rotation || 0
                );


            if (
                isNaN(rotation)
            ) {

                rotation = 0;

            }


            model.rotation.y =
                THREE.MathUtils.degToRad(
                    -rotation
                );


            /* =================================================
               POSITION
            ================================================= */

            const position =
                convert2DTo3DPosition(
                    data
                );


            model.position.x =
                position.x;


            model.position.z =
                position.z;


            /*
               Start at zero Y before
               floor calculation.
            */

            model.position.y =
                0;


            /* =================================================
               CRITICAL FLOOR FIX

               Rotation + scale are already applied.
               Now calculate the REAL bottom.
            ================================================= */

            putModelOnFloor(
                model
            );


            /* =================================================
               FINAL DEBUG BOX
            ================================================= */

            model.updateMatrixWorld(
                true
            );


            const finalBox =
                new THREE.Box3()
                    .setFromObject(
                        model
                    );


            const finalSize =
                new THREE.Vector3();


            finalBox.getSize(
                finalSize
            );


            console.log(
                "FINAL GLB SIZE:",
                finalSize
            );


            console.log(
                "FINAL GLB BOTTOM:",
                finalBox.min.y
            );


            console.log(
                "FINAL GLB POSITION:",
                model.position
            );


            console.log(
                "FINAL GLB ROTATION:",
                model.rotation.y
            );


            /* =================================================
               RENDER
            ================================================= */

            if (
                renderer &&
                camera
            ) {

                renderer.render(
                    scene,
                    camera
                );

            }


            console.log(
                "Armchair 3D added successfully."
            );

        },


        /* =================================================
           LOADING
        ================================================= */

        function(xhr) {

            if (
                xhr.total
            ) {

                const percent =
                    Math.round(

                        (
                            xhr.loaded /
                            xhr.total

                        ) * 100

                    );


                console.log(

                    "Furniture loading:",

                    percent + "%"

                );

            }

        },


        /* =================================================
           ERROR
        ================================================= */

        function(error) {

            console.error(

                "GLB loading error:",

                error

            );

        }

    );
}


/* =====================================================
   SHOW PNG FURNITURE IN 3D
   Optional PNG method
===================================================== */

function showSelectedFurniturePNG(data) {

    if (!data) {

        console.warn(
            "No PNG furniture data."
        );

        return;
    }


    if (!scene) {

        console.warn(
            "Three.js scene is not initialized."
        );

        return;
    }


    /* =================================================
       REMOVE PREVIOUS SELECTED MODEL
    ================================================= */

    if (selected3DModel) {

        if (
            selected3DModel.parent
        ) {

            selected3DModel.parent.remove(
                selected3DModel
            );

        }


        if (
            selected3DModel.geometry
        ) {

            selected3DModel.geometry.dispose();

        }


        if (
            selected3DModel.material
        ) {

            selected3DModel.material.dispose();

        }


        selected3DModel =
            null;
    }


    /* =================================================
       PNG PATH
    ================================================= */

    const imagePath =

        data.image ||

        data.src ||

        data.url ||

        "images/armchair1.png";


    const textureLoader =
        new THREE.TextureLoader();


    textureLoader.load(

        imagePath,

        function(texture) {

            const image =
                texture.image;


            const imageWidth =
                image.width;


            const imageHeight =
                image.height;


            let aspectRatio =
                imageWidth /
                imageHeight;


            if (
                !isFinite(
                    aspectRatio
                ) ||
                aspectRatio <= 0
            ) {

                aspectRatio =
                    1;

            }


            /* =================================================
               WIDTH
            ================================================= */

            let targetWidth =
                1.2;


            if (

                data.width !== undefined &&

                data.width !== null &&

                !isNaN(
                    parseFloat(
                        data.width
                    )
                )

            ) {

                targetWidth =
                    parseFloat(
                        data.width
                    ) / 100;

            }


            targetWidth =
                THREE.MathUtils.clamp(

                    targetWidth,

                    0.5,

                    2.0

                );


            const targetHeight =
                targetWidth /
                aspectRatio;


            /* =================================================
               PLANE
            ================================================= */

            const geometry =
                new THREE.PlaneGeometry(

                    targetWidth,

                    targetHeight

                );


            const material =
                new THREE.MeshBasicMaterial({

                    map: texture,

                    transparent: true,

                    side: THREE.DoubleSide,

                    depthTest: true,

                    depthWrite: true,

                    alphaTest: 0.05

                });


            const imageMesh =
                new THREE.Mesh(

                    geometry,

                    material

                );


            imageMesh.name =
                data.name ||
                "SelectedFurniturePNG";


            selected3DModel =
                imageMesh;


            /* =================================================
               ADD TO ROOM
            ================================================= */

            if (roomGroup) {

                roomGroup.add(
                    imageMesh
                );

            } else {

                scene.add(
                    imageMesh
                );

            }


            /* =================================================
               ROTATION
            ================================================= */

            let rotation =
                parseFloat(
                    data.rotation || 0
                );


            if (
                isNaN(rotation)
            ) {

                rotation = 0;

            }


            imageMesh.rotation.y =
                THREE.MathUtils.degToRad(
                    -rotation
                );


            /* =================================================
               POSITION
            ================================================= */

            const position =
                convert2DTo3DPosition(
                    data
                );


            imageMesh.position.x =
                position.x;


            imageMesh.position.z =
                position.z;


            /*
               Plane is vertical.
               Put its bottom on floor.
            */

            imageMesh.position.y =
                targetHeight / 2;


            /* =================================================
               RENDER
            ================================================= */

            if (
                renderer &&
                camera
            ) {

                renderer.render(
                    scene,
                    camera
                );

            }


            console.log(
                "Furniture PNG added successfully."
            );

        },


        undefined,


        function(error) {

            console.error(

                "PNG loading error:",

                error

            );

        }

    );
}


/* =====================================================
   RESET CAMERA
===================================================== */

function resetCamera() {

    if (
        !camera ||
        !controls
    ) {

        return;
    }


    camera.position.set(
        7,
        5.5,
        7
    );


    controls.target.set(
        0,
        1,
        0
    );


    controls.update();
}


/* =====================================================
   RESIZE
===================================================== */

function resizeThreeView() {

    if (
        !renderer ||
        !camera
    ) {

        return;
    }


    const container =
        document.getElementById(
            "threeView"
        );


    if (!container) {

        return;
    }


    const width =
        container.clientWidth;


    const height =
        container.clientHeight;


    if (
        width === 0 ||
        height === 0
    ) {

        return;
    }


    camera.aspect =
        width /
        height;


    camera.updateProjectionMatrix();


    renderer.setSize(

        width,

        height

    );
}


/* =====================================================
   FULLSCREEN
===================================================== */

function fullscreenThreeView() {

    const container =
        document.getElementById(
            "threeView"
        );


    if (
        !document.fullscreenElement
    ) {

        if (

            container &&

            container.requestFullscreen

        ) {

            container.requestFullscreen();

        }

    } else {

        if (
            document.exitFullscreen
        ) {

            document.exitFullscreen();

        }

    }
}


/* =====================================================
   ANIMATION LOOP
===================================================== */

function animateThree() {

    requestAnimationFrame(
        animateThree
    );


    if (controls) {

        controls.update();

    }


    if (

        renderer &&

        scene &&

        camera

    ) {

        renderer.render(

            scene,

            camera

        );

    }
}


/* =====================================================
   START 3D VIEW
===================================================== */

function startThreeView() {

    setTimeout(

        function() {

            initThreeView();

            resizeThreeView();

        },

        100

    );
}


/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener(

    "resize",

    resizeThreeView

);