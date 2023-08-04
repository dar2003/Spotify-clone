console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ek Ajnabee Haseena Se", filePath: "songs/1.mp3", coverPath: "cover/coverimg1.jpg"},
    {songName: "Ajab Si", filePath: "songs/2.mp3", coverPath: "cover/coverimg2.jpg"},
    {songName: "Bandeya Rey Bandeya", filePath: "songs/3.mp3", coverPath: "cover/coverimg3.jpg"},
    {songName: "Gulabi Aankhen", filePath: "songs/4.mp3", coverPath: "cover/coverimg4.jpg"},
    {songName: "Kar Har Maidaan Fateh", filePath: "songs/5.mp3", coverPath: "cover/coverimg5.jpg"},
    {songName: "Malhari", filePath: "songs/2.mp3", coverPath: "cover/coverimg6.jpg"},
    {songName: "O Bedardeya", filePath: "songs/2.mp3", coverPath: "cover/coverimg7.jpg"},
    {songName: "Tera Yaar Hoon Main", filePath: "songs/2.mp3", coverPath: "cover/coverimg8.jpg"},
    {songName: "Yeh Shaam Mastani", filePath: "songs/2.mp3", coverPath: "cover/coverimg9.jpg"},
    {songName: "Zara Sa", filePath: "songs/4.mp3", coverPath: "cover/coverimg10.jpg"},
]

songItem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (element)=>{ 
        makeAllPlays();
        songIndex = parseInt(element.target.id);
        element.target.classList.remove('fa-play-circle');
        element.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})