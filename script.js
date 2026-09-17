const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const capaMusic = document.getElementById('capa');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const progressBar = document.getElementById('progresso-atual');
const progressContainer = document.getElementById('container-barra');
const shuffleButton = document.getElementById('embaralhar');

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
let isShuffled = false;
const originalPlaylist = [chlorine, justinBieber, babyDoll];
let sortedPlaylist = [...originalPlaylist];
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
    capaMusic.src = `imagens/${sortedPlaylist[index].file}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}
function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1;
    }
    carregarInformacoes();
    playSong();
}
function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    carregarInformacoes();
    playSong();
}
function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    progressBar.style.setProperty('--progress', `${barWidth}%`)
}
function junpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const junpToTime = (clickPosition/width)*song.duration;
    song.currentTime = junpToTime;
}
function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray();
    }

}
carregarInformacoes();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', junpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
