const scenes = document.querySelectorAll('.scene');
const music = document.getElementById('bg-music');
const confettiBox = document.getElementById('confetti');
const progressBar = document.getElementById('progress');
const storyContainer = document.getElementById('story');
const flash = document.getElementById('flash');
const barTop = document.getElementById('bar-top');
const barBottom = document.getElementById('bar-bottom');

let current = 0;
let musicStarted = false;

// Update progress bar
function updateProgress() {
  const progress = ((current + 1) / scenes.length) * 100;
  progressBar.style.width = progress + '%';
}

// Create heart particles
function createHearts(x, y) {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = '💖';
    heart.style.left = x + (Math.random() - 0.5) * 50 + 'px';
    heart.style.top = y + 'px';
    heart.style.animationDelay = i * 0.1 + 's';
    storyContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
  }
}

// Flash effect
function flashScreen() {
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 300);
}

// Shake effect
function shakeScreen() {
  storyContainer.classList.add('shake');
  setTimeout(() => storyContainer.classList.remove('shake'), 500);
}

// Thunder effect
function thunderEffect() {
  storyContainer.classList.add('thunder');
  setTimeout(() => storyContainer.classList.remove('thunder'), 500);
}

// Cinematic bars
function toggleCinematicBars(show) {
  if (show) {
    barTop.classList.add('active');
    barBottom.classList.add('active');
  } else {
    barTop.classList.remove('active');
    barBottom.classList.remove('active');
  }
}

// Apply dramatic effects based on scene
function applyDramaticEffects(sceneElement) {
  const effect = sceneElement.getAttribute('data-effect');
  
  if (effect === 'suspense') {
    // Suspense scene - dim lighting, cinematic bars
    sceneElement.classList.add('suspense');
    toggleCinematicBars(true);
    setTimeout(() => {
      sceneElement.classList.remove('suspense');
    }, 2000);
  } 
  else if (effect === 'dramatic') {
    // Dramatic moment - thunder and shake
    thunderEffect();
    setTimeout(() => shakeScreen(), 300);
    sceneElement.classList.add('slow-reveal');
  }
  else if (effect === 'reveal') {
    // Big reveal - flash, shake, dramatic zoom
    flashScreen();
    setTimeout(() => shakeScreen(), 200);
    sceneElement.classList.add('dramatic-reveal');
    sceneElement.classList.add('glitch');
    setTimeout(() => {
      sceneElement.classList.remove('glitch');
    }, 600);
  }
  else {
    // Normal scenes - remove cinematic bars
    toggleCinematicBars(false);
  }
}

storyContainer.addEventListener('click', (e) => {

  // Start music on first click and remove the "Tap to Start" button
  if (!musicStarted) {
    music.play();
    musicStarted = true;
    
    // Remove the tap to start button
    const tapStart = document.getElementById('tap-start');
    if (tapStart) {
      tapStart.style.display = 'none';
    }
    
    // Don't advance to next scene on first click, just start music
    return;
  }

  // Create heart particles at click position on final scene
  if (current === scenes.length - 1) {
    createHearts(e.clientX - e.currentTarget.offsetLeft, e.clientY - e.currentTarget.offsetTop);
  }

  scenes[current].classList.remove('active');
  current++;

  if (current < scenes.length) {
    scenes[current].classList.add('active');
    updateProgress();
    
    // Apply dramatic effects
    applyDramaticEffects(scenes[current]);
  } else {
    // Loop back to start after confetti
    toggleCinematicBars(false);
    setTimeout(() => {
      current = 0;
      scenes.forEach(s => s.classList.remove('active'));
      scenes[0].classList.add('active');
      updateProgress();
    }, 5000); // Increased time to read final slide
  }

  // Enhanced confetti at the end (scene before last)
  if (current === scenes.length - 2) {
    launchConfetti();
    toggleCinematicBars(false);
  }
  
  // More confetti on final wrap slide
  if (current === scenes.length - 1) {
    setTimeout(() => launchConfetti(), 500);
  }
});

function launchConfetti() {
  const colors = ['#ff6f91', '#ffc75f', '#845ec2', '#00c9a7', '#ff9671'];
  const shapes = ['●', '■', '▲', '★', '♥'];
  
  for (let i = 0; i < 150; i++) {
    const piece = document.createElement('span');
    piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.left = Math.random() * 360 + 'px';
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = (Math.random() * 10 + 10) + 'px';
    piece.style.animationDelay = Math.random() * 0.3 + 's';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confettiBox.appendChild(piece);

    setTimeout(() => piece.remove(), 3000);
  }
}

// Initialize progress bar
updateProgress();