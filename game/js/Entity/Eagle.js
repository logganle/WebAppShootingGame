import Entity from "./Entity/Entity.js";
import {tileSize} from "../constants/tileConstants.js";
import TileHandler from "../tiles/TileHandler.js";

const allTiles = TileHandler.getInstance().tiles;
export default class Eagle extends Entity{
    constructor(name, row, col, width, height, solid){
        super(name, row, col, width, height, solid);
        // this.followSkill
    }
}