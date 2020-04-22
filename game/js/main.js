import GraphicsFactory from "./graphics/GraphicsFactory.js";
import GameMap from "./mapGame/gameMap.js";
import TileFactory from "./tiles/TileFactory.js";
import {tileSize} from "./constants/tileConstants.js";
import Player from "./Entity/Player.js";
import ObjectHandlers from "./tiles/ObjectHandlers.js"
import Eagle from "./Entity/Eagle.js";
import SoundHanlder from "./sounds/SoundHandler.js"
const canvas = document.getElementById('screen');
const sideBar = document.getElementById('sideBarForm');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const backgroundBuffer = document.createElement('canvas');
backgroundBuffer.width = tileSize * 40; //40 objects
backgroundBuffer.height = tileSize * 40;
const soundHandler = SoundHanlder.getInstance();

document.gameScore = 0;
//load all images
const graphics = new GraphicsFactory();
const tileFactory = TileFactory.getInstance();
const objectHandlers = ObjectHandlers.getInstance();
const eagleLocators = [];
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
                objectHandlers.addTile(wall);
            }
            // else if(c === 'e'){
            //     const eagle = new Eagle("eagle", row * tileSize, col * tileSize, tileSize, tileSize, true);
            //     objectHandlers.addEntity(eagle)
            // }
            else if(c === 't'){
                eagleLocators.push({row : row, col : col, tileSize: tileSize});
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
            ctx.clearRect(0,0,canvas.width,canvas.height);
            score.innerHTML = 'Score: ' + document.gameScore;
            if(objectHandlers.getEntitySize() === 0){
                
                spawnEntities();
            }
                
            updateLogic();
            redraw();
        }
        frameDelay = (frameDelay + 1) % 3;
        requestAnimationFrame(update);
    }
    update();
}
function spawnEntities(){
    eagleLocators.forEach(({row, col, tileSize}) => {
        let copyRow = row;
        let copyCol = col;
        let copytileSize = tileSize;
        objectHandlers.addEntity(new Eagle("eagle", copyRow * copytileSize, copyCol * copytileSize, copytileSize, copytileSize, true));
    });
}
loadGraphics(main);
function redraw(){
    ctx.drawImage(backgroundBuffer.img, 0, 0, backgroundBuffer.width, backgroundBuffer.height);
    objectHandlers.renderAllTiles(ctx, graphics, tileSize);
    objectHandlers.renderAllEntities(ctx, graphics, tileSize);
    player.render(ctx, graphics.getImage(player.name), tileSize);
    objectHandlers.renderAllBalls(ctx, graphics, tileSize);
}

function updateLogic(){
    player.update();
    objectHandlers.entities.forEach(e => e.update());
    objectHandlers.tiles.filter(t => t.name === "woodBridge").forEach(t => {
        t.update();
    });
    objectHandlers.balls.forEach(b => b.update());
}

function prepareKeyEvents(){
    document.addEventListener('keypress', (event) => {
        const key = event.code;
        event.preventDefault();
        if(key == 'KeyD') player.isMovingRight = true;
        else if(key == 'KeyA') player.isMovingLeft = true;
        if(key == 'Space' && !player.isJumping){
            player.velR = -23;
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
        if(key == 'KeyJ'){
            if(!player.isShooting){
                soundHandler.playerFireBallSound();
                player.isShooting = true;
                player.shoot();
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
        if(key == 'KeyJ') player.isShooting = false;
    });
}



