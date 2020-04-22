import {loadImage} from "../utils/loader.js";
import GIF from "../external_api/GIF.js"
const wallsConfig = [
    {name: "wall1", imagePath: "./img/bricks_1.png"},
    {name: "wall2", imagePath: "./img/bricks_2.png"},
    {name: "wall3", imagePath: "./img/bricks_3.png"},
    {name: "woodBridge", imagePath: "./img/wood.png"},
    {name: "fireWall", imagePath: "./img/fire.gif"},
    {name: "background", imagePath: "./img/background.png"},
    {name: "waterWall", imagePath: "./img/water.jpg"},
    {name: "fireBall", imagePath: "./img/fireball.png"}
];

export default class GraphicsFactory {
    constructor() {
        this.graphicMap = new Map();
    }

    loadAllGraphics(mainCallBack) {
        this.loadEntitiesGraphics().then((sprites) => {
            this.graphicMap.set("player", sprites[0]);
            this.graphicMap.set("eagle", sprites[1]);
            this.loadWallImages(wallsConfig, mainCallBack);
        });
    }

    loadWallImages(wallsConfig, mainCallBack) {
        let count = 0;
        wallsConfig.forEach(wall => {
            if(wall.name === "fireWall"){
                const fireGIF = GIF();
                    fireGIF.load(wall.imagePath);
                    fireGIF.onload = () =>{
                        this.graphicMap.set(wall.name, fireGIF.frames);
                        count++;
                        if(count == wallsConfig.length){
                            mainCallBack();
                        }
                }
            }
            else{
                loadImage(wall.imagePath).then(img => {
                    this.graphicMap.set(wall.name, img);
                    count++;
                    if(count == wallsConfig.length){
                        mainCallBack();
                    }
                });
            }
        });
    }

    getImage(name) {
        return this.graphicMap.get(name);
    }
    async loadEntitiesGraphics() {
        let playerSprite = [];
        let eagleSprite = [];
        
        for (let i = 0; i <= 23; i++) {
            await loadImage(`./img/player${i}.png`).then(img => {
                playerSprite.push(img);
            });
        }
        for (let i = 0; i <= 7; i++) {
            await loadImage(`./img/eagle${i}.png`).then(img => {
                eagleSprite.push(img);
            });
        }
        return Promise.all([playerSprite, eagleSprite]);
    }
}