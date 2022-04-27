<template>
    <!--Navigation Bar-->
    <NavBar/>

    <BaseBackground>
        <!-- Title -->
        <div class="title">Bootleg Games</div>
        <div class="site-description">The Hub of Mini Games and unlimited fun!</div>
        <!-- Featured -->
        <div class="featured">
            <a id="random_game" class="nav-link" href="">
                <div class="image_container"></div>
                <p class="game_title"></p>
            </a>
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
import snakePreview from "@/assets/snake_preview.png"; // Andy's Game
import connect4Preview from "@/assets/connect4_preview.jpg"; // Ting's Game
import checkersPreview from "@/assets/checkers_preview.png"; // Rajiv's Game
import balldownPreview from "@/assets/balldown_preview.png"; // Owais's Game
import $ from 'jquery';


export default {
    name: "DropZoneView",
    components: {
        NavBar,
        BaseBackground
    },
    mounted(){        
        var gameTabs = [
            "/games/snake", // Andy's Game
            "/games/connect4", // Ting's Game
            "/games/checkers", // Rajiv's Game
            "/games/balldown" // Owais's Game
        ]
        var gameIcons = [
            snakePreview, // Andy's Game
            connect4Preview, // Ting's Game
            checkersPreview, // Rajiv's Game
            balldownPreview // Owais's Game
        ]
        var gameText = [
            "Snake", // Andy's Game
            "Connect 4", // Ting's Game
            "Checkers", // Rajiv's Game
            "Balldown" // Owais's Game
        ]
        // generate game link info
        let ranNum = Math.floor((Math.random() * gameTabs.length));
        let generatedLink = gameTabs[ranNum];
        let generatedIconId = gameIcons[ranNum];
        let generatedText = gameText[ranNum];

        // apply icon and text to home elements
        let imageContainer = document.getElementsByClassName('image_container')[0];
        let imageElement = document.createElement('img');
        imageElement.src = generatedIconId;
        imageElement.alt = generatedText + " Preview";
        imageContainer.appendChild(imageElement);
        let gameTitle = document.getElementsByClassName('game_title')[0];
        gameTitle.innerHTML = generatedText;
        $("#random_game").attr("href",generatedLink);
    }
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

.featured > a{
    width: 70%;
    height: 90%;
    background-color: var(--cus-black);
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.image_container{
    align-self: center;
    width: 500px;
    height: 500px;
    margin: 20px 20px;
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