import Rectangle2D from "../utils/Rectangle2D.js"
import { tileSize } from "../constants/tileConstants.js";
export default class Tile {
    constructor(name, row, col, width, height) {
        this.name = name;
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height
        this.solid = true;
        this.frame = 0;
    }

    render(ctx, image, tileSize) {
        ctx.drawImage(image, this.col , this.row, this.width, this.height);
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.col + this.width - 5, this.row + 10, 5, this.height - 20);
    }
    renderGif(ctx, frames, tileSize){
        this.frame = (this.frame + 1) % frames.length;
        this.render(ctx, frames[this.frame].image, tileSize);
    }

    //getBoundary
    getBoundary(){
        return new Rectangle2D(this.col, this.row, this.width, this.height);
    }
    getTopBoundary(){
        return new Rectangle2D(this.col + 10,this.row,this.width - 20 ,5);
    }
    getBottomBoundary(){
        return new Rectangle2D(this.col + 10,this.row + this.height - 5,this.width-20, 5);
    }
    getLeftBoundary(){
        return new Rectangle2D(this.col, this.row + 10, 5, this.height-20);
    }
    getRightBoundary(){
        return new Rectangle2D(this.col + this.width - 5, this.row + 10, 5, this.height - 20);
    }

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