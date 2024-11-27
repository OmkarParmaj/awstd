import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';
import { successalert, erroralert } from '../Alert'
import '../Assets/packingslipreport.css';
import '../Assets/packingslipbillpendingreport.css';




import React, { useEffect, useState } from 'react';
import { Await, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";


import { FcPrint } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { FcTemplate } from "react-icons/fc";
import { FcFeedback } from "react-icons/fc";





const Packingslipbillpendingreport = ({ isLoggedIn, setIsLoggedIn }) => {


    const [packing, setPacking] = useState();
    const navigate = useNavigate();
    const [records, setRecords] = useState();

    const [loading2, setLoading2] = useState(false);

    const [modalId, setModalId] = useState(null); // State to manage dynamic modal IDs
    // const [packno, setPackno] = useState("");
    // const [uid, setUid] = useState("");
    // const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendemail, setSendemail] = useState("");
    const [modalId2, setModalId2] = useState(null)

    const [modalIdbillupdate, setModalIdbillupdate] = useState(null);

    const [billnumber, setBillnumber] = useState("");

    const [reload, setReload] = useState("");








    // useEffect(() => {
    //   setUrl(`http:www.textilediwanji.com/packprint/${packno}/${uid}`);
    // }, [packno, uid]);


    // const handleLogout = () => {
    //   // Call the parent component's setIsLoggedIn function to logout
    //   setIsLoggedIn(false);
    //   // Navigate to the login page
    //   navigate("/login");
    // };

    useEffect(() => {
        handlefetch();
    }, [reload]);





    const handlefetch = async () => {
        try {
            setLoading2(true)
            const response = await axios.get('http://localhost:5000/packingslipreport', { withCredentials: true });
            // //console.log(response);
            setPacking(response.data);
            // setRecords(response.data)

            const data = response.data;

            const myone = data.filter(items => items.billstatus === "bill pending");

            setRecords(myone)
            setLoading2(false);



        } catch (error) {
            // //console.log(error);
        }
    }

    // If the user is not logged in, redirect to the login page
    // if (isLoggedIn === false) {
    //   return <Navigate to="/login" replace />;
    // }

    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        setRecords(packing.filter(s => s.Packingslipno && s.Packingslipno.toString().toLowerCase().includes(number)))
    }

    // Filter unique entries based on UID
    // Filter unique entries based on UID
    // const uniquePacking = packing.reduce((acc, curr) => {
    //   if (!acc.find(item => item.UID === curr.UID)) {
    //     acc.push(curr);
    //   }
    //   return acc;
    // }, []);


    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/packingdelete/${id}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                if (res.data.message === "deleted") {
                    // //console.log("deleted row");
                    handlefetch();
                }

            })
            .catch(err => {
                // //console.log(err);
            })
    }


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }



    const handleprint = () => {
        window.print();
    }

    const sendPackslip = (packing, ui, ser, mai) => {
        setLoading(true);

        const maid = sendemail;
        const yesurl = `https://www.textilediwanji.com/packingdata?packingslipno=${packing}&uidno=${ui}&serialno=${ser}&emailid=${mai}`;

        axios.post("http://localhost:5000/mailpackslip", { yesurl, maid }, { withCredentials: true })
            .then(() => {

                // toast.success("Packing slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Packing slip sent")
                // setEmail("");
            })
            .catch(error => {
                // toast.error("Packing slip not sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Packing slip not sent! please check internet connection")
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handlebillnumber = (srno, billnumber) => {
        axios.put(`http://localhost:5000/putbillnumberinpackingslip`, { srno, billnumber }, { withCredentials: true })
            .then(res => {
                if (res.data.message === "bill status updated") {
                    successalert("bill status updated");
                    setReload("reload")
                }

            })
            .catch(err => {
                // //console.log(err);
            })
    }


    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }



    return (
        <>

            <div className='container-fluid maincontainerone'>
                <div className={`modal ${loading ? 'show' : ''}`} style={{ display: loading ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                            <div className="modal-body" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                                <h4 className="text-center">Sending Packing slip</h4>
                                <div className="text-center mt-3">
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
                        <ToastContainer></ToastContainer>

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

                                            <li className="breadcrumb-item active" aria-current="page"><IoNewspaperOutline className='me-2' />Packing slip report</li>
                                            <li className="breadcrumb-item active" aria-current="page"><IoNewspaperOutline className='me-2' />Packing slip bill pending report</li>
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
                                                <h4 className="text-start ms-4 mt-2">PACKING SLIP BILL PENDING REPORT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/daterangepackingreport" className="packingslipbutton float-end">
                                                    Datewise packing Report
                                                </Link>
                                                {/* <Link to="/packingslipbillpendingreport" className="packingslipbutton float-end">
                                                    Bill pending report
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
                                        <div className="row d-flex justify-content-end align-items-center">
                                            <div className="col-12 col-md-3">
                                                <button className="btn btn-primary float-end me-3" onClick={handleprint}>PRINT</button>

                                            </div>

                                        </div>

                                        <div className='row ms-2  mt-4 mb-4 me-3 d-flex justify-content-end'>
                                            <div className="col-12 col-md-3">
                                                <h6 className='text-start'>Search result using Packing slip no </h6>
                                                <input type='number' className='form-control mt-3 mb-4' onChange={filter} placeholder='search on Packing slip no'></input>

                                            </div>

                                        </div>

                                        <div className="row me-4 ms-4 mb-5 scroll">
                                            {
                                                loading ?
                                                    <div class="d-flex justify-content-center">
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table className='table table-hover text-center'>
                                                        <thead>
                                                            <tr>
                                                                <th>SR NO</th>
                                                                <th>PACKING SLIP NO</th>
                                                                <th>DATE</th>
                                                                <th>UID</th>
                                                                <th>SET NO</th>
                                                                <th>DESIGN NO</th>
                                                                <th>BILL NUMBER</th>
                                                                <th>BILL STATUS</th>
                                                                <th>PRINT</th>
                                                                <th>EDIT</th>
                                                                <th>DELETE</th>
                                                                <th>SEND MAIL</th>
                                                                <th>BILL UPDATE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {records && records.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.Packingslipno}</td>
                                                                    <td>{formatDate(item.date)}</td>
                                                                    <td>{item.uid}</td>
                                                                    <td>{item.SetNo}</td>
                                                                    <td>{item.DesignNo}</td>
                                                                    <td>{item.billnumber}</td>
                                                                    <td><span
                                                                        className={`badge rounded-pill ${item.billstatus === "bill pending" ? "text-bg-danger" : "text-bg-success"}`}
                                                                        style={{ width: "120px" }}
                                                                    >
                                                                        {item.billstatus}
                                                                    </span>
                                                                    </td>
                                                                    <td><Link to={`/packingprint/${item.Packingslipno}/${item.uid}/${item.serialno}/${item.Email}`} ><FcPrint className="printone" /></Link></td>
                                                                    <td><Link to={`/packingslipedit/${item.Packingslipno}`}  ><FcEditImage className="printone" /></Link></td>
                                                                    <td>
                                                                        <button
                                                                            className="border-0"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModal-${item.serialno}`} // Dynamic modal ID
                                                                            onClick={() => setModalId(item.serialno)} // Set modal ID on click
                                                                        >
                                                                            <FcFullTrash className="printone" />
                                                                        </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModal-${item.serialno}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel-${item.serialno}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id={`exampleModalLabel-${item.serialno}`}>ALERT</h5>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <p>Are you sure! You want to DELETE this?</p>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handledelete(item.serialno)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            DELETE
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>

                                                                        {/* <button className="border-0" onClick={() => sendPackslip(item.Packingslipno, item.uid, item.serialno, item.Email)}><FcFeedback className="printone border border-0" /></button> */}


                                                                        <button
                                                                            className="border-0"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModal2-${item.serialno}`}
                                                                            onClick={() => setModalId2(item.serialno)}

                                                                        >
                                                                            <FcFeedback className="printone border border-0" />

                                                                        </button>

                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModal2-${item.serialno}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel2-${item.serialno}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title text-center" id={`exampleModalLabel2-${item.serialno}`}>Please enter Emailid to sent packingslip</h5>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <label className='form-label float-start'>Email Id</label>
                                                                                        <input className='form-control' type='text' onChange={e => setSendemail(e.target.value)} ></input>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => sendPackslip(item.Packingslipno, item.uid, item.serialno, item.Email)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            SEND
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>




                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="border-0 btn btn-primary btn-sm"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#exampleModalbill-${item.serialno}`} // Dynamic modal ID
                                                                            onClick={() => setModalIdbillupdate(item.serialno)} // Set modal ID on click
                                                                        >
                                                                            BILL UPDATE
                                                                        </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`exampleModalbill-${item.serialno}`} // Dynamic modal ID
                                                                            tabIndex="-1"
                                                                            aria-labelledby={`exampleModalLabel-${item.serialno}`} // Dynamic modal label ID
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        {/* <h5 className="modal-title" id={`exampleModalLabel-${item.serialno}`}>ALERT</h5> */}
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <label className='form-label float-start'>Bill number</label>
                                                                                        <input className='form-control' type='text' onChange={e => setBillnumber(e.target.value)}></input>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handlebillnumber(item.serialno, billnumber)}
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            UPDATE
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



            <div className="container-fluid printcontainer" style={{ visibility: "hidden" }}>
                <div className="row mt-5">
                    <h4 className="text-center">BILL PENDING FOR PACKING SLIP REPORT</h4>

                </div>
                <div className="row me-4 ms-4 mb-5 mt-4 scroll">
                    <table className='table table-bordered text-center'>
                        <thead>
                            <tr>
                                <th>SR NO</th>
                                <th>PACKING SLIP NO</th>
                                <th>DATE</th>
                                <th>UID</th>
                                <th>SET NO</th>
                                <th>DESIGN NO</th>
                                <th>BILL NUMBER</th>
                                <th>BILL STATUS</th>

                            </tr>
                        </thead>
                        <tbody>
                            {records && records.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Packingslipno}</td>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.uid}</td>
                                    <td>{item.SetNo}</td>
                                    <td>{item.DesignNo}</td>
                                    <td>{item.billnumber}</td>
                                    <td><span
                                        className={`badge rounded-pill ${item.billstatus === "bill pending" ? "text-bg-danger" : "text-bg-success"}`}
                                        style={{ width: "120px" }}
                                    >
                                        {item.billstatus}
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


export default Packingslipbillpendingreport;