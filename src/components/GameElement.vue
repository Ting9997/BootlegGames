<template>
    <table id="GameList">
        <tr>
            <td> <a class="nav-link" href="/games/checkers">Checkers Game</a></td>
            <td>[Preview Image]</td>
        </tr>
        <tr>
            <td> <a class="nav-link" href="/games/snake">The Snake Game</a></td>
            <td>[Preview Image]</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
    </table>
</template>

<!-- _______________________________________________________________ -->
<script>
export default {
    name: "GameElement",
    props:{

    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang="scss">
@import "../styles/GlobalVariables.scss";

.td{
    background-color: var(--cus-trans-black);
}
</style>