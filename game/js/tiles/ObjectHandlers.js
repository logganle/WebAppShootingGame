const ObjectHandler = (() => {
    class ObjectHandlerInstance {
        constructor(){
            this.tiles = [];
            this.entities = [];
        }
        addTile(t){
            this.tiles.push(t);
        }
    
        renderAllTiles(ctx, graphics, tileSize){
            this.tiles.forEach(w => {
                w.render(ctx, graphics.getImage(w.name), tileSize);
            })
        }
        addEntity(e){
            this.entities.push(e);
        }
        renderAllEntities(ctx, graphics, tileSize){
            this.entities.forEach(e => {
                // spriteSheet = graphics.getImage(e.name);
                e.render(ctx, graphics.getImage(e.name), tileSize);
            })
        }
    }
    let instance;
    function createInstance(){
        return new ObjectHandlerInstance();
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
export default ObjectHandler;