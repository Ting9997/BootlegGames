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
        <p id="printout"></p>
    </div>
    
</template>

<!-- _______________________________________________________________ -->
<script>
import $ from 'jquery';
export default {
    name: "ContactsElement",
    props:{

    },
}
$(document).ready(function(){
    //let cell = $("dt"); 
    // $.ajax({
    //     type: 'GET',
    //     url: '../assets/grades.csv',
    //     dataType: 'text',
    //     success: function(response)
    //     {
    //         let data = response.split('\n');
    //         document.getElementById("printout").innerHTML = data; 
    //         cell.click(function(){
    //         alert("it works");
    //         })
    //     }
    // });  
    
    //creating resource
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

    // let data = console.log.length;
    // document.getElementById("printout").innerHTML = data; 


})
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