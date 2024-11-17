const canvas = document.getElementById('canvas');
if (!canvas) {
        console.error('Canvas element not found!');
}

// Get the 2D rendering context
const ctx = canvas.getContext('2d');
var canvas_x = 128;
var canvas_y = 64;

// Function to draw grid
function drawGrid() {
        // Get the dimensions of the canvas
        const width = canvas.width;
        const height = canvas.height;

        // Here you can set grid spacing or number of lines
        const gridSize = 50; // Example: 50px between each line

        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // Semi-transparent for thin lines
                ctx.lineWidth = 0.7; // Very thin line
                ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                ctx.lineWidth = 0.7;
                ctx.stroke();
        }
}

function draw() {
        // Clear the canvas or part of it (optional)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the position for the centered rectangle
        const centerX = (canvas.width - canvas_x * 2) / 2;
        const centerY = (canvas.height - canvas_y * 2) / 2;

        // Draw the rectangle representing the "main" canvas
        ctx.fillStyle = "rgba(200, 200, 200, 0.5)"; // semi-transparent for visibility
        ctx.fillRect(centerX, centerY, canvas_x * 2, canvas_y * 2);

        // If you want an outline for visibility
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX, centerY, canvas_x * 2, canvas_y * 2);
}

// Set the canvas size to match its CSS size
function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        draw();
        drawGrid();
}

// Resize the canvas when the window loads and on resize
window.addEventListener('load', resizeCanvas, false);
window.addEventListener('resize', resizeCanvas, false);
