import { MatrixCanvas } from './MatrixCanvas.js';

export class MatrixAnimation {
    constructor(canvasId) {
        this.matrixCanvas = new MatrixCanvas(canvasId);
        if (!this.matrixCanvas || !this.matrixCanvas.config) {
            console.error('MatrixCanvas initialization failed.');
            return;
        }
        this.matrixAnimationId = null;
        this.matrixAnimationActive = false;
        this.lastFrameTime = 0;
    }

    start() {
        this.matrixAnimationActive = true;
        this.matrixAnimationId = requestAnimationFrame(this.animate.bind(this));
    }

    stop() {
        if (this.matrixAnimationId) {
            cancelAnimationFrame(this.matrixAnimationId);
            this.matrixCanvas.ctx.clearRect(0, 0, this.matrixCanvas.canvas.width, this.matrixCanvas.canvas.height);
            this.matrixAnimationId = null;
            this.matrixAnimationActive = false;
        }
    }

    animate(currentTime) {
        if (!this.matrixAnimationActive) return;
        if (currentTime - this.lastFrameTime < this.matrixCanvas.config.frameDelay) {
            this.matrixAnimationId = requestAnimationFrame(this.animate.bind(this));
            return;
        }
        this.lastFrameTime = currentTime;
        this.draw();
        this.matrixAnimationId = requestAnimationFrame(this.animate.bind(this));
    }

    draw() {
        const ctx = this.matrixCanvas.ctx;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, this.matrixCanvas.canvas.width, this.matrixCanvas.canvas.height);
        ctx.fillStyle = this.matrixCanvas.config.fillStyle;
        for (let i = 0; i < this.matrixCanvas.columns; i++) {
            const character = this.matrixCanvas.config.characters.charAt(Math.floor(Math.random() * this.matrixCanvas.config.characters.length));
            ctx.fillText(character, i * this.matrixCanvas.config.columnWidth, this.matrixCanvas.columnPositions[i]);
            this.matrixCanvas.columnPositions[i] += this.matrixCanvas.calculateCharacterSpacing();
            if (this.matrixCanvas.columnPositions[i] > this.matrixCanvas.canvas.height && Math.random() > 0.975) {
                this.matrixCanvas.columnPositions[i] = 0;
            }
        }
    }
}

const matrixAnimation = new MatrixAnimation('matrixCanvas');
matrixAnimation.start();
// To stop the animation, matrixAnimation.stop();
