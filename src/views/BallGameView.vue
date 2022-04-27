<template>
    <!--Navigation Bar-->
    <nav-bar/>

    <!-- Ball Game -->
    <base-background>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Ball
        </div>

        <!-- Footer -->
        <div class='game_page_footer'>Developed by Owais Najmi</div>
    </base-background>
    <div v-if="gamePage == 0" class="startPage">
        <div @click="gamePage = 1" class="button">PLAY</div>
    </div>
    <div v-if="gamePage == 1">
        <BallGame @response="(msg) => gamePage = msg" 
            @score="(msg) => score = msg"/>
    </div>
    <div v-if="gamePage == 2" class="startPage">
        <p class="score">SCORE: {{score}}</p>
        <div @click="gamePage = 1" class="button">PLAY AGAIN</div>
        <div @click="gamePage = 0" class="button">MAIN MENU</div>

    </div>

</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import BallGame from '@/components/BallGame.vue';
export default {
    name: "BallGameView",
    components: {
        NavBar,
        BaseBackground,
        BallGame
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
    width: 420px;
    height: 640px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Jost", sans-serif;
    font-size:14px;
    background-image: linear-gradient(to bottom left, #122d85, #c40202);
}
.button{
  position: relative;
  background-color: black;
  border-radius: 2em;
  font-size: 16px;
  color: white;
  padding: 0.8em 1.8em;
//   cursor:pointer;
//   user-select:none;
//   text-align: center;
//   text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
//   -webkit-transition-duration: 0.4s; /* Safari */
  margin: 1em;  
}

.button:hover {
  transition-duration: 0.1s;
  background-color: #974da5;
}

// .button:after {
//   content: "";
//   display: block;
//   position: absolute;
//   border-radius: 4em;
//   left: 0;
//   top:0;
//   width: 100%;
//   height: 100%;
//   opacity: 0;
//   transition: all 0.5s;
//   box-shadow: 0 0 10px 40px white;
// }

// .button:active:after {
//   box-shadow: 0 0 0 0 white;
//   position: absolute;
//   border-radius: 4em;
//   left: 0;
//   top:0;
//   opacity: 1;
//   transition: 0s;
// }

// .button:active {
//   top: 1px;
// }

.score {
    font-size: 24px;
    color: white;
    padding: 0.8em 1.8em;
}
</style>