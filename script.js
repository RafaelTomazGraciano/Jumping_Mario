
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const button = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameStarted = false;
let loop = null;
let scoreInterval = null;

pipe.style.animation = 'none';
pipe.style.display = 'none';

function setPipeSpeed(currentScore = 0) {
    let base = 3;
    let min = 1.2;
    let speed = Math.max(base - currentScore * 0.005, min);
    pipe.style.animation = `pipe-animation ${speed}s linear infinite`;
}

function startGame() {
    gameStarted = true;
    pipe.style.left = '';
    button.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = score;
    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
    mario.style.animation = '';

    pipe.style.display = 'block';
    setPipeSpeed(score);

    scoreInterval = setInterval(() => {
        score++;
        scoreDisplay.textContent = score;
        setPipeSpeed(score);
    }, 1000);

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '60px';
            
            button.style.display = 'block';
            gameStarted = false;
            clearInterval(scoreInterval);
            clearInterval(loop);
        }
    }, 10);
}

const jump = () => {
    if (!gameStarted) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}


button.addEventListener('click', startGame);


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!gameStarted) {
            startGame();
        } else {
            jump();
        }
    }
});