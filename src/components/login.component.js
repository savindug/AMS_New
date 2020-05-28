import React, {Component} from "react";
export  default  class  Login  extends  Component{




    render() {
        const {onlogin} = this.props;
        return (
            <div style={{marginTop: 10}}>
                <br/><br/>
                <h3><b>User Login</b></h3>
                <br/>
                <form onSubmit={onlogin}>

                    <div className="form-group">
                        <label ><b>Branchname :</b></label>
                        <select className="form-control" >
                            <option>Branch1</option>
                            <option>Branch2</option>
                            <option>Branch3</option>
                            <option>Branch4</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label><b>Username :</b></label>
                        <input type="text" className="form-control" />

                    </div>

                    <div className="form-group">
                        <label><b>Password :</b></label>
                        <input type="password" className="form-control" />

                    </div>


                    <div className="form-group">

                        <input type="submit"  value="Login" className="btn btn-primary"/>

                    </div>
                </form>

            </div>
        );
    }
}