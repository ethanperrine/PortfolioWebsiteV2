export class MatrixCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas element with ID '${canvasId}' not found.`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.columns = 0;
        this.rows = 0;
        this.columnPositions = [];
        this.config = {
            font: '25px monospace',
            fillStyle: '#0F0',
            characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
            columnWidth: 20,
            frameDelay: 60,
        };
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const dynamicFontSize = Math.max(5, this.canvas.width / 90);
        const fontParts = this.ctx.font.split(' ');
        if (fontParts.length === 2) {
            this.ctx.font = `${dynamicFontSize}px ${fontParts[1]}`;
        } else {
            console.error("Unexpected font format. Couldn't adjust font size dynamically.");
        }
        this.columns = Math.floor(this.canvas.width / this.config.columnWidth);
        this.rows = Math.floor(this.canvas.height / this.calculateCharacterSpacing());
        this.columnPositions = this.initColumnPositions();
    }

    initColumnPositions() {
        return Array.from({ length: this.columns }, () => Math.floor(Math.random() * this.rows) * this.config.columnWidth);
    }

    calculateCharacterSpacing() {
        const textMetrics = this.ctx.measureText('M');
        let height;
        if (textMetrics.actualBoundingBoxAscent && textMetrics.actualBoundingBoxDescent) {
            height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        } else {
            const fontSize = parseFloat(window.getComputedStyle(this.ctx.canvas).fontSize);
            height = fontSize * 1.2;
        }
        const spacingMultiplier = 1.75;
        return height * spacingMultiplier;
    }
}
// document.addEventListener('DOMContentLoaded', () => {
//     const matrixCanvas = new MatrixCanvas('canvasId');
// });