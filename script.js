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
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('like');

const chlorine = {
    songName : 'Chlorine',
    artist : 'Twenty one Pilots',
    file : 'twentyonepilots',
    liked : false
};
const justinBieber = {
    songName : 'Sorry',
    artist : 'Justin Bieber',
    file : 'justinbieber',
    liked : false
};
const babyDoll = {
    songName : 'BabyDoll',
    artist : 'Dominic Fike',
    file : 'babydoll',
    liked : false
};

let isPlayIng = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ??[chlorine, justinBieber, babyDoll];
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

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function carregarInformacoes(){
    capaMusic.src = `imagens/${sortedPlaylist[index].file}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
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
function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    progressBar.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}
function junpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const junpToTime = (clickPosition/width)*song.duration;
    song.currentTime = junpToTime;
}
function shuffleArray(preShuffleArray){
    const size  = preShuffleArray.length;
    let currentIndex = size -1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size); 
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -=1;
    }

}
function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        shuffleArray(...originalPlaylist);
        shuffleButton.classList.remove('button-active');
    }

}
function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}
function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min  = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
    
}
function likeButtonCliked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}



carregarInformacoes();


play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('loadedmetadata', updateTotalTime);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', junpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonCliked);
