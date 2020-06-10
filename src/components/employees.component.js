import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
const { ipcRenderer } = window.require('electron');

$('#employees').DataTable();

ipcRenderer.on('selected-path', function (event, path) {
    console.log('Full path: ', path);
});

class EmployeesComponent extends Component {

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

    exportToExcel = () =>{
        ipcRenderer.send('open-file-dialog-for-file')
    }



    render() {

        return (

            <div>

                <div className="text-center">
                <table id="employees" className="display"></table>
                <button id='btn-export' className="btn btn-warning" onClick={this.exportToExcel}><b>Print Report</b></button>
                </div>
            </div>
        );


    }
}

export default EmployeesComponent;