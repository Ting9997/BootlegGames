<template>
    <!--Navigation Bar-->
    <nav-bar/>

    <!-- Battle Ship Game -->
    <base-background>
        <div class="title">
            Battleship
        </div>

        <battle-ship-game/>

        <div class='game_page_footer'>Developed by Marco Ho Kong Ma</div>
    </base-background>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import BattleShipGame from '../components/BattleShipGame.vue';

export default {
    name: "BattleShipView",
    components: {
    NavBar,
    BaseBackground,
    BattleShipGame
},
}
</script>

<style>
</style>