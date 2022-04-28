<template>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a href="#" class="navbar-left">
                <img src="../assets/bootleg_icon.png" width="50" height="50" alt="logo"> 
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/games">Games</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contacts">Contacts</a>
                </li>
                <li v-if="!isLoggedIn" class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                    <a class="nav-link" v-on:click="logout" href="/login">Logout</a>
                </li>
            </ul>
            <div>
                <p v-if="isLoggedIn" class="logged-in-name">{{username}}</p>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
import authorize from '@/js/authorize'
export default {
    name: "DropZone",
    data() {
        return {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            isLoggedIn: authorize.isLoggedIn()
        }
    },
    created(){
        authorize.onLoginStatus = isLoggedIn =>{
            this.isLoggedIn = isLoggedIn;
        }
    },
    methods:{
        logout: function(){
            authorize.logout((res)=>{
                console.log(res)
            });
        }
    }
}
</script>

<style lang="scss">
@import "../styles/GlobalVariables.scss";

.navbar{
    background-color: var(--cus-black) !important;;
}

.nav-item{
    background-color: var(--cus-dark-blue) !important;
    margin-left: 20px;
}

.nav-link{
    color: var(--cus-white) !important;
    font-family: var(--cus-title-font);
}
.logged-in-name{
    color: white;
    -webkit-text-stroke-color: white;
}

</style>