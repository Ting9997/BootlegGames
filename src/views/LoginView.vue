<template>
    <NavBar/>
    <base-background> 
        <div class="login">
            <LoginForm/>
        </div>
    </base-background>

    <!-- Page Footer -->
    <div class="footer">© 2022 Bootleg Games</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import LoginForm from '../components/LoginForm.vue'
import BaseBackground from '../components/BaseBackground.vue'

export default {
    name:'LoginView',
    components:{
        LoginForm,
        NavBar,
        BaseBackground
    }
}
</script>
<style lang="scss">
@import "../styles/GlobalVariables.scss";
.footer{
    font-family: var(--cus-title-font);
    font-size: medium;
    background-color: var(--cus-black);
    color: var(--cus-white);
    height: 400px;
}
</style>