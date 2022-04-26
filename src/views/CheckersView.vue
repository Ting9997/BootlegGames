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
                <td><div id="whos_turn"></div></td>
              </tr>
            </table>
            
            <p id="printout"></p>
            <img class="hidden black_checker" src="../assets/black_checker.jpg" alt="Black"/>
                <img class="hidden red_checker" src="../assets/red_checker.webp" alt="Red"/>
        </div>
    </BaseBackground>
</template>

<!-- _______________________________________________________________ -->

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import $ from 'jquery';
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
    
    // if(redTurn){$(".red_checker").click(showMoves);}
    
    // if(!redTurn){$(".black_checker").click(showMoves);}
    $("#whos_turn").text("RED'S TURN");
    $("span").click(showMoves);

      
    
    // if(redTurn){
    //   $(".red_checker").click(function(){
    //     document.getElementById("printout").innerHTML = "red";
    //     redTurn = false;
    //   });
    // }
    // if(!redTurn){
    //   $(".black_checker").click(function(){
        
    //     document.getElementById("printout").innerHTML = "black";
    //     redTurn = true;
    //   });
    // }
    
})
//GLOBAL VARIABLES
let checkerBoardSize = 8;
let redTurn = true;
//let currentColor = ".red_checker";
/*
  For each cell in boardArray:
    not playable = -2
    empty = -1
    black = 0
    red = 1
*/
let boardArray = make2DArray(checkerBoardSize);

function assignColor(color,value,i,j){
  var checker = $("<span>");
  checker.attr("class",""+color+"_checker");

  //add checker to current cell
  $("#cell" + i + j).append(checker);

  //Stores value of cell
  //  black = 0
  //  red = 1
  boardArray[i][j] = value;

  //Show Moves
  //checker.click(showMoves);
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
            boardArray[i][j] = -2;
          } 
        }
    }
    //document.getElementById("printout").innerHTML = boardArray;
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
//let moveMade = false;

function checkAvailability(pieceMoves){
  //document.getElementById("printout").innerHTML = $("cell"+pieceMoves[0]+pieceMoves[1]).children().length;
  if($("#cell"+pieceMoves[0]+pieceMoves[1]).children().length == 0){
  //if($("cell"+pieceMoves[0]+pieceMoves[1]).children().length == 0){
    //document.getElementById("printout").innerHTML = "cell"+currCoords[0]+currCoords[1];
    var newCell = $("#cell"+(pieceMoves[0])+(pieceMoves[1]));
    newCell.attr("class","glow");

    return true;
  }
  return false;
}

function makeMove(pieceMoves,pieceValue,currCoords,isJump){
  var newCell = $("#cell"+(pieceMoves[0])+(pieceMoves[1]));

  if(newCell.attr("class") == "glow"){
    newCell.click(function(){
      if($(this).children().length == 0){
        changeCells($(this),currCoords[0],currCoords[1],isJump);
        //newCell.attr("class","blackSquare");
        boardArray[pieceMoves[0]][pieceMoves[1]] = pieceValue;
        boardArray[currCoords[0]][currCoords[1]] = -1; 
        return true;
      }
    });
  }
  return false;
}


//let redTurn = true;
//Shows available moves once a checker piece is clicked
//returns available moves
function showMoves(){
  
  //hide all moves
  hideAllMoves();

  
  var currChecker = $(this);
  var currCell = currChecker.parent();
  var checkerColor = currChecker.attr("class").split("_")[0];
  if((redTurn && checkerColor == "red") || (!redTurn && checkerColor == "black")){
    currCell.attr("class","selected");
    var coords = currCell.attr("id").split("cell")[1];
    var i = parseInt(coords[0]);
    var j = parseInt(coords[1]);
    var currCoords = [i,j];

    //var checkerColor = currChecker.attr("class").split("_")[0];
  
    var redMoves = [[i-1,j-1],[i-1,j+1],[i-2,j-2],[i-2,j+2]];
    var blackMoves = [[i+1,j-1],[i+1,j+1],[i+2,j-2],[i+2,j+2]];
    //var moves = [redMoves,blackMoves];
    //var kingValue = 2;
    var redValue = 1;
    var blackValue = 0;
    
    
    //RED MOVES
      // if($(currCell.children()[0]).attr("class") == "red_checker"){
        
      // }

      // //Diagonal Left Once
      // var redLeft = checkAvailability(redMoves[0],redValue,currCoords,false);
      // var blackLeft =  checkAvailability(blackMoves[0],blackValue,currCoords,false);

      // //Diagonal Right Once
      // var redRight =  checkAvailability(redMoves[1],redValue,currCoords,false);
      // var blackRight =  checkAvailability(blackMoves[1],blackValue,currCoords,false);


      //Diagonal Left Once
      // checkAvailability(redMoves[0],redValue,currCoords,false);
      // checkAvailability(blackMoves[0],blackValue,currCoords,false)

      //Diagonal Right Once
      //checkAvailability(redMoves[1],redValue,currCoords,false);
      //checkAvailability(blackMoves[1],blackValue,currCoords,false);

      //Left Jump
      // if(!redLeft){checkAvailability(redMoves[2],redValue,currCoords,true);}
      // if(!blackLeft){checkAvailability(blackMoves[2],blackValue,currCoords,true);}

      // //Right Jump
      // if(!redRight){checkAvailability(redMoves[3],redValue,currCoords,true);}
      // if(!blackRight){checkAvailability(blackMoves[3],blackValue,currCoords,true);}

      
    //let blackTurn = true;
    //BLACK MOVES
      // if($(currCell.children()[0]).attr("class") == "black_checker"){
      //   currCell.attr("class","selected");
      // }
      // var decision = false;
      // //Diagonal Left Once
      // if(checkAvailability(blackMoves[0])){
      //   decision = makeMove(blackMoves[0],blackValue,currCoords,false);
      //   if(decision){
      //     return decision;
      //   }
      // }

      // //Diagonal Right Once
      // if(checkAvailability(blackMoves[1])){
      //   decision = makeMove(blackMoves[1],blackValue,currCoords,false);
      //   if(decision){
      //     return decision;
      //   }
      // }
    
      //Left Jump
      // if(!blackLeft){checkAvailability(blackMoves[2],blackValue,currCoords,true);}

      //Right Jump
      // if(!blackRight){checkAvailability(blackMoves[3],blackValue,currCoords,true);}

      //RED MOVES
      //if(redTurn && checkerColor == "red" && currentColor == ".red_checker"){
      if(redTurn){
        //Left Once
        var leftRed = checkAvailability(redMoves[0]);
        
        if(leftRed){
          makeMove(redMoves[0],redValue,currCoords,false);
        }
        else{
          var leftJumpRed = checkAvailability(redMoves[2]);
          if(leftJumpRed){
            makeMove(redMoves[2],redValue,currCoords,true);
          }
        }

        var rightRed = checkAvailability(redMoves[1]);
        if(rightRed){
          makeMove(redMoves[1],redValue,currCoords,false);
        }
        else{
          var rightJumpRed = checkAvailability(redMoves[3]);
          if(rightJumpRed){
            makeMove(redMoves[3],redValue,currCoords,true);
          }
        }

        //Right Once
        // checkAvailability(redMoves[1]);
        // makeMove(redMoves[1],redValue,currCoords,false);

        //document.getElementById("printout").innerHTML = currentColor;
      }
      //BLACK MOVES
      //else if(!redTurn && checkerColor == "black" && currentColor == ".black_checker"){
      else{  
        //Left Once
        var leftBlack = checkAvailability(blackMoves[0]);
        if(leftBlack){
          makeMove(blackMoves[0],blackValue,currCoords,false);
        }
        else{
          var leftJumpBlack = checkAvailability(blackMoves[2]);
          if(leftJumpBlack){
            makeMove(blackMoves[2],blackValue,currCoords,true);
          }
        }

        var rightBlack = checkAvailability(blackMoves[1]);
        if(rightBlack){
          makeMove(blackMoves[1],blackValue,currCoords,false);
        }
        else{
          var rightJumpBlack = checkAvailability(blackMoves[3]);
          if(rightJumpBlack){
            makeMove(blackMoves[3],blackValue,currCoords,true);
          }
        }

        //Right Once
        // checkAvailability(blackMoves[1]);
        // makeMove(blackMoves[1],blackValue,currCoords,false);
        //document.getElementById("printout").innerHTML = currentColor;

      }
  }
}
function changeTurn(){
  if(redTurn){
    
    redTurn = false;
    $("#whos_turn").text("BLACK'S TURN");
    //currentColor = ".black_checker";
    return false;
  }
  if(!redTurn){
    
    redTurn = true;
    $("#whos_turn").text("RED'S TURN");
    //currentColor = ".red_checker";
    return true;
  }
}
function changeCells(newCell,x,y,isJump){

  var oldCell = $("#cell"+x+y);
  var newCoords = newCell.attr("id").split("cell")[1];
  var newX =parseInt(newCoords[0]);
  var newY = parseInt(newCoords[1]);

  var checker = $(oldCell.children()[0]);
  var checkerColor = checker.attr("class");
  //var newColor = $(newCell.children()[0]).attr("class");
  var move = true;
  //Only one piece in a cell at a time
  
    //If an opposite color is being jumped over
    if(isJump){
      //index of checker being jumped over is the
      //average of oldCell coordinates and newCell coordinates
      var deleteCoords = [(newX + x) /2,(newY + y) / 2];
      var deleteChecker = $($("#cell"+deleteCoords[0]+deleteCoords[1]).children()[0]);
      var deleteColor = deleteChecker.attr("class");

      //remove checker that is jumped over
      if(deleteColor != checkerColor){
        deleteChecker.remove();
        boardArray[deleteCoords[0]][deleteCoords[1]] = -1;
      }
      else{
        move = false;
      }
      
    }

    //var newChecker = oldChecker;
    //moving checker to new cell
    //oldCell.removeChild(checker);
    if(oldCell.attr("class") == "selected" && move){
      newCell.append(checker);
      hideAllMoves();
    }
    

    //oldCell.attr("class","blackSquare");
    if(newCell.children().length > 0){
      changeTurn();
    }
    
    document.getElementById("printout").innerHTML = checker.parent().attr("id");
  
  
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
  width: 100%;
}

#whos_turn{
  background-color: #ded8d8;
  width: 50px;
}

//a cell in sudoku board is vacant
.glow{
  background-color: blanchedalmond;
  color: blanchedalmond;
  //padding-block: 20%;
}


</style>