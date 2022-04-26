<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Checkers
        </div>        

        <!-- Checkers Game -->
        <checkers-game/>

        <!-- Footer -->
        <div class='game_page_footer'>Developed by Rajiv Williams</div>
    </BaseBackground>
</template>

<!-- _______________________________________________________________ -->

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import CheckersGame from '@/components/CheckersGame.vue';
export default {
    name: "CheckersView",
    components: {
        NavBar,
        BaseBackground,
        CheckersGame
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