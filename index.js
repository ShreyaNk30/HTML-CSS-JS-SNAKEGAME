// Game constants & Variables;
let inputDir={x:0, y:0};
let foodsnd= new Audio('music/food.mp3');
let gameovrsnd= new Audio('music/gameover.mp3');
let movesnd=new Audio('music/move.mp3');
let bgm=new Audio('music/fullbgm.mp3');
let speed = 5;
let score=0;
let lastPaintTime = 0;
let snakearr=[
    {x:13,y:15}
]
food={x:6,y:7};

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime) ;
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    // if u bump into yourself
    for(let i=1; i< snakearr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }

    if(snake[0].x>= 18 || snake[0].x<=0 || snake[0].y>= 18 || snake[0].y<=0){
        return true;
    }
    
    return false;
}
function gameEngine(){
    // part 1: updating snake array and food
    bgm.loop=true;
    bgm.play();
    if(isCollide(snakearr)){
        gameovrsnd.play();
        bgm.pause();
        inputDir={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakearr=[{x:13,y:15}];
        bgm.loop=true;
        bgm.play();
        score=0;
    }
    // if you have eaten the food increment the score and regenerate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsnd.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML="Highscore : " + highscoreval;
        }
        scoreBox.innerHTML="Score :"+score;
        snakearr.unshift({x: snakearr[0].x+inputDir.x, y: snakearr[0].y+inputDir.y });
        let a=2;
        let b=17;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake
    for(let i=snakearr.length-2;i>=0;i--){
        const element= snakearr[i];
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    // part 2: render the Food

    // display the snake
    board.innerHTML= "" ;
    snakearr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
                snakeElement.classList.add('head');
        }
       else{
        snakeElement.classList.add('snake');
       }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





// Main logic start here
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="Highscore : " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
     inputDir ={x: 0, y: 1};      // Start the game
     movesnd.play();
     switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
     }
});