<template>
    <!--Navigation Bar-->
    <NavBar/>

    <!-- Games -->
    <BaseBackground>
        <!-- Title -->
        <div class="title"> <!-- Using title class declared in DropZoneView.vue-->
            Contacts
        </div>
    
        <!-- Games List -->
        <div class="contents">
            <ContactsElement>
                Testing
            </ContactsElement>
        </div>
    </BaseBackground>

    <!-- Page Footer -->
</template>

<!-- _______________________________________________________________ -->
<script>
import NavBar from '@/components/NavBar.vue';
import BaseBackground from '@/components/BaseBackground.vue';
import ContactsElement from '@/components/ContactsElement.vue';

export default {
    name: "ContactsView",
    components: {
        NavBar,
        BaseBackground,
        ContactsElement
    },
}
</script>

<!-- _______________________________________________________________ -->
<style lang='scss'>
@import "../styles/GlobalVariables.scss";

.contents{
    background-color: var(--cus-trans-black);
}

</style>