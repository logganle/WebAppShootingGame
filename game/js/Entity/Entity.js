import Rectangle2D from "../utils/Rectangle2D.js"
import { tileSize } from "../constants/tileConstants.js";
export default class Entity {
    constructor(name, row, col, width, height, solid) {
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.name = name;
        this.solid = solid;
        this.gravity = 4;
        this.facing = 1; // right
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.velR = 0;
        this.velC = 0;
        this.hp = 1000;
    }

    //implement tick method later
    render(ctx, spriteSheet, tileSize) {
        // ctx.drawImage(spriteSheet[0], this.col * tileSize, this.row * tileSize, this.width, this.height);
        ctx.drawImage(spriteSheet[0], this.col, this.row, this.width, this.height);
    }

    setLocation(row, col) {
        this.row = row;
        this.col = col;
    }
    update(){
        this.col += this.velC;
        this.row += this.velR;
        if(this.isMovingLeft){
            this.velC = -8;
            this.facing = 0;
        }
        else if(this.isMovingRight){
            this.velC = 8;
            this.facing = 1;
        }
        else {
            this.velC = 0;
        }
    }

    getBoundary(){
        return new Rectangle2D(this.col , this.row, this.width, this.height);
    }
    getTopBoundary(){
        return new Rectangle2D(this.col,this.row,this.width,5);
    }
    getBottomBoundary(){
        return new Rectangle2D(this.col + 10,this.row+ this.height - 5,this.width-20,5);
    }
    getLeftBoundary(){
        return new Rectangle2D(this.col, this.row+ 10,5,this.height-20);
    }
    getRightBoundary(){
        return new Rectangle2D(this.col + this.width - 5, this.row + 10,5, this.height - 20);
    }
    //is intersected ?
    intersectsTile(ti){
        return ti.getBoundary().intersects(this.getBoundary());
    }
    intersectsTopTile(ti){
        return ti.getTopBoundary().intersects(this.getBoundary());
    }
    intersectsLeftTile(ti){
        return ti.getLeftBoundary().intersects(this.getBoundary());
    }
    intersectsRightTile(ti){
        return ti.getRightBoundary().intersects(this.getBoundary());
    }
    intersectsBottomTile(ti){
        return ti.getBottomBoundary().intersects(this.getBoundary());
    }
}
