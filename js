// Define variables for the music player
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let stop_btn = document.querySelector('.stop-track');
let forward_btn = document.querySelector('.forward-track');
let waveformStrokes = document.querySelectorAll('.stroke');
let rewind_btn = document.querySelector('.rewind-track');

// Define variables for the state of the music player
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Initialize the volume of the audio element to half
curr_track.volume = 0.5;

// Set the volume range slider to half visually
volume_slider.value = 50;

// Define the music list
const music_list = [
  {
    img: 'image.jpg',
    name: 'S07E36 - Radio Libre',
    artist: 'Floodcast',
    music: 'song.mp3',
    background: 'linear-gradient(to right, #BAD9EB,#8E9DA3)',
  },
  {
    img: 'image2.jpg',
    name: 'S4E15 - avec Mistermv & Ultia',
    artist: 'Popcorn',
    music: 'song2.mp3',
    background: 'linear-gradient(to right, #AA2228, #151515)',
  },
  {
    img: 'image3.jpg',
    name: '#119 Avec Disiz',
    artist: 'A bientôt de te revoir',
    music: 'song3.mp3',
    background: 'linear-gradient(to right, #FDE0E4, #FDC41F)',
  },
  {
    img: 'image4.jpg',
    name: 'Avec Karim Benzema (S06E10)',
    artist: 'Zack en roue libre',
    music: 'song4.mp3',
    background: 'linear-gradient(to right, #960103, #FFD193)',
  },
];




// Fonction pour mettre en pause ou jouer la chanson courante et mettre à jour l'icône affichée
function playpauseTrack() {
  // Toggle the play/pause state and update the displayed icon
  seek_slider.max = curr_track.duration;
  if (curr_track.paused) {
    curr_track.play();
    document.querySelector('.playpause-track i').classList.remove('fa-play-circle');
    document.querySelector('.playpause-track i').classList.add('fa-pause-circle');

  } else {
    curr_track.pause();
    document.querySelector('.playpause-track i').classList.remove('fa-pause-circle');
    document.querySelector('.playpause-track i').classList.add('fa-play-circle');
  }
}


// Fonction pour passer à la chanson suivante dans la liste de musique
async function nextTrack() {
  // Increment the track index
  track_index = (track_index + 1) % music_list.length;

  // Load the new track
  loadTrack(track_index);

  // Play the new track
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  await curr_track.play();
  seek_slider.max = curr_track.duration;

  isPlaying = true;
}

// Fonction pour passer à la chanson précédente dans la liste de musique
async function prevTrack() {
  // Décrémenter l'index de la chanson courante
  track_index = (track_index - 1 + music_list.length) % music_list.length;

  // Charger et jouer la chanson précédente
  loadTrack(track_index);


  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  await curr_track.play();
  seek_slider.max = curr_track.duration;
  isPlaying = true;
}



async function randomTrack() {
  // Générer un nombre aléatoire compris entre 0 et la longueur du tableau music_list
  let randomIndex = Math.floor(Math.random() * music_list.length);

  // Charger et jouer la chanson sélectionnée aléatoirement
  loadTrack(randomIndex);
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  await curr_track.play();
  seek_slider.max = curr_track.duration;
}



function updateSeek() {
  // Calculate the seek slider value
  seek_slider.value = (curr_track.currentTime);


  // Calculate the current time in minutes and seconds
  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSeconds = Math.floor(curr_track.currentTime % 60);

  // Add a leading zero to the minutes and seconds if necessary
  currentMinutes = (currentMinutes < 10) ? '0' + currentMinutes : currentMinutes;
  currentSeconds = (currentSeconds < 10) ? '0' + currentSeconds : currentSeconds;

  // Update the current time display
  curr_time.textContent = currentMinutes + ':' + currentSeconds;
}

function seekTrack() {
  // Calculate the new time based on the seek slider value
  curr_track.currentTime = seek_slider.value;
}



function updateDuration() {
  // Calculate the total duration in minutes and seconds
  let totalMinutes = Math.floor(curr_track.duration / 60);
  let totalSeconds = Math.floor(curr_track.duration % 60);

  // Add a leading zero to the minutes and seconds if necessary
  totalMinutes = (totalMinutes < 10) ? '0' + totalMinutes : totalMinutes;
  totalSeconds = (totalSeconds < 10) ? '0' + totalSeconds : totalSeconds;

  // Update the total duration display
  total_duration.textContent = totalMinutes + ':' + totalSeconds;
}


function updateVolume() {
  // Update the volume
  curr_track.volume = volume_slider.value / 100;
}


// Load the first track
loadTrack(track_index);

function toggleNightMode() {
  // Get the body element
  let body = document.querySelector('body');
  // Get the night mode toggle button
  let nightModeToggle = document.querySelector('.night-mode-toggle i');

  // Toggle the "night-mode" class on the body element
  body.classList.toggle('night-mode');

  // Update the icon in the toggle button
  if (nightModeToggle.classList.contains('fa-moon-o')) {
    nightModeToggle.classList.remove('fa-moon-o');
    nightModeToggle.classList.add('fa-sun-o');
  } else {
    nightModeToggle.classList.remove('fa-sun-o');
    nightModeToggle.classList.add('fa-moon-o');
  }
}


function stopTrack() {
  curr_track.pause(); // Pause the current track
  curr_track.currentTime = 0; // Set the current time to 0
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; // Update the play/pause icon
  isPlaying = false; // Update the isPlaying flag
}
stop_btn.onclick = stopTrack; // Attach the stopTrack function to the onclick event of the stop_btn element


function rewindTrack() {
  // Decrement the current time by 15 seconds
  curr_track.currentTime -= 15;
  // Update the seek slider position
  seek_slider.value = curr_track.currentTime;
}
rewind_btn.onclick = rewindTrack; // Attach the rewindTrack function to the onclick event of the rewind_btn element



function forwardTrack() {
  // Increment the current time by 15 seconds
  curr_track.currentTime += 15;
  // Update the seek slider position
  seek_slider.value = curr_track.currentTime;
}
forward_btn.onclick = forwardTrack; // Attach the forwardTrack function to the onclick event of the forward_btn element



function loadTrack(track_index) {
  // Réinitialise le curseur de progression et l'affichage du temps actuel
  // seek_slider.value = curr_track.currentTime;
  seek_slider.max = curr_track.duration;
  curr_time.textContent = '00:00';

  // Met à jour l'affichage de la durée totale de la piste
  let minutes = Math.floor(curr_track.duration / 60); // Calcule le nombre de minutes de la durée de la piste
  let seconds = Math.floor(curr_track.duration % 60); // Calcule le nombre de secondes restantes de la durée de la piste
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  total_duration.textContent = `${minutes}:${seconds}`; // Met à jour l'affichage de la durée totale de la piste

  // Met à jour les informations sur la piste
  track_art.style.backgroundImage = `url(${music_list[track_index].img})`;
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  // Met à jour la source audio
  curr_track.src = music_list[track_index].music; // Modifie la source audio en utilisant les informations sur la piste de la liste de musique spécifiée par l'index de piste
  curr_track.load();
  // Change la couleur du wrapper
  document.querySelector('.wrapper').style.background = music_list[track_index].background;
}


// Toggle the 'hidden' class on the waveform strokes when the music is paused or stopped
function toggleWaveformVisibility() {
  if (curr_track.paused || curr_track.ended) {
    waveformStrokes.forEach(stroke => stroke.classList.add('hidden'));
  } else {
    waveformStrokes.forEach(stroke => stroke.classList.remove('hidden'));
  }
}

// Call the toggleWaveformVisibility function whenever the music is played or paused
curr_track.addEventListener('play', toggleWaveformVisibility);
curr_track.addEventListener('pause', toggleWaveformVisibility);



function muteTrack() {
  // Si le volume est actuellement à 0, remettez-le à la valeur précédente
  if (curr_track.volume === 0) {
    curr_track.volume = prevVolume / 100;
  }
  // Sinon, mettez le volume à 0 et mémorisez la valeur précédente dans la variable prevVolume
  else {
    prevVolume = volume_slider.value;
    curr_track.volume = 0;
  }
}

function updateVolumeSlider() {
  // Mettez à jour la valeur de la range de volume en fonction du volume actuel de la chanson
  volume_slider.value = curr_track.volume * 100;
}
curr_track.addEventListener('volumechange', updateVolumeSlider);






// Add event listeners

seek_slider.addEventListener('input', function () {
  // Set the current track's current time to the value of the seek slider
  curr_track.currentTime = this.value;
});

volume_slider.addEventListener('change', function () {
  updateVolume();
});

curr_track.addEventListener('timeupdate', function () {
  updateSeek();
});

curr_track.addEventListener('ended', function () {
  nextTrack();
});

curr_track.addEventListener('loadedmetadata', function () {
  updateDuration();
});


