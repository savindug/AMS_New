import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Edit from "./edit.component";
import Index from "./index.component";
import AttComponent from "./att.component";
import OtComponent from "./ot.component";
import LeaveComponent from "./leave.component";
import FreportComponent from "./freport.component";
import InstructionsComponent from "./instructions.component";
import EmployeesComponent from "./employees.component";

/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
/*-------------ADMIN------------------------------------------------*/
export default class Content extends Component {

    render() {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var yyyy = today.getFullYear();

        today = days[today.getDay()] + '  ' + months[today.getMonth()] + '   ' + dd + '   ' + yyyy;


        return(
            <Router>

                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                        <span className="btn btn-info">{today}</span>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav d-flex ">
                                <li className="nav-item">
                                    <Link to={'/'}  className="nav-link">Admin Menu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/index'}  className="nav-link">Index</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/emp'}  className="nav-link">Employees</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/att'}  className="nav-link">Attendance</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/leaves'}  className="nav-link">Leaves</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/ot'}  className="nav-link">Over Time</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/freports'}  className="nav-link">Field Reports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/instru'}  className="nav-link">Instructions</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>

                    <Switch>

                        <Route exact path ='/edit/:id' component={Edit}/>
                        <Route exact path ='/index' component={Index}/>
                        <Route exact path ='/emp' component={EmployeesComponent}/>
                        <Route exact path ='/att' component={AttComponent}/>
                        <Route exact path ='/leaves' component={LeaveComponent}/>
                        <Route exact path ='/ot' component={OtComponent}/>
                        <Route exact path ='/freports' component={FreportComponent}/>
                        <Route exact path ='/instru' component={InstructionsComponent}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
