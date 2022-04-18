<template>
    <!--Navigation Bar-->
    <NavBar/>

    <!-- Checkers Game -->
    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Checkers
        </div>
    
        <!-- Games List -->
        <div class="contents">
            <table>
            </table>
        </div>
        <div>Developed by Rajiv Williams</div>
    </BaseBackground>
</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
export default {
    name: "CheckersView",
    components: {
        NavBar,
        BaseBackground
    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.td{
    background-color: var(--cus-trans-black);
}
</style>