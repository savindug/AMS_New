const electron = require('electron');

    const {ipcRenderer} = electron;

    const xhr = new XMLHttpRequest();

    class Users  {

        constructor(username, email, pwd, c_pwd){
            this.username = username;
            this.email = email;
            this.pwd = pwd;
            this.c_pwd = c_pwd;
        }

        displayUser(){
            console.log(this.username+", "+this.email+", "+this.pwd);
        }

        saveUser(){

            let url = new URL('http://localhost:8090/api/v1/users');

            var data = {
                "username": this.username,
                "email": this.email,
                "pwd": this.pwd
            }

            localStorage.setItem('usr_data', JSON.stringify(data))

            this.loginUser();

        }

        loginUser(){

           let usr_data = JSON.parse(localStorage.getItem('usr_data'))

           console.log(usr_data)

           if(this.username === usr_data.username && this.pwd === usr_data.pwd){
               console.log("loged iN")
               this.setSession(usr_data)
           }

        }

    setSession(data){
    console.log("setSession( "+data.username+" )")
    ipcRenderer.send('set-username', data);

    ipcRenderer.on('user-saved', (e) => {
        this.redirectUser();
    })

    }

    redirectUser(){
            console.log("redirectUser()")
            ipcRenderer.send('loginWindow-load')
    }


    }

    module.exports.Users = Users;



//    url.searchParams.set('username', 'Savi')
//    url.searchParams.set('email', 'savindu.me@gmail.com')
//    url.searchParams.set('pwd', '102020202')
//    url.searchParams.set('role', 'role')
//    url.searchParams.set('regDate', '2019-12-18 00:00:00')




