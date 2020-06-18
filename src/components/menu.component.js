import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';




export default class MainMenu extends Component {

    render() {


        const mystyle = {
            padding: "15px 25px",
            fontSize: "24px",
            color: "#fff",
            textAlign: "center",
            cursor: "pointer",
            outline: "none",
            border: "none",
            borderRadius: "15px",
            boxShadow: "0 9px #999",
        };

        return(
            <div>

                <br/>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img
                                height="100%"
                                width="100%"
                                src={`/logo.jpg`}
                            />
                        </div>
                        <div className="col">
                            <div className="container">

                                <br/>
                                <br/>
                                <button className="button btn-success" style={mystyle}>

                                    <li className="nav-item">
                                        <Link to={'/emp'}  className="nav-link" style={{color: "#fff"}}>Employees</Link>
                                    </li>

                                </button>

                                <button className="button btn-info" style={mystyle}>

                                    <li className="nav-item">
                                        <Link to={'/att'}  className="nav-link" style={{color: "#fff"}}>Attendance</Link>
                                    </li>

                                </button>

                                <button className="button btn-danger" style={mystyle}>
                                    {" "}
                                    <li className="nav-item">
                                        <Link to={'/leaves'}  className="nav-link" style={{color: "#fff"}}>Leave</Link>
                                    </li>

                                </button>



                            <button className="button btn-secondary" style={mystyle}>

                                <li className="nav-item">
                                    <Link to={'/'}  className="nav-link" style={{color: "#fff"}}>Menu</Link>
                                </li>

                            </button>

                                <button className="button btn-warning" style={mystyle}>

                                    <li className="nav-item">
                                        <Link to={'/ot'}  className="nav-link" style={{color: "#fff"}}>OT</Link>
                                    </li>

                                </button>

                                <button className="button btn-primary" style={mystyle}>

                                    <li className="nav-item">
                                        <Link to={'/freports'}  className="nav-link" style={{color: "#fff"}}>Field Report</Link>
                                    </li>

                                </button>

                                <button className="button btn-secondary" style={mystyle}>

                                    <li className="nav-item">
                                        <Link to={'/instru'}  className="nav-link" style={{color: "#fff"}}>Instruction</Link>
                                    </li>

                                </button>

                                <br/>


                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
