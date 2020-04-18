import ObjectHandlers from '../tiles/ObjectHandlers.js'
import Rectangle2D from '../utils/Rectangle2D.js'

export default class FireBall{
    constructor(name, row, col, width, height){
        this.name = name;
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.velR = 0;
        this.velC = 0;
    }
    render(ctx, image, tileSize){
        ctx.drawImage(image, this.col , this.row, this.width, this.height);
    }
    update(){
        this.col += this.velC;
        this.row += this.velR;
        ObjectHandlers.getInstance().tiles.forEach(t => this.tileColldingCheck(t));
        ObjectHandlers.getInstance().entities.forEach(e => this.entityCollding(e));
    }
    tileColldingCheck(t){
        if(this.intersectsTile(t)) this.die();
    }
    entityCollding(e){
        if(e.name != 'player' && this.intersectsEntity(e) && e.isAlive()){
            this.die();
            e.hp -= 1000;
            document.gameScore += 1;
        }
    }
    die(){
        ObjectHandlers.getInstance().removeBall(this);
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
    intersectsEntity(e){
        return e.getBoundary().intersects(this.getBoundary());
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