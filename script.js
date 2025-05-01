const words = [
    // "mcp",
    "manage",
    "reli",
    "avail",
    "service",
    "performance optimiz",
    "secura",
    "observ",
    "configur",
    "administr",
    "oper",
    "maintain",
    "upgrad",
    "automat",
    "orchestr",
    "fault manage",
    "cost manag",
    "compli",
    "mcp"
];

const rotatingTextElement = document.getElementById('rotating-text');
let currentIndex = 0;
let intervalTime = 1500; // Time word is fully visible
const finalPauseTime = 3000; // Longer pause for the final "mcp"
const animTime = 400; // Duration of the rotation animation (matches CSS)

// Compute max width to lock rotating-text and keep static 'ability' in place
function setFixedRotatorWidth() {
    const temp = rotatingTextElement.cloneNode();
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.width = 'auto';
    document.body.appendChild(temp);
    let maxW = 0;
    words.forEach(word => {
        temp.textContent = word;
        const w = temp.getBoundingClientRect().width;
        if (w > maxW) maxW = w;
    });
    document.body.removeChild(temp);
    rotatingTextElement.style.width = `${maxW}px`;
    rotatingTextElement.style.textAlign = 'right';
}

function scheduleNextRotation() {
    // Use final pause at loop end, constant linear pause for others
    const totalSteps = words.length - 1;
    let pauseDuration;
    if (currentIndex === totalSteps) {
        pauseDuration = finalPauseTime;
    } else {
        pauseDuration = 300;
    }
    setTimeout(startAnimationOut, pauseDuration);
}

function startAnimationOut() {
    rotatingTextElement.style.transform = 'rotateX(90deg)';
    rotatingTextElement.style.opacity = '0';
    setTimeout(changeWordAndAnimateIn, animTime);
}

function changeWordAndAnimateIn() {
    currentIndex = (currentIndex + 1) % words.length;
    const nextWord = words[currentIndex];
    rotatingTextElement.textContent = nextWord;

    // Set starting position for incoming word (no transition)
    rotatingTextElement.style.transition = 'none';
    rotatingTextElement.style.transform = 'rotateX(-90deg)';
    // Force reflow to apply the transform immediately
    rotatingTextElement.offsetHeight; 

    // Re-enable transition and animate in
    rotatingTextElement.style.transition = `transform ${animTime}ms ease-in-out, opacity ${animTime}ms ease-in-out`;
    rotatingTextElement.style.transform = 'rotateX(0deg)';
    rotatingTextElement.style.opacity = '1';

    // Schedule the next rotation cycle
    scheduleNextRotation();
}

// Initialize after DOM ready: set width then start rotating
document.addEventListener('DOMContentLoaded', () => {
    setFixedRotatorWidth();
    setTimeout(scheduleNextRotation, 500);
});

/* // Old rotation logic - removed
function rotateWords() {
    // Fade out
    rotatingTextElement.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        rotatingTextElement.textContent = words[currentIndex];
        // Fade in
        rotatingTextElement.style.opacity = 1;

        // Determine the next interval time
        let nextInterval = intervalTime;
        if (currentIndex === words.length - 1) { // If it's the last word ("mcp")
           nextInterval = finalPauseTime; // Use the longer pause
        }

        // Set timeout for the next rotation
        setTimeout(rotateWords, nextInterval);

    }, 500); // Wait for fade out transition to complete (matches CSS transition time)
}

// Start the rotation after an initial pause
setTimeout(rotateWords, intervalTime); 
*/ 