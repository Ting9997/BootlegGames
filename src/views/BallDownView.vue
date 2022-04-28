<template>
    <!--Navigation Bar-->
    <nav-bar/>

    <!-- Ball Game -->
    <base-background>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            BallDown
        </div>

        <!-- Footer -->
    

    <div v-if="gamePage == 0" class="startPage">
        <h1 class="gametitle">BALLDOWN</h1>
        <div @click="gamePage = 1" class="button">PLAY</div>
    </div>

    <div v-if="gamePage == 1">
        <BallDown @response="(msg) => gamePage = msg" 
            @score="(msg) => score = msg"/>
    </div>

    <div v-if="gamePage == 2" class="startPage">
        <h1 class="score">SCORE: {{score}}</h1>
        <div @click="gamePage = 1" class="button">PLAY AGAIN</div>
        <div @click="gamePage = 0" class="button">MAIN MENU</div>
    </div>
    <div class='game_page_footer'>Developed by Owais Najmi</div>
    </base-background>

</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import BallDown from '@/components/BallDown.vue';
export default {
    name: "BallDownView",
    components: {
        NavBar,
        BaseBackground,
        BallDown
    },
    data() {
        return {
            gamePage: 0,
            score: 0
        }
    }
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
.startPage{
    margin: auto;
    width: 480px;
    height: 640px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Jost", sans-serif;
    font-size:14px;
    background-image: linear-gradient(to bottom left, #ff7396, #58355E);
}
.button{
  position: relative;
  background-color: black;
  border-radius: 2em;
  font-size: 16px;
  color: white;
  padding: 0.8em 1.8em;
  cursor: pointer;
  transition-duration: 0.4s;
  margin: 1em;  
}

.button:hover {
  transition-duration: 0.1s;
  background-color: #974da5;
}

.score {
    font-family: "Jost", sans-serif;
    font-size: 24px;
    color: white;
    padding: 0.8em 1.8em;
    text-shadow: 2px 2px 8px #000000;

}
.gametitle{
    font-family: "Jost", sans-serif;
    font-size: 35px;
    color: white;
    text-shadow: 2px 2px 8px #000000;
}
</style>