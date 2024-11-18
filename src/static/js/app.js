// src/ts/app.ts
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get 2D context");
    return;
  }
  let canvas_x = 128;
  let canvas_y = 64;
  function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    const gridSize = 50;
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 0.7;
    for (let x = 0;x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0;y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
  function draw() {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = (canvas.width - canvas_x * 2) / 2;
    const centerY = (canvas.height - canvas_y * 2) / 2;
    ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
    ctx.fillRect(centerX, centerY, canvas_x * 2, canvas_y * 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX, centerY, canvas_x * 2, canvas_y * 2);
    drawGrid();
  }
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    draw();
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, false);
});
