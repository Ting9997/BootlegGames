<template>
  <table class="checkersGrid">
    <tr>
      <td>
        <table id="howToPlay">
            <th>RULES</th> 
            <tr> 
              <td>
                <ul>
                  <li>This is a two player game (No CPU).</li>
                  <li>You can only jump once per move.</li>
                </ul>
              </td>
            </tr>
            <th>HOW TO PLAY</th>
            <tr> 
              <td>
                <ul>
                  <li>Click the piece you want to move.</li>
                  <li>Click the space you want to move to.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Have fun!</td>
            </tr>
        </table>
      </td>
      <td><table id="checkerBoard"></table></td>
      <td>
        <svg id="gameCond_background">
          <text id="whos_turn" x="15" y="55"></text>
          <text id="who_won" x="15" y="55"></text>
        </svg>
      </td>
    </tr>
  </table>
  <p id="printout"></p>
 
</template>

<!-- _______________________________________________________________ -->

<script>
import $ from 'jquery';
import * as d3 from "d3";
export default {
    name: "CheckersGame",
    mounted(){
      $(document).ready(function(){
        let board = $('#checkerBoard');
        createBoard(board); 
        assignCheckers();  

        //Initializing whos_turn
        displayTurn("RED");

        if(!gameEnd){
          $("span").click(showMoves);
        }
      });
    }
}

//-------GLOBAL VARIABLES-------

//Red starts first
let redTurn = true;

let gameEnd = false;
let checkerBoardSize = 8;

let boardArray = make2DArray(checkerBoardSize);
/*
  For each cell in boardArray:
    not playable = null
    empty = -1
    black = 0
    red = 1
*/

//-------MAIN CHECKERS GAME FUNCTIONS-------

/*
  Checks all possible final game outcomes

  variables:
    -isTrapped = if a checker cannot move
*/
function checkWinCond(isTrapped){

  //the amount of each checker according to color
  var redCount = 0;
  var blackCount = 0;

  for(var i = 0; i < boardArray.length; i++){
    for(var j = 0; j < boardArray.length; j++){
      if(boardArray[i][j] == 0){
        blackCount += 1;
      }
      if(boardArray[i][j] == 1){
        redCount += 1;
      }
    }
  }

  if(!isTrapped){
    if(redCount == 1 && blackCount == 1){
      //draw
      displayWin("NONE");
      return true;
    }
    if(blackCount == 0){
      //red wins
      displayWin("RED");
      return true;
    }
    if(redCount == 0){
      //black wins
      displayWin("BLACK");
      return true;
    }
  }
  //if a piece is trapped
  else{
    if(blackCount == 1 && (redCount > blackCount)){
      //red wins
      displayWin("RED");
      return true;
    }
    if(redCount == 1 && (redCount < blackCount)){
      //black wins
      displayWin("BLACK");
      return true;
    }
  }
  return false;
}

//Displays which color has won or if there is a draw
function displayWin(color){

  //Hide who's turn it is
  $("#whos_turn").attr("class","hidden");

  $("#who_won").text(""+color+" WON!");
  if(color == "RED"){
    d3.select("#who_won")
      .attr("fill","rgb(154, 0, 0)")
      .attr("x","35");
    
    d3.select("#gameCond_background")
      .style("background-color","#ded8d8")
      .style("border","3px solid #9b1515");
  }
  if(color == "BLACK"){
    d3.select("#who_won")
      .attr("fill",color)
      .attr("x","25");
    
    d3.select("#gameCond_background")
      .style("background-color","#ded8d8")
      .style("border","3px solid "+color);
  }
  if(color == "NONE"){
    $("#who_won").text("DRAW");
    d3.select("#who_won")
      .attr("fill","black")
      .attr("x","47");
    
    d3.select("#gameCond_background")
      .style("background-color","#ded8d8")
      .style("border","3px solid black");
  }
}

//Displays which color has a turn
function displayTurn(color){
  $("#whos_turn").text(""+color+"'S TURN");

  if(color == "RED"){
    d3.select("#whos_turn")
      .attr("fill","rgb(154, 0, 0)")
      .attr("x","25");
    
    d3.select("#gameCond_background")
      .style("background-color","#000000")
      .style("border","3px solid #9b1515");
  }
  else{
    d3.select("#whos_turn")
      .attr("fill",color)
      .attr("x","15");
    
    d3.select("#gameCond_background")
      .style("background-color","#ded8d8")
      .style("border","3px solid "+color);
  } 
}

//Makes a normal checker a king checker
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

//Helper function for assignCheckers()
function assignColor(color,value,x,y){
  var checker = $("<span>");
  checker.attr("class",""+color+"_checker");

  //add checker to current cell
  $("#cell" + x + y).append(checker);

  //Stores value of cell
  //  black = 0
  //  red = 1
  boardArray[x][y] = value;
}

//Hides all highlights of cells where applicable
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

/*
  Shows available moves according to a checker's color and current coordinates

  variables:
    -moves = coordinates of possible move
    -currCoords = current coordinates
    -isJump = boolean of whether or not the move is a jump move
*/
function checkAvailability(moves,currCoords,isJump){
  var x = currCoords[0];
  var y = currCoords[1];
  var newX = parseInt(moves[0]);
  var newY = parseInt(moves[1]);
  var newCell = $("#cell"+(newX)+(newY));

  //if the cell is vacant and doesn't have a checker
  if(newCell.children().length == 0){
    addGlow(x,y,newX,newY,isJump);
    return true;
  }
  return false;
}

/*
  Highlights a cell where a checker can move

  variables:
    -x,y = coordinates of current checker
    -newX,newY = coordinates of potentially available cell
    -isJump = boolean of whether or not the move is a jump move
*/
function addGlow(x,y,newX,newY,isJump){
  var oldCell = $("#cell"+x+y);
  var newCell = $("#cell"+(newX)+(newY));

  var checker = $(oldCell.children()[0]);
  var checkerColor = checker.attr("class").split("_")[0];

  //if the checker is a king, it gets the king's color
  var kingColor = checker.attr("class").split("_")[1];
  if(kingColor != "checker"){
    //to ensure you can't jump over your own king
    checkerColor = kingColor;
  }

  //if a jump move is being made
  if(isJump){
    //coordinates of cell that is being jumped over (average of new and old cell coordinates)
    var deleteCoords = [(newX + x) /2,(newY + y) / 2];

    //checker that is being deleted
    var deleteChecker = $($("#cell"+deleteCoords[0]+deleteCoords[1]).children()[0]);

    //color of checker being deleted
    var deleteColor = deleteChecker.attr("class").split("_")[0];
    var deleteKingColor = deleteChecker.attr("class").split("_")[1];

    /*
      updates the color of the checker being deleted if it is a king
      (makes sure you cannot jump over your own king)
    */
    if(deleteKingColor != "checker"){
      deleteColor = deleteKingColor;
    }

    /*
      if checker being deleted is a different color
      (makes sure a jump cannot take place with same colored checkers)
    */
    if(deleteColor != checkerColor){
      newCell.attr("class","glow");
      return true;
    }
  }
  //if a regular step move is being made
  else{
    newCell.attr("class","glow");
    return true;
  }
  return false;
}

/*
  Allows a move to be made in the relevant coordinates

  variables:
    -moves = coordinates of possible move
    -checkerValue = color value of the checker
    -currCoords = current coordinates
    -isJump = boolean of whether or not the move is a jump move
*/
function makeMove(moves,checkerValue,currCoords,isJump){
  var x = currCoords[0];
  var y = currCoords[1];
  var newX = parseInt(moves[0]);
  var newY = parseInt(moves[1]);

  var newCell = $("#cell"+(newX)+(newY));

  //if cell is available
  if(newCell.attr("class") == "glow"){
    //new cell can be clickable
    newCell.click(function(){
      //if new cell is empty and the checker being used is the same as its pieceValue (to double check)
      if($(this).children().length == 0 && boardArray[x][y] == checkerValue){
        changeCells($(this),checkerValue,x,y,isJump);
        return true;
      }
    });
  }
  return false;
}

/*
  Changes cells accordingly if conditions are met

  variables:
    -newCell = cell the checker is being moved to
    -pieceValue = the color value of the checker
    -x,y = coordinates of the checker
    -isJump = boolean of whether or not the move is a jump move
*/
function changeCells(newCell,pieceValue,x,y,isJump){

  var oldCell = $("#cell"+x+y);
  var newCoords = newCell.attr("id").split("cell")[1];
  var newX = parseInt(newCoords[0]);
  var newY = parseInt(newCoords[1]);

  var checker = $(oldCell.children()[0]);
  var checkerColor = checker.attr("class").split("_")[0];

  //if the checker is a king, it gets the king's color
  var kingColor = checker.attr("class").split("_")[1];
  if(kingColor == "checker"){
    //to ensure you can't jump over your own king
    kingColor = checkerColor;
  }
  //a move can be made
  var canMove = true;
  
  //if a jump move is being made
  if(isJump){
    //coordinates of cell that is being jumped over (average of new and old cell coordinates)
    var deleteCoords = [(newX + x) /2,(newY + y) / 2];
    
    //checker that is being deleted
    var deleteChecker = $($("#cell"+deleteCoords[0]+deleteCoords[1]).children()[0]);

    //color of checker being deleted
    var deleteColor = deleteChecker.attr("class").split("_")[0];

    //remove checker that is jumped over if it is not the same color as current checker
    if(deleteColor != checkerColor && deleteColor != kingColor){
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
    
    //check winning condition every time a move is made
    gameEnd = checkWinCond(false);
  }

  //if new cell is successfully occupied
  if(newCell.children().length > 0 && !gameEnd){
    changeTurn();
  }  
}

/*
  When a checker is clicked, this function shows 
  its moves and gives access to possible move options
*/
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

/* 
  Helper function to showMoves() which checks which moves can be made
  with the relevant checker.

  variables:
    -moves = a 2d array of all possible moves of the relevant checker
    -checkerValue = the color value of the relevant checker
    -currCoords = the current coordinates of the relevant checker
*/
function checkerMoves(moves,checkerValue,currCoords){

  //LEFT MOVES
  var leftJump = false;

  //checking if you can move left once
  var leftStep = checkAvailability(moves[0],currCoords,false);
  if(leftStep){
    //granted access to move left once
    makeMove(moves[0],checkerValue,currCoords,false);
  }
  else{
    //checking if you can jump left once over a checker
    leftJump = checkAvailability(moves[2],currCoords,true);
    if(leftJump){
      //granted access to jump left once
      makeMove(moves[2],checkerValue,currCoords,true);
    }
  }

  //RIGHT MOVES
  var rightJump = false;
  
  //checking if you can move right once
  var rightStep = checkAvailability(moves[1],currCoords,false);
  if(rightStep){
    //granted access to move right once
    makeMove(moves[1],checkerValue,currCoords,false);
  }
  else{
    //checking if you can jump right once over a checker
    rightJump = checkAvailability(moves[3],currCoords,true);
    if(rightJump){
      //granted access to jump right once
      makeMove(moves[3],checkerValue,currCoords,true);
    }
  }

  //if checker is trapped
  if(!leftStep && !leftJump && !rightStep && !rightJump){
    gameEnd = checkWinCond(true);
  }
}

//Toggles between the turns of red and black checkers
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

//Makes a 2D array given a size
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

#who_won{
  font: bold 15px sans-serif;
}

#gameCond_background{
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