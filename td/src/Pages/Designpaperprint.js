import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Designpaperprint = ({ isLoggedIn, setIsLoggedIn }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const filenameWithPrefix = query.get('designpaper');

    // Remove the 'designpaper/' prefix if it exists
    const filename = filenameWithPrefix ? filenameWithPrefix.replace(/^designpaper\\/, '') : '';

    // Construct the file URL
    const fileUrl = `http://localhost:5000/designpaper/${filename}`;

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

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
};

export default Designpaperprint;
