<template>
    <div id="contact-list-container">
        <dl id="contactList">
            <dt href="/contacts/rajiv_williams">
                Rajiv Williams
            </dt>
            <dd>I enjoy blah blah and blah</dd>
            <dt href="/contacts/andy_wang">
                Andy Wang
            </dt>
            <dd>I enjoy blah blah and blah</dd>
            <dt href="/contacts/ting_wu">
                Ting Wu
            </dt>
            <dd>I enjoy blah blah and blah</dd>
            <dt href="/contacts/marco_ma">
                Marco Ma
            </dt>
            <dd>I enjoy blah blah and blah</dd>
            <dt href="/contacts/owais_najmi">
                Owais Najmi
            </dt>
            <dd>I enjoy blah blah and blah</dd>
        </dl>
    </div>
</template>

<!-- _______________________________________________________________ -->
<script>
export default {
    name: "ContactsElement",
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
#contactList{
    // display: flex;
    // justify-content: space-evenly;
    // padding-top: 25px;
    // padding-bottom: 25px;
    margin: auto;
}

</style>