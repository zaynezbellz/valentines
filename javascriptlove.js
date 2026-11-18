const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')] //square brackets to identify how many div are in the hole div
let scoreEl = document.querySelector('.score span')
let score = 0
let gameOver = false;
let gameOverText = document.getElementById('gameover');
const winningScore = 100;

const playButton = document.getElementById('playButton');
const startScreen = document.getElementById('startScreen');
const gameBoard = document.getElementById('gameBoard');


//AUDIOS
const sparkle = new Audio("magical-twinkle-sound.mp3");
const explosion = new Audio("explosion-sound-effect.mp3");
const pageturn = new Audio("page-turn-sound.mp3");
const playsfx = new Audio("start-button.mp3");
const yay = new Audio("yay-kids-celebration.mp3");
const wahwahwah = new Audio("wah-wah-wah.mp3");
const wrong = new Audio("wrong-answer.mp3");
//LETTER OPEN
const envelope = document.getElementById('envelope');
document.querySelector(".envelope").addEventListener("click", function () {
    this.classList.toggle("open");
    pageturn.currentTime = 0;
    pageturn.play();

    setTimeout(() => {
        pageturn.pause();
        pageturn.currentTime = 0; // reset so it can play again clean
    }, 1000);
});


const envelope2 = document.getElementById('envelope2');

envelope2.addEventListener("click", function () {
    this.classList.add("open"); // use add instead of toggle
    pageturn.currentTime = 0;
    pageturn.play();

    setTimeout(() => {
        pageturn.pause();
        pageturn.currentTime = 0; // reset for next use
    }, 1000);
}, { once: true }); // <-- this makes it fire only once



playButton.addEventListener('click', () => {
    // hide the start screen
    startScreen.style.display = 'none';

    // show the game board
    gameBoard.style.display = 'block';
    playsfx.currentTime = 0;
    playsfx.play();

    setTimeout(() => {
        playsfx.pause();
        playsfx.currentTime = 0; // reset so it can play again clean
    }, 1500); // 500ms = 0.5 seconds

    // start the game
        run();
});
function run() {
    if (gameOver) return; // stop generating items when game ends

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');

    // 50% chance this img is a bomb
    const isBomb = Math.random() < 0.5;

    if (isBomb) {
        img.classList.add('bomb');
        img.src = "https://64.media.tumblr.com/6b2f28b4ddac41183c5fe12063f1718a/b9a28c12fb3e99af-d0/s1280x1920/1cc191ff14f667b93c634e4ec6f5b06e26c7eb53.pnj";
    } else {
        img.classList.add('heart');
        img.src = "https://64.media.tumblr.com/752f191fba71b20add743f492b7013e4/4af75b1641535278-c9/s1280x1920/5de425203786f66f1baa34b86987222778d521d7.pnj";
    }

    // click event
    img.addEventListener('click', () => {

        if (gameOver) return;

        if (isBomb) {
            //  GAME OVER
            //sfx
            explosion.currentTime = 0;
            explosion.play();

            wahwahwah.currentTime = 0;
            wahwahwah.play();

            //image when clicked
            img.src = "https://64.media.tumblr.com/42db40410c24db6c8e714f87ec3263a8/2b910e0d34c2fc95-0c/s1280x1920/c59b823b788f81c6ade8ea233cfd674fd8738481.pnj";

            gameOver = true;
            //makes sure the timer resets
            clearTimeout(timer);

            //waits 500 miliseconds after game over
            setTimeout(() => {
            document.getElementById('finalScore').textContent = score;
            document.getElementById('gameBoard').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'block';
            gameOverText.innerHTML = 'GAME OVER!';
            }, 500)


            return;
        } else {
            // when HEART is clicked
            score += 10;
            //sfx
            sparkle.currentTime = 0;
            sparkle.play();
            scoreEl.textContent = score;
            //image when clicked
            img.src = "https://64.media.tumblr.com/9ee6a48ea0c45e0abfc9111f98f93546/810c49da9d6a1e32-2e/s1280x1920/2bdfbc1e4a34b3e3c41f46ecca2b79cad9b1bbcd.pnj";

            //waits 500 mileseconds
            clearTimeout(timer);
            setTimeout(() => {
                hole.removeChild(img);
                run();
            }, 500);

            if (score >= winningScore) {
                gameOver = true;

                setTimeout(() => {
                    document.getElementById('gameBoard').style.display = 'none';
                    document.getElementById('winScreen').style.display = 'block';
                }, 500)
            }
        }
    });

    hole.appendChild(img);

    // remove img after 1 second if not clicked
    timer = setTimeout(() => {
        if (hole.contains(img)) {
            hole.removeChild(img);
            run();
        }
    }, 1000);
}

const restartBtn = document.getElementById('restartBtn');

restartBtn.addEventListener('click', () => {

    score = 0;
    scoreEl.textContent = score;
    gameOver = false;


    document.querySelectorAll('.heart, .bomb').forEach(el => el.remove());


    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';

    playsfx.currentTime = 0;
    playsfx.play();

    setTimeout(() => {
        playsfx.pause();
        playsfx.currentTime = 0; // reset so it can play again clean
    }, 1500);

    run();
})

const winRestartBtn = document.getElementById('winRestartBtn');
const yesBtn = document.getElementById("yesBtn");
let question = document.getElementById('question');
winRestartBtn.style.display = "none";

// 👇 Show restart when Yes is clicked
yesBtn.addEventListener("click", () => {
    winRestartBtn.style.display = "inline-block";
    question.innerHTML = 'You did the right choice!!!';
    yesBtn.remove();
    yay.currentTime = 0;
    yay.play();
});

winRestartBtn.addEventListener('click', () => {

    playsfx.currentTime = 0;
    playsfx.play();

    setTimeout(() => {
        playsfx.pause();
        playsfx.currentTime = 0; // reset so it can play again clean
    }, 1500);

    score = 0;
    scoreEl.textContent = score;
    gameOver = false;


    document.querySelectorAll('.heart, .bomb').forEach(el => el.remove());

    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    run();
});



const special = document.getElementById('envelope');
const special1 = document.getElementById('playButton');
const special2 = document.getElementById('yesBtn');
const special3 = document.getElementById('noBtn');
//for the cursor to follow the movement of the original cursor
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})
// when mouse is pressed
window.addEventListener('mousedown', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/08ed23fb5b5341dc3a507c2111a4cf01/0f7fffd8846f0895-e5/s1280x1920/e4b9218a411102ab738c375044cac55e53f6c80a.pnj')";
});
//when cursor is released
window.addEventListener('mouseup', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/a409d7370de186305153faecafa35867/0f7fffd8846f0895-8d/s1280x1920/465f9d1f39a40f42f517fe8065c991d49f103944.pnj')";
});


special.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})

special.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/a0cc01d6eba89aaedce4dc3854118c8f/0f7fffd8846f0895-3a/s1280x1920/42673e510846b51fbaa813aeb399d7889dda0362.pnj')";
});

special.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/debf51aec5c69c06f8459f05eafcc19d/0f7fffd8846f0895-40/s1280x1920/d13dfb1b0efd53da5ebcc7baf5d3cf907925a35f.pnj')";
});



special1.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})

special1.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/f96f35102e31610e91610cdec63ca54a/0f7fffd8846f0895-8e/s1280x1920/0da0da6896aad26c4d76c00f7b237ecb04bc6098.pnj')";
});

special1.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/a0cc01d6eba89aaedce4dc3854118c8f/0f7fffd8846f0895-3a/s1280x1920/42673e510846b51fbaa813aeb399d7889dda0362.pnj')";
});




special2.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})

special2.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/f96f35102e31610e91610cdec63ca54a/0f7fffd8846f0895-8e/s1280x1920/0da0da6896aad26c4d76c00f7b237ecb04bc6098.pnj')";
});

special2.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/a0cc01d6eba89aaedce4dc3854118c8f/0f7fffd8846f0895-3a/s1280x1920/42673e510846b51fbaa813aeb399d7889dda0362.pnj')";
});



special3.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})

special3.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/f96f35102e31610e91610cdec63ca54a/0f7fffd8846f0895-8e/s1280x1920/0da0da6896aad26c4d76c00f7b237ecb04bc6098.pnj')";
});

special3.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('https://64.media.tumblr.com/a0cc01d6eba89aaedce4dc3854118c8f/0f7fffd8846f0895-3a/s1280x1920/42673e510846b51fbaa813aeb399d7889dda0362.pnj')";
});




const noBtn = document.getElementById("noBtn");
const container = document.querySelector(".answers");

let moveCount = 0;
const maxMoves = 6;

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= maxMoves) return;

    moveCount++;

    // FIRST 3 MOVES (random inside container)
    if (moveCount < maxMoves) {

        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    }

    // 4TH MOVE (escape the screen)
    else {
        noBtn.style.transition = "all 0.6s ease";

        // send it far off screen
        noBtn.style.left = window.innerWidth + "px";
        noBtn.style.top = "-400px";
    }

    noBtn.addEventListener('mousedown', () => {
        wrong.currentTime = 0;
        wrong.play();
    });
});




