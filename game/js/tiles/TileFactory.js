import Wall1 from "./Wall1.js";
import {tileSize} from "../constants/tileConstants.js"
import WoodBridge from "./WoodBridge.js";

const TileFactory = (() => {
    let instance;
    function getNewWall(type){
        if(type == "woodBridge") return new WoodBridge();
        else return new Wall1();
    }
    function createInstance() {
        return {
            tileTable: new Map(),
            getTile: (name, row, col) => {
                const temp = instance.tileTable.get(name);
                const newClone = Object.assign(getNewWall(name), temp) 

                newClone.row = row ;
                newClone.col = col;
                return newClone;
            }
        };
    }

    function loadCache() {
        const defaultRow = 0, defaultCol = 0;
        const wall1 = new Wall1("wall1", defaultRow * tileSize, defaultCol * tileSize, tileSize, tileSize);
        const wall2 = new Wall1("wall2", defaultRow * tileSize, defaultCol * tileSize, tileSize, tileSize);
    
        const woodBridge = new WoodBridge("woodBridge", defaultRow * tileSize, defaultCol * tileSize, tileSize, tileSize);
        
        instance.tileTable.set(wall1.name, wall1);
        instance.tileTable.set(wall2.name, wall2);
        instance.tileTable.set(woodBridge.name, woodBridge);
        
        instance.tileTable.set("fireWall", new Wall1("fireWall", 0, 0, tileSize, tileSize));
        
        const waterWall = new Wall1("waterWall", 0, 0, tileSize, tileSize);
        waterWall.solid = false;
        instance.tileTable.set("waterWall", waterWall);
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                loadCache();
            }
            return instance;
        },
    }

})();

export default TileFactory;