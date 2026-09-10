const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const capaMusic = document.getElementById('capa');
const play = document.getElementById('play');

const chlorine = {
    songName : 'Chlorine',
    artist : 'Twenty one Pilots',
    file : 'twentyonepilots'
};
const justinBieber = {
    songName : 'Sorry',
    artist : 'Justin Bieber',
    file : 'justinbieber'
};
const babyDoll = {
    songName : 'BabyDoll',
    artist : 'Dominic Fike',
    file : 'babydoll'
};

let isPlayIng = false;
const playlist = [chlorine, justinBieber, babyDoll];
let index = 0;

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

function carregarInformacoes(){
    capaMusic.src = `imagens/${playlist[index].file}`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

carregarInformacoes();
play.addEventListener('click', playPauseDecider);
011 100 101
  3   8    5