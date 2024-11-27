import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../Assets/forgot.css';
import {successalert, erroralert} from '../Alert'

function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEmail = () => {
        setLoading(true);
        axios.post("http://localhost:5000/", { email })
            .then(() => {
                // toast.success("Password sent to your email address!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Password sent to your email address");
                setEmail("");
            })
            .catch(error => {
                // toast.error("Please give correct Email id!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Please give correct email id!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "695px" }}>
                <div className='row'>
                   
                    <div className="form-container">
                        <ToastContainer></ToastContainer>
                        <div className="logo-container">
                            Forgot Password
                        </div>

                  
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="text" id="email" name="email" placeholder="Enter your email" required="" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>

                            {
                                loading ? <button className="form-submit-btn" onClick={sendEmail}>Sending Email <div className="spinner-border spinner-border-sm text-info ms-5" role="status">
                                <span className="visually-hidden" >Loading...</span>
                                 </div></button> : 
                             <button className="form-submit-btn" onClick={sendEmail}>Send Email </button>
                            }

                            {/* <button className="form-submit-btn" onClick={sendEmail}>Send Email <div className="spinner-border text-info ms-5" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div></button> */}
                   

                        <p className="signup-link">
                            Don't have an account?
                            <a href="#" className="signup-link link"> Sign up now</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forgot;
