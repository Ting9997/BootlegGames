<template>
    <div id='game_body'>
        <button id='begin_game' v-on:click="startGame">Begin Game/Reset Game</button>
        <div id='score_display'/>
        <div class='snake_board'>
            <table id='board_grid'/>
        </div>
    </div>
</template>

<!-- _______________________________________________________________ -->
<script>
//--variable declarations--\\
import appleImage from '@/assets/Apple.png';
import snakeHead from '@/assets/SnakeHead.png';
import snakeBody from '@/assets/SnakeBody.png';
/*
-1 = empty cell
-2 = food
1 = player
*/
const boardSize = 13;
const boardCellSize = 50;
const nullPos = "-200px";
const animationTime = 200;// miliseconds it takes for body part to move from one cell to another
var boardGrid, board;
var moveDirection, animtionMoveDirection, gameIsRunning, preTimestamp, moveDirectionList = [];
var apple, appleOnBoard = {x: -1, y: -1};
var bodyPieces = [];

var needsReset = false;

//--functions--\\
function createPlayerPiece(x, y, inputImage){
    // create piece
    let bodyPiece = document.createElement('img');
    bodyPiece.src = inputImage;
    bodyPiece.width = boardCellSize;
    bodyPiece.height = boardCellSize;
    bodyPiece.style.position = 'absolute';
    
    // update piece values
    bodyPiece.style.left = x*boardCellSize+"px";
    bodyPiece.style.top = y*boardCellSize+"px";
    board.appendChild(bodyPiece);
    return bodyPiece;
}
function updateApplePos(x, y){
    // update apple on screen
    apple.style.left = x*boardCellSize+"px";
    apple.style.top = y*boardCellSize+"px";
    // update apple stored value
    appleOnBoard['x'] = x;
    appleOnBoard['y'] = y;
    // update grid board
    boardGrid[y][x] = -2;
}
function updateScoreBoard(){
    let score = bodyPieces.length-2;
    if (localStorage.SnakeHighScore){
        if (localStorage.SnakeHighScore < score){
            localStorage.SnakeHighScore = score
        }
    }else{
        localStorage.SnakeHighScore = score
    }
    let scoreDispaly = document.getElementById('score_display');
    scoreDispaly.innerHTML = "High Score: " + localStorage.SnakeHighScore + "| Score: " + score;
}
function updateNextMovment(){
    if (moveDirectionList.length > 0){
        // dequeue movment from list and use it
        moveDirection = moveDirectionList.shift();
        // update head image rotation
        let head = bodyPieces[0];
        if (moveDirection[0] == 1){
            head['piece'].style.transform = `rotate(270deg)`;
        }else if (moveDirection[0] == -1){
            head['piece'].style.transform = `rotate(90deg)`;
        }else if (moveDirection[1] == 1){
            head['piece'].style.transform = `rotate(0deg)`;
        }else if (moveDirection[1] == -1){
            head['piece'].style.transform = `rotate(180deg)`;
        }
    }
}
function addNextMovement(x, y){
    // check if movment is invalid
    let checkDir;
    if (moveDirectionList.length > 0){
        checkDir = moveDirectionList[moveDirectionList.length-1]
    }else{
        checkDir = animtionMoveDirection;
    }
    if ((checkDir[0] != 0 && -1*checkDir[0] != x) || (checkDir[1] != 0 && -1*checkDir[1] != y) || (checkDir[0] == 0 && checkDir[1] == 0)){
        moveDirectionList.push([x, y]);
    }
    
}
function endGame(){
    gameIsRunning = false;
}
function updatePlayerBody(timestamp){
    if (needsReset){
        needsReset = false;
        return;
    }
    if (!preTimestamp) preTimestamp=timestamp;
    let delta = timestamp - preTimestamp;
    if (delta > 0){// updates when there's a change
        if (delta > animationTime){// when it's more than the animation time
            updateNextMovment()
            delta = delta-animationTime; //shift cordinate frame and update furture direction
            preTimestamp = timestamp-delta;

            //update player on grid board
            let prevPiecePos, checkX, checkY;
            for (let index in bodyPieces){
                let body = bodyPieces[index];
                if (index == 0){ // updates head to the new animated positon
                    prevPiecePos = [body['x'], body['y']];
                    body['x'] = body['x'] + animtionMoveDirection[0];
                    body['y'] = body['y'] + animtionMoveDirection[1];
                    checkX = body['x']+moveDirection[0];
                    checkY = body['y']+moveDirection[1];
                    boardGrid[body['y']][body['x']] = 1;
                    animtionMoveDirection = [...moveDirection];
                }else{ // updates body to previous body part
                    let temp = [body['x'], body['y']];
                    boardGrid[body['y']][body['x']] = -1;
                    body['x'] = prevPiecePos[0];
                    body['y'] = prevPiecePos[1];
                    boardGrid[body['y']][body['x']] = 1;
                    prevPiecePos = temp;
                }
            }

            let lastE = bodyPieces[bodyPieces.length-1];
            if (checkX > boardSize-1 || checkX < 0 || checkY > boardSize-1 || checkY < 0 || // check head is not going out of bounderies
                (boardGrid[checkY][checkX]==1 && (checkX-moveDirection[0] != lastE['x'] && checkY-moveDirection[1] != lastE['y']))){ // make sure head doesn't collide with body ignoring tail
                endGame();
                return;
            }

            // check for apple and create new body part if it's eaten
            if (boardGrid[appleOnBoard['y']][appleOnBoard['x']] == 1){
                // check if there's room on board
                let found = false;
                for (let row of boardGrid){
                    for (let cell of row){
                        if (cell == -1){
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }

                // generate new body piece
                let lastPeice = bodyPieces[bodyPieces.length-1];
                bodyPieces.push({x: lastPeice['x'], y: lastPeice['y'], piece: createPlayerPiece(lastPeice['x'], lastPeice['y'], snakeBody)});

                // generate new apple
                let placed = false;
                while(!placed){
                    let ranX = Math.floor((Math.random() * boardSize));
                    let ranY = Math.floor((Math.random() * boardSize));
                    if (boardGrid[ranY][ranX] == -1){
                        updateApplePos(ranX, ranY);
                        updateScoreBoard();
                        placed = true;
                    }
                }
            }
        }
        let prevPiece;
        let alpha = delta/animationTime;
        for (let index in bodyPieces){
            let body = bodyPieces[index];

            let left = body['x']*boardCellSize;
            let top = body['y']*boardCellSize;
            let change = alpha*boardCellSize;
            let xDir, yDir
            if (index==0){//actions on the head
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

        //generate grid pattern
        let tableGrid = document.getElementById('board_grid');
        for (let j=0; j<boardSize; j++){
            let tr = document.createElement('tr');
            for (let i=0; i<boardSize; i++){
                let td = document.createElement('td');
                tr.appendChild(td);
            }
            tableGrid.appendChild(tr);
        }
    },
    methods: {
        startGame: function(){
            //clear board
            for (let y in boardGrid){
                for (let x in boardGrid[y]){
                    boardGrid[y][x] = -1;
                }
            }
            for (let piece of bodyPieces){
                piece['piece'].remove();
            }
            if (gameIsRunning){ // activates needs reset instead of binding inputs
                needsReset = true;
            }else{ //connect inputs only on start game
                document.addEventListener('keypress', function(event){
                    if (event.code == 'KeyA'){
                        addNextMovement(-1, 0);
                    }else if(event.code == 'KeyD'){
                        addNextMovement(1, 0);
                    }else if(event.code == 'KeyW'){
                        addNextMovement(0, -1);
                    }else if(event.code == 'KeyS'){
                        addNextMovement(0, 1);
                    }
                });
            }

            //generate board and player
            updateApplePos(10, 6);
            moveDirectionList = [];
            moveDirection = [0, 0];
            animtionMoveDirection = [...moveDirection];
            bodyPieces = [];
            bodyPieces.push({x:3, y:6, piece:createPlayerPiece(3, 6, snakeHead)});
            bodyPieces[0]['piece'].style.transform = `rotate(270deg)`;
            bodyPieces.push({x:2, y:6, piece:createPlayerPiece(2, 6, snakeBody)});
            updateScoreBoard();

            //connect animtion frames and movment
            gameIsRunning = true;
            function checkForMovment(){
                if (moveDirectionList.length > 0){
                    updateNextMovment()
                    animtionMoveDirection = moveDirection;
                    preTimestamp = null;
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
    font-family: var(--cus-title-font);
}
#game_body{
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#board_grid{
    width: 100%;
    height: 100%;
    position: relative;
}
#board_grid tr td{
    background-color: var(--cus-white);
}
#board_grid tr:nth-child(even) td:nth-child(odd), #board_grid tr:nth-child(odd) td:nth-child(even)
{
    background-color: var(--cus-trans-blue);
}

#score_display{
    width: 50px * 13;
    height: 30px;
    position: relative;
    background-color: var(--cus-black);
    font-family: var(--cus-title-font);
    color: var(--cus-white);
}
</style>