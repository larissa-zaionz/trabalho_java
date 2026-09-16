const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const capaMusic = document.getElementById('capa');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

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
    capaMusic.src = `imagens/${playlist[index].file}.jpeg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}
function previousSong(){
    if(index === 0){
        index = playlist.length - 1;
    }
    else{
        index -= 1;
    }
    carregarInformacoes();
    playSong();
}
function nextSong(){
    if(index === playlist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    carregarInformacoes();
    playSong();
}
function updateProgressBar(){
song.currentTime
song.duration

}

carregarInformacoes();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
