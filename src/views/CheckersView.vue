<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Checkers
        </div>
    
        
        <div>Developed by Rajiv Williams</div>
    </BaseBackground>

    <!-- Checkers Game -->
    <div class="contents">
        <table id="checkerBoard">
            
        </table>
        <img id="black_checker" class="hidden" src="../assets/black_checker.jpg" alt="Undo"/>
            <img id="red_checker" class="hidden" src="../assets/red_checker.webp" alt="Undo"/>
    </div>
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

    
    
})
const red = $("#red_checker");
red.removeAttr("class");
// const black = $("#black_checker");
// let red = document.createElement('img');
// red.src = "../assets/red_checker.webp";
function createBoard(board){  
    //Assigning cells to 'board'
    for(var i=0; i<8; i++){
        var tr = $('<tr>');
        for(var j=0; j<8; j++){
            var td = $('<td>');
            td.attr('id', 'cell' + i + j);
            td.append(red);
            tr.append(td);
        }
        board.append(tr);
    }
    return board;
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
#checkerBoard tr:nth-child(2n) td:not(td:nth-child(2n)){
    background-color: #0b0b0b;
}
#checkerBoard tr:not(tr:nth-child(2n)) td:nth-child(2n){
    background-color: #0b0b0b;
}

//Light Colored Squares
#checkerBoard tr:not(tr:nth-child(2n)) td:not(td:nth-child(2n)){
    background-color: #e5e5e5;
}
#checkerBoard tr:nth-child(2n) td:nth-child(2n){
    background-color: #e5e5e5;
}

#red_checker{
    max-height: 50px;
}
.hidden{
  display:none;
}

</style>