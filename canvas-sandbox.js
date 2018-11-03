class FPS {
    constructor() {
        this.frameCounter = 0;
        this.fps = 0;
        this.second = 0;
    }

    inc() {
        let second = Math.floor(Date.now() / 1000);
        if (second > this.second) {
            this.fps = this.frameCounter;
            this.second = second;
            this.frameCounter = 0;
        }
        this.frameCounter++;
    }

    get() {
        return this.fps;
    }
}

class Colour {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static rgba(r, g, b, a) {
        return new Colour(r, g, b, a);
    }

    static rgb(r, g, b) {
        return Colour.rgba(r, g, b, 255);
    }

    // Converts HSL color value to RGB. Assumes h, s, and l are contained in the set [0, 1].
    static hsl(h, s, l) {
        let r, g, b;

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        if (s === 0) {
            r = g = b = l;
        } else {
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return Colour.rgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    }

    get rgb() {
        return [this.r, this.g, this.b];
    }

    get rgba() {
        return [this.r, this.g, this.b, this.a];
    }

    //Converts an RGB color value to HSL.
    get hsl() {
        let r = this.r / 255, g = this.g / 255, b = this.b / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, l];
    }
}

class Vector2D {
    constructor(x, y) {
        this.components = {x, y}
    }

    static vec2d(x = 0, y = 0) {
        return new Vector2D(x, y);
    }

    get x() {
        return this.components.x;
    }

    set x(x) {
        this.components.x = x;
    }

    get y() {
        return this.components.y;
    }

    set y(y) {
        this.components.y = y;
    }

    mult(vec) {
        return Vector2D.vec2d(this.x * vec.x, this.y * vec.y);
    }

    add(vec) {
        return Vector2D.vec2d(this.x + vec.x, this.y + vec.y);
    }

    scale(value) {
        return Vector2D.vec2d(this.x * value, this.y * value);
    }

    sub(vec) {
        return this.add(vec.negate());
    }

    negate() {
        return Vector2D.vec2d(-this.x, -this.y);
    }

    distance(point) {
        let dx = (this.x - point.x);
        let dy = (this.y - point.y);
        return Math.sqrt(dx * dx + dy * dy);
    }

    length() {
        return this.distance(Vector2D.vec2d(0, 0));
    }

    normal() {
        let length = this.length();
        return Vector2D.vec2d(this.x / length, this.y / length);
    }

    toString() {
        return `vec2d(${this.x}, ${this.y})`;
    }
}