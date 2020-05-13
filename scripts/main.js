const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

//create unit
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/food.png"

//load audio
const ping = new Audio();
ping.src = "audio/ping.wav"

const dead = new Audio();
dead.src = "audio/dead.wav"


//create snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

//create the score
let score = 0;

//control the snake
document.addEventListener('keydown', direction)

let d = '';
function direction (event){    
    if(event.keyCode === 37 && d !='right'){
        d = 'left';
    } else if(event.keyCode === 38 && d !='down') {
        d = 'up';
    } else if(event.keyCode === 39 && d !='left') {
        d = 'right';
    } else if(event.keyCode === 40 && d !='up ') {
        d = 'down';
    } else if(event.keyCode === 32){
        location.reload();
    }
}

//check for collision
function collision(head, array){
    for(let i = 0; i < array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function endScreen(){
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillRect(1 * box, 3 * box, 17 * box, 15 * box)

    ctx.fillStyle = "rgb(232, 73, 30)";
    ctx.fillRect(2 * box,7 * box, 15 * box, 7 * box)

    ctx.fillStyle = "white";
    ctx.font  = "45px arial";
    ctx.fillText("GAME OVER", 5.5 * box, 10 * box);
    ctx.fillText("You scored: " + score, 5.5 * box, 11.5 * box);

    ctx.font  = "20px arial";
    ctx.fillText("press space to play again", 6.3 * box, 13 * box);
}

//draw to canvas
function draw() {
    //ground
    ctx.drawImage(ground, 0, 0);

    //snake
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "rgb(1, 128, 0)":"rgb(65, 163, 63)";
        ctx.fillRect(snake[i].x,snake[i].y,box, box)
    }
    //food
    ctx.drawImage(foodImg, food.x, food.y)

    //old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

    //move in direction
    if(d === 'left')snakeX -= box;
    if(d === 'up')snakeY -= box;
    if(d === 'right')snakeX += box;
    if(d === 'down')snakeY += box;

    //if snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        ping.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    } else {
        //remove the tail
        snake.pop();
    }

      //add new head
      let newHead  = {
        x: snakeX,
        y: snakeY
    }

    //GAME OVER
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
        endScreen();
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);
    

    //score
    ctx.fillStyle = "white";
    ctx.font  = "45px arial";
    ctx.fillText(score, 2 * box, 1.6 * box);

    ctx.font  = "55px arial";
    ctx.fillText("Snake", 7 * box, 1.8 * box);



}

//call draw function every 100ms
let game = setInterval(draw, 130);