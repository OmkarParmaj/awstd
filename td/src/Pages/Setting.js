import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';
import '../Assets/setting.css';

import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";




import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { FcFactoryBreakdown } from "react-icons/fc";
import axios from "axios";
import { FcLibrary } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcLock, FcManager } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import Title from "./Title";









const Setting = ({ isLoggedIn, setIsLoggedIn }) => {

    const [settingvalue, setSettingvalue] = useState({
        setting: "SETTING",
        url: "/setting"
    })



    const [totalcompany, setTotalcompany] = useState([]);
    const [totalparty, setTotalparty] = useState([]);
    const [shiftcount, setShiftcount] = useState([]);
    const [banks, setBanks] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/totalparty', { withCredentials: true })
            .then(res => {
                setTotalparty(res.data[0].totalparty)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:5000/totalcompany', { withCredentials: true })
            .then(res => {
                setTotalcompany(res.data[0].totalcompany);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/totalbanks', { withCredentials: true })
            .then(res => {

                const totalbanks = res.data[0].totalbanks;

                setBanks(totalbanks);


            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('http://localhost:5000/shiftnumber', { withCredentials: true })
            .then(res => {
                setShiftcount(res.data[0].totalshift)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])



    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }





    return (
        <>

            <div className='container-fluid'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1'>
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

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Setting</li>
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
                                                <h4 className="text-start ms-4 mt-2">SETTING</h4>
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
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>

                                        <div className="row d-flex justify-content-center mt-4 mainrowmobile">
                                            <div className="col-12 col-md-11 ">
                                                <div className="row">

                                                    {/* <h5 className="text-start ">Settings</h5> */}
                                                    {/* <hr></hr> */}


                                                </div>
                                                <div className="row mt-3 ms-2 mb-3"><p className="text-start">Company settings</p></div>
                                                <div className="row mb-5 ms-4 me-4">
                                                    <div className="col-12 col-md-3">
                                                        <Link to='/companyregistration' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center">COMPANY REGISTRATION</h5>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                            <FcFactoryBreakdown className="mt-2 " style={{ height: "70px", width: "70px" }} />
                                                                        </div>
                                                                        <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                            <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total company</h6>
                                                                            <h4 className="text-center">{totalcompany}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-3 banksettingmobile">
                                                        <Link to='/companybankdetails' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className=" text-center">BANK REGISTRATION</h5>
                                                                    </div>
                                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                                        <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                            <FcLibrary className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>
                                                                        <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                            <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Acc</h6>
                                                                            <h4 className=" text-center">{banks}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-3 partysettingmobile">
                                                        <Link to='/party' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className=" text-center">PARTY REGISTRATION</h5>
                                                                    </div>
                                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                                        <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                            <FcConferenceCall className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>
                                                                        <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                            <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Party</h6>
                                                                            <h4 className=" text-center">{totalparty}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-3 shiftsettingmobile">
                                                        <Link to='/shiftsetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className=" text-center">SHIFT SETTING</h5>
                                                                    </div>
                                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                                        <div className="col-6 col-md-6 d-flex justify-content-center align-items-center">
                                                                            <FcClock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>
                                                                        <div className="col-6 col-md-6 m-0 border-start border-2">
                                                                            <h6 className="mt-3 text-center" style={{ fontSize: "14px" }}>Total Shifts</h6>
                                                                            <h4 className=" text-center">{shiftcount}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>


                                                </div>
                                                <hr></hr>
                                                <div className="row ms-2 mt-3 mb-3"><h6 className="text-start">Account Settings</h6></div>
                                                <div className="row mb-5 ms-4 me-4">
                                                    <div className="col-12 col-md-3 passwordrecoverymobile">
                                                        <Link to='/passwordrecovery' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center">PASSWORD RECOVERY</h5>
                                                                    </div>
                                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                                        <div className="col d-flex justify-content-center align-items-center">
                                                                            <FcLock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-3 profilesettingmobile">
                                                        <Link to='/profilesetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center">PROFILE SETTING</h5>
                                                                    </div>
                                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                                        <div className="col d-flex justify-content-center align-items-center">
                                                                            <FcBusinessman  className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-3 profilesettingmobile">
                                                        <Link to='/employeemanagement' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center">EMPLOYEE MANG</h5>
                                                                    </div>
                                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                                        <div className="col d-flex justify-content-center align-items-center">
                                                                            <FcManager className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    {/* <div className="col-12 col-md-3 profilesettingmobile">
                                                        <Link to='/billingsetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="card-title">
                                                                        <h5 className="text-center">Biling setting</h5>
                                                                    </div>
                                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                                        <div className="col d-flex justify-content-center align-items-center">
                                                                            <FcManager className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div> */}
                                                </div> 

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


export default Setting;