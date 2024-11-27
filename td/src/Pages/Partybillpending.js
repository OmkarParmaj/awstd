import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';

import filtertabledata from "../Filterdata";





import React, { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";





const Partybillpending = ({ isLoggedIn, setIsLoggedIn }) => {
    const [partydata, setPartydata] = useState([]);
    const [finaldata, setFinaldata] = useState([])
    const [party, setParty] = useState("");






    useEffect(() => {
        axios.get('http://localhost:5000/partybillpending', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setPartydata(res.data);
                setParty(res.data.partyname);



            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    const handleFilterChange = (e) => {
        filtertabledata(e, setFinaldata, partydata, "partyname"); // Adjust "partyname" based on your column name
    };





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
                    <div className='col-12 col-sm-10 rightone border border-1' style={{height: "1500px"}}>
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
                                                <h4 className="text-start ms-4 mt-2">PARTY BILL PENDING</h4>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <Link to="/partywisebillpending" className="packingslipbutton float-end">
                                                    Partywise bill pending
                                                </Link>
                                            </div> */}
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
                                        <div className="row mt-3 mb-3">
                                            {/* Filter input field */}
                                            <div className='col-12 col-md-12'>
                                                <input type="text" onChange={handleFilterChange} className="form-control" placeholder="Filter by party name" />
                                            </div>
                                        </div>

                                        <div className="row scroll">
                                            <table className="table table-bordered text-center">
                                                <thead>
                                                    <tr>
                                                        <th>SR NO</th>
                                                        <th>PARTY NAME</th>
                                                        <th>PENDING BILLS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        finaldata? finaldata && finaldata.map((o, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{o.partyname}</td>
                                                                <td><Link to={`https://www.textilediwanji.com/partywisebillpending/${o.partyname}`} className="btn btn-primary btn-sm">PENDING BILLS</Link></td>

                                                            </tr>
                                                        )) : partydata && partydata.map((o, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{o.partyname}</td>
                                                                <td><Link to={`https://www.textilediwanji.com/partywisebillpending/${o.partyname}`} className="btn btn-primary btn-sm">PENDING BILLS</Link></td>

                                                            </tr>
                                                        ))
                                                    }
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


        </>
    );
}


export default Partybillpending;