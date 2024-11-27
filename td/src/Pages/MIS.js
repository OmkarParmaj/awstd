import React, { useEffect, useState } from 'react'
import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';

import { Navigate, Link } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify'

import { FaDashcube } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Header from '../sidebar/Header';
import { inputdateformat } from 'reactjs-dateformat'
import axios from 'axios';

import '../Assets/mis.css';











const MIS = ({ isLoggedIn, setIsLoggedIn }) => {

    const [details, setDetails] = useState([]);

    const [combinedData, setCombinedData] = useState([]);
    const [loomstatus, setLoomstatus] = useState([]);


    const [loom, setLoom] = useState("");
    const [design, setDesign] = useState("")
    const [ud, setUd] = useState("");

    const [records, setRecords] = useState([]);
    const [dispatch, setDispatch] = useState([]);

    const [loading, setLoading] = useState(false);


    const today = inputdateformat(new Date())




    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/readytodispatchmis', { withCredentials: true })
            .then(res => {
                setDispatch(res.data);
                setLoading(false)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:5000/beamstatusreportmis", { withCredentials: true })
            .then(res => {

                setRecords(res.data);
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])




    useEffect(() => {
        axios.get('http://localhost:5000/production', { withCredentials: true })
            .then(res => {
                // Assuming res.data is an array and contains the production data
                const productionData = res.data;

                // Array to hold the combined designnumber and mtr values
                const combinedArray = [];

                productionData.forEach(item => {
                    // Parse the JSON string in productiontable
                    const productionTableArray = JSON.parse(item.productiontable);

                    // Extract designnumber and mtr and add them to combinedArray
                    productionTableArray.forEach(record => {
                        combinedArray.push({
                            designnumber: record.designno,
                            mtr: record.mtr
                        });
                    });
                });

                // Update state with combined array
                setCombinedData(combinedArray);

                // Log the combinedArray to the console
                // console.log(combinedArray);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);





    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/loomstatusdata', { withCredentials: true })
            .then(res => {
                const ldata = res.data;
                const sortedloomdata = [...ldata].sort((a, b) => a.loomno - b.loomno);
                setDetails(sortedloomdata);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const totalmeter = (designnumber) => {
        // Convert the mtr values from strings to numbers for accurate summation
        const total = combinedData.reduce((acc, ind) => {
            if (ind.designnumber === designnumber) {
                // Add the numeric value of mtr to the accumulator
                return acc + Number(ind.mtr);
            }
            // Otherwise, return the accumulator as is
            return acc;
        }, 0);

        return total;
    };



    const handleprint = () => {
        window.print();
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

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />MIS</li>
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
                                                <h4 className="text-start ms-4 mt-2">MIS</h4>
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

                                    {
                                        details ?


                                            <div className='card-body'>
                                                <div className="row justify-content-end align-items-center">
                                                    <div className="col-3">
                                                        <button className="btn btn-primary float-end" onClick={handleprint}>PRINT</button>

                                                    </div>

                                                </div>
                                                <h4>LOOM STATUS</h4>
                                                <div className='row scroll mt-5'>
                                                    {
                                                        loading ?
                                                            <div class="d-flex justify-content-center">
                                                                <div class="spinner-border" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>

                                                            :
                                                            <table className='table table-hover text-center'>
                                                                <thead className='border-top'>
                                                                    <tr>
                                                                        <th>LOOM NO</th>
                                                                        <th>Loom in date</th>
                                                                        <th>SET NO</th>
                                                                        <th>DESIGN NO</th>
                                                                        <th>REED</th>
                                                                        <th>PICK</th>
                                                                        <th>STATUS</th>
                                                                        <th>PROGRESS</th>
                                                                        <th>SIZING MTR</th>
                                                                        <th>WOVEN MTR</th>
                                                                    </tr>
                                                                </thead>


                                                                <tbody>
                                                                    {
                                                                        details && details.map((o, index) => (
                                                                            <tr key={index}>
                                                                                <td>{o.loomno}</td>
                                                                                <td>{inputdateformat(o.date)}</td>
                                                                                <td>{o.SetNo}</td>
                                                                                <td>{o.DesignNo}</td>
                                                                                <td>{o.Reed}</td>
                                                                                <td>{o.Pick}</td>
                                                                                <td><span className="badge rounded-pill text-bg-success">on loom</span></td>
                                                                                <td>


                                                                                    <div class="progress mt-2 d-flex" role="progressbar" aria-label="Example 12px high" aria-valuenow={(totalmeter(o.DesignNo) / o.SizingMtr) * 100} aria-valuemin="0" aria-valuemax="100" style={{ height: "12px" }}>
                                                                                        <div class="progress-bar" style={{ width: `${(totalmeter(o.DesignNo) / o.SizingMtr) * 100}%` }}>{`${((totalmeter(o.DesignNo) / o.SizingMtr) * 100).toFixed(0)}%`}</div>

                                                                                    </div>




                                                                                </td>
                                                                                <td>{o.SizingMtr}</td>
                                                                                <td>{totalmeter(o.DesignNo)}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>


                                                            </table>


                                                    }




                                                </div>

                                                <h4 className="mt-5">BEAM'S ON FLOOR</h4>

                                                <div className='row me-4 ms-4 mb-5 scroll'>
                                                    {
                                                        loading ?
                                                            <div class="d-flex justify-content-center">
                                                                <div class="spinner-border" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>

                                                            : <table className='table table-hover mt-4  text-center'   >
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
                                                                            <td>{inputdateformat(report.Date)}</td>
                                                                            <td>{report.SetNo}</td>
                                                                            <td>{report.DesignNo}</td>
                                                                            <td>{report.WarpCount}</td>
                                                                            <td>{report.WeftCount}</td>
                                                                            <td>{report.Reed}</td>
                                                                            <td>{report.Pick}</td>
                                                                            <td>
                                                                                <span
                                                                                    className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                                                        report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                                            report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                                                report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                                                    report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                                                        report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                                            "" // default case if none of the conditions match
                                                                                        }`}
                                                                                    style={{ width: "120px" }}
                                                                                >
                                                                                    {report.beamstatus}
                                                                                </span>

                                                                            </td>


                                                                        </tr>
                                                                    ))}
                                                                </tbody>



                                                            </table>
                                                    }


                                                </div>


                                                <h4 className='mt-5'>FABRIC READY TO DISPATCH</h4>


                                                <div className='row me-4 ms-4 mb-5 scroll'>
                                                    {
                                                        loading === true ?
                                                            <div class="d-flex justify-content-center">
                                                                <div class="spinner-border" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>

                                                            : <table className='table table-hover mt-4  text-center'   >
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
                                                                    {dispatch && dispatch.map((report, index) => (
                                                                        <tr key={index}>
                                                                            <td>{report.UID}</td>
                                                                            <td>{inputdateformat(report.Date)}</td>
                                                                            <td>{report.SetNo}</td>
                                                                            <td>{report.DesignNo}</td>
                                                                            <td>{report.WarpCount}</td>
                                                                            <td>{report.WeftCount}</td>
                                                                            <td>{report.Reed}</td>
                                                                            <td>{report.Pick}</td>
                                                                            <td>
                                                                                <span
                                                                                    className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                                                        report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                                                            report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                                                                report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                                                                    report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                                                        report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                                                            report.beamstatus === "under mending" ? "text-bg-warning badge rounded-pill" :
                                                                                                                "" // default case if none of the conditions match
                                                                                        }`}
                                                                                    style={{ width: "120px" }}
                                                                                >
                                                                                    {report.beamstatus}
                                                                                </span>

                                                                            </td>


                                                                        </tr>
                                                                    ))}
                                                                </tbody>


                                                            </table>

                                                    }


                                                </div>












                                            </div> :



                                            <div class="text-center">
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
            </div >





            <div className='container-fluid printcontainer'>
                <div className='row mt-5 mb-3'>
                    <h3 className="text-center">DAILY MIS REPORT</h3>

                </div>
                <h4>LOOM STATUS</h4>
                <h4>Date: {today}</h4>
                <div className='row scroll mt-5'>

                    <table className='table table-bordered text-center tableone'>
                        <thead className='border border-1'>
                            <tr>
                                <th>LOOM NO</th>
                                <th>Loom in date</th>
                                <th>SET NO</th>
                                <th>DESIGN NO</th>
                                <th>REED</th>
                                <th>PICK</th>
                                <th>STATUS</th>
                                <th>SIZING MTR</th>
                                <th>WOVEN MTR</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                details && details.map((o, index) => (
                                    <tr key={index}>
                                        <td>{o.loomno}</td>
                                        <td>{inputdateformat(o.date)}</td>
                                        <td>{o.SetNo}</td>
                                        <td>{o.DesignNo}</td>
                                        <td>{o.Reed}</td>
                                        <td>{o.Pick}</td>
                                        <td><span class="badge rounded-pill text-bg-success">on loom</span></td>
                                        <td>{o.SizingMtr}</td>
                                        <td>{o.totalmtr ? o.totalmtr : 0}</td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>


                </div>

                <h4 className="mt-5">BEAM'S ON FLOOR</h4>

                <div className='row me-4 ms-4 mb-5 scroll'>

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
                                    <td>{inputdateformat(report.Date)}</td>
                                    <td>{report.SetNo}</td>
                                    <td>{report.DesignNo}</td>
                                    <td>{report.WarpCount}</td>
                                    <td>{report.WeftCount}</td>
                                    <td>{report.Reed}</td>
                                    <td>{report.Pick}</td>
                                    <td>
                                        <span
                                            className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                    report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                        report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                            report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                    "" // default case if none of the conditions match
                                                }`}
                                            style={{ width: "120px" }}
                                        >
                                            {report.beamstatus}
                                        </span>

                                    </td>


                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>


                <h4 className='mt-5'>FABRIC READY TO DISPATCH</h4>


                <div className='row me-4 ms-4 mb-5 scroll'>

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
                            {dispatch && dispatch.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.UID}</td>
                                    <td>{inputdateformat(report.Date)}</td>
                                    <td>{report.SetNo}</td>
                                    <td>{report.DesignNo}</td>
                                    <td>{report.WarpCount}</td>
                                    <td>{report.WeftCount}</td>
                                    <td>{report.Reed}</td>
                                    <td>{report.Pick}</td>
                                    <td>
                                        <span
                                            className={`${report.beamstatus === "drawin completed" ? "text-bg-dark badge rounded-pill" :
                                                report.beamstatus === "under drawin" ? "text-bg-secondary badge rounded-pill" :
                                                    report.beamstatus === "on loom" ? "text-bg-warning badge rounded-pill" :
                                                        report.beamstatus === "on floor" ? "text-bg-danger badge rounded-pill" :
                                                            report.beamstatus === "Ready to dispatch" ? "text-bg-primary badge rounded-pill" :
                                                                report.beamstatus === "Fabric dispatched" ? "text-bg-success badge rounded-pill" :
                                                                    "" // default case if none of the conditions match
                                                }`}
                                            style={{ width: "120px" }}
                                        >
                                            {report.beamstatus}
                                        </span>

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




export default MIS;
