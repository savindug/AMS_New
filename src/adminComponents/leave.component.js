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
import axios from "axios";

const { ipcRenderer } = window.require('electron');
$('#tbl_leaves').DataTable();


ipcRenderer.on('selected-path-lv-Admin', function (event, path) {
    console.log('Full path: ', path);

    path = path.replace(/\\/g, ",");

    var selectedDuration = document.querySelector('#selectDuration').value;
    var duration = selectedDuration.split('-');

    var from = duration[0].trim();
    var to = duration[1].trim();
    var att = 'att';

    console.log("from: "+from+to);
    console.log("to: "+to);

    console.log('replaced path: '+path);
    let branch = document.querySelector("#branch-inpt").value;
    axios
        .get(
            `http://localhost:8656/AMS/RESTful_Service/AdminexportLv/${path}?from=${from}&to=${to}&branchname=${branch}`
        )
        .then((response) => {
            console.log(response.data);

            if(response.data != null){
                ipcRenderer.send('open-msg-box', "Attendance Table Exported Successfully \nLocation: "+response.data)
                document.querySelector("#btn-export").disabled = false;
            }

        })
        .catch(function (error) {
            console.log(error);
        });

});


class LeaveComponent extends Component {

    exportToExcel = () =>{
        ipcRenderer.send('open-file-dialog-for-file', 7)
        document.querySelector("#btn-export").disabled = true;



    }




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
        //let url = new URL('http://localhost:8656/AMS/RESTful_Service/getAllLeaves');

        let url = new URL(`http://localhost:8656/AMS/RESTful_Service/getLeavesByDurationAdmin?from=${this.convertDate(selectedDateRange.startDate)}&to=${this.convertDate(selectedDateRange.endDate)}&branchname=${this.state.branch}`);
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


    if ($.fn.DataTable.isDataTable("#tbl_leaves")) {
        $('#tbl_leaves').DataTable().clear().destroy();
      }

        console.log("Users => "+data)

        var data = JSON.parse(data);

    console.log("dataset: "+data)

          $(document).ready(function() {
            $('#tbl_leaves').DataTable( {
                data: data,
                "retrieve": true,
                columns: [
                    { title: 'Employee ID', data: 'uID' },
                    { title: 'Username', data: 'uName' },
                    { title: 'Starts from', data: 'leaveStart' },
                    { title: 'Ends on', data: 'leaveEnd' },
                    { title: 'Leave Submitted On', data: 'leaveSubmitted' }
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

                <h3 className="text-center text-bold">Leave Management</h3>
                <br/>
                <div className="text-center">
                    <BranchDropdown branch={this.state.branch} handleBranchChange={this.handleBranchChange}/>
                    <input id="branch-inpt" value={this.state.branch} hidden/>
                </div>
                    <div className="container row">

                        <div className="col-4 my-5"></div>

                            <div className="col-4 my-5">
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id=""><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    </div>
                                        <input id="selectDuration" type="text" onClick={this.toggle} value={moment(this.state.dateRange.startDate).format('MM/DD/YYYY') + " - " + moment(this.state.dateRange.endDate).format('MM/DD/YYYY')} className="form-control text-center shadow-none" aria-label="Small" readonly="readonly" aria-describedby="inputGroup-sizing-sm" />
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id=""><i className="fa fa-calendar" aria-hidden="true"></i></span>
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
                <table id="tbl_leaves" className="display"></table>

                <div className="text-center my-5">
                    <button id='btn-export' className="btn btn-primary my-5" onClick={this.exportToExcel}><b>Export Report</b></button>
                </div>
            </div>
        );
    }
}

export default LeaveComponent;