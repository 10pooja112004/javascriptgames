//board

var blocksize=25;
var rows = 20;
var cols = 20;
var board;
var context; //our drawing object

//snake head
var snakeX = blocksize*5;
var snakeY = blocksize*5;


//changeDirection
var velocityX = 0;
var velocityY = 0;

var snakebody=[];// this array will add each segments 

//snake food

var foodX;
var foodY;

var gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows*blocksize;
    board.width = cols*blocksize;
    context = board.getContext("2d");//used for drawing on the board

    placefood();
    document.addEventListener("keyup", changeDirection);
   // update();
   setInterval(update, 2000/10);//(1000millisec/10)  every 100 millisec the update function is going to run
}

function update(){
    if(gameover){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0, board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blocksize,blocksize);

    if(snakeX == foodX && snakeY == foodY)//snake eat food
    {
        snakebody.push([foodX,foodY])
        placefood();
    }

    for(let i = snakebody.length-1; i>0; i--){  //in this we are telling the tail to wait umtil thw the head moves it moves like one by one 
        snakebody[i] = snakebody[i-1];

    }

    if(snakebody.length){ //here the head become the tail then the new eaten food become the head and the segments keepon aggregate
        snakebody[0] = [snakeX, snakeY];
    }
    context.fillStyle="green";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);//(x-coordinates,y-coordinates,width,height)
    for (let i=0 ; i< snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize,blocksize);
    }


    //gameover conditions

    
    if(snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize){
        gameover = true;
        alert("Game Over");
    }

    for(let i = 0; i < snakebody.length; i++){
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
             gameover = true;
             alert("Game Over");    
         }
    }
    
    
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placefood() {
    //0-1 *cols ->(0-19.999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}

