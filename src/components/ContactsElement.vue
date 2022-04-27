<template>
    <div id="contact-list-container">
        <dl id="contactList">
            <dt href="/contacts/rajiv_williams">
                Rajiv Williams
            </dt>
            <dd>
                <a rel="stylesheet" href="https://www.linkedin.com/in/rajiv-williams-758216211/">
                    LinkedIn Account
                </a>
            </dd>
            <dt href="/contacts/andy_wang">
                Andy Wang
            </dt>
            <dd>
                <a rel="stylesheet" href="https://www.linkedin.com/in/andy-wang-79a88b1a4/">
                    LinkedIn Account
                </a>
            </dd>
            <dt href="/contacts/ting_wu">
                Ting Wu
            </dt>
            <dd>
                <a rel="stylesheet" href="https://www.linkedin.com/in/ting-jian-wu-979b93198/">
                    LinkedIn Account
                </a>
            </dd>
            <dt href="/contacts/marco_ma">
                Marco Ma
            </dt>
            <dd>
                <a rel="stylesheet" href="https://www.linkedin.com/in/mamarco/">
                    LinkedIn Account
                </a>
            </dd>
            <dt href="/contacts/owais_najmi">
                Owais Najmi
            </dt>
            <dd>
                <a rel="stylesheet" href="https://www.linkedin.com/in/owais-najmi-507810200/">
                    LinkedIn Account
                </a>
            </dd>
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
    margin: auto;  
}
dt{
    width: 100%;
    height: 20%;
    font-family: var(--cus-title-font);
    font-size: 3rem;
    color: var(--cus-white);
    text-align: center;
    text-shadow: 2px 2px #020202;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}
dd{
    font-family: var(--cus-title-font);
    color: var(--cus-white);
    font-size: 2rem;
    -webkit-text-stroke-width: 0.1px;
    -webkit-text-stroke-color: black;
}

</style>