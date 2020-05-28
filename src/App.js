import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from "./components/content.component";
import Login from "./components/login.component";
import loginavatar from "./img/loginavatar.png"

export default class App extends Component {

    state = {
        loginStatus : false
    }

    changelogin = (event) => {
        event.preventDefault();
        this.setState({
            loginStatus : !(this.state.loginStatus)
            }
        );
        console.log(this.state.loginStatus);
    };

    render() {

        return(
           <div>
               {this.state.loginStatus ?

                   <Content/>

                   :


                   <div>
                   <br/><br/>
                   <div className="container border border-info">
                   <div className="row ">
                   <div className="col">
                   <Login onlogin={this.changelogin}/>
                   </div>
                   <div className="col justify-content-end" style={{marginLeft: 100, marginTop: 30, marginBottom: 30}} >
                   <img style={{width: "80%", HEIGHT: "80%"}} src={loginavatar} alt="Avatar" />
                   </div>
                   </div>
                   </div>
                   </div>

               }

           </div>
        );
    }
}
