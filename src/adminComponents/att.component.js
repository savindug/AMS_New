import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net';
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
import 'moment';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
} from "reactstrap";

import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";

$('#attendance').DataTable();



/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
class AttComponent extends Component {


    constructor(props) {
        super(props);
        this.btn_Date_picker = React.createRef();
      }

    state = {
        date_picker_toggle: false,
		open: true,
		dateRange: {
            startDate: 'Fri Nov 01 2019 00:00:00 GMT+0530 (India Standard Time)',
            endDate: 'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)'
        },
        modal : false


    };



    componentDidMount(){

        let dateRangerPicker = document.querySelector('#dateRangePicker')
        dateRangerPicker.style.display = 'none';

        document.querySelector('#selectDuration').addEventListener('click', (event) => {
            console.log('btn clicked')
            if (dateRangerPicker.style.display === "none") {
                dateRangerPicker.style.display = "block";
              } else {
                dateRangerPicker.style.display = "none";
              }
        });
        this.getEmployees();
    }

     convertDate = (dateString) => {
        var date = new Date(dateString);
        return ( Number(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    }

    getEmployees = () => {

        const xhr = new XMLHttpRequest();

        let url = new URL(`http://localhost:8656/AMS/RESTful_Service/getAttendanceByDuration?from=${this.convertDate(this.state.dateRange.startDate)}&to=${this.convertDate(this.state.dateRange.endDate)}`);
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
            $('#attendance').DataTable( {
                data: data,
                columns: [
                    { title: 'Employee ID', data: 'uId' },
                    { title: 'Username', data: 'uName' },
                    { title: 'Department', data: 'depart' },
                    { title: 'Attend Time', data: 'attTime' },
                    { title: 'Verify Mode', data: 'verifyMode' }
                    ]
            } );
        } );

    }

    toggle = () =>{
        this.setState({modal:!(this.state.modal)});

    }

    render() {

        return (
            <div>
                <p>Attendance Table Here</p>
                <button id="selectDuration" className="btn btn-primary" type="button" onClick={this.toggle}>Toggle</button>
                <div className="row">

                        <div className="col-2"></div>
                            <div className="col-8">

                                <div id='dateRangePicker'>

                                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Select Date Range</ModalHeader>

                                            <ModalBody>
                                                <DateRangePicker
                                                    open={this.state.open}
                                                    onChange={(range) => { this.setState({ dateRange: range, modal: !(this.state.modal) }); this.getEmployees(); }}
                                                    autoFocus
                                                />
                                            </ModalBody>

                                    </Modal>

                                </div>

                        <div className="col-2"></div>
                    </div>

                </div>
                <br/>
                <table id="attendance" className="display"></table>
                <button className="btn btn-warning"><b>Print Report</b></button>
            </div>
        );
    }
}

export default AttComponent;