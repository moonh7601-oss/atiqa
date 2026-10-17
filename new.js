// Elements ko select karein
const newBtn = document.getElementById("newplanbtn");
const modal = document.getElementById("roomModal");
const closeBtn = document.querySelector(".close-modal");

// 1. NEW button par click karne se modal dikhao
newBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    modal.style.display = "block";
});

// 2. Close (X) button par click karne se modal chhupao
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// 3. Agar user modal ke baahar (overlay par) click kare toh band ho jaye
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// 4. Form submit hone par room size update karein (Aapka purana logic)
    // Yahan room box resize karne ka code aayega...
    document.getElementById('RoomForm').addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Values get karein
        const ftW = parseFloat(document.getElementById('widthfeet').value) || 0;
        const inW = parseFloat(document.getElementById('widthinches').value) || 0;
        const ftL = parseFloat(document.getElementById('lengthfeet').value) || 0;
        const inL = parseFloat(document.getElementById('lengthinches').value) || 0;
    
        // Total inches ko pixels mein badlein (Scale: 1 inch = 2.5px approx)
        // 1 foot = 12 inches. Agar hum 1 foot ko 30px dikhana chahte hain:
        const scale = 2.5; 
        
        const widthPx = ((ftW * 12) + inW) * scale;
        const heightPx = ((ftL * 12) + inL) * scale;
    
        const roomBox = document.getElementById('canvas');
        const gridCanvas = document.querySelector('.canvasContainer');
        
        // Size apply karein
        roomBox.style.width = widthPx + "px";
        roomBox.style.height = heightPx + "px";

        // 2. Grid ko extend karein (Box size + 500px extra cushion)
    // Taake box ke charon taraf grid nazar aata rahe
    gridCanvas.style.width = (widthPx + 1000) + "px";
    gridCanvas.style.height = (heightPx + 1000) + "px";
    
        // Modal close kar dein
        document.getElementById('roomModal').style.display = "none";
    });
    const canvasBox = document.getElementById('canvas');

let isDragging = false;
let startX, startY, initialLeft, initialTop;

// 1. Jab mouse box par click kare (Hold kare)
canvasBox.addEventListener('mousedown', function(e) {
    isDragging = true;
    
    // Mouse ki initial position record karein
    startX = e.clientX;
    startY = e.clientY;
    
    // Box ki current position (left/top) get karein
    initialLeft = canvasBox.offsetLeft;
    initialTop = canvasBox.offsetTop;
    
    // Cursor ko grabbing wala look dein
    canvasBox.style.cursor = 'grabbing';
});

// 2. Jab mouse move ho (Poore document par track karein)
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return; // Agar click nahi kiya hua toh kuch na karein

    // Calculate karein ke mouse kitna move hua
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Nayi position set karein
    canvasBox.style.left = (initialLeft + dx) + 'px';
    canvasBox.style.top = (initialTop + dy) + 'px';
    
    // Center alignment transform ko remove karna zaroori hai moving ke waqt
    canvasBox.style.transform = 'none'; 
});

// 3. Jab mouse button chor dein
document.addEventListener('mouseup', function() {
    isDragging = false;
    canvasBox.style.cursor = 'move';
});
// canvas allow drag and drop
const canvas=document.getElementById("canvas");
canvas.addEventListener('dragover',(e)=>{
    e.preventDefault();  // Drop allow krna ka liya
} );
canvas.addEventListener('drag',(e)=>{
    e.preventDefault();
    const type= e.dataTransfer.getData('text/plain');
    const rect= canvas.getBoundingClientRect();
    const x= e.clientX-rect.left;
    const y= e.clientY-rect.top;
    createFurniture(type,x,y);
})
// sidebar 
// Sidebar toggle
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.getElementById("sidebar");

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});


// Items Data
const furnitureData = {
  chair: [
      { name: "Chair1", img:"sideimages/chair1.png"}
  ]
};
// Show Items
function showItems(category) {
    const itemsList = document.getElementById("itemList");
    itemsList.innerHTML = "";
  
    furnitureData[category].forEach(item => {
      const div = document.createElement("div");
      div.classList.add("item");
  
      div.innerHTML = `
        <img src="${item.img}" draggable="true">
        <p>${item.name}</p>
      `;
  
      itemsList.appendChild(div);
    });
  }
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
//   function showItems(category) {
//     const itemList = document.getElementById("itemList"); // ✔ correct
//     itemList.innerHTML = "";
  
//     const furnitureData = {
//       chair: [
//         { name: "Chair 1", img: "images/chair1.png" },
//         { name: "Chair 2", img: "images/chair2.png" }
//       ]
//     };
  
//     furnitureData[category]?.forEach(item => {
//       const div = document.createElement("div");
//       div.innerHTML = `
//         <img src="${item.img}" width="60">
//         <p>${item.name}</p>
//       `;
//       itemList.appendChild(div);
//     });
//   }
