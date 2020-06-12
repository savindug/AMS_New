import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
/*const { ipcRenderer } = window.require('electron');*/
import BranchDropdown from "./dropdown";
import axios from "axios";

const { ipcRenderer } = window.require('electron');
$.DataTable = require('datatables.net');
$('#employees').DataTable();





ipcRenderer.on('selected-path-emp-Admin', function (event, path) {
    console.log('Full path: ', path);

    path = path.replace(/\\/g, ",");

    console.log('replaced path: '+path);
    const xhr = new XMLHttpRequest();


    let branch = document.querySelector("#branch-inpt").value;


    axios
        .get(
            `http://localhost:8656/AMS/RESTful_Service/AdminexportEmployees/${path}?branchname=${branch}`
        )
        .then((response) => {
            console.log(response.data);

            if(response.data != null){
                ipcRenderer.send('open-msg-box', "Employees Table Exported Successfully \nLocation: "+response.data)
                document.querySelector("#btn-export").disabled = false;
            }

        })
        .catch(function (error) {
            console.log(error);
        });

});






class EmployeesComponent extends Component {





    state = {

        branch: "NoBranch",



    };

    exportToExcel = () =>{

        ipcRenderer.send('open-file-dialog-for-file', 5)
        document.querySelector("#btn-export").disabled = true;



    }






   getEmployees = (branch) => {

        const xhr = new XMLHttpRequest();

       let url = new URL(`http://localhost:8656/AMS/RESTful_Service/getEmployeesAdmin?branchname=${branch}`);
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
        if ($.fn.DataTable.isDataTable("#employees")) {
            $('#employees').DataTable().clear().destroy();
        }

       console.log("Users => "+data)

        var data = JSON.parse(data);

    console.log("dataset: "+data)

          $(document).ready(function() {
            $('#employees').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                     {
                          extend: 'excel',
                          text: 'Save current page',
                          fileName:  "data.xlsx",
                          exportOptions: {
                          modifier: {
                                  page: 'current'
                                      }
                            }
                         }
                    ],
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

   /* exportToExcel = () =>{
        ipcRenderer.send('open-file-dialog-for-file')
    }*/

    handleBranchChange= (branch) => {
        this.setState({
            branch: branch.target.value
        });
        this.getEmployees(branch.target.value);  /*special for emp*/
    }

    exportToExcelPrint= () => {
        this.exportToExcel();



    }


    render() {

        return (

            <div>
                <h3 className="text-center text-bold">Employee Management</h3>
                <br/>
                <div className="text-center">
                    <BranchDropdown branch={this.state.branch} handleBranchChange={this.handleBranchChange}/>
                    <input id="branch-inpt" value={this.state.branch} hidden/>
                </div>
                <div className="text-center">
                <table id="employees" className="display"></table>
                <div className="text-center my-5">
                    <button id='btn-export' className="btn btn-primary my-5"  onClick={this.exportToExcelPrint}><b>Export Report</b></button>
                </div>
                </div>
            </div>
        );


    }
}

export default EmployeesComponent;