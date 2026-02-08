// 1. Define all elements
const body = document.getElementById('body');
const emojiContainer = document.getElementById('emoji-container');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');

const spookyEmojis = ['👻', '💀', '🕸️', '🦇', '🕯️'];
const cuteEmojis = ['❤️', '💖', '💐', '😘', '😏', '💍', '✨'];

let emojiInterval;

// 2. Function to create floating emojis
function createEmoji(emojiArray) {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.innerText = emojiArray[Math.floor(Math.random() * emojiArray.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (Math.random() * 2 + 3) + "s";
    emojiContainer.appendChild(emoji);

    setTimeout(() => { emoji.remove(); }, 5000);
}

// 3. Control the emoji flow
function startEmojis(type) {
    clearInterval(emojiInterval);
    emojiInterval = setInterval(() => {
        createEmoji(type === 'spooky' ? spookyEmojis : cuteEmojis);
    }, 300);
}

// Start with spooky emojis immediately
startEmojis('spooky');

// 4. The Click Event
startBtn.addEventListener('click', () => {
    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('countdown-section').classList.remove('hidden');
    
    // Clear spooky emojis during countdown
    clearInterval(emojiInterval);
    
    let count = 5;
    timerDisplay.innerText = count;

    const cd = setInterval(() => {
        count--;
        if (count > 0) {
            timerDisplay.innerText = count;
        } else {
            clearInterval(cd);
            document.getElementById('countdown-section').classList.add('hidden');
            document.getElementById('surprise-section').classList.remove('hidden');
            
            // Switch background and start happy emojis
            body.classList.remove('spooky-bg');
            body.classList.add('happy-bg');
            startEmojis('cute');
        }
    }, 1000);
});