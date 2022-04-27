<template>
    <!--Navigation Bar-->
    <NavBar/>

    <!-- Games -->
    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Games
        </div>
    
        <!-- Games List -->
        <div class="contents">
            <GameElement>
                Testing
            </GameElement>
        </div>
    </BaseBackground>

    <!-- Page Footer -->
</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import GameElement from '@/components/GameElement.vue';

export default {
    name: "GamesView",
    components: {
        NavBar,
        BaseBackground,
        GameElement
    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang='scss'>
@import "../styles/GlobalVariables.scss";

.contents{
    background-color: var(--cus-trans-black);
}

</style>