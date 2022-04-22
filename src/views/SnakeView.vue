<template>
    <!--Navigation Bar-->
    <nav-bar/>

    <!-- Snake Game -->
    <base-background>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Snake
        </div>

        <!-- Snake board -->
        <snake-game-canvas/>

        <!-- Footer -->
        <div class='game_page_footer'>Developed by Andy Wang</div>
    </base-background>
</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import SnakeGameCanvas from '@/components/SnakeGameCanvas.vue';
export default {
    name: "CheckersView",
    components: {
        NavBar,
        BaseBackground,
        SnakeGameCanvas
    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.td{
    background-color: var(--cus-trans-black);
}
.game_page_footer{
    font-family: var(--cus-title-font);
    font-size: medium;
    background-color: var(--cus-black);
    color: var(--cus-white);
    height: 50px;
}
</style>