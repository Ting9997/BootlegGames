<template>
    <div>
        <canvas ref="game" width="480" height="640" 
            style="border: 1px solid black;">
        </canvas>
        <span>{{timeLeft}}</span>
    </div>
</template>

<script>
    let gravitySpd = 4;
    let platformWidth = 20;
    var platforms = [];


    function Platform(y, platformBreak, breakWidth) {
        this.y = y;
        this.platformBreak = platformBreak;
        this.breakWidth = breakWidth;
    }
    platforms.push(new Platform(500, 250, 100));
    platforms.push(new Platform(660, 10, 100));
    platforms.push(new Platform(820, 98, 123));
    platforms.push(new Platform(980, 350, 90));

    export default {
        emits: ['response', 'score'],
        name: 'BallDown',
        data(){
            return {
                score: 0,
                ballYSpd: 0,
                ballXSpd: 0,
                platformSpd: -1,
                context: {},
                ball: {
                    x: 10,
                    y: 460,
                    r: 15
                },
                ballColor: "#D6FFB7",
                platformColor: "#EC0B43",
                backgroundColor: {
                    color1: "black",
                    color2: "#58355E",
                    color3: "#5D4C6C"
                },

                isBallPlatformCollide: false,
                id: null

            }
        },
        created() {
            window.addEventListener('keydown', this.onKeyDown);
            window.addEventListener('keyup', this.onKeyUp);
        },
        
        methods: {
            createdPlatform(platform) {
                this.context.shadowBlur = 10;
                this.context.shadowColor = "#ff7396";
                // USING LINES INSTEAD OF RECTANGLES
                this.context.beginPath();
                this.context.lineWidth = platformWidth;
                this.context.lineCap = "round";
                this.context.moveTo(0, platform.y);
                this.context.lineTo(platform.platformBreak, platform.y);
                this.context.stroke();
                this.context.moveTo(platform.platformBreak+platform.breakWidth, platform.y);
                this.context.lineTo(this.$refs.game.width, platform.y);
                this.context.stroke();


                // this.context.fillStyle = this.platformColor;
                // this.context.fillRect(0, platform.y, platform.platformBreak, 20);
                // this.context.fillRect(platform.platformBreak+platform.breakWidth, platform.y, this.$refs.game.width, 20);
                // this.context.strokeStyle = "#ff7396";
                // this.context.strokeRect(0, platform.y, platform.platformBreak, 20);
                // this.context.strokeRect(platform.platformBreak+platform.breakWidth, platform.y, this.$refs.game.width, 20);
            },
            createBall() {
                    this.context.beginPath();
                    this.context.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI*2);
                    this.context.fillStyle = this.ballColor;
                    this.context.closePath();
                    this.context.shadowColor = "white";
                    this.context.fill();
                    this.context.shadowBlur = 0;
            },
            ballPlatformCollision(ball, platform) {
                if ((ball.y+ball.r>=platform.y-10 && ball.y<platform.y+(platformWidth/2))&&
                    (ball.x<=platform.platformBreak+ball.r||ball.x>=platform.platformBreak+platform.breakWidth-ball.r)) {
                    ball.y = platform.y-ball.r-14; 
                    // ALTERNATE WAY OF DOING BELOW
                    // this.ballYSpd = this.platformSpd;
                    this.isBallPlatformCollide = true;
                }else{
                    this.isBallPlatformCollide = false;
                }
            },
            updateGame() {
                // HANDLE BALL LEFT AND RIGHT EDGE OF SCREEN
                if (this.ball.x - this.ball.r - 4 <= 0) {
                    this.ball.x = this.ball.r + 4;
                }else if (this.ball.x + this.ball.r + 4 >= this.$refs.game.width) {
                    this.ball.x = this.$refs.game.width - this.ball.r -4;
                }

                // HANDLE BALL BOTTOM EDGE OF SCREEN AND 
                // WHEN NOT ON A PLATFORM OR BOTTOM BALL SHOULD FALL
                if (this.ball.y+(this.ball.r/2) > this.$refs.game.height - 10) {
                    this.ballYSpd = 0;
                }else if(!this.isBallPlatformCollide){
                    this.ballYSpd = gravitySpd;
                }

                for (let i = 0; i < platforms.length; i++) {
                    const element = platforms[i];
                    this.ballPlatformCollision(this.ball, element);
                    // CREATING ANOTHER PLATFORM AT BOTTOM WHEN ONE REACHES TOP
                    if (element.y<-10) {
                        let breakPoint = Math.floor(Math.random()*400);
                        let breakLength = Math.floor(Math.random()*100)+50;
                        //INCREASING SCORE IF A PLATFORM REACHES THE END
                        this.score+=1;
                        platforms.shift();
                        platforms.push(new Platform(650, breakPoint, breakLength));
                    }
                }

                // MAKING THE BALL MOVE DEPENDING ON SPEED
                this.ball.y+=this.ballYSpd;
                this.ball.x+=this.ballXSpd;
            },
            cancel_draw() {
                cancelAnimationFrame(this.id);
            },
            onKeyDown(e){
                switch (e.which) {
                    case 37: //left
                        this.ballXSpd = -3
                        break;
                    case 39: //right
                        this.ballXSpd = 3;
                        break;
                    default:
                        break;
                }
            },
            onKeyUp(){
                this.ballXSpd = 0;
                // if (this.ballSpd > 0) {
                //     this.ballSpd-=1;
                // }else if (this.ballSpd<0) {
                //     this.ballSpd+=1;
                // }else{
                //     this.ballSpd = 0;
                // }
            },       
            draw(){
                this.context.clearRect(0,0,this.$refs.game.width,this.$refs.game.height);
                let grd = this.context.createLinearGradient(300, 620, 0, 0);
                grd.addColorStop(0, this.backgroundColor.color1);
                grd.addColorStop(0.5, this.backgroundColor.color2);
                grd.addColorStop(1, this.backgroundColor.color3);

                this.context.fillStyle = grd
                this.context.fillRect(0,0,this.$refs.game.width,this.$refs.game.height);
                // SCORE TEXT
                this.context.font = "20px Verdana";
                this.context.fillStyle = "white";
                this.context.fillText("Score: "+this.score,180, 20)
                
                this.createBall();

                

                for (let i = 0; i < platforms.length; i++) {
                    const element = platforms[i];
                    this.createdPlatform(element);
                    element.y+=this.platformSpd;
                }

                this.updateGame();

                this.platformSpd -= 0.0001;
                this.id = requestAnimationFrame(this.draw);
                if (this.ball.y <= 10) {
                    this.cancel_draw();
                    // EMITS THE SCORE BACK TO BALLDOWNVIEW
                    this.$emit('score', this.score);
                    // CHANGES THE GAMEPAGE TO GAMEENDED PAGE
                    this.$emit('response', 2);
                }
            }
        },
        mounted(){
            this.context = this.$refs.game.getContext("2d");
            this.draw();
        }
}
</script>

<style scoped>

</style>