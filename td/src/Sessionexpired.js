import React from 'react'
import { Link } from 'react-router-dom';




const Sessionexpired = () => {
    return (
        <>
       <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
                <h4>Session expired please login again</h4>
                <Link to="/login" className="btn btn-primary mt-4">LOGIN</Link>

            </div>

        </div>

       </div>
        
        
        
        
        </>
    );
}



export default Sessionexpired;