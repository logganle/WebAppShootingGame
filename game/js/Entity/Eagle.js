import Entity from "./Entity.js";
import {tileSize} from "../constants/tileConstants.js";
import ObjectHandlers from "../tiles/ObjectHandlers.js";

const allTiles = ObjectHandlers.getInstance().tiles;
const objHandlers = ObjectHandlers.getInstance();
export default class Eagle extends Entity{
    constructor(name, row, col, width, height, solid){
        super(name, row, col, width, height, solid);
        this.frame = 0;
        this.frameDelay = 0;
        this.isFreeze = false;
        this.animate = true;
        this.flyingUp = true;
        this.flyingDown = false;
        this.isMovingLeft = true;
        // this.followSkill
    }
    update(){
        this.col += this.velC;
        this.row += this.velR;
        if(this.hp <= 0){
            this.die();
        }
        if(this.flyingUp){
            this.flyUp();
        }
        else if(this.flyingDown){
            this.flyDown();
        }
        if (this.isMovingLeft && !this.isFreeze){
            this.moveLeft();
        } else if (this.isMovingRight && !this.isFreeze) {
            this.moveRight();
        } else if (freeze || (!isMovingLeft && !isMovingRight)) {
            this.velC = 0;
        }
    
        this.watchingAround();
        this.searchingEntities();
        allTiles.forEach(t => this.tileCollidingChecking(t));
        this.updateFrame();
    }
    die(){
        objHandlers.removeEntity(this);
    }
    updateFrame(){
        if (this.animate) {
            this.frameDelay++;
            if (this.frameDelay == 4) {
                this.frame = (this.frame + 1) % 4;
            }
            this.frameDelay %= 4;
        }
    }
    moveLeft(){
        this.facing = 0;
        this.velC = -3;
    }
    moveRight(){
        this.facing = 1;
        this.velC = 3;
    }

    watchingAround(){

    }
    searchingEntities(){

    }
    flyUp(){
        if(this.isFreeze) return;
        this.flyingDown = false;
        this.flyingUp = true;
        this.velR = -5;
    }
    flyDown(){
        if(this.isFreeze) return;
        this.flyingDown = true;
        this.flyingUp = false;
        this.velR = 5;
        
    }
    tileCollidingChecking(t){
        if (this.intersectsTopTile(t)) {
            this.row = t.row - this.height;
            this.flyUp();
        }

        if (this.intersectsBottomTile(t)) {
            this.row = t.row + this.height;
            this.flyDown();
        }
        if (this.intersectsRightTile(t)) {
            this.col = t.col + t.width;
            this.isMovingLeft = false;
            this.isMovingRight = true; 
        }
        if (this.intersectsLeftTile(t)) {
            this.col = t.col - t.width;
            this.velC = 0;
            this.isMovingRight = false;
            this.isMovingLeft = true;
        }
    }

    render(ctx, eagleSprite, tileSize){
        if (this.facing == 0) {
            ctx.drawImage(eagleSprite[this.frame + 4], this.col, this.row, this.width, this.height);
        } else if (this.facing == 1) {
            ctx.drawImage(eagleSprite[this.frame], this.col, this.row, this.width, this.height);
        }
    }
}