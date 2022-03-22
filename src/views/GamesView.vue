<template>
    <!--Navigation Bar-->
    <NavBar/>

    <!-- Games -->
    <BaseBackground>
        <div>This is just temparay text for testing</div>
    </BaseBackground>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';

export default {
    name: "GamesView",
    components: {
        NavBar,
        BaseBackground
    },
}
</script>

<style lang='scss'>
@import "../styles/GlobalVariables.scss";

</style>