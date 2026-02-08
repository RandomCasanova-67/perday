const body = document.getElementById('body');
const emojiContainer = document.getElementById('emoji-container');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');

const spookyEmojis = ['👻', '💀', '🕸️', '🦇', '🕯️'];
const cuteEmojis = ['❤️', '💖', '💐', '😘', '😏', '💍', '✨'];

let emojiInterval;

// Function to create a floating emoji
function createEmoji(emojiArray) {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.innerText = emojiArray[Math.floor(Math.random() * emojiArray.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (Math.random() * 2 + 3) + "s";
    emojiContainer.appendChild(emoji);

    // Remove emoji after animation finishes
    setTimeout(() => { emoji.remove(); }, 5000);
}

// Start Spooky Emojis immediately
function startEmojis(type) {
    clearInterval(emojiInterval);
    emojiInterval = setInterval(() => {
        createEmoji(type === 'spooky' ? spookyEmojis : cuteEmojis);
    }, 300);
}

startEmojis('spooky');

startBtn.addEventListener('click', () => {
    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('countdown-section').classList.remove('hidden');
    
    // Stop spooky emojis during countdown
    clearInterval(emojiInterval);
    
    let count = 5;
    timerDisplay.innerText = count;

    const cd = setInterval(() => {
        count--;
        if (count > 0) {
            timerDisplay.innerText = count;
        } else {
            clearInterval(cd);
            revealSurprise();
        }
    }, 1000);
});

function revealSurprise() {
    document.getElementById('countdown-section').classList.add('hidden');
    document.getElementById('surprise-section').classList.remove('hidden');
    
    body.classList.remove('spooky-bg');
    body.classList.add('happy-bg');
    
    // Start Cute Emojis
    startEmojis('cute');
}