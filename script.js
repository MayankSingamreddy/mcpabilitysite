const words = [
    "mcp",
    "Manage",
    "Reli",
    "Avail",
    "Service",
    "Performance",
    "Security",
    "Observability",
    "Config",
    "Administr",
    "Oper",
    "Maintain",
    "Upgrad",
    "Automation",
    "Orchestration",
    "Fault Management-",
    "Performance",
    "Cost manag",
    "Compliance-",
    "mcp"
];

const rotatingTextElement = document.getElementById('rotating-text');
let currentIndex = 0;
let intervalTime = 1500; // Time word is fully visible
const finalPauseTime = 3000; // Longer pause for the final "mcp"
const animTime = 400; // Duration of the rotation animation (matches CSS)

function scheduleNextRotation() {
    // Use final pause at loop end, dynamic parabolic elsewise
    const totalSteps = words.length - 1;
    let pauseDuration;
    if (currentIndex === totalSteps) {
        pauseDuration = finalPauseTime;
    } else {
        const initialPause = 500;
        const minPause = 200;
        const x = currentIndex / totalSteps;
        const f = 1 - Math.pow(2 * x - 1, 2);
        pauseDuration = initialPause - f * (initialPause - minPause);
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

// Start the first rotation cycle
scheduleNextRotation();

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