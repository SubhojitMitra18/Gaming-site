console.log("Welecome to Tic Tac Toe")
let music = new Audio("background.mp3")
let audioturn = new Audio("daan.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let over = false;



//function to change the turn
const changeTurn = () => {

    return turn === "X" ? "0" : "X"
}


// function to check for win 
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2,5,5,0],
        [3, 4, 5,5,15,0],
        [6, 7, 8,5,25,0],
        [0, 3, 6,-5,15,90],
        [1, 4, 7,5,15,90],
        [2, 5, 8,15,15,90],
        [0, 4, 8,5,15,45],
        [2, 4, 6,5,15,135]
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            over = true;
            document.getElementById('imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.getElementById('line').style.width="25vw";
            document.getElementById('line').style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
}

// Game Logic

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioturn.play();
            checkWin();
            if (!over) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
            }
        }
    })

})

// Clicking the reset button

reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    over = false;
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.getElementById('imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementById('line').style.width="0px";
})

