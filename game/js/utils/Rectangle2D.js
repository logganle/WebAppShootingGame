export default class Rectangle2D{
    constructor(col, row, width, height){
        this.col = col;
        this.row = row;
        this.width = width;
        this.height = height;
    }
    intersects(r){
        if(r){
            return this.col < r.col + r.width &&
            this.col + this.width > r.col &&
            this.row < r.row + r.height &&
            this.row + this.height > r.row
        }
    }
}