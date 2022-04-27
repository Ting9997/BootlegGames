<template>
    <div id="GameList">
        <div class="game-list-item">
            <a class="nav-link" href="/games/checkers">
                <p>Checkers Game</p> 
                <img id="checkers_preview" src="../assets/checkers_preview.png" alt="Checkers Preview">
            </a>
            
        </div>
        <div class="game-list-item">
            <a class="nav-link" href="/games/snake">
                <p>Snake Game</p> 
                <img id="checkers_preview" src="../assets/snake_preview.png" alt="Snake Preview">
            </a>
        </div>
        <div class="game-list-item">
            <a class="nav-link" href="/games/balldown">
                <p>BallDown</p> 
                <img id="checkers_preview" src="../assets/balldown_preview.png" alt="BallDown Preview">
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
#GameList{
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
}
.game-list-item:hover{
    //background: hsl(0, 0, 90%);
    opacity: 0.7;
    background-color: rgb(81, 81, 81);
}
</style>