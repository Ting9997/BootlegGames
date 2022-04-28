<template>
    <NavBar/>
    <div class="login">
        <LoginForm/>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
    name:'LoginView',
    components:{
        LoginForm,
        NavBar
    }
}
</script>