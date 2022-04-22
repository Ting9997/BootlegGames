<template>
    <div id='game_body'>
        <button id='begin_game' v-on:click="startGame">Begin Game/Reset Game</button>
        <div class='snake_board'>
            
        </div>
    </div>
</template>

<!-- _______________________________________________________________ -->
<script>
//--variable declarations--\\
import appleImage from '@/assets/Apple.png';
// import $ from 'jquery'
/*
-1 = empty cell
-2 = food
1 = player
*/
const boardSize = 13;
const boardCellSize = 50;
const nullPos = "-200px";
const animationTime = 1000;// miliseconds it takes for body part to move from one cell to another
const maxPx = boardSize*boardCellSize;
var boardGrid, board;
var startingBoard = [// x, y, value
    [2, 6, 1],
    [3, 6, 1],
    [10, 6, -2],
]
var moveDirection, animtionMoveDirection, gameIsRunning, preTimestamp;
var bodyPieces = [];
var apple;

//--functions--\\
function createPlayerPeice(x, y, inputImage){
    let bodyPeice = document.createElement('img');
    bodyPeice.src = inputImage;
    bodyPeice.width = boardCellSize;
    bodyPeice.height = boardCellSize;
    bodyPeice.style.position = 'absolute';
    
    bodyPeice.style.left = x*boardCellSize+"px";
    bodyPeice.style.top = y*boardCellSize+"px";
    board.appendChild(bodyPeice);
    return bodyPeice
}
function updateApplePos(x, y){
    apple.style.left = x*boardCellSize+"px";
    apple.style.top = y*boardCellSize+"px";
}
// function pxToNum(pixleNumber){
//     return parseInt(pixleNumber, 10)
// }
function updatePlayerBody(timestamp){
    if (!preTimestamp) preTimestamp=timestamp;
    let delta = timestamp - preTimestamp;
    if (delta > 0){// updates when there's a change
        if (delta > animationTime){// when it's more than the animation time
            delta = delta-animationTime; //shift cordinate frame and update furture direction
            preTimestamp = timestamp-delta;
            let prevPeicePos;
            for (let index in bodyPieces){
                let body = bodyPieces[index];
                if (index == 0){ // updates head to the new animated positon
                    prevPeicePos = [body['x'], body['y']];
                    body['x'] = body['x'] + animtionMoveDirection[0];
                    body['y'] = body['y'] + animtionMoveDirection[1];
                    animtionMoveDirection = [...moveDirection];
                }else{ // updates body to previous body part
                    let temp = [body['x'], body['y']];
                    body['x'] = prevPeicePos[0];
                    body['y'] = prevPeicePos[1];
                    prevPeicePos = temp;
                }
            }
        }
        let prevPiece;
        let alpha = delta/animationTime;
        for (let index in bodyPieces){
            let body = bodyPieces[index];

            // let left = pxToNum(body['peice'].style.left);
            // let top = pxToNum(body['peice'].style.top);
            // body['peice'].style.left = (left+(speed*delta*moveDirection[0]))+"px";
            // body['peice'].style.top = (top+(speed*delta*moveDirection[1]))+"px";

            let left = body['x']*boardCellSize;
            let top = body['y']*boardCellSize;
            let change = alpha*boardCellSize;
            let xDir, yDir
            if (index==0){//actions on the head
                if (left < 0 || left > maxPx || top < 0 || top > maxPx){
                    gameIsRunning = false;
                }
                //move the head
                xDir = animtionMoveDirection[0];
                yDir = animtionMoveDirection[1];
            }else{//actions on non head
                xDir = prevPiece['x'] - body['x'];
                yDir = prevPiece['y'] - body['y'];
            }
            body['piece'].style.left = left+(xDir*change)+'px';
            body['piece'].style.top = top+(yDir*change)+'px';
            prevPiece = bodyPieces[index];
        }
    }

    if (gameIsRunning){
        window.requestAnimationFrame(updatePlayerBody);
    }
}

export default {
    name: 'SnakeGameCanvas',
    mounted() {
        boardGrid = [];
        for (let j=0; j<boardSize;j++){
            let temp = [];
            for (let i=0; i<boardSize;i++){
                temp[i] = -1;
            }
            boardGrid[j] = temp;
        }
        board = document.getElementsByClassName('snake_board')[0];
        apple = document.createElement('img');
        apple.src = appleImage;
        apple.width = boardCellSize;
        apple.height = boardCellSize;
        apple.style.position = 'absolute';
        apple.style.left = nullPos;
        apple.style.top = nullPos;
        board.appendChild(apple);
    },
    methods: {
        startGame: function(){
            //clear board
            for (let y in boardGrid){
                for (let x in boardGrid[y]){
                    boardGrid[y][x] = -1;
                }
            }

            //generate board
            for (let values of startingBoard){
                boardGrid[values[0]][values[1]] = values[2];
                if (values[2] == -2){
                    updateApplePos(values[0], values[1]);
                }
            }
            moveDirection = [0, 0];
            animtionMoveDirection = [...moveDirection];
            bodyPieces = [
                {x:3, y:6, piece:createPlayerPeice(3, 6, appleImage)},
                {x:2, y:6, piece:createPlayerPeice(2, 6, appleImage)},
            ];
            
            //connect inputs
            document.addEventListener('keypress', function(event){
                if (event.code == 'KeyA'){
                    moveDirection = [-1, 0];
                }else if(event.code == 'KeyD'){
                    moveDirection = [1, 0];
                }else if(event.code == 'KeyW'){
                    moveDirection = [0, -1];
                }else if(event.code == 'KeyS'){
                    moveDirection = [0, 1];
                }
            });

            //connect animtion frames and movment
            gameIsRunning = true;
            function checkForMovment(){
                if (moveDirection[0] != 0 || moveDirection[1] != 0){
                    animtionMoveDirection = moveDirection;
                    window.requestAnimationFrame(updatePlayerBody);//actually run the game
                }else{
                    window.requestAnimationFrame(checkForMovment);//wait until next render for movment
                }
            }
            window.requestAnimationFrame(checkForMovment);
        }
    }
}
</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.snake_board{
    width: 50px * 13;
    height: 50px * 13;
    background-color: var(--cus-black);
    position: relative;
}
#begin_game{
    width: 50px * 13;
    color: var(--cus-white);
    background-color: var(--cus-black);
}
#game_body{
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
</style>