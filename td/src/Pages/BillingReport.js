
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import {successalert, erroralert} from '../Alert'


import { FcPrint } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";

import {toast} from 'react-toastify'
import { FcFeedback } from "react-icons/fc";



import '../Assets/billingreport.css';








const BillingReport = ({ isLoggedIn, setIsLoggedIn }) => {

    const [totalamount, setTotalamount] = useState();
    const [billdata, setBilldata] = useState([]);


    const [modalId, setModalId] = useState(null);
    const [records, setRecords] = useState([]);

    const [mydata, setMydata] = useState([]);
    const [billamount, setBillamount] = useState([]);
    const [cmonth, setCmonth] = useState("");
    const [bills, setBills] = useState("");
    const [billyear, setBillyear] = useState(0);


    const [billsinyear, setBillsinyear] = useState(0);

    const [ModalId2, setModalId2] = useState(null)
     const [sendemail, setSendemail] = useState("");
     const [loading, setLoading] = useState("");





    useEffect(() => {
        // Get current month and set the month name
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setCmonth(monthNames[currentMonth]);
    }, []);


    useEffect(() => {
        axios.get('http://localhost:5000/billsinmonth', { withCredentials: true })
            .then(res => {
                const bills = res.data[0].billsinmonth;
                setBills(bills);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/totalbillsinyear', { withCredentials: true })
            .then(res => {

                const billsyear = res.data[0].totalbillsinyear;
                setBillsinyear(billsyear);

            })
            .catch(err => {
                console.log(err);

            })
    }, [])



    useEffect(() => {
        axios.get('http://localhost:5000/billamountinfinancialyear', { withCredentials: true })
            .then(res => {
                const billamountinyear = res.data[0].billamountinfinancialyear;
                setBillyear(billamountinyear);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    useEffect(() => {
        fetchdata();
    }, []);


    const fetchdata = () => {
        axios.get('http://localhost:5000/billingreport', { withCredentials: true })
            .then(res => {
                // console.log(res.data);

                // const amount = res.data;

                // const mappeddata = amount.map(item => item.totalmeters);

                // const myamount = 0;

                // mappeddata.forEach(element => {
                //     myamount += element;
                // });

                // console.log(mappeddata);


                // console.log(mydata)

                setBilldata(res.data);
                setRecords(res.data);

            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            })
    }



    useEffect(() => {
        axios.get('http://localhost:5000/billamountinmonth', { withCredentials: true })
            .then(res => {
                console.log(res.data[0]);

                const mydata = res.data[0].totalbillingincurrentmonth;

                setBillamount(mydata)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    // if (isLoggedIn === false) {
    //     return <Navigate to="/login" replace />;
    // }

    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        setRecords(billdata.filter(s => s.billNo && s.billNo.toString().toLowerCase().includes(number)))
    }


    const sendbill = (srno, remail) => {
        setLoading(true);
        const sendmail = sendemail
        const heyurl = `https://www.textilediwanji.com/billprintcopy?srno=${srno}&recoemail=${remail}`;

        axios.post("http://localhost:5000/mailbill", { heyurl, sendmail }, { withCredentials: true })
            .then(() => {

                // toast.success("Bill sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Bill sent");
                // setEmail("");
            })
            .catch(error => {
                // toast.error("Bill not sent! Please check Internet connection?", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Bill not sent! Please check internet connection?");
            })
            .finally(() => {
                setLoading(false);
            });
    };




    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/billdelete/${id}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message === "bill deleted") {

                    fetchdata();
                }

            })
            .catch(err => {
                // console.log(err);
            })
    }



    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
    }


    return (
        <>
            <div className='container-fluid'>
            <div className={`modal ${loading ? 'show' : ''}`} style={{ display: loading ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                            <div className="modal-body" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                                <h4 className="text-center">Sending Reconsilation report</h4>
                                <div className="text-center mt-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                            <li className="breadcrumb-item active" aria-current="page"><FaFileInvoiceDollar className='me-2' />Billing report</li>
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
                                                <h4 className="text-start ms-4 mt-2">BILLING REPORT</h4>
                                            </div>
                                            <div className="col-md-6">
                                               <Link to="/datewisereport" className="packingslipbutton float-end">
                                                   Datewise Report
                                               </Link>
                                           </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 mb-3">
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span className="time-sub-text" style={{ fontSize: "25px" }}>Rs.</span><span className="ms-2" style={{ fontSize: "35px" }}>{billamount}</span></p>
                                    <p className="day-text">Billing in, {cmonth}</p>

                                </div>

                            </div>
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span className="time-sub-text" style={{ fontSize: "25px" }}>Rs.</span><span className="ms-2" style={{ fontSize: "35px" }}>{billyear.toFixed(0)}</span></p>
                                    <p className="day-text">Billing in financial year</p>

                                </div>

                            </div>
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span className="ms-3" style={{ fontSize: "35px" }}>{bills}</span><span className="time-sub-text ms-2" style={{ fontSize: "25px" }}>No's</span></p>
                                    <p className="day-text">Total bills in, {cmonth}</p>

                                </div>

                            </div>

                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span className="ms-3" style={{ fontSize: "35px" }}>{billsinyear}</span><span className="time-sub-text ms-2" style={{ fontSize: "25px" }}>No's</span></p>
                                    <p className="day-text">Total bills in financial year</p>

                                </div>

                            </div>
                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>

                                        <div className="row d-flex justify-content-center mt-3" >
                                            <div className="col-12 col-md-11 ">

                                                <div className='row ms-4 me-4  mb-4 d-flex justify-content-end'>
                                                    <div className="col-12 col-md-3">
                                                        <h6 className='text-start'>Search result uisng  Bill no </h6>
                                                        <input type='number' className='form-control' onChange={filter} placeholder='search on Bill no'></input>

                                                    </div>

                                                </div>
                                                <div className="row me-3 ms-3 mb-5 scroll">
                                                    <table className="table table-hover text-center">
                                                        <thead>
                                                            <tr>
                                                                <th>SR NO</th>
                                                                <th>BILL NO</th>
                                                                <th>DATE</th>
                                                                <th>SET NO</th>
                                                                <th>DESIGN NO</th>
                                                                <th>FABRIC METER</th>
                                                                <th>STATUS</th>


                                                                <th>TOTAL PRICE</th>
                                                                <th>PRINT</th>
                                                                <th>DELETE</th>
                                                                <th>EDIT</th>
                                                                <th>SEND</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {records && records.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{o.billNo}</td>
                                                                    <td>{formatDate(o.date)}</td>
                                                                    <td>{o.SetNo}</td>
                                                                    <td>{o.DesignNo}</td>


                                                                    <td>{o.totalquantity}</td>
                                                                    <td>
                                                                        <span className={o.status === "paid" ? "badge rounded-pill text-bg-success" : "badge rounded-pill text-bg-danger"} style={{ width: "70px", textTransform: "uppercase" }}>
                                                                            {o.status}
                                                                        </span>
                                                                    </td>
                                                                    <td>{o.totalmeters}</td>
                                                                    <td><Link to={`https://www.textilediwanji.com/billprint/${o.billNo}`} ><FcPrint className="printone" /></Link></td>
                                                                    <td> <button
                                                                        className="border-0"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#exampleModal-${o.srno}`} // Dynamic modal ID
                                                                        onClick={() => setModalId(o.srno)} // Set modal ID on click
                                                                    >
                                                                        <FcFullTrash className="printone" />
                                                                    </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModal-${o.srno}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel-${o.srno}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id={`exampleModalLabel-${o.srno}`}>ALERT</h5>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Are you sure! You want to DELETE this?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handledelete(o.srno)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            DELETE
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div></td>
                                                                    <td><Link to={`https://www.textilediwanji.com/billedit/${o.srno}`} ><FcEditImage className="printone" /></Link></td>
                                                                    <td>
                                                                {/* <button className="border border-0" onClick={() => sendReconsile2(report.DesignNo, report.SetNo, report.Email)}><FcFeedback className="printone border border-0" /></button> */}

                                                                <button
                                                                    className="border-0"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target={`#exampleModal3-${o.srno}`}
                                                                    onClick={() => setModalId2(o.srno)}

                                                                >
                                                                    <FcFeedback className="printone border border-0" />

                                                                </button>

                                                                <div
                                                                    className="modal fade"
                                                                    id={`exampleModal3-${o.srno}`} // Dynamic modal ID
                                                                    tabIndex="-1"
                                                                    aria-labelledby={`exampleModalLabel3-${o.srno}`} // Dynamic modal label ID
                                                                    aria-hidden="true"
                                                                >
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title text-center" id={`exampleModalLabel3-${o.srno}`}>Please enter Emailid to sent packingslip</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <label className='form-label float-start'>Email Id</label>
                                                                                <input className='form-control' type='email' onChange={e => setSendemail(e.target.value)} ></input>
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                <button
                                                                                    className="btn btn-primary"
                                                                                    onClick={() => sendbill(o.srno, o.Email)}
                                                                                    data-bs-dismiss="modal"
                                                                                >
                                                                                    SEND
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>




                                                            </td>
                                                                </tr>
                                                            ))}



                                                        </tbody>

                                                    </table>
                                                </div>



                                            </div>
                                        </div>



                                    </div>


                                </div>

                            </div>




                        </div>

                        <div className="row">
                            <div className="col-12">
                                {mydata ? mydata : "no data"}
                            </div>
                        </div>






                    </div>
                </div>
            </div>


        </>
    );
}



export default BillingReport;