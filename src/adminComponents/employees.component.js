import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net'
import BranchDropdown from "./dropdown";

$('#employees').DataTable();

class EmployeesComponent extends Component {

    constructor(props) {
        super(props);

    }

    state = {

        branch: "NoBranch"


    };

   getEmployees = () => {

        const xhr = new XMLHttpRequest();

        let url = new URL('http://localhost:8656/AMS/RESTful_Service/getEmployees');
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) { //has the operation finished
                if (xhr.status === 200) { //was it successful
                //result.value = xhr.responseText; //update the webpage
                var ret = JSON.parse(xhr.responseText);

                console.log(ret);
                    this.displayUsers(xhr.responseText)
                }else {

                alert("Async call failed. ResponseText was:\n" + xhr.responseText);
                } //show what the failed response was
               // xhr = null; //the previous xhr object no longer has any use
                }
        }

    }

    displayUsers = (data) => {
        console.log("Users => "+data)

        var data = JSON.parse(data);

    console.log("dataset: "+data)

          $(document).ready(function() {
            $('#employees').DataTable( {
                data: data,
                columns: [
                    { title: 'Employee ID', data: 'uID' },
                    { title: 'Username', data: 'uName' },
                    { title: 'Department', data: 'userdepart' },
                    { title: 'Gender', data: 'gender' },
                    { title: 'Create Date', data: 'createDate' }
                    ]
            } );
        } );

    }

    componentDidMount(){
        this.getEmployees();
    }


    handleBranchChange= (branch) => {
        this.setState({
            branch: branch.target.value
        });
        this.getEmployees();  /*special for emp*/
    }

    render() {

        return (
            <div>
                <h3 className="text-center text-bold">Employee Management</h3>
                <br/>
                <div className="text-center">
                <BranchDropdown branch={this.state.branch} handleBranchChange={this.handleBranchChange}/>
                </div>
                <div className="text-center">
                <table id="employees" className="display"></table>
                <button className="btn btn-warning"><b>Print Report</b></button>
                </div>
            </div>
        );
    }
}

export default EmployeesComponent;