// static/src/app.ts
document.addEventListener('DOMContentLoaded', () => {
        // Get the canvas element
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
                console.error('Canvas element not found!');
                return;
        }

        // Get the 2D rendering context
        const ctx = canvas.getContext('2d');
        if (!ctx) {
                console.error('Failed to get 2D context');
                return;
        }

        // adding a random comment

        // Canvas dimensions for the centered rectangle
        let canvas_x = 128;
        let canvas_y = 64;

        /**
         * Function to draw grid on the canvas
         */
        function drawGrid() {
                // Get the dimensions of the canvas
                const width = canvas.width;
                const height = canvas.height;

                // Here you can set grid spacing or number of lines
                const gridSize = 50; // Example: 50px between each line

                if (!ctx) {
                        return;
                }

                // Drawing grid lines
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // Semi-transparent for thin lines
                ctx.lineWidth = 0.7; // Very thin line

                // Vertical lines
                for (let x = 0; x <= width; x += gridSize) {
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, height);
                }

                // Horizontal lines
                for (let y = 0; y <= height; y += gridSize) {
                        ctx.moveTo(0, y);
                        ctx.lineTo(width, y);
                }
                ctx.stroke();
        }

        /**
         * Function to draw the main rectangle and grid
         */
        function draw() {
                // Clear the canvas
                if (!ctx) {
                        return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate the position for the centered rectangle
                const centerX = (canvas.width - canvas_x * 2) / 2;
                const centerY = (canvas.height - canvas_y * 2) / 2;

                // Draw the rectangle representing the "main" canvas
                ctx.fillStyle = "rgba(200, 200, 200, 0.5)"; // semi-transparent for visibility
                ctx.fillRect(centerX, centerY, canvas_x * 2, canvas_y * 2);

                // Add an outline for visibility
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.strokeRect(centerX, centerY, canvas_x * 2, canvas_y * 2);

                // After drawing the rectangle, draw the grid over it
                drawGrid();
        }

        /**
         * Set the canvas size to match its CSS size
         */
        function resizeCanvas() {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                draw(); // This will redraw everything, including the grid
        }

        // Initial resize and setup
        resizeCanvas();

        // Add event listeners for resizing
        window.addEventListener('resize', resizeCanvas, false);
});
