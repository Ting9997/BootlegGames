<template>
    <div class="gameList">
        <div class="game-list-item">
            <a class="nav-link" href="/games/checkers">
                <p>Checkers Game</p> 
                <!-- <img id="checkers_preview" src="../assets/checkers_preview.png" alt="Checkers Preview"> -->
            </a>
            
        </div>
        <div class="game-list-item">
            <a class="nav-link" href="/games/snake">
                <p>Snake Game</p> 
                <!-- <img id="checkers_preview" src="../assets/snake_preview.png" alt="Snake Preview"> -->
            </a>
        </div>
        <div class="game-list-item">
            <a class="nav-link" href="/games/balldown">
                <p>BallDown</p> 
                <!-- <img id="checkers_preview" src="../assets/balldown_preview.png" alt="BallDown Preview"> -->
            </a>
        </div>
    </div>
    <div class="gameList">
        <div class="game-list-item">
            <a class="nav-link" href="/games/connect4">
                <p>Connect 4</p> 
                <!-- <img id="checkers_preview" src="../assets/connect4_preview.jpg" alt="Connect Four"> -->
            </a>
        </div>
    </div>
</template>

<!-- _______________________________________________________________ -->
<script>
export default {
    name: "GameElement",
    props:{

    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.td{
    background-color: var(--cus-trans-black);
}
.gameList{
    display: flex;
    justify-content: space-evenly;
    padding-top: 25px;
    padding-bottom: 25px;
    margin: auto;
}
#checkers_preview{
    width: 200px;
    height: auto;

}
.game-list-item{
    width: 400px;
    margin: auto;
    font-size: 50px;
    box-shadow: 10px 10px black;
    background-color: var(--cus-black);
}
.game-list-item:hover{
    //background: hsl(0, 0, 90%);
    opacity: 0.9;
    background-color: rgb(81, 81, 81);
}
p{
    font: bold;
    text-shadow: 2px 2px #020202;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}
</style>