<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title">Bootleg Games</div>
        <div class="site-description">Welcome to the hub where mini games are normal and fun is limited to what we offer!</div>

        <!-- Featured -->
        <div class="featured">
            <div>
                <div class="image_container"><img alt="Place Holder" src="../assets/place_holder.png"></div>
                <p class="game_title">This is where game name is</p>
            </div>
        </div>
    </BaseBackground>

    <!-- Bibliography -->
    <div class="bios-container">
        <div class="bios">Bios 1</div>
        <div class="bios">Bios 2</div>
        <div class="bios">Bios 3</div>
        <div class="bios">Bios 4</div>
        <div class="bios">Bios 5</div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';

export default {
    name: "DropZoneView",
    components: {
        NavBar,
        BaseBackground
    },
}
</script>

<style lang="scss">
@import "../styles/GlobalVariables.scss";

.upper{
    background-image: url(../assets/background.png);
    background-size: 15rem 5rem;
    background-position: left top;
    background-repeat: repeat;
    background-color: var(--cus-light-blue);
}

.title, .site-description{
    display: flex;
    /* border: 2px solid black; */
    width: auto;
    justify-content: center;
    align-items: center;
    color: var(--cus-white);
    background-color: var(--cus-trans-blue);
    font-family: var(--cus-title-font);
}

.title{
    font-size: 6rem;
    height: 10rem;
}

.site-description{
    font-size: 1.5rem;
    height: 7rem;
}

.featured{
    width: auto;
    height: 40rem;
    background-color: var(--cus-trans-black);
    display: flex;
    justify-content: center;
    align-items: center;
}

.featured > div{
    width: 70%;
    height: 90%;
    background-color: var(--cus-black);
}

.image_container{
    width: 60%;
    height: 70%;
    margin: 5% 20%;
}
.image_container img{
    width: 100%;
    height: 100%;
}

.game_title{
    width: 100%;
    height: 20%;
    font-family: var(--cus-title-font);
    font-size: 2rem;
    color: var(--cus-white);
    text-align: center;
}

/* ================= Bibliography ================= */
.bios-container{
    display: flex;
    justify-content: space-evenly;
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: var(--cus-black);
}

.bios{
    /* border: 2px solid black; */
    height: 327px;
    width: 15%;
    background-color: var(--cus-white);
    text-align: center;
}

.scrollable-element{
    scrollbar-color: var(--cus-black);
}
</style>