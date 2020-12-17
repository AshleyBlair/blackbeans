// Video player

// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton() {
const icon = this.paused ? '►' : '❚ ❚';
toggle.textContent = icon;
}

function skip() {
// parseFloat will convert string into numbers
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
  }
  
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
video.currentTime = scrubTime;
}
// hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress. addEventListener('click', scrub);
progress. addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// KEY SEQUENCE DETECTION
const pressed = [];
const secretCode = 'spicey';

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  console.log(pressed);

  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!');
    cornify_add();
  }
  console.log(pressed);
});

// SLIDER

function Slider(slider) {
  if (!(slider instanceof Element)) {
          throw new Error('No slider passed in');
  }
  // create some variables for working iwth the slider
  let prev;
  let current;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
          current = slider.querySelector('.current') || slides.firstElementChild;
          prev = current.previousElementSibling || slides.lastElementChild;
          next = current.nextElementSibling || slides.firstElementChild;
          console.log({ current, prev, next });
  }

  function applyClasses() {
          current.classList.add('current');
          prev.classList.add('prev');
          next.classList.add('next');
  }

  function move(direction) {
          // first strip all the classes off the current slides
          const classesToRemove = ['prev', 'current', 'next'];
          prev.classList.remove(...classesToRemove);
          current.classList.remove(...classesToRemove);
          next.classList.remove(...classesToRemove);
          if (direction === 'back') {
                  // make an new array of the new values, and destructure them over and into the prev, current and next variables
                  [prev, current, next] = [
                          // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
                          prev.previousElementSibling || slides.lastElementChild,
                          prev,
                          current,
                  ];
          } else {
                  [prev, current, next] = [
                          current,
                          next,
                          // get the next slide, or if it's at the end, loop around and grab the first slide
                          next.nextElementSibling || slides.firstElementChild,
                  ];
          }

          applyClasses();
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));