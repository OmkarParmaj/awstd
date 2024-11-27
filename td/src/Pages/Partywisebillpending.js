import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';


import { FcPrint } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";


import React, { useEffect, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

import { inputdateformat } from 'reactjs-dateformat';





const Partywisebillpending = ({ isLoggedIn, setIsLoggedIn }) => {

    const [bills, setBills] = useState("");
    const [modalId, setModalId] = useState(null);
    const [pendingbillamount, setPendingbillamount] = useState(0);
  




    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/partywisebillpending/${id}`, { withCredentials: true })
            .then(res => {
                const data = res.data;
             
                const sortedData = data.sort((a, b) => {
                
                    return Number(b.datediff) - Number(a.datediff);
                });
                
                setBills(sortedData);
    
                const mydata = sortedData.map(ind => ind.totalmeters);
                const totalamount = mydata.reduce((acc, idsds) => acc + idsds, 0);
                setPendingbillamount(totalamount);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]); 
    


    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/billdelete/${id}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message === "bill deleted") {

                   
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

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1' >
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

                        <div className="row  cards  mt-4 mb-4 p-3">
                           
                            <div className="col-sm-3 col-12 column2">

                                <div className="card dashboarduppercard shadow">
                                    <div className="title  d-flex justify-content-end">

                                        <div className='col-8 '>
                                            <p className="title-text  ">
                                                 Pending bill amount
                                            </p>
                                        </div>
                                        <div className='col-4 '>
                                            <p className="percent  ">

                                            </p>
                                        </div>



                                    </div>
                                    <Link to="/beamdrawinpending" className="text-decoration-none">
                                        <div className="data text-center">


                                            <p className="text-center" >
                                              <span className="" style={{fontSize: "34px", fontWeight: "10"}}>Rs.</span> {pendingbillamount.toFixed(2)}  <span className="t1 text-center"></span>
                                            </p>










                                           
                                        </div>
                                    </Link>
                                </div>

                            </div>

                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>

                                        <div className="row">
                                            <table className="table table-hover text-center">
                                                <thead>
                                                    <tr>
                                                        <th>SR NO</th>
                                                        <th>PARTY NAME</th>
                                                        <th>BILL NO</th>
                                                        <th>BILL DATE</th>
                                                        <th>SET NO</th>
                                                        <th>DESIGN NO</th>
                                                        <th>METERS</th>
                                                        <th>AMOUNT</th>
                                                        <th>STATUS</th>


                                                        <th>TOTAL PRICE</th>
                                                        <th>PRINT</th>
                                                        <th>DELETE</th>
                                                        <th>EDIT</th>
                                                        <th>Days</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        bills && bills.map((o, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{o.partyname}</td>
                                                                <td>{o.billNo}</td>
                                                                <td>{inputdateformat(o.date)}</td>
                                                                <td>{o.SetNo}</td>
                                                                <td>{o.DesignNo}</td>
                                                                <td>{o.totalquantity}</td>
                                                                <td>{o.totalmeters}</td>
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
                                                                <td>{o.datediff}</td>
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


export default Partywisebillpending;