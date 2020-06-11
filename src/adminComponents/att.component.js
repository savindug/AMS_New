import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net';
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
import moment from 'moment';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
} from "reactstrap";

import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import BranchDropdown from "./dropdown";

$('#attendance').DataTable();


class AttComponent extends Component {


    constructor(props) {
        super(props);
        this.btn_Date_picker = React.createRef();
      }

    state = {
        date_picker_toggle: false,
		open: true,
		dateRange: {
            // startDate: moment().startOf('week').toDate(),
            // endDate: moment().endOf('week').toDate(),
            startDate: 'Fri Oct 01 2019 00:00:00 GMT+0530 (India Standard Time)',
            endDate: 'Sun Dec 31 2019 00:00:00 GMT+0530 (India Standard Time)'
        },
        modal : false,
        branch: "NoBranch"


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
        this.getAttendance(this.state.dateRange);
    }

     convertDate = (dateString) => {
        var date = new Date(dateString);
        console.log(Number(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
        return ( Number(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    }

    getAttendance = (selectedDateRange) => {



        const xhr = new XMLHttpRequest();
        //let url = new URL('http://localhost:8656/AMS/RESTful_Service/getAllAttendance');

        let url = new URL(`http://localhost:8656/AMS/RESTful_Service/getAttendanceByDurationAdmin?from=${this.convertDate(selectedDateRange.startDate)}&to=${this.convertDate(selectedDateRange.endDate)}&branchname=${this.state.branch}`);
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


    if ($.fn.DataTable.isDataTable("#attendance")) {
        $('#attendance').DataTable().clear().destroy();
      }

        console.log("Users => "+data)

        var data = JSON.parse(data);

    console.log("dataset: "+data)

          $(document).ready(function() {
            $('#attendance').DataTable( {
                data: data,
                "retrieve": true,
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

    handleBranchChange= (branch) => {
        this.setState({
            branch:branch.target.value
        });


    };

    render() {

        return (
            <div>

                <h3 className="text-center text-bold">Attendance Management</h3>
                <br/>
                <div className="text-center">
                    <BranchDropdown branch={this.state.branch} handleBranchChange={this.handleBranchChange}/>
                </div>
                <div className="container row text-center">

                    <div className="col-4 my-5"></div>

                    <div className="col-4 my-5">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id=""><i className="fa fa-calendar"
                                                                            aria-hidden="true"></i></span>
                            </div>
                            <input id="selectDuration" type="text" onClick={this.toggle}
                                   value={moment(this.state.dateRange.startDate).format('MM/DD/YYYY') + " - " + moment(this.state.dateRange.endDate).format('MM/DD/YYYY')}
                                   className="form-control text-center shadow-none" aria-label="Small"
                                   readOnly="readonly" aria-describedby="inputGroup-sizing-sm"/>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id=""><i className="fa fa-calendar"
                                                                            aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-4 my-5"></div>
                </div>

                <div className="row">

                        <div className="col-2"></div>
                            <div className="col-8">

                                <div id='dateRangePicker'>

                                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Select Date Range</ModalHeader>

                                            <ModalBody>
                                                <DateRangePicker
                                                    open={this.state.open}
                                                    maxDate={moment()}
                                                    onChange={(range) => { this.setState({ dateRange: range, modal: !(this.state.modal) }); this.getAttendance(range); console.log(range) }}
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