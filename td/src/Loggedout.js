import React from "react";
import {Link} from 'react-router-dom';




const Loggedout = () => {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4>You are successfully loggedout</h4>
                    <Link to='/login' className="btn btn-primary btn-sm mt-4">LOGIN</Link>


                </div>

            </div>

        </div>
        
        
        
        </>
    );
}



export default Loggedout;