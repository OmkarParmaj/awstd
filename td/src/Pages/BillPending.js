import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';


import React, { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import {successalert, erroralert} from '../Alert'





const BillPending = ({ isLoggedIn, setIsLoggedIn }) => {


    const [billdata, setBilldata] = useState([]);
    const [paid, setPaid] = useState("paid");

    useEffect(() => {
        axios.get('http://localhost:5000/billpending', { withCredentials: true })
            .then(res => {
                setBilldata(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [billdata])



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handlesubmit = (billNo) => {
        axios.post('http://localhost:5000/billpendingupdate', { billNo, status: paid }, { withCredentials: true })
            .then(res => {
                if (res.data.message === "updated") {
                    // toast.success("Status Updated!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Status updated")
                    // Update the billdata state after successful update
                    setBilldata(prevBillData => {
                        // Find the index of the updated bill in the array
                        const updatedIndex = prevBillData.findIndex(bill => bill.billNo === billNo);
                        // Create a copy of the previous state
                        const updatedBillData = [...prevBillData];
                        // Update the status of the bill at the found index
                        updatedBillData[updatedIndex] = { ...updatedBillData[updatedIndex], status: paid };
                        // Return the updated state
                        return updatedBillData;
                    });
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


    const today = () => {
        const todayDate = new Date();
        const formattedToday = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        return formattedToday;
    }


    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
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
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                            <li className="breadcrumb-item active" aria-current="page"><FaFileInvoiceDollar className='me-2' />Bill pending report</li>
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
                                                <h4 className="text-start ms-4 mt-2">BILL PENDING REPORT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/partybillpending" className="packingslipbutton float-end">
                                                    Partywise bill pending
                                                </Link>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 mb-3">

                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>

                                        <div className="row d-flex justify-content-center mt-5" >
                                            <div className="col-12 col-md-11 ">
                                                <div className="row d-flex justify-content-center " >
                                                    <div className="col-12 col-md-11">
                                                        <h4 className="mt-3 mb-3">PENDING BILL REPORT</h4>
                                                        <div className="row mt-5 d-flex justify-content-center">
                                                            <div className="col-12 col-md-10 mb-5 scroll">
                                                                <table className="table table-bordered text-center">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Sr no</th>
                                                                            <th>Bill no</th>
                                                                            <th>Date</th>
                                                                            <th>Amount</th>
                                                                            <th>Status</th>
                                                                            <th>Total days</th>
                                                                            <th>Update status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {billdata.map((o, index) => (
                                                                            <tr key={index} className="">
                                                                                <td className="pt-2">{index + 1}</td>
                                                                                <td className="d-flex align-items-center justify-content-center pt-2">{o.billNo}</td>
                                                                                <td className="pt-2">{formatDate(o.date)}</td>
                                                                                <td className="pt-2">{o.totalmeters}</td>
                                                                                <td className="pt-2" style={{ backgroundColor: o.status === 'paid' ? 'green' : 'red', color: "white" }}>{o.status}</td>
                                                                                <td style={{ backgroundColor: (Math.floor((today() - new Date(o.date)) / (1000 * 60 * 60 * 24))) >= 45 ? 'red' : 'green', color: "white" }}>{Math.floor((today() - new Date(o.date)) / (1000 * 60 * 60 * 24))}</td>
                                                                                <td className=""><button className="btn btn-primary btn-sm" onClick={() => handlesubmit(o.billNo)}>UPDATE</button></td>
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


                                </div>

                            </div>




                        </div>






                    </div>
                </div>
            </div>


        </>
    );
}


export default BillPending;