export class FPS {
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
