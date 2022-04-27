<template>
    <dl id="GameList">
        <dt>
            <div class="game-list-item">
                <a class="nav-link game-list-item" href="/games/checkers">
                   <p>Checkers Game</p> 
                   <img id="checkers_preview" src="../assets/checkers_preview.png" alt="Checkers Preview">
                </a>
                
            </div>
        </dt>
        <dt>
            <div class="game-list-item">
                <a class="nav-link" href="/games/snake">
                    <p>Snake Game</p> 
                   <img id="checkers_preview" src="../assets/snake_preview.png" alt="Checkers Preview">
                </a>
            </div>
        </dt>
    </dl>
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