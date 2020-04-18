import { tileSize } from "../constants/tileConstants.js";

const ObjectHandler = (() => {
    class ObjectHandlerInstance {
        constructor(){
            this.tiles = [];
            this.entities = [];
            this.balls = [];
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
        removeEntity(e){
            this.entities = this.entities.filter(entity => entity !== e);
        }
        getEntitySize(){
            return this.entities.length;
        }

        addBall(b){
            this.balls.push(b);
        }
        renderAllBalls(ctx, graphics, tileSize){
            this.balls.forEach(b => {
                b.render(ctx, graphics.getImage(b.name), tileSize);
            });
        }
        removeBall(b){
            this.balls = this.balls.filter(ball => b !== ball);
        }

        renderAllEntities(ctx, graphics, tileSize){
            this.entities.filter(e => e.hp > 0).forEach(e => {
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