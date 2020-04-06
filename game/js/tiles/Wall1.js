import tile from "./tile.js";

export default class Wall1 extends tile {
    constructor(name, row, col, width, height) {
        super(name, row, col, width, height);
        this.hurtable = name == "fireWall" ? true : false;
    }
}