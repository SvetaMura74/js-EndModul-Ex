export class Color {
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    get rgb() {
        const rgbColor = `rgb(${this.r},${this.g},${this.b})`;
        return rgbColor;
    }
    get hex() {
        const redHex = this.r.toString(16).padStart(2, "0");
        const greenHex = this.g.toString(16).padStart(2, "0");
        const blueHex = this.b.toString(16).padStart(2, "0");
        const hexColor = `#${redHex}${greenHex}${blueHex}`.toUpperCase();
        return hexColor;
    }
}
