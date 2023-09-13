//Game constants & variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakearray = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };


//GAME FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakearray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
         return true;
    }
    return false;

}


function gameEngine() {
    //part 1: updating snake array and food
    if (isCollide(snakearray)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("gameover.press any key to play again!");
        snakearray = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }
    // if you have eaten food then update score and regnerate the food
    if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innnerHTML = "Hiscore:" + hiscoreval;
        }
        scoreBox.innerHTML = "score:" + score;
        snakearray.unshift({ x: snakearray[0].x + inputDir.x, y: snakearray[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    // moving the snake
    for (let i = snakearray.length - 2; i >= 0; i--) {
        snakearray[i + 1] = { ...snakearray[i] };
    }
    snakearray[0].x += inputDir.x;
    snakearray[0].y += inputDir.y;

    //part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakearray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//Main logic starts here
 musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innnerHTML = "Hiscore:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }// start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});