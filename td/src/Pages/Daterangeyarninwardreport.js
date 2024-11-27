
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';
import '../Assets/packingslipreport.css';
import '../Assets/yarnreport.css';

import '../Assets/dateyarnre.css';

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgInternal } from "react-icons/cg";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { successalert, erroralert } from '../Alert'


import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";




const Daterangeyarninwardreport = ({ isLoggedIn, setIsLoggedIn }) => {


    // const [fetchdata, setFetchdata] = useState([]);
    const [modalId, setModalId] = useState(null);
    const [alert, setAlert] = useState("");
    const [records, setRecords] = useState([]);
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("");


    const [loading, setLoading] = useState(false);







    const fetchdata = () => {
        setLoading(true)
        axios.get(`http://localhost:5000/daterangeyarnreport/data?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                // setFetchdata(res.data);
                setRecords(res.data);
                setLoading(false)
            })
            .catch(err => {
                // //console.log("Error in data fetching", err);
            })
    }

    const handledelete = (sryarn) => {
        axios.delete(`http://localhost:5000/yarninwarddelete/${sryarn}`, { withCredentials: true })
            .then((res) => {
                fetchdata();
                setModalId(null);
                // toast.success("Data deleted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Data deleted successfully");
            })
            .catch((err) => {
                // //console.log("Error in delete operation", err);
            })
    }

    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        const filteredData = fetchdata.filter(s => s.Designno && s.Designno.toString().toLowerCase().includes(number));
        setRecords(filteredData);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }



    const handleprint = () => {
        window.print();
    }

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }



    return (
        <>
            <div className='container-fluid maincontainer'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone yarnreportrightone border border-1'>
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

                                            <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />Yarn inward report</li>
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
                                                <h4 className="text-start ms-4 mt-2">YARN SLIP REPORT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <Link to="/daterangeyarninwardreport" className="packingslipbutton float-end">
                                                   Datewise yarninward Report
                                                </Link> */}
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
                                        <div className='row'>
                                            <div className='col-12 col-md-3'>
                                                <label className='form-label float-start'>Start Date</label>
                                                <input className='form-control' type='date' onChange={e => setStartdate(e.target.value)}></input>


                                            </div>
                                            <div className='col-12 col-md-3'>
                                                <label className='form-label float-start'>End Date</label>
                                                <input className='form-control' type='date' onChange={e => setEnddate(e.target.value)}></input>



                                            </div>

                                            <div className='col-12 col-md-3'>
                                                <button className='btn btn-primary btn-sm float-start ' style={{ marginTop: "34px" }} onClick={() => fetchdata()}>SUBMIT</button>

                                            </div>
                                            <div classname="col-12 col-md-3">
                                                {records.length > 0 ? <button className="btn btn-primary float-end" onClick={handleprint}>PRINT</button> : <button className="btn btn-primary float-end" disabled onClick={handleprint}>PRINT</button>}

                                            </div>


                                        </div>


                                        <div className="row ms-4 me-4 mb-5 scroll">
                                            {
                                                loading ?
                                                    <div class="d-flex justify-content-center">
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table className="table table-hover text-center">
                                                        <thead>
                                                            <tr>
                                                                <th>SR NO</th>
                                                                <th>DATE</th>
                                                                <th>SET NO</th>
                                                                <th>DESIGN NO</th>

                                                                <th>YARN PARTY</th>
                                                                <th>COUNT</th>
                                                                <th>PARTY</th>
                                                                <th>WEIGHT</th>
                                                                <th>EDIT</th>
                                                                <th>DELETE</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {records.map((result, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{formatDate(result.date)}</td>
                                                                    <td>{result.setNo}</td>
                                                                    <td>{result.Designno}</td>

                                                                    <td>{result.yarnParty}</td>
                                                                    <td>{result.count}</td>
                                                                    <td>{result.party}</td>
                                                                    <td>{result.weight}</td>
                                                                    <td><Link to={`https://www.textilediwanji.com/yarninwardedit/${result.srnoyarn}`}  ><FcEditImage className="printone" /></Link></td>
                                                                    <td>
                                                                        <button
                                                                            className="border-0"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModal-${result.srnoyarn}`} // Dynamic modal ID
                                                                            onClick={() => setModalId(result.srnoyarn)} // Set modal ID on click
                                                                        >
                                                                            <FcFullTrash className="printone" />
                                                                        </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModal-${result.srnoyarn}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel-${result.srnoyarn}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id={`exampleModalLabel-${result.srnoyarn}`}>ALERT</h5>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Are you sure! You want to DELETE this?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handledelete(result.srnoyarn)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            DELETE
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

                                            }

                                        </div>


                                    </div>


                                </div>

                            </div>




                        </div>






                    </div>
                </div>
            </div>





            <div className='container-fluid printcontainer' style={{ display: "none" }}>
                <div className="row mt-5">
                    <h4 className="text-center">YARNINWARD REPORT</h4>

                </div>
                <div className="row">
                    <p>Date</p>
                    <p>{startdate} To {enddate}</p>

                </div>
                <div className="row ms-4 me-4 mb-5 scroll">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th>SR NO</th>
                                <th>DATE</th>
                                <th>SET NO</th>
                                <th>DESIGN NO</th>

                                <th>YARN PARTY</th>
                                <th>COUNT</th>
                                <th>PARTY</th>
                                <th>WEIGHT</th>


                            </tr>
                        </thead>
                        <tbody>
                            {records.map((result, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(result.date)}</td>
                                    <td>{result.setNo}</td>
                                    <td>{result.Designno}</td>

                                    <td>{result.yarnParty}</td>
                                    <td>{result.count}</td>
                                    <td>{result.party}</td>
                                    <td>{result.weight}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>




        </>
    );
}


export default Daterangeyarninwardreport;