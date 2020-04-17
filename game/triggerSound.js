const music = document.getElementById("playAudio");
const silienceAudio = document.getElementById("silienceAudio");

document.body.addEventListener("mouseclick", function () {
    try{
        // silienceAudio.play();
        music.play();
    }
    catch(err){
        music.play();
    }
    
})




