// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
const targetText = "Welcome to my Portfolio";
const initialText = "Welcome to my Portfolio";
const element = document.getElementById("animated-heading");

const runes = "ᚠᛇᚻᛗᚾᛟᛞᛚᚨᚷᚢᛝᛃᛋᛏᛒᛉᛁᛇᛞ";
const settleSpeed = 6;

let output = Array(targetText.length).fill('');
let frame = 0;
let index = 0;
let isAnimating = false;
let animationFrameId = null;

function scrambleStep() {
  for (let i = 0; i < targetText.length; i++) {
    if (i < index) {
      output[i] = targetText[i];
    } else if (targetText[i] === ' ') {
      output[i] = ' ';
    } else {
      output[i] = runes[Math.floor(Math.random() * runes.length)];
    }
  }

  element.textContent = output.join('');

  frame++;
  if (frame % settleSpeed === 0 && index < targetText.length) {
    index++;
  }

  if (index <= targetText.length) {
    animationFrameId = requestAnimationFrame(scrambleStep);
  } else {
    isAnimating = false;
  }
}

element.addEventListener('mouseenter', () => {
  if (!isAnimating) {
    element.classList.add('runic-font');
    index = 0;
    frame = 0;
    isAnimating = true;
    output = Array(targetText.length).fill('');
    scrambleStep();
  }
});

element.addEventListener('mouseleave', () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  isAnimating = false;
  element.textContent = initialText;
  element.classList.remove('runic-font');
});

// Animate the heading on page load
anime({
  targets: '#animated-heading',
  opacity: [0, 1],
  translateY: [-20, 0],
  easing: 'easeOutExpo',
  duration: 1500
});

const words = ["Gamer", "Engineer", "Developer" , "Artist", "Designer", "Editor"];
let currentWordIndex = 0;
const textElement = document.getElementById("animated-word");

function typeWord(word, callback) {
  let text = "";
  anime({
    targets: textElement,
    duration: 1000,
    update: function (anim) {
      const progress = Math.floor((anim.progress / 100) * word.length);
      text = word.substring(0, progress);
      textElement.textContent = text;
    },
    complete: callback,
    easing: "linear"
  });
}

function deleteWord(callback) {
  const word = textElement.textContent;
  anime({
    targets: textElement,
    duration: 500,
    update: function (anim) {
      const progress = Math.floor((anim.progress / 100) * word.length);
      textElement.textContent = word.substring(0, word.length - progress);
    },
    complete: callback,
    easing: "linear"
  });
}

function cycleWords() {
  const nextIndex = (currentWordIndex + 1) % words.length;
  deleteWord(() => {
    currentWordIndex = nextIndex;
    typeWord(words[currentWordIndex], () => {
      setTimeout(cycleWords, 1500); // Wait then repeat
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeWord(words[currentWordIndex], () => {
    setTimeout(cycleWords, 1500);
  });
});
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
 const links = navLinks.querySelectorAll('a');

// Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  const musicToggle = document.getElementById('musicToggle');
  const songName = document.getElementById('songName');
  const arrowToggle = document.getElementById('arrowToggle');
  const audioPlayer = document.getElementById('audioPlayer');

  const playlist = [
    { title: "Into It ©", src: "Into It.mp3" },
    { title: "Okay ©", src: "Okay.mp3" },
    { title: "Swim ©", src: "Swim.mp3" },
    { title: "The Walls ©", src: "The Walls.mp3" },
    { title: "Triggered ©", src: "Triggered.mp3" }
  ];

  let lastPlayedIndex = -1;
  let nameVisible = false;

  function getRandomIndex(excludeIndex, length) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * length);
    } while (newIndex === excludeIndex && length > 1);
    return newIndex;
  }

  function playRandomSong() {
    const randomIndex = getRandomIndex(lastPlayedIndex, playlist.length);
    lastPlayedIndex = randomIndex;

    const song = playlist[randomIndex];
    audioPlayer.src = song.src;
    songName.textContent = `Chase Atlantic - ${song.title}`;
    showSongName();
    audioPlayer.play();
  }

  function showSongName() {
    songName.classList.add('visible');
    arrowToggle.classList.remove('right', 'hidden');
    arrowToggle.classList.add('left');
    arrowToggle.style.display = 'inline-block';
    nameVisible = true;
  }

  function hideSongName() {
    songName.classList.remove('visible');
    arrowToggle.classList.remove('left');
    arrowToggle.classList.add('right');
    nameVisible = false;
  }

  function hideArrowWithFade() {
    arrowToggle.classList.add('hidden');
  }

  musicToggle.addEventListener('click', () => {
    if (!audioPlayer.paused && !audioPlayer.ended) {
      audioPlayer.pause();
      hideSongName();
      hideArrowWithFade();
    } else {
      playRandomSong();
    }
  });

  arrowToggle.addEventListener('click', () => {
    if (nameVisible) {
      hideSongName();
    } else {
      showSongName();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    hideSongName();
    hideArrowWithFade();
  });

  audioPlayer.addEventListener('pause', () => {
    hideSongName();
    hideArrowWithFade();
  });