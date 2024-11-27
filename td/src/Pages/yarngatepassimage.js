import React from "react";
import { Navigate, useLocation } from 'react-router-dom';

const Yarngatepassimage = ({ isLoggedIn }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const filename = query.get('filename');

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    const fileUrl = `http://localhost:5000/yarninwardimages/${filename}`;

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <img
                        src={fileUrl}
                        style={{ maxWidth: 750, maxHeight: 900 }}
                        alt={filename}
                    />
                    {/* <div>
                        <a href={fileUrl} download={filename} className='btn btn-primary'>
                            Download
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Yarngatepassimage;
