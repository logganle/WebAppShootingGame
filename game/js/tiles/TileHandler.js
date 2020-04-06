const TileHandler = (() => {
    class TileHandlerInstance {
        constructor(){
            this.tiles = [];
        }
        addTile(t){
            this.tiles.push(t);
        }
        renderAllTiles(ctx, graphics, tileSize){
            this.tiles.forEach(w => {
                w.render(ctx, graphics.getImage(w.name), tileSize);
            })
        }
    }
    let instance;
    function createInstance(){
        return new TileHandlerInstance();
    }
    return {
        getInstance : () =>{
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})();
export default TileHandler;