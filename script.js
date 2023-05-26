const title = document.getElementById('title');
const artist = document.getElementById('artist');
const image = document.querySelector('img');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentText = document.getElementById('current-time');
const durationText = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const musicList = [
   {
      track: 'music-1',
      title: 'Eine kleine Nachtmusik, K. 525',
      artist: 'Mozart'
   },
   {
      track: 'music-2',
      title: 'Symphony No.40 in G Minor, K.550',
      artist: 'Mozart'
   }
]

// Controls

let isPlaying = false;

const playMusic = () => {
   isPlaying = true;
   playBtn.classList.replace('fa-play', 'fa-pause');
   playBtn.setAttribute('title', 'Pause');
   music.play();
}

const pauseMusic = () => {
   isPlaying = false;
   playBtn.classList.replace('fa-pause', 'fa-play');
   playBtn.setAttribute('title', 'Play');
   music.pause();
}

//Music Player

const loadMusic = (musicList) => {
   title.textContent = musicList.title;
   artist.textContent = musicList.artist;
   image.src = `img/${musicList.track}.jpg`;
   music.src = `music/${musicList.track}.mp3`;
};

let musicIndex = 0;

const prevMusic = () => {
   musicIndex--;
   if (musicIndex < 0) {
      musicIndex = musicList.length - 1;
   }
   loadMusic(musicList[musicIndex]);
   playMusic();
}

const nextMusic = () => {
   musicIndex++;
   if (musicIndex > (musicList.length - 1)) {
      musicIndex = 0;
   }
   loadMusic(musicList[musicIndex]);
   playMusic();
}

loadMusic(musicList[musicIndex]);

//Controls: Track Progress

const updateProgress = (e) => {
   if (isPlaying){
      const {currentTime, duration} = e.srcElement;
      const progressPercentage = (currentTime / duration) * 100;
      progress.style.width = `${progressPercentage}%`;
      // Calculate Duration for each track
      const durationMinute = Math.floor(duration / 60);
      let durationSecond = Math.floor(duration % 60);
      if (durationSecond < 10) {
         durationSecond = `0${durationSecond}`;
      }
      // Delaying displaying durationText to avoid NAN
      if (durationSecond) {
         durationText.textContent = `${durationMinute}:${durationSecond}`;
      }
      // Calculate currentTime for each track
      const currentMinute = Math.floor(currentTime / 60);
      let currentSecond = Math.floor(currentTime % 60);
      if (currentSecond < 10) {
         currentSecond = `0${currentSecond}`;
      }
      // Delaying displaying currentText to avoid NAN
      if (currentSecond) {
         currentText.textContent = `${currentMinute}:${currentSecond}`;
      }
   }
}

const setProgress = (e) => {
   console.log(e)
   const {clientWidth} = e.srcElement
   const progressWidth = clientWidth;
   const progressClickX = e.offsetX;
   const {duration} = music;
   music.currentTime = (progressClickX / progressWidth) * duration;
}

//Event Listners

playBtn.addEventListener('click', () => (
   isPlaying ? pauseMusic() : playMusic()
));
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
music.addEventListener('ended', nextMusic);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);