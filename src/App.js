import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import Content from "./components/content.component";
import AdminContent from "./adminComponents/content.component";
const { ipcRenderer } = window.require('electron');




export default class App extends Component {

    state ={
        branch:""
    }


    componentDidMount() {
        ipcRenderer.on('sus', (e,data) =>  {
            console.log(JSON.stringify(data));
            console.log(data.email);
            this.setState({
                branch: data.email
            })
        });
    }


    render() {



        return(
           <div>
               {this.state.branch === "District_Office_Galle" || this.state.branch === "Head_Office"  ? <AdminContent/> : <Content/>}
           </div>
        );
    }
}
