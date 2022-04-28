import axios from 'axios';

export default{
    login(username, password, callback){
        authRequest(username, password, (res) => {
            if (res.auth) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.token = res.token;
                callback({
                    auth: true,
                    token: res.token
                });
                this.onLoginStatus(true)
            }else{
                delete localStorage.token;
                callback({
                    auth: false
                });
                this.onLoginStatus(false)
            }
        })
    },

    // TO LOGOUT FROM THE PAGE
    logout(callback){
        delete localStorage.token;
        callback({
            auth: false
        });
        this.onLoginStatus(false)
    },

    // CHECK IF LOGGED IN
    isLoggedIn(){return !!localStorage.token},

    onLoginStatus(status){
        console.log(status)
    }
}

function authRequest(username, password, callback){
    axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}&website=${password}`)
    .then((result)=> {
        if (result.data.length > 0) {
            callback({
                auth: true,
                token: Math.random().toString(36).substring(7)
            })
        }else{
            callback({
                auth: false
            })
        }
    })
    .catch(err=>console.log(err));
}