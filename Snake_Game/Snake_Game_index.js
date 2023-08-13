// Game Variables
let inputdir={x:0,y:0};
let musicsound=new Audio('Snake Game - Theme Song.mp3');
let movsound=new Audio('change.mp3');
let oversound=new Audio("over.wav");
let eatsound=new Audio("eat.wav");
let speed=10;
let score=0;
let LastPaintTime=0;
let snakeArr=[
    {x:17, y:2}
]
food={x:5,y:6};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-LastPaintTime)/1000<1/speed){
        return;
    }
    LastPaintTime=ctime;
    gameEngine();
}
function iscollide(snake){
    for(let i=1;i<snake.length;i++)
    {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
        {
            return true;
        }
    }
    if (snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
    {
        return true;
    }
}




function gameEngine(){
    // part 1: Updating snake
    if(iscollide(snakeArr)){
        musicsound.pause();
        oversound.play();
        inputdir={x:0,y:0};
        alert("Game Over, Press any key to play again");
        snakeArr=[
            {x:17, y:2}
        ];
    }
    // If snake eats food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        score=score+1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="Hiscore: "+hiscoreval;
        }
        scorebox.innerHTML="Score: "+score;
        eatsound.play();
        snakeArr.unshift({x : snakeArr[0].x+inputdir.x, y :snakeArr[0].y+inputdir.y});
        let a=0;
        let b=18;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    }
    // snake moves
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;

    // part 2: Render the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;        
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);        
    });
    // part 2: Render the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;        
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement); 
}


//Main Logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore==null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore)
    hiscorebox.innerHTML="hiscore: "+hiscoreval;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    musicsound.play();
    inputdir={x:0,y:1}  //Start the Game
    movsound.play();
    switch(e.key){
        case "ArrowUp":
            inputdir.x=0;
            inputdir.y=-1;
            break;

        case "ArrowDown":
            inputdir.x=0;
            inputdir.y=1;
            break;

        case "ArrowLeft":
            inputdir.x=-1;
            inputdir.y=0;
            break;

        case "ArrowRight":
            inputdir.x=1;
            inputdir.y=0;
            break;

        default:
            break;

    }
});