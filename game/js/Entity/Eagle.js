import Entity from "./Entity.js";
import {tileSize} from "../constants/tileConstants.js";
import ObjectHandlers from "../tiles/ObjectHandlers.js";

const allTiles = ObjectHandlers.getInstance().tiles;
export default class Eagle extends Entity{
    constructor(name, row, col, width, height, solid){
        super(name, row, col, width, height, solid);
        this.frame = 0;
        // this.followSkill
    }
    update(){
        super.update();
        watchingAround();
        searchingEntities();
        tileCollidingChecking();
    }
    watchingAround(){

    }
    searchingEntities(){

    }
    tileCollidingChecking(){

    }

    render(ctx, eagleSprite, tileSize){
        if (this.facing == 0) {
            ctx.drawImage(eagleSprite[this.frame + 4], this.col, this.row, this.width, this.height);
        } else if (this.facing == 1) {
            ctx.drawImage(eagleSprite[this.frame], this.col, this.row, this.width, this.height);
        }
    }
}