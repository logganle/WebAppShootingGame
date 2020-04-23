// const soundsConfig = [
//     {name: 'player_death' , soundPath: './sound/player_death.wav'},
//     {name: 'eagle_death' , soundPath: './sound/eagle_death.wav'},
//     {name: 'monster_death' , soundPath: './sound/monster_death.wav'},
//     {name: 'footstep' , soundPath: './sound/footstep.wav'},
//     {name: 'fireball' , soundPath: './sound/fireball.wav'},   
// ]
// audio.pause() // important!!!
//                 audio.currentTime = 0
//                 audio.play()
const SoundHandler = (() => {
    class Instance {
        constructor() {
            this.fireball_audio = new Audio('./sound/fireball.wav');
            this.eagle_death = new Audio('./sound/eagle_death.wav');
            this.eagle_death.volume = 0.3;
            this.footstep = new Audio('./sound/footstep.wav');
            this.playerDie = new Audio('./sound/player_death.wav');
        }
        playerFireBallSound(){
            this.fireball_audio.pause();
            this.fireball_audio.currentTime = 0;
            this.fireball_audio.play();
        }
        playPlayerDieSound(){
            this.playerDie.play();
        }
        playFootStepSound(){
            this.footstep.play();
        }
        playEagleDeathSound(){
            this.eagle_death.play();
        }
    }
    let instance = new Instance();
    function createInstance(){
        return new Instance();
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
export default SoundHandler;
