let score = 0;
const requiredScore = 100;
let gameActive = false;

document.getElementById('startGame').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    startGame();
});

function startGame() {
    gameActive = true;
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('gameContainer');

      
    // Update the instructions to show 40 hearts
    document.querySelector('.instructions').textContent = 'Catch 100 hearts to reveal my answer!';
    
    // Player movement
    gameContainer.addEventListener('mousemove', (e) => {
        const rect = gameContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - player.offsetWidth / 2;
        if(x >= 0 && x <= gameContainer.offsetWidth - player.offsetWidth) {
            player.style.left = x + 'px';
        }
    });

    // Spawn hearts
    const spawnHeart = () => {
        if(!gameActive) return;
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
        heart.style.top = '-20px';
        gameContainer.appendChild(heart);

        const fall = () => {
            if(!gameActive) return;
            const currentTop = parseInt(heart.style.top);
            const playerRect = player.getBoundingClientRect();
            const heartRect = heart.getBoundingClientRect();

            // Check collision
            if (heartRect.bottom >= playerRect.top &&
                heartRect.top <= playerRect.bottom &&
                heartRect.right >= playerRect.left &&
                heartRect.left <= playerRect.right) {
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
                heart.remove();
                
                if(score >= requiredScore) {
                    gameWon();
                    return;
                }
            }

            if(currentTop < gameContainer.offsetHeight) {
                heart.style.top = (currentTop + 2) + 'px';
                requestAnimationFrame(fall);
            } else {
                heart.remove();
            }
        };
        requestAnimationFrame(fall);
    };

    setInterval(spawnHeart, 800);
}

function gameWon() {
    gameActive = false;
    document.getElementById('gameContainer').style.display = 'none';
    const response = document.getElementById('response');
    response.style.display = 'block';
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    
    // Add celebration effects
    createCelebrationHearts();
}

function createCelebrationHearts() {
    for(let i = 0; i < 100; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'celebration-heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            document.body.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}