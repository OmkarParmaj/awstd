

import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Header from '../sidebar/Header';
import {successalert, erroralert} from '../Alert'


import React, { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { FaDashcube } from "react-icons/fa6";

import { IoMdSettings } from "react-icons/io";



const PasswordRecovery = ({ isLoggedIn, setIsLoggedIn }) => {

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [pass, setPass] = useState([]);





    useEffect(() => {
        axios.get('http://localhost:5000/getpassword', { withCredentials: true })
            .then(res => {
                setPass(res.data[0].Password);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [password])

    const handlesubmit = (e) => {
        e.preventDefault();
        if (password === confirmpassword) {

            if (pass === password) {
                // toast.error("Password you have entered is old password! Please choose another password", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Password you have entered is old password! Please choose another password")
            }

            else {
                axios.put('http://localhost:5000/recoverpassword', { password }, { withCredentials: true })
                    .then(res => {
                        if (res.data.message === "Password changed") {
                            setPassword("");
                            setConfirmpassword("");
                            // toast.success("Password changed", { position: "top-center", autoClose: 2000, closeOnClick: true });
                            successalert("Password changed")

                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            }
            // toast.success("Password matched", { position: "top-center", autoClose: 2000, closeOnClick: true });

        }
        else {
            // toast.error("Password mismatched", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("Password mismatched");

        }

    }

    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1 companybeditmobile'>
                        <Mobilesidebar></Mobilesidebar>

                        {/* header section strts here  */}
                        <Header setIsLoggedIn={setIsLoggedIn}></Header>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />setting</Link></li>

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />password recovery</li>
                                        </ol>
                                    </nav>


                                </span>
                            </div>

                        </div>

                        <div className="row packingsliplabel">
                            <div className="col-md-12 ">
                                <div className="card  shadow-sm m-3 border border-0">
                                    <div className="car-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">PASSWORD RECOVERY</h4>
                                            </div>
                                            <div className="col-md-6">

                                                {/* <Link to='/setting' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link > */}

                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <div className="row  mt-5 d-flex justify-content-center  align-items-center">

                                            <div className="col-12 col-md-5 ">
                                                <label className="float-start">New Password</label>
                                                <input className="form-control" type="password" onChange={e => setPassword(e.target.value)}></input>
                                                <label className="float-start mt-3">Confirm Password</label>
                                                <input className="form-control mb-5" type="password" onChange={e => setConfirmpassword(e.target.value)}></input>
                                                <button className="btn btn-primary mb-5" type="submit">SUBMIT</button>
                                            </div>

                                        </div>
                                       
                                    </div>


                                </div>

                            </div>




                        </div>






                    </div>
                </div>
            </div>


        </>
    );
}


export default PasswordRecovery;