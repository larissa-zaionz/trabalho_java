const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

songName.innerText = 'Chlorine';
let isPlayIng = false;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlayIng = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlayIng = false;
}

function playPauseDecider(){
    if(isPlayIng === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

play.addEventListener('click', playPauseDecider);
