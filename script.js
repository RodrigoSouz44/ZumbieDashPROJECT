const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const playButton = document.querySelector('.play-button');
const gameOverMessage = document.querySelector('.game-over-message');

let gameInterval;
let isGameRunning = false;
let pipeSpeed = 3; // Velocidade inicial do pipe
let speedIncreaseInterval = 5000; // Intervalo em milissegundos para aumentar a velocidade
let speedIncreaseFactor = 0.1; // Fator de aumento da velocidade

const jump = () => {
    if (!isGameRunning) return; // Não faz nada se o jogo não estiver rodando

    if (!mario.classList.contains('jump')) { // Garante que o pulo não seja repetido
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 1000); // O tempo deve corresponder à duração da animação de pulo
    }
}

const startGame = () => {
    if (isGameRunning) return; // Não inicia o jogo se já estiver rodando
    isGameRunning = true;
    playButton.style.display = 'none'; // Oculta o botão 'Play'
    gameOverMessage.style.display = 'none'; // Oculta a mensagem de fim de jogo

    // Reinicia o jogo
    mario.src = 'https://media.giphy.com/media/RM4bBdGjvEhMRNChaq/giphy.gif'; // Imagem original de Mario
    mario.style.width = '220px';
    mario.style.marginLeft = '0px';
    
    // Reinicia a animação do pipe
    pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
    
    // Inicia o intervalo para aumentar a velocidade do pipe
    const speedIncreaseIntervalId = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(speedIncreaseIntervalId);
            return;
        }
        pipeSpeed = Math.max(1, pipeSpeed - speedIncreaseFactor); // Não deixa a velocidade ficar muito baixa
        pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
    }, speedIncreaseInterval);

    gameInterval = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseFloat(window.getComputedStyle(mario).bottom);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {
            endGame();
        } else if (pipePosition <= -100) {
            // Reseta o pipe quando ele sai da tela
            pipe.style.left = '100%'; // Coloca o pipe fora da tela novamente
        }
    }, 10);
}

const endGame = () => {
    isGameRunning = false;
    clearInterval(gameInterval);
    pipe.style.animation = 'none'; // Para a animação do pipe
    mario.style.animation = 'none'; // Para a animação de pulo

    mario.src = 'https://image.shutterstock.com/image-vector/mario-icon-video-game-character-260nw-1755373014.jpg'; // Imagem de Mario parado
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    playButton.style.display = 'block'; // Mostra o botão 'Play' novamente
    gameOverMessage.style.display = 'block'; // Mostra a mensagem de fim de jogo
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

playButton.addEventListener('click', startGame);
