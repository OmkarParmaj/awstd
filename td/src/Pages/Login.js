import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { auth, provider } from "./Config";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCopyright } from "react-icons/ai";
import { successalert, erroralert } from '../Alert'

import '../Assets/login.css';

const Login = ({ setIsLoggedIn }) => {
    const [values, setValues] = useState({
        Email: "",
        Password: ""
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const [loading2, setLoading2] = useState(false);




    // google authentication starts 


    const handleClick = () => {
        setLoading2(true);
        signInWithPopup(auth, provider).then((data) => {
            // setValue(data.user.email)
            // localStorage.setItem("email", data.user.email)


            const email = data.user.email;

            const name = data.user.displayName;

            const uid = data.user.uid;
            const phonenumber = data.user.phoneNumber

            axios.post('http://localhost:5000/googleauth', { email, name, uid, phonenumber }, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    if (res.data.message === "done") {
                        setIsLoggedIn(true)

                        navigate("/dashboard", { replace: true })

                    }
                })
                .catch(err => {
                    // console.log(err)
                })
                .finally(() => {
                    setLoading2(false);
                })




        })
    }







    // google authentication ends

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    };

    // const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true)
        axios.post('http://localhost:5000/login', values, { withCredentials: true })
            .then(res => {
                // console.log(res);
                if (res.data.redirectTo) {
                    setIsLoggedIn(true); // Update the state in the parent component
                    // dispatch(hello("true")); // Use checkAction instead of check
                    // Navigate to the dashboard


                    navigate("/dashboard");
                } else if (res.data.message === "Incorrect password") {
                    // console.log("incorrect password");
                    // setAlert("Incorrect password");
                    // toast.error("Incorrect Password!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    erroralert("Incorrect password")
                }
                else if (res.data.message === "User not found") {
                    // setAlert("Incorrect email id or user not found!");
                    // toast.error("Incorrect Email or Password!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    erroralert("Incorrect Emial or Password")
                }

            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password"); // Display error message
            }).finally(() => {
                setLoading(false);
            })
    };



    return (
        <>
            <div className="container">
                {/* {alert && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{alert}</strong>
                        <button type="button" className="btnn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
                    </div>
                )} */}
            </div>
            <div className="container-fluid vh-100 ">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <img src="logo.png" alt="logo" style={{ width: "220px", height: "60px" }}></img>

                    </div>


                </div>
                <div className="row mt-5 ">
                    <div className="col-12 col-md-12 m-0  d-flex justify-content-center align-items-center">
                        {/* <div className="card border border-1">
                            <ToastContainer></ToastContainer>
                            <div className="card-body">
                                <div className="row"> */}

                        {/* <div className="col-6">
                             
                                    <div className="container d-block">
                                        <div className="row text-center ">
                                            <h2>Sign In</h2>
                                        </div>
                                        <div className="row mt-3 ">
                                            <input type="text" className="form-control" placeholder="User name" required onChange={val("Email")} />
                                            <input type="password" className="form-control mt-3 mb-3" placeholder="Password" required onChange={val("Password")} />
                                            <button type="submit" className="btnn btnn-success">Sign In</button>
                                        </div>
                                        <div className="row " style={{ height: "30px" }}>{alert && <div className="row text-danger">{alert}</div>} </div>

                                        <div className="row ">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row  mt-3 text-end">
                                            <a href="/forgot">Forgot password</a>

                                        </div>

                                    </div>
                           
                                <div className="row  mt-4 text-center">
                                    <p>Not a member?  <Link to="/signup">Signup</Link>   </p>
                                </div>
                            </div> */}








                        <div className="loginform border border-1">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <ToastContainer></ToastContainer>
                                    <div className="flex-column">
                                        <label>Email </label></div>
                                    <div className="inputForm">

                                        <input type="text" className="input" placeholder="Enter your Email" required onChange={val("Email")} />
                                    </div>

                                    <div className="flex-column">
                                        <label>Password </label></div>
                                    <div className="inputForm">

                                        <input type="password" className="input" placeholder="Enter your Password" required onChange={val("Password")} />

                                    </div>

                                    <div className="flex-row">
                                        <div>
                                            <input type="checkbox" />
                                            <label>Remember me </label>
                                        </div>
                                        <a href="/forgot" className="span">Forgot password?</a>
                                    </div>
                                    {
                                        loading ? <button className="button-submit" type="submit"><div class="spinner-border  text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div></button>
                                            : <button className="button-submit" type="submit">Sign In</button>
                                    }
                                    {/* <button className="button-submit" type="submit">Sign In</button> */}
                                    <p className="p">Don't have an account? <Link to="/signup" className="span">Sign Up</Link >

                                    </p><p className="p line">Or With</p>
                                </div>
                            </form>

                            <div className="flex-row">
                                {
                                    loading2 ?
                                        <button className="btnn google">


                                            <div class="spinner-border  text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>

                                        </button> :

                                        <button className="btnn google" onClick={handleClick}>


                                            Google

                                        </button>
                                }


                                <button className="btnn apple">

                                    Apple

                                </button>
                            </div>
                        </div>



































                    </div>



                </div>




                <div className="row mobilebottom" style={{ marginTop: "100px" }}>
                    <div className="col-12 col-md-12 border-top">
                        <p className="text-center mt-2 mb-2"><AiOutlineCopyright className="mb-1" />2024 Copyright TextileDiwanji. All rights reserved</p>

                    </div>

                </div>
            </div>




        </>
    );
};

export default Login;
