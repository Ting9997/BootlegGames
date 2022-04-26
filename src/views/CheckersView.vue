<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Checkers
        </div>
    
        
        <div>Developed by Rajiv Williams</div>
        

        <!-- Checkers Game -->
        <div class="contents">
            <table class="checkersGrid">
              <tr>
                <td>
                  <table id="howToPlay">
                      <th>HOW TO PLAY</th>
                      <tr> 
                        <ol>
                          <li>Click the piece you want to move.</li>
                          <li>Click the space you want to move to.</li>
                        </ol>
                      </tr> 
                  </table>
                </td>
                <td><table id="checkerBoard"></table></td>
                <td>
                  <svg id="whos_turn_background">
                    <text id="whos_turn" x="15" y="55"></text>
                  </svg>
                </td>
              </tr>
            </table>
            
            <p id="printout"></p>
        </div>
    </BaseBackground>
</template>

<!-- _______________________________________________________________ -->

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import $ from 'jquery';
//import * as d3 from "d3";
export default {
    name: "CheckersView",
    components: {
        NavBar,
        BaseBackground
    },
    
}

$(document).ready(function(){

    let board = $('#checkerBoard');
    createBoard(board); 
    assignCheckers();  

    //Initializing whos_turn
    displayTurn("RED");
    $("span").click(showMoves);    
})

//GLOBAL VARIABLES
let checkerBoardSize = 8;

//let currentColor = ".red_checker";
/*
  For each cell in boardArray:
    not playable = null
    empty = -1
    black = 0
    red = 1
    king = 2
*/
let boardArray = make2DArray(checkerBoardSize);

//Red starts first
let redTurn = true;

function displayTurn(color){
  $("#whos_turn").text(""+color+"'S TURN");

  if(color == "RED"){
    $("#whos_turn").attr("fill","rgb(154, 0, 0)");
    $("#whos_turn").attr("x","25");
    $("#whos_turn_background").attr("style","background-color: #000000;border: 3px solid #9b1515;");
  }
  else{
    $("#whos_turn").attr("fill",color);
    $("#whos_turn").attr("x","15");
    $("#whos_turn_background").attr("style","background-color: #ded8d8;border: 3px solid "+color+";");
  } 
}

function makeKing(checker, color){  

  if(color == "red"){
    checker.attr("class","king_red");
  }
  else{
    checker.attr("class","king_black");
  }
  
  checker.attr("style","color: gray;");
  checker.text("K");
}


//Puts checker pieces in their starting positions
function assignCheckers(){
  //var r = document.getElementById("checkerBoard").rows;
    for(var i=0; i<checkerBoardSize; i++){
        for(var j=0; j<checkerBoardSize; j++){
          //Only in black squares
          if((i%2!=0 && j%2==0) || (i%2==0 && j%2!=0)){
            //Starting point for black checkers
            if(i < 3){
              assignColor("black",0,i,j);
              continue;
            }
            //Starting point for red checkers
            else if(i > 4){
              assignColor("red",1,i,j);
              continue;
            }
            boardArray[i][j] = -1;
          }
          //Not playable
          else{
            boardArray[i][j] = null;
          } 
        }
    }
    //document.getElementById("printout").innerHTML = boardArray;
}

function assignColor(color,value,i,j){
  var checker = $("<span>");
  checker.attr("class",""+color+"_checker");

  //add checker to current cell
  $("#cell" + i + j).append(checker);

  //Stores value of cell
  //  black = 0
  //  red = 1
  boardArray[i][j] = value;
}

function hideAllMoves(){
  for(var i=0; i<checkerBoardSize; i++){
      for(var j=0; j<checkerBoardSize; j++){
        //Only in black squares
        if((i%2!=0 && j%2==0) || (i%2==0 && j%2!=0)){
          //resets to default black square
          $("#cell" + i + j).attr("class","blackSquare");
        }
      }
  }
}

function checkAvailability(pieceMoves,currCoords,isJump){
  //document.getElementById("printout").innerHTML = $("cell"+pieceMoves[0]+pieceMoves[1]).children().length;
  // var newX = parseInt(pieceMoves[0]);
  // var newY = parseInt(pieceMoves[1]);
  var x = currCoords[0];
  var y = currCoords[1];
  var newX = parseInt(pieceMoves[0]);
  var newY = parseInt(pieceMoves[1]);
  var newCell = $("#cell"+(newX)+(newY));

  if(newCell.children().length == 0){
    addGlow(x,y,newX,newY,isJump);
    return true;
  }
  return false;
}

function addGlow(x,y,newX,newY,isJump){
  var oldCell = $("#cell"+x+y);
  var newCell = $("#cell"+(newX)+(newY));

  var checker = $(oldCell.children()[0]);
  var checkerColor = checker.attr("class").split("_")[0];

  if(isJump){
    var deleteCoords = [(newX + x) /2,(newY + y) / 2];
    var deleteChecker = $($("#cell"+deleteCoords[0]+deleteCoords[1]).children()[0]);
    var deleteColor = deleteChecker.attr("class").split("_")[0];

    //remove checker that is jumped over
    if(deleteColor != checkerColor){
      newCell.attr("class","glow");
      return true;
    }
  }
  else{
    newCell.attr("class","glow");
    return true;
  }
  return false;
}

function makeMove(pieceMoves,pieceValue,currCoords,isJump){
  var x = currCoords[0];
  var y = currCoords[1];
  var newX = parseInt(pieceMoves[0]);
  var newY = parseInt(pieceMoves[1]);

  var newCell = $("#cell"+(newX)+(newY));

  if(newCell.attr("class") == "glow"){
    newCell.click(function(){
      if($(this).children().length == 0 && boardArray[x][y] == pieceValue && boardArray[newX][newY] == -1){
        changeCells($(this),pieceValue,x,y,isJump);
        return true;
      }
    });
  }
  return false;
}

function changeCells(newCell,pieceValue,x,y,isJump){

  var oldCell = $("#cell"+x+y);
  var newCoords = newCell.attr("id").split("cell")[1];
  var newX = parseInt(newCoords[0]);
  var newY = parseInt(newCoords[1]);

  var checker = $(oldCell.children()[0]);
  var checkerColor = checker.attr("class").split("_")[0];

  //a move can be made
  var canMove = true;
  
  //If an opposite color is being jumped over
  if(isJump){
    //index of checker being jumped over is the
    //average of oldCell coordinates and newCell coordinates
    var deleteCoords = [(newX + x) /2,(newY + y) / 2];
    var deleteChecker = $($("#cell"+deleteCoords[0]+deleteCoords[1]).children()[0]);
    var deleteColor = deleteChecker.attr("class").split("_")[0];

    //remove checker that is jumped over if it is not the same color as current checker
    if(deleteColor != checkerColor){
      deleteChecker.remove();
      boardArray[deleteCoords[0]][deleteCoords[1]] = -1;
    }
    else{
      //a move cannot be made
      canMove = false;
    }  
  }

  //moving checker to new cell
  if(oldCell.attr("class") == "selected" && canMove){
    newCell.append(checker);
    boardArray[newX][newY] = pieceValue;
    boardArray[x][y] = -1; 
    hideAllMoves();

    //if reached opposite end of checkerBoard
    if((checkerColor == "red" && newX == 0) || (checkerColor == "black" && newX == 7)){
      //make current checker a King
      makeKing(checker,checkerColor);
    }        
  }

  //if new cell is successfully occupied
  if(newCell.children().length > 0){
    changeTurn();
  }  
}

//Shows available moves once a checker piece is clicked
//returns available moves
function showMoves(){

  //initially hides moves whenever function activated when clicked
  hideAllMoves();

  //checker that was clicked
  var currChecker = $(this);
  var currCell = currChecker.parent();

  //details that come in the form: "type_(checker/kingColor)" eg. "red_checker" or "king_red"
  var checkerDetails = currChecker.attr("class").split("_");

  //type of checker: red, black or king
  var checkerType = checkerDetails[0];   
  
  //"checker" = not a king
  //"red" or "black" = is a king
  var kingColor = checkerDetails[1];

  //checker coordinates in the checkerBoard
  var coords = currCell.attr("id").split("cell")[1];
  var x = parseInt(coords[0]);
  var y = parseInt(coords[1]);
  var currCoords = [x,y];

  //all possible moves for red and black checkers
  var redMoves = [[x-1,y-1],[x-1,y+1],[x-2,y-2],[x-2,y+2]];
  var blackMoves = [[x+1,y-1],[x+1,y+1],[x+2,y-2],[x+2,y+2]];
  
  //value of red and black checkers in the boardArray
  var redValue = 1;
  var blackValue = 0;

  //RED MOVES
  if(redTurn){
    //if the current checker is a normal red or a red king
    if(checkerType == "red" || kingColor == "red"){
      currCell.attr("class","selected");

      //given access to moves for a red checker
      checkerMoves(redMoves,redValue,currCoords);
    }
    //if the current checker is a red king
    if(checkerType == "king" && kingColor == "red"){

      //given access to moves for a black checker
      checkerMoves(blackMoves,redValue,currCoords);
    }
  }
  //BLACK MOVES
  else if(!redTurn){  
    //if the current checker is a normal black or a black king
    if(checkerType == "black" || kingColor == "black"){
      currCell.attr("class","selected");

      //given access to moves for a black checker
      checkerMoves(blackMoves,blackValue,currCoords);
    }
    //if the current checker is a black king
    if(checkerType == "king" && kingColor == "black"){

      //given access to moves for a red checker
      checkerMoves(redMoves,blackValue,currCoords);
    }
  }
}

function checkerMoves(moves,checkerValue,currCoords){
  //checking if you can move left once
  var leftStep = checkAvailability(moves[0],currCoords,false);
  if(leftStep){
    //granted access to move left once
    makeMove(moves[0],checkerValue,currCoords,false);
  }
  else{
    //checking if you can jump left once over a checker
    var leftJump = checkAvailability(moves[2],currCoords,true);
    if(leftJump){
      //granted access to jump left once
      makeMove(moves[2],checkerValue,currCoords,true);
    }
  }
  
  //checking if you can move right once
  var rightStep = checkAvailability(moves[1],currCoords,false);
  if(rightStep){
    //granted access to move right once
    makeMove(moves[1],checkerValue,currCoords,false);
  }
  else{
    //checking if you can jump right once over a checker
    var rightJump = checkAvailability(moves[3],currCoords,true);
    if(rightJump){
      //granted access to jump right once
      makeMove(moves[3],checkerValue,currCoords,true);
    }
  }
}

function changeTurn(){
  if(redTurn){
    redTurn = false;
    displayTurn("BLACK");
    return false;
  }
  if(!redTurn){
    redTurn = true;
    displayTurn("RED");
    return true;
  }
}

//Dynamically creates the checkerBoard
  function createBoard(board){  
      //Assigning cells to 'board'
      for(var i=0; i<checkerBoardSize; i++){
          var tr = $('<tr>');
          for(var j=0; j<checkerBoardSize; j++){
              var td = $('<td>');
              td.attr('id', 'cell' + i + j);
              td.attr("class","blackSquare");
              tr.append(td);
          }
          board.append(tr);
      }
      
  }

//---HELPER FUNCTIONS---
  function make2DArray(size){
      var array = new Array(size);

      for(var i=0; i<size; i++){
          array[i] = new Array(size);
      }

      return array;
  }

</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.td{
    background-color: var(--cus-trans-black);
}
#checkerBoard {
  margin-left:auto;
  margin-right:auto;
  border: 1px solid black;
  border-collapse: collapse;
}

#checkerBoard tr {
  border: 1px solid black;
  border-collapse: collapse;
}
#checkerBoard td {
  text-align: center;
  //font-size: 35px;
  width: 55px;
  height: 55px;
  border: 1px solid black;
  border-collapse: collapse;
  /* padding: 25px; */
}
//The Board Outline
#checkerBoard tr:first-child{
  border-top: 3px solid black;
}
#checkerBoard tr:last-child td{
  border-bottom: 3px solid black;
}
#checkerBoard td:first-child{
  border-left: 3px solid black;
}
#checkerBoard td:last-child{
  border-right: 3px solid black;
}

//Dark Colored Squares
// #checkerBoard tr:nth-child(2n) td:not(td:nth-child(2n)){
//     background-color: #0b0b0b;
// }
// #checkerBoard tr:not(tr:nth-child(2n)) td:nth-child(2n){
//     background-color: #0b0b0b;
// }
.blackSquare{
  background-color: #0b0b0b;
}
.selected{
  border-top: 1px solid rgb(72, 198, 4);
  border-collapse: collapse;
  background-color: rgb(72, 198, 4);
  
}

//Light Colored Squares
#checkerBoard tr:not(tr:nth-child(2n)) td:not(td:nth-child(2n)){
    background-color: #e5e5e5;
}
#checkerBoard tr:nth-child(2n) td:nth-child(2n){
    background-color: #e5e5e5;
}

.black_checker{
    height: 46px;
    width: 46px;
    background-color: black;
    border: 1px solid white;
    border-radius: 50%;
    display: inline-block;
}
.red_checker{
    height: 46px;
    width: 46px;
    background-color: rgb(154, 0, 0);
    border: 1px solid white;
    border-radius: 50%;
    display: inline-block;
}

//To-do change to .redKing
.king_red{
    height: 46px;
    width: 46px;
    background-color: rgb(154, 0, 0);
    border: 1px solid white;
    border-radius: 50%;
    display: inline-block;
}
.king_black{
    height: 46px;
    width: 46px;
    background-color: black;
    border: 1px solid white;
    border-radius: 50%;
    display: inline-block;
}
.hidden{
  display:none;
}

//Checker Grid Items
.checkersGrid{
  margin-left:auto;
  margin-right:auto;
  display: -ms-inline-grid;
}

#howToPlay{
  background-color: #ded8d8;
  position: relative;
  right: 80px;
  width: 100%;
}

//displays whose turn it is currently
#whos_turn{
  font: bold 15px sans-serif;
}

#whos_turn_background{
  width: 50%;
  height: 100px;
  background-color: #ded8d8;
  border: 3px solid #2d2a2a;
  border-collapse: collapse;
}

//a cell in sudoku board is available to move to
.glow{
  background-color: blanchedalmond;
  color: blanchedalmond;
}


</style>