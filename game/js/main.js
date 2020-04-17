import GraphicsFactory from "./graphics/GraphicsFactory.js";
import GameMap from "./mapGame/gameMap.js";
import TileFactory from "./tiles/TileFactory.js";
import {tileSize} from "./constants/tileConstants.js";
import Player from "./Entity/Player.js";
import TileHandler from "./tiles/TileHandler.js"

const canvas = document.getElementById('screen');
const sideBar = document.getElementById('sideBarForm');
const ctx = canvas.getContext('2d');

const backgroundBuffer = document.createElement('canvas');
backgroundBuffer.width = tileSize * 40; //40 objects
backgroundBuffer.height = tileSize * 40;

document.gameScore = 0;
//load all images
const graphics = new GraphicsFactory();
const tileFactory = TileFactory.getInstance();
const tileHandler = TileHandler.getInstance();
function loadGraphics(main) {
    graphics.loadAllGraphics(main);
}
const player = Player.getInstance();
function loadObjects(gameMap) {
    const wallNamesMap = { x: "wall1", m: "wall2", "-": "woodBridge", "^": "trap1", "o": "fireWall", "w" :"waterWall"}
    //load background image to buffer
    backgroundBuffer.img = graphics.getImage("background");
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            const c = gameMap[row][col];
            if (c === "p") {
                player.setLocation(row * tileSize, col * tileSize);
            }
            else if (c ==="x" || c === "m" || c === "-" || c == 'w' || c === "o"){
                const wall = tileFactory.getTile(wallNamesMap[c], row * tileSize, col * tileSize);
                if(c === 'w') wall.solid = false;
                tileHandler.addTile(wall);
            }
        }
    }
}

function main() {
    const map = new GameMap();

    const gameMap = map.getMap1();
    loadObjects(gameMap);

    //display side bar
    sideBar.style.display = 'flex';

    prepareKeyEvents();

    let frameDelay = 0;
    function update() {
        if (frameDelay === 0) {
            if(!player.isAlive()) return;
            // ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateLogic();
            // let myWorld = {
            //     minCol: 0,
            //     maxCol: 2000,
            //     maxRow: 2000,
            //     minRow: 0
            // } 
            // const camX = clamp(-player.col + canvas.width / 2, myWorld.minCol, myWorld.maxCol - canvas.width);
            // const camY = clamp(-player.row  + canvas.height / 2, myWorld.minRow, myWorld.maxRow - canvas.height);
        
            // ctx.translate( camX, camY ); 
            //redraw 
            redraw();
        }
        frameDelay = (frameDelay + 1) % 3;
        requestAnimationFrame(update);
    }
    update();
}
function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

loadGraphics(main);
function redraw(){
    ctx.drawImage(backgroundBuffer.img, 0, 0, backgroundBuffer.width, backgroundBuffer.height);
    tileHandler.renderAllTiles(ctx, graphics, tileSize);
    player.render(ctx, graphics.getImage(player.name), tileSize);
}

function updateLogic(){
    document.gameScore += 1;
    player.update();
    tileHandler.tiles.filter(t => t.name === "woodBridge").forEach(t => {
        t.update();
    });
}

function prepareKeyEvents(){
    document.addEventListener('keypress', (event) => {
        const key = event.code;
        if(key == 'KeyD') player.isMovingRight = true;
        else if(key == 'KeyA') player.isMovingLeft = true;
        if(key == 'Space' && !player.isJumping){
            player.velR = -21;
            player.isJumping = true; 
        }
        if(player.isSwimming){
            if(key == 'KeyW'){
                player.isSwimmingUp = true;
                player.velR = -6;
                player.isSwimmingDown = false;
            }
            else if(key == 'KeyS'){
                player.isSwimmingDown = true;
                player.velR= 6;
                player.isSwimmingUp = false;
            }
        }
    });
    document.addEventListener('keyup', (event) => {
        const key = event.code;
        if(key == 'KeyD') player.isMovingRight = false;
        if(key == 'KeyA') player.isMovingLeft = false;
        // if(key == 'Space') player.isJumping = false;
        if(key == 'KeyW') player.isSwimmingUp = false;
        if(key == 'KeyS') player.isSwimmingDown = false;
    });
}



