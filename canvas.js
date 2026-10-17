// type="importmap">
//     {
//         "imports": {
//             "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
//             "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
//         }
//     }
//     import * as Three from 'three';
//     import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//     import { DragControls } from 'three/addons/controls/DragControls.js';

//     let scene, camera,renderer , orbit , dragControls,floor;
//     const container=document.getElementById('Canvas-container');

//     scene= new Three.Scene();
//     scene.background=new Three.color(0xeeeeee);

//     camera=new Three.PerspectiveCamera(50,container.clientWidth/container.clientHeight, 0.1,500);
//     camera.position.set(0,10,0);

//     renderer=new Three.WebGLRenderer({antialias:true});
//     renderer.setSize(container.clientWidth,container.clientHeight);
//     container.appendChild(renderer.domElement);

//     scene.add(new Three.AmbientLight(0xffffff,1));
const canvas = document.getElementById('floorPlan');
const ctx = canvas.getContext('2d');

// Set canvas size to mimic the aspect ratio in ChatGPT Image May 14, 2026, 12_48_53 AM (2)_2.png
canvas.width = 600;
canvas.height = 300;

function drawRoom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Floor (Light wood color)
    ctx.fillStyle = '#fdf5e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw basic grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let j=0; j<canvas.height; j+=20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }

    // Draw a sample desk from the image
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(100, 50, 120, 60); // Desk
    ctx.fillStyle = '#333';
    ctx.fillRect(130, 115, 60, 10); // Chair mock
}

function addItem(type) {
    alert("Adding " + type + " to the floor plan...");
    // Logic to add interactive items would go here
}

// Initial draw
drawRoom();
