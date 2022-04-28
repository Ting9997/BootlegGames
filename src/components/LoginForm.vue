<template>
    <div class="LoginForm">
    <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" name="username" placeholder="Username"/>
        <br>
        <label for="password">Password: </label>    
        <input type="password" v-model="password" name="password" placeholder="Password"/>
        <br>
        <button class="button">Login</button>
        <div v-if="error">Invalid Username or Password</div>
    </form>
    </div>
</template>

<script>
import auth from '../js/authorize';
export default {
    name: "LoginForm",
    data(){
        return{
            username:'',
            password:'',
            error: false
        }
    },
    methods:{
        login(){
            auth.login(this.username,this.password, (res)=>{
                if (res.auth) {
                    console.log(this.username)
                    console.log(this.password)
                    this.$router.replace('/');
                }else{
                    this.error = true
                }
            })
        }
    },

}
</script>

<style>
.LoginForm input, .LoginForm button{
    width: 25%;
}
.LoginForm button{
    margin-left: 140px;
}

form > * {
    margin: 20px;
}
</style>