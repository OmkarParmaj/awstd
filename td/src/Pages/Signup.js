import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import '../Assets/signup.css';
import { successalert, erroralert } from '../Alert';

const Signup = () => {
    const [verify, setVerify] = useState(0);


    const [loading2, setLoading2] = useState(false);
    const [otpsendtime, setOtpsendtime] = useState(null);
    const [time, setTime] = useState(Date.now());
    const [otp, setOtp] = useState(0);





    const [values, setValues] = useState({
        Name: "",
        Email: "",
        Password: "",
        mobileno: ""
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);




    const sendmail = async () => {
        setLoading2(true);
        try {

            if (values.Email.length > 0) {
                const newPin = Math.floor(1000 + Math.random() * 9000);
                setOtpsendtime(Date.now());
                setOtp(newPin);

                const email = values.Email;

                const res = await axios.post('http://localhost:5000/sendotp', { email, newPin }, { withCredentials: true });

                if (res.data.message === "send") {

                    successalert("OTP has send successfully");
                }


            }

            else {
                erroralert("Please enter EmailId");

            }



        } catch (err) {
            console.error(err);
            erroralert("Failed to send OTP");
        } finally {
            setLoading2(false);
        }
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const timeDifference = otpsendtime ? Math.floor((time - otpsendtime) / 1000) : null;



































    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);


        if (timeDifference > 300) {
            erroralert("OTP expires Please send mail again");
            setLoading(false)

        }

        else if (otp == verify) {

            axios.post('http://localhost:5000/customer', values, {
                withCredentials: true
            })
                .then(result => {
                    if (result.data.message === "Duplicate data") {
                        erroralert("Email id already exist, Please try another emailid");
                    } else if (result.data.message === "Data inserted successfully") {
                        successalert("Account created successfully");
                    }
                })
                .catch(err => {
                    erroralert("Uhh! server down. Please try again later");
                })
                .finally(() => {
                    setLoading(false);
                });



        }
        else {
            erroralert("Wrong OTP")
            setLoading(false)

        }



    };

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    };

    useEffect(() => {
        // console.log("Alert message state before effect:", alert);
    }, [setAlert]);

    const navigate = useNavigate();

    const handlehome = () => {
        navigate('/login');
    };

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center'>
                <div className='container-fluid d-flex justify-content-center align-items-center'>
                    {/* <ToastContainer></ToastContainer> */}
                    <div className='row d-flex justify-content-center align-items-center mt-5'>
                        <div className='col-12 col-md-6 '>
                            <div className="card-body p-3 pb-md-4 ps-md-4 pe-md-4 p-xl-5 border border-1">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="text-center mb-3">Registration</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex gap-3 flex-column">
                                            <a href="#!" className="btn btn-lg btn-outline-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                                <span className="ms-2 fs-6">Log in with Google</span>
                                            </a>
                                        </div>
                                        <p className="text-center mt-2 mb-2">Or enter your details to register</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Full Name" required onChange={val("Name")} />
                                                <label htmlFor="firstName" className="form-label">Full Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-2">
                                                <input type="number" className="form-control" name="mobileno" id="mobileno" placeholder="Mobile no" onChange={val("mobileno")} required />
                                                <label htmlFor="mobileno" className="form-label">Mobile no</label>
                                            </div>
                                        </div>
                                        <div className="col-7">
                                            <div className="form-floating mb-2">
                                                <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" onChange={val("Email")} required />
                                                <label htmlFor="email" className="form-label">Email</label>

                                            </div>
                                        </div>

                                        <div className='col-5'>
                                            {
                                                loading2 ?
                                                    <button className='btn btn-primary btn-sm float-end mt-3' style={{ width: "100px" }} type='' >
                                                        <div class="spinner-border spinner-border-sm" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                    :
                                                    <button className='btn btn-primary btn-sm float-end mt-3' style={{ width: "100px" }} type='' onClick={sendmail}>Send OTP</button>

                                            }


                                        </div>
                                        <div className="col-7">
                                            <div className="form-floating mb-2">
                                                <input type="number" className="form-control"  onChange={e => setVerify(e.target.value)} required />
                                                <label htmlFor="verifycode" className="form-label">Verify OTP</label>
                                            </div>
                                        </div>
                                        <div className='col-1 text-start'>
                                            <div className='' style={{ marginTop: "13px" }}>
                                                {
                                                    verify === '' ? null :
                                                        verify == otp ?
                                                            <img src='/check.png' alt='checkmark' style={{ height: "30px", width: "30px" }} /> :
                                                            <img src='/delete.png' alt='delete' style={{ height: "30px", width: "30px" }} />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-2">
                                                <input type="password" className="form-control" name="Password" id="password" placeholder="Password" onChange={val("Password")} required />
                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required />
                                                <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                    I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                {
                                                    loading ? <button className="btn btn-dark btn-lg" type="submit">Sign up <div className="spinner-border spinner-border-sm ms-5" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></button> : <button className="btn btn-dark btn-lg" type="submit">Sign up</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="mb-0 mt-3 text-secondary text-center">Already have an account? <Link to='/login' className="link-primary text-decoration-none">Sign in</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 mobilesignupimage computersignupimage'>
                            <img src='logo.png' alt='logo' style={{ height: "120px", width: "330px" }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
