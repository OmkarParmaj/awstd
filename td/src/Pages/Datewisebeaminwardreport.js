import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';
import '../Assets/beaminwardreport.css';

import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import { successalert, erroralert } from '../Alert'

import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { CgInternal } from "react-icons/cg";

import { FcPrint } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { FcTemplate } from "react-icons/fc";
import { FcFeedback } from "react-icons/fc";
import DashboardCardComponent from "../Page_Components/DashboardCardComponent";

import '../Assets/datewisebeaminwardreport.css';







const Datewisebeaminwardreport = ({ isLoggedIn, setIsLoggedIn }) => {

    const [data, setData] = useState();
    const [records, setRecords] = useState();
    const [modalId, setModalId] = useState(null); // State to manage dynamic modal IDs
    const [loading, setLoading] = useState(false);
    const [beamdrawn, setBeamdrawn] = useState(0)
    const [beampending, setBeampending] = useState(0);
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");

    const [loading2, setLoading2] = useState(false);




    // useEffect(() => {
    //     fetchdata();
    // }, [])

    // const navigate = useNavigate();


    // const handleLogout = () => {
    //   setIsLoggedIn(false);
    //   navigate("/login");
    // };

    // If the user is not logged in, redirect to the login page
    // if (isLoggedIn === false) {
    //   return <Navigate to="/login" replace />;
    // }

    const fetchdata = () => {
        setLoading2(true)
        axios.get(`http://localhost:5000/datewisebeaminwardreport/data?startdate=${startdate}&enddate=${enddate}`, {
            withCredentials: true
        })
            .then((res) => {
                setData(res.data);
                setRecords(res.data);
                // //console.log(res.data);

                const mydata = res.data
                setLoading2(false);


                let nullCount = 0;
                let numberCount = 0;

                mydata.forEach(info => {
                    if (info.drawinprice > 1) {
                        nullCount++; // Increment null count if drawinprice is null
                    } else if (info.drawinprice < 1) {
                        numberCount++; // Increment number count if drawinprice is a valid number
                    }
                });

                setBeamdrawn(nullCount)
                setBeampending(numberCount)





            })
            .catch((err) => {
                // //console.log("error to fetch the data", err);
            })
    }

    const handledelete = (DesignNo) => {
        axios.delete(`http://localhost:5000/delete/${DesignNo}`, { withCredentials: true })
            .then((res) => {
                fetchdata();
                setModalId(null); // Reset modal ID after deletion
            })
            .catch((err) => {
                // //console.log("err in the delete", err);
            })
    }

    const Filter = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setRecords(data.filter(s => s.DesignNo && s.DesignNo.toString().toLowerCase().includes(inputValue)));
    }


    const sendReconsile = (Designno, setno, remail) => {
        setLoading(true);
        const heyurl = `https://www.textilediwanji.com/reco?setno=${setno}&designno=${Designno}&recoemail=${remail}`;

        axios.post("http://localhost:5000/mailreconsile", { heyurl }, { withCredentials: true })
            .then(() => {

                // toast.success("Reconsilation slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Reconsilation slip sent")
                // setEmail("");
            })
            .catch(error => {
                toast.error("Reconsilation slip not sent! Please check Internet connection?", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Reconsilation slip not sent! Please check internet connection?")
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }



    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
    }



    const handlePrint = () => {
        window.print();
    };

    return (
        <>

            <div className='container-fluid maincontaineromkar'>
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
                    <div className='col-12 col-sm-10 rightone border border-1' style={{ minHeight: "2000px" }}>
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

                                            <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />Beaminward report</li>
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
                                                <h4 className="text-start ms-4 mt-2">DATEWISE BEAM INWARD REPORT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/beaminwardreport" className="packingslipbutton float-end">
                                                    REPORT
                                                </Link>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 mb-3">
                            {/* <div className="col-md-9 ">
                                <div className="card ">
                                    <div className="car-body loomcard">
                                        <img src="/loom.jpg" className="myimage"></img>

                                    </div>
                                </div>

                            </div> */}
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
                                            <div className="col-12 col-md-3">
                                                {records ? <button className="btn btn-primary float-end me-3" onClick={handlePrint}>PRINT</button> : <button className="btn btn-primary float-end me-3" onClick={handlePrint} disabled>PRINT</button>}

                                            </div>



                                        </div>


                                        <div className='row me-4 ms-4 mb-5 scroll'>
                                            {
                                                loading2 ?
                                                    <div class="d-flex justify-content-center">
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table className='table table-hover mt-4  text-center'   >
                                                        <thead className='border border-1 '>
                                                            <tr>
                                                                <th>UID</th>
                                                                <th>DATE</th>
                                                                <th>SETNO</th>
                                                                <th>DESIGN NO</th>
                                                                <th>WARP COUNT</th>
                                                                <th>ERFT COUNT</th>
                                                                <th>REED</th>
                                                                <th>PICK</th>
                                                                <th>DRAWIN STATUS</th>
                                                                <th>PRINT</th>
                                                                <th>EDIT</th>
                                                                <th>DELETE</th>
                                                                <th>Reconsile</th>
                                                                <th>Send Mail</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {records && records.map((report, index) => (
                                                                <tr key={index}>
                                                                    <td>{report.UID}</td>
                                                                    <td>{formatDate(report.Date)}</td>
                                                                    <td>{report.SetNo}</td>
                                                                    <td>{report.DesignNo}</td>
                                                                    <td>{report.WarpCount}</td>
                                                                    <td>{report.WeftCount}</td>
                                                                    <td>{report.Reed}</td>
                                                                    <td>{report.Pick}</td>
                                                                    <td>
                                                                        {report.drawinprice ? (
                                                                            <span class="badge rounded-pill text-bg-primary">DRAWN</span>
                                                                        ) : (
                                                                            report.club === 'club' ? (
                                                                                <span class="badge rounded-pill text-bg-secondary">NO NEED DRAWIN</span>
                                                                            ) : (
                                                                                <span class="badge rounded-pill text-bg-danger">PENDING</span>
                                                                            )
                                                                        )}
                                                                    </td>
                                                                    <td><Link to={`/beaminwardprint/${report.DesignNo}/${report.srno}`} className="printone" ><FcPrint className="printone" /></Link></td>
                                                                    <td><Link to={`/beaminwardedit/${report.DesignNo}`} ><FcEditImage className="printone" /></Link></td>
                                                                    <td>
                                                                        <button
                                                                            className='border-0'
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModal-${report.DesignNo}`} // Dynamic modal ID
                                                                            onClick={() => setModalId(report.DesignNo)} // Set modal ID on click
                                                                        >
                                                                            <FcFullTrash className="printone" />
                                                                        </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModal-${report.DesignNo}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel-${report.DesignNo}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id={`exampleModalLabel-${report.DesignNo}`}>ALERT</h5>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Are you sure! You want to DELETE this?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handledelete(report.DesignNo)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            DELETE
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td><Link to={`/reconsilation/${report.SetNo}/${report.DesignNo}`}  ><FcTemplate className="printone" /></Link></td>
                                                                    <td><button className="border border-0" onClick={() => sendReconsile(report.DesignNo, report.SetNo, report.Email)}><FcFeedback className="printone border border-0" /></button></td>
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




            <div className='container-fluid printcontaineromkar' style={{ visibility: "hidden" }}>
                <div className="row mt-4">
                    <h3 className="text-center">BEAMINWARD REPORT</h3>
                </div>
                <div className="row d-flex justify-content-start align-items-center">
                    <div className="col-3">
                        <label className="form-label"> DATE</label>
                        <p>{startdate} TO {enddate}</p>
                    </div>


                </div>
                <div className='row me-4 ms-4 mb-5'>

                    <table className='table table-bordered mt-4  text-center'   >
                        <thead className='border border-1 '>
                            <tr>
                                <th>UID</th>
                                <th>DATE</th>
                                <th>SETNO</th>
                                <th>DESIGN NO</th>
                                <th>WARP COUNT</th>
                                <th>ERFT COUNT</th>
                                <th>REED</th>
                                <th>PICK</th>
                                <th>DRAWIN STATUS</th>

                            </tr>
                        </thead>
                        <tbody>
                            {records && records.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.UID}</td>
                                    <td>{formatDate(report.Date)}</td>
                                    <td>{report.SetNo}</td>
                                    <td>{report.DesignNo}</td>
                                    <td>{report.WarpCount}</td>
                                    <td>{report.WeftCount}</td>
                                    <td>{report.Reed}</td>
                                    <td>{report.Pick}</td>
                                    <td>
                                        {report.drawinprice ? (
                                            <span class="badge rounded-pill text-bg-primary" style={{ width: "120px" }}>DRAWN</span>
                                        ) : (
                                            report.club === 'club' ? (
                                                <span class="badge rounded-pill text-bg-secondary">NO NEED DRAWIN</span>
                                            ) : (
                                                <span class="badge rounded-pill text-bg-danger" style={{ width: "120px" }}>PENDING</span>
                                            )
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>


        </>
    );
}



export default Datewisebeaminwardreport;