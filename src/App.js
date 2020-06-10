import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import Content from "./components/content.component";
import AdminContent from "./adminComponents/content.component";


export default class App extends Component {

    state ={
        adminAccount:true
    }

    render() {

        return(
           <div>
               {this.state.adminAccount ? <AdminContent/> : <Content/>}



           </div>
        );
    }
}
