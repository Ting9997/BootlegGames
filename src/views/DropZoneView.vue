<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title">Bootleg Games</div>
        <div class="site-description">The Hub of Mini Games and unlimited fun!</div>

        <!-- Featured -->
        <div class="featured">
            <div>
                <div class="image_container"><img alt="Place Holder" src="../assets/place_holder.png"></div>
                <p class="game_title">This is where game name is</p>
            </div>
        </div>
    </BaseBackground>

    <!-- Bibliography -->
    <div class="bios-container-outter">
        <p class="bio-container-title">Developers</p>
        <div class="bios-container-inner">
            <div class="bios" id="rajiv">
                <a href="/contacts/rajiv_williams">
                    <svg class="bio-text-container">
                        <text class="bio-text" x="15" y="170">Rajiv Williams</text>
                    </svg>
                </a>
            </div>
            <div class="bios">
                <a href="/contacts/andy_wang">
                    <svg class="bio-text-container">
                        <text class="bio-text" x="30" y="170">Andy Wang</text>
                    </svg>
                </a>
            </div>
            <div class="bios">
                <a href="/contacts/ting wu">
                    <svg class="bio-text-container">
                        <text class="bio-text" x="45" y="170">Ting Wu</text>
                    </svg>
                </a>
            </div>
            <div class="bios">
                <a href="/contacts/marco_ma">
                    <svg class="bio-text-container">
                        <text class="bio-text" x="35" y="170">Marco Ma</text>
                    </svg>
                </a>
            </div>
            <div class="bios">
                <a href="/contacts/owais_najmi">
                    <svg class="bio-text-container">
                        <text class="bio-text" x="23" y="170">Owais Najmi</text>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    
    <!-- Page Footer -->
    <div class="game_page_footer">© 2022 Bootleg Games</div>
</template>

<!-- _______________________________________________________________ -->
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

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

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
    font: bold;
    height: 10rem;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    text-shadow: 2px 2px #020202;
}

.site-description{
    font-size: 1.5rem;
    height: 7rem;
    text-align: center;
    text-shadow: 2px 2px #020202;
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
.bio-container-title{
    width: 100%;
    height: auto;
    font-family: var(--cus-title-font);
    font-size: 2rem;
    color: var(--cus-white);
    text-align: center;
}
.bios-container-outter{
    background-color: var(--cus-black);
}
.bios-container-inner{
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
    opacity: 0.7;
}

.bios:hover{
    opacity: 1.0;
}
.bio-text-container{
    height: 327px;
    width: 100%;
}
.bio-text-container:hover{
    opacity: 0.3;
}
.bio-text{
    font-family: var(--cus-title-font);
    font-size: 25px;
  
}
#rajiv{
    background-image: url(../assets/rajiv_biophoto.jpg);
    background-size: 230px;
    background-position: center;
}

</style>