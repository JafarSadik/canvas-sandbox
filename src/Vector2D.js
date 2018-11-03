export class Vector2D {
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