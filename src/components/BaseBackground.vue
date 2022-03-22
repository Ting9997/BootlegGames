<template>
    <div class='upper'>
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'BaseBackground',
}
</script>

<style lang='scss'>
@import "../styles/GlobalVariables.scss";

.upper{
    background-image: url(../assets/background.png);
    background-size: 15rem 5rem;
    background-position: left top;
    background-repeat: repeat;
    background-color: var(--cus-light-blue);
}
</style>