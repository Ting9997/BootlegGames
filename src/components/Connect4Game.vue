<template>
    <div id="grid"></div>
</template>

<script>
import $ from 'jquery'

export default {
    name: "Connect4Game",
    mounted() {
        var turn = 'redCol';

        // Construct the connect4 grid
        for (let row = 0; row < 6; row++){
            const newRow = $('<div>').addClass('row');
            $('#grid').append(newRow);

            for (let col = 0; col < 7; col++){
                // Assign each column and row a number within the grid
                const newCol = $('<div>').addClass('emptyCol').attr('rownumber', row).attr('colnumber', col);
                newRow.append(newCol);
            }
        }

        // Maintain an array of all the possible diagonals
        var topLeft1 = [];
        var topLeft2 = [];
        var topLeft3 = [];
        var topLeft4 = [];
        var topLeft5 = [];
        var topLeft6 = [];
        var topRight1 = [];
        var topRight2 = [];
        var topRight3 = [];
        var topRight4 = [];
        var topRight5 = [];
        var topRight6 = [];

        for (let i = 0; i<4; i++){
            topLeft1.push($(`.emptyCol[rownumber='${2+i}'][colnumber='${0+i}']`));

            topRight1.push($(`.emptyCol[rownumber='${2+i}'][colnumber='${6-i}']`));
        }
        for (let i = 0; i<5; i++){
            topLeft2.push($(`.emptyCol[rownumber='${1+i}'][colnumber='${0+i}']`));

            topRight2.push($(`.emptyCol[rownumber='${1+i}'][colnumber='${6-i}']`));

        }
        for (let i = 0; i<6; i++){
            topLeft3.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${0+i}']`));

            topRight3.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${6-i}']`));
        }
        for (let i = 0; i<6; i++){
            topLeft4.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${1+i}']`));

            topRight4.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${5-i}']`));
        }
        for (let i = 0; i<5; i++){
            topLeft5.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${2+i}']`));

            topRight5.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${4-i}']`));
        }
        for (let i = 0; i<4; i++){
            topLeft6.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${3+i}']`));

            topRight6.push($(`.emptyCol[rownumber='${0+i}'][colnumber='${3-i}']`));
        }

        // Determine which column number the user clicks
        $('.emptyCol').on('click', function(){
            const colNum = $(this).attr('colnumber')

            if (turn === 'redCol'){
                turn = 'yellowCol';
            }
            else if (turn == 'yellowCol'){
                turn = 'redCol';
            }

            const colEntry = getColumn(colNum);

            if (colEntry === null){
                // If the column is full revert the player turn change
                if (turn === 'redCol'){
                    turn = 'yellowCol';
                }
                else if (turn == 'yellowCol'){
                    turn = 'redCol';
                }
            }
            else{
                colEntry.addClass(turn);
                
                if (checkVertical(colNum) || checkHorizontal(colNum) || checkDiagonal()){
                    alert("Game Over!");
                }
            }

        })

        function getColumn(colNum){
            // Returns the entire column that the player chooses to click
            const columns = $(`.emptyCol[colnumber='${colNum}']`);
            
            for (let i=columns.length-1; i>-1; i--){
                if ($(columns[i]).hasClass('emptyCol') && $(columns[i]).hasClass('redCol') == false && $(columns[i]).hasClass('yellowCol') == false){
                    return $(columns[i]);
                }
            }
            return null;
        }

        function checkVertical(colNum){
            const columns = $(`.emptyCol[colnumber='${colNum}']`);
            let counter = 0;
            for (let i=columns.length-1; i>-1; i--){
                if ($(columns[i]).hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter=0;
                }
            }
            return false;
        }

        function checkHorizontal(colNum){
            const columns = $(`.emptyCol[colnumber='${colNum}']`);
            let rowNum = 0;

            for (let i=columns.length-1; i>-1; i--){
                if ($(columns[i]).hasClass('redCol') == false && $(columns[i]).hasClass('yellowCol') == false){
                    rowNum = $(columns[i+1]).attr('rownumber');
                    break;
                }
            }

            const row = $(`.emptyCol[rownumber='${rowNum}']`);
            let counter = 0;
            for (let i=0; i<row.length; i++){
                if ($(row[i]).hasClass(turn)){
                    counter++;
                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter=0;
                }
            }
            return false;
        }

        function checkDiagonal(){
            let counter = 0;

            for (let i=0; i<topLeft1.length; i++){
                if (topLeft1[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topLeft2.length; i++){
                if (topLeft2[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topLeft3.length; i++){
                if (topLeft3[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topLeft4.length; i++){
                if (topLeft4[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topLeft5.length; i++){
                if (topLeft5[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topLeft6.length; i++){
                if (topLeft6[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight1.length; i++){
                if (topRight1[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight2.length; i++){
                if (topRight2[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight3.length; i++){
                if (topRight3[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight4.length; i++){
                if (topRight4[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight5.length; i++){
                if (topRight5[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            counter = 0;

            for (let i=0; i<topRight6.length; i++){
                if (topRight6[i].hasClass(turn)){
                    counter++;

                    if (counter === 4){
                        return true;
                    }
                }
                else{
                    counter = 0
                }
            }

            return false;

        }
    }
}
</script>

<style>

/* Style the connect4 grid */
#grid {
    margin-top: 210px;
    background: blue;
    display: inline-block;
}

.emptyCol {
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    margin: 15px;
}

.redCol{
    background: red;
}

.yellowCol{
    background: yellow;
}

</style>
