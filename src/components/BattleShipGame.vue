<template>
    <div class="player_menu">
        <input type="button" id="start_reset" value="Start">
        <input type="button" id="random_spot" value="Set Random Spot">
    </div>
    <div class="ocean_map">
        <table id="bot_sea"></table>
        <table id='player_sea'></table> 
    </div>
</template>

<script>
    import $ from 'jquery';

    // let battleship = "<img src='@' />";
    // let missShot = "<img src='../assets/missed_shot.png' />";
    // let shotHit = "<img src='../assets/explosion.png' />";
    
    // function getBattleship() {
    //     return require('../assets/battleship.png');
    // };

    let gridSize = 10;
    let maxShip = 31;
    let playerShip, botShip;
    let gameStarted = false;
    let gameOver;
    let botPos = []; let playerPos = [];
    let botScore, playerScore;
    let botMove = [];

    function createSeaGrid(seaBoard) {
        for (var i = 0; i < gridSize; i++) {
            var row = '<tr>';
            for (var j = 0; j < gridSize; j++) {
                row += '<td></td>';
            }
            row += '</tr>';
            seaBoard.append(row);
        }
    }

    function setSpot(row, col) {
        if ($('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text() == '') {
            $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('B');
            playerShip++;
        } else {
            $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('');
            playerShip--;
        }
    }

    function randPlayer() {
        for (var row = 1; row <= 10; row++) {
            for (var col = 1; col <= 10; col++) {
                $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('');
            }
        }
        playerShip = 0;
        while (playerShip < maxShip) {
            var pos = Math.floor(Math.random() * (100 - 0) + 0);
            if (!playerPos[pos]) {
                let row = (Math.floor(pos / 10) + 1);
                let col = (pos % 10 + 1);
                $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('B');
                playerPos[pos] = true; playerShip++;
            }
        }
    }

    function checkBotHit(row, col) {
        if (botPos[(row - 1) * 10 + col - 1]) {
            $('#bot_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('X');
            playerScore++;
            botPos[(row - 1) * 10 + col - 1] = false;
            if (playerScore >= maxShip) {
                gameOver = true;
                $('#player_sea tr:last-child td').text('Player Win');
                $('#bot_sea tr:last-child td').text('Bot Lose');
            }
        } else {
            $('#bot_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('O');
        }
    }

    function resetBoard() {
        gameOver = false;
        botScore = 0; playerScore = 0;
        playerShip = 0, botShip = 0;
        for (var i = 0; i < 100; i++) {
            botPos[i] = false;
            playerPos[i] = false;
        }
        for (var row = 1; row <= 10; row++) {
            for (var col = 1; col <= 10; col++) {
                $('#bot_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('');
                $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('');
            }
        }
        $('#player_sea tr:last-child td').text('Player');
        $('#bot_sea tr:last-child td').text('Bot');
    }

export default {
    name: 'BattleShipGame',
    mounted() {
        gameOver = false;
        botScore = 0; playerScore = 0;
        playerShip = 0, botShip = 0;
        for (var i = 0; i < 100; i++) {
            botPos.push(false);
            playerPos.push(false);
        }

        $(document).ready(function() {
            let startButton = $('#start_reset');
            let randSpot = $('#random_spot');
            let botBoard = $('#bot_sea');
            let playerBoard = $('#player_sea');
            createSeaGrid(botBoard);
            createSeaGrid(playerBoard);
            botBoard.append('<tr><td colspan="10">Bot</td></tr>');
            playerBoard.append('<tr><td colspan="10">Player</td></tr>');

            botBoard.on('click', 'td', function() {
                var row = $(this).parent().index() + 1, col = $(this).index() + 1;
                if ($('#bot_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text() == '') {
                    if (gameStarted && !gameOver) {
                        checkBotHit(row, col);
                    }
                    if (!gameOver) {
                        do {
                            var move = Math.floor(Math.random() * (100 - 0) + 0);
                            if (playerPos[move]) {
                                botScore++;
                                let row = (Math.floor(move / 10) + 1);
                                let col = (move % 10 + 1);
                                $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('X');
                                if (botScore >= 31) {
                                    gameOver = true;
                                    $('#player_sea tr:last-child td').text('Player Lose');
                                    $('#bot_sea tr:last-child td').text('Bot Win');
                                }
                            }else {
                                let row = (Math.floor(move / 10) + 1);
                                let col = (move % 10 + 1);
                                $('#player_sea tr:nth-child(' + row +') td:nth-child(' + col + ')').text('O');
                            }
                        } while (botMove.includes(move));
                    }
                }
            })

            playerBoard.on('click', 'td', function() {
                if (!gameStarted && !gameOver) {
                    setSpot($(this).parent().index() + 1, $(this).index() + 1);
                }
            })

            startButton.click(function() {
                if (!gameStarted && playerShip == 31) {
                    gameStarted = true;
                    startButton.val('Reset');
                    // Remove For Loop
                    for (var i = 0; i < maxShip; i++) {
                        botPos[i] = true; botShip++;
                    }
                    while (botShip < maxShip) {
                        var pos = Math.floor(Math.random() * (100 - 0) + 0);
                        if (!botPos[pos]) {
                            botPos[pos] = true; botShip++;
                        }
                    }
                } else if (gameStarted) {
                    gameStarted = false;
                    startButton.val('Start');
                    resetBoard();
                }
            })

            randSpot.click(function() {
                if (!gameStarted) {
                    randPlayer();
                }
            })
        })
    }
}
</script>

<style>
    .player_menu {
        margin-bottom: 2rem;
    }

    .ocean_map {
        display: inline-flex;
        margin-bottom: 2rem;
    }

    table {
        width: 500px;
        height: 500px;
        margin: auto;
    }

    td {
        width: 50px;
        height: 50px;
        white-space: nowrap;
    }

    tr:last-child td{
        width: 500px;
    }

    #bot_sea td {
        border: 1px solid;
        background-color: grey;
    }

    #player_sea td {
        border: 1px solid;
        background-color: aquamarine;
    }
</style>