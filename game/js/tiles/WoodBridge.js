import tile from "./tile.js";
import TileHandler from "./TileHandler.js"
const allTiles = TileHandler.getInstance().tiles;
export default class WoodBridge extends tile {
    constructor(name, row, col, width, height) {
        super(name, row, col, width, height);
        this.velR = 0;
        this.velC = 0;
        this.isMovingLeft = false;
        this.isMovingRight = true;
    }

    render(ctx, image, tileSize){
        ctx.drawImage(image, this.col , this.row, this.width, this.height);
    }
    update(){
        this.col += this.velC;
        this.row += this.velR;
        if(this.isMovingLeft){
            this.velC = -2;
        }
        else if(this.isMovingRight){
            this.velC = 2;
        }
        this.tileColldingCheck();
    }
    
    tileColldingCheck(){
        for(let i = 0; i < allTiles.length; i++){
            const t = allTiles[i];
            if(t.solid && t !== this){
                if(this.intersectsRightTile(t)){
                    this.isMovingRight = true;
                    this.isMovingLeft = false;
                }
                if(this.intersectsLeftTile(t)){
                    this.isMovingLeft = true;
                    this.isMovingRight = false;
                }
            }
        }
    }
}