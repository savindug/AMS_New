import React, {Component} from "react";
import axios from "axios";
import  TableRow from "./TableRow";


/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
export  default  class  Index  extends  Component{
    state = {business : []};

    componentDidMount =() => {
        axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({business : response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }
    tableRow (){
        return this.state.business.map(function (object, i) {
            return <TableRow obj = {object} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Business List</h3>
                <table className="table table-striped" style={{marginTop : 20}}>
                    <thead>
                    <tr>
                        <th>Person</th>
                        <th>Business</th>
                        <th>NIC</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.tableRow()}

                    </tbody>
                </table>
            </div>
        );
    }
}