const SoundHandler = (() => {
    class Instance {
        constructor() {
            this.fireball_audio = new Audio('./sound/fireball.wav');
            this.eagle_death = new Audio('./sound/eagle_death.wav');
            this.eagle_death.volume = 0.3;
            this.footstep = new Audio('./sound/footstep.wav');
            this.playerDie = new Audio('./sound/player_death.wav');
            this.inGame_backgrond = new Audio('./sound/inGame_background.mp3');
            this.inGame_backgrond.loop = true;
            this.playerDeath = new Audio('./sound/player_death.wav');
            this.playerHurt = new Audio('./sound/player_death.wav');
        }
        playBackgroundGame(){
            this.inGame_backgrond.play();
        }
        playPlayerHurt(){
            this.playerHurt.play();
        }
        playPlayerDeathSound(){
            this.playerDeath.play();
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
