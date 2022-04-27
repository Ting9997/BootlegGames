<template>
    <!-- Import the navbar into the view -->
    <nav-bar/>
    
    <base-background>
    <!-- Import the base background -->
        <connect-4-game/>
    </base-background>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Connect4Game from '@/components/Connect4Game.vue';
import BaseBackground from '@/components/BaseBackground.vue';

export default {
    name: "Connect4View",
    components: {
        NavBar,
        BaseBackground,
        Connect4Game
    }
}
</script>

<style>

</style>