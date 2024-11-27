import React, { useEffect, useState } from "react";
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import { ToastContainer } from "react-toastify";

import { IoMdSettings } from "react-icons/io";

import { Link, Navigate } from 'react-router-dom'


import { successalert, erroralert } from '../Alert'
import axios from "axios";

import { inputdateformat } from 'reactjs-dateformat';


import { FaDashcube } from "react-icons/fa6";
import { FcTemplate } from "react-icons/fc";

import '../Assets/fabricpendingreport.css';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';









const Fabricpendingreport = ({ isLoggedIn, setIsLoggedIn }) => {


    const [data, setData] = useState([]);
    const [ModalId, setModalId] = useState(null)
    const [number, setNumber] = useState("");






    useEffect(() => {
        axios.get('http://localhost:5000/fabricpendingreportdata', { withCredentials: true })
            .then(res => {

               

                const fabricpendingdata = res.data;

                const filtereddata = fabricpendingdata.filter(item => item.fabricpercentage < 85 && item.designsolved === "unsolved");

                const omkar = fabricpendingdata.filter(item => item.datediff < 25);
                const f1 = filtereddata.length
                const f2 = omkar.length
            


                setData(filtereddata)
                setNumber(f1-f2);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    const handlesolved = (e, solve, setnumber, designnumber) => {
        e.preventDefault();


        const values = {
            solve: solve,
            setnumber: setnumber,
            designnumber: designnumber
        }


        axios.put('http://localhost:5000/beamsolved', values, { withCredentials: true })
            .then(res => {
                if (res.data.message === "solved") {
                    successalert("Beam status solved");
                }

            })
            .catch(err => {
                console.log(err);
                erroralert("something went wrong")

            })
    }






    const handleprint = () => {
        window.print({ saveAsPDF: true });

    }











    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }



    return (
        <>
            <div className='container-fluid maincontainer'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone addemployeemain border border-1'>
                        <ToastContainer></ToastContainer>
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
                                                <h4 className="text-start ms-4 mt-2">Fabric pending report</h4>
                                            </div>
                                            <div className="col-md-6">

                                                <Link to='/beaminwardreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link >

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


                                        <div className="row d-flex justify-content-end">
                                            <div className="col-12 col-md-3">
                                                <button className="btn btn-primary float-end mt-3 mb-5" onClick={handleprint}>PRINT</button>

                                            </div>


                                        </div>



                                        {
                                            data ? <div id="table-to-pdf" className="row">
                                                <table className='table table-bordered text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>SR NO</th>
                                                            <th>DATE</th>
                                                            <th>SET NO</th>
                                                            <th>DESIGN NO</th>
                                                            <th>SIZING MTR</th>
                                                            <th>FABRIC DISPATCH</th>
                                                            <th>BEAM STATUS</th>
                                                            <th>PERCENTAGE</th>
                                                            <th>STATUS</th>
                                                            <th>RECONSILATION</th>
                                                            <th>DAYS</th>
                                                            <th>RECO STATUS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data && data.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{inputdateformat(o.Date)}</td>
                                                                    <td>{o.SetNo}</td>
                                                                    <td>{o.DesignNo}</td>
                                                                    <td>{o.SizingMtr.toFixed(2)}</td>
                                                                    <td>{o.Dispatchedmtr.toFixed(2)}</td>
                                                                    <td> <span
                                                                        className={`${o.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                                            o.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                                o.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                                    o.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                                        o.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                                            o.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                                o.beamstatus === "under mending" ? "text-bg-info badge rounded-pill" :
                                                                                                    o.beamstatus === "Fabric dispatched" ? "text-bg-info badge rounded-pill" :
                                                                                                        "" // default case if none of the conditions match
                                                                            }`}
                                                                        style={{ width: "120px" }}
                                                                    >
                                                                        {o.beamstatus}
                                                                    </span></td>
                                                                    <td>{o.fabricpercentage.toFixed(2)}</td>
                                                                    <td>{o.fabricpercentage < 85 ? <span class="badge text-bg-danger">FABRIC PENDING</span> : ""}</td>
                                                                    <td><Link to={`/reconsilation/${o.SetNo}/${o.DesignNo}`}  ><FcTemplate className="printone" /></Link></td>
                                                                    <td>{o.datediff}</td>
                                                                    <td>


                                                                        <button
                                                                            className='border-0 btn btn-primary btn-sm'
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModal-${o.srno}`} // Dynamic modal ID
                                                                            onClick={() => setModalId(o.srno)} // Set modal ID on click
                                                                        >
                                                                            SOLVED
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
                                                                                        <p>Are you sure! You want to Solve this Design number?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={e => handlesolved(e, "solved", o.SetNo, o.DesignNo)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            SOLVED
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                    </td>

                                                                </tr>
                                                            ))
                                                        }

                                                    </tbody>

                                                </table>

                                            </div> : <div class="text-center">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        }











                                    </div>


                                </div>

                            </div>




                        </div>








                    </div>
                </div>
            </div>



            <div className="container-fluid printcontainer" style={{ display: "none" }}>
                <div className="col">
                    <div className="row">
                        <h3 className="text-center mt-3 mb-5">Fabric pending report</h3>

                    </div>

                    <div className="row">
                        <table className='table table-bordered text-center'>
                            <thead>
                                <tr>
                                    <th>SR NO</th>
                                    <th>SET NO</th>
                                    <th>DESIGN NO</th>
                                    <th>SIZING MTR</th>
                                    <th>FABRIC DISPATCH</th>
                                    <th>BEAM STATUS</th>
                                    <th>PERCENTAGE</th>
                                    <th>STATUS</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.SetNo}</td>
                                            <td>{o.DesignNo}</td>
                                            <td>{o.SizingMtr.toFixed(2)}</td>
                                            <td>{o.Dispatchedmtr.toFixed(2)}</td>
                                            <td><span class="badge text-bg-primary">{o.beamstatus}</span></td>
                                            <td>{o.fabricpercentage.toFixed(2)}</td>
                                            <td>{o.fabricpercentage < 85 ? <span class="badge text-bg-danger">FABRIC PENDING</span> : ""}</td>


                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </div>
                </div>

            </div>


        </>

    );
}



export default Fabricpendingreport