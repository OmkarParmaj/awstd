
import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Header from '../sidebar/Header';

import { successalert, erroralert } from '../Alert'
import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import '../Assets/packingslip.css';
import '../Assets/party.css';

import { FaDashcube } from "react-icons/fa6";

import { IoMdSettings } from "react-icons/io";





const Party = ({ isLoggedIn, setIsLoggedIn }) => {



    const [values, setValues] = useState({
        partyname: "",
        personname: "",
        address: "",
        gst: "",
        phoneno: ""

    });

    const [company, setCompany] = useState([]);

    const [loading, setLoading] = useState(false);



    const [alert, setAlert] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/party', values, { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                if (res.data.message === "Data inserted") {
                    // toast.success("data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data submitted successfully")
                }
            })
            .catch(err => {
                // //console.log("err in the submitting database", err);
            })

    }

    useEffect(() => {
        fetchdata();
    }, [])


    const fetchdata = () => {
        setLoading(true)
        axios.get('http://localhost:5000/party', { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                setCompany(res.data);
                setLoading(false)
            })
            .catch(err => {
                // //console.log("err in the fetching data", err);
            })
    }

    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/partydelete/${id}`, { withCredentials: true })
            .then(res => {
                fetchdata();
            })
            .catch(err => {
                // //console.log(err);
            })
    }

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value })
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
                    <div className='col-12 col-sm-10 rightone border border-1 companybeditmobile'>
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
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />setting</Link></li>

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />party registration</li>
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
                                                <h4 className="text-start ms-4 mt-2">PARTY REGISTRATION</h4>
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
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <div className="row me-3 mt-5">

                                            <div className="col-12 col-md-6">




                                                <form onSubmit={handlesubmit}>
                                                    <div className="row">
                                                        <div className="col-12 col-md-5">
                                                            <label className="float-start mt-2">Party Name/Firm name</label>
                                                            <input type="text" className="form-control" onChange={val("partyname")}></input>
                                                            <label className="float-start mt-2">Person name</label>
                                                            <input type="text" className="form-control" onChange={val("personname")}></input>
                                                            <label className="float-start mt-2">Address</label>
                                                            <input type="text" className="form-control" onChange={val("address")}></input>

                                                        </div>
                                                        <div className="col-12 col-md-5 mt-2">
                                                            <label className="float-start ">GST NO</label>
                                                            <input type="text" className="form-control" onChange={val("gst")}></input>
                                                            <label className="float-start mt-2">Phone no</label>
                                                            <input type="number" className="form-control" onChange={val("phoneno")}></input>
                                                        </div>
                                                        <div className="col-10 mt-4">
                                                            <button className="btn btn-success float-end" type="submit">SUBMIT</button>
                                                        </div>



                                                    </div>

                                                </form>

                                            </div>

                                            <div className="col-12 col-md-6 border border-1 scroll partytable">
                                                <h4 className="mt-1">PARTY INFORMATION</h4>
                                                {
                                                    loading ?
                                                        <div class="d-flex justify-content-center">
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :

                                                        <table className="table table-bordered ">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr no</th>
                                                                    <th>Party Name</th>

                                                                    <th>Address</th>

                                                                    <th>Phone no</th>
                                                                    <th>Action</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {company.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.partyname}</td>

                                                                        <td>{data.address}</td>

                                                                        <td>{data.phoneno}</td>
                                                                        <td><Link className="btn btn-primary btn-sm" to={`https://www.textilediwanji.com/partyedit/${data.srno}`}>EDIT</Link></td>
                                                                        <td><button className="btn btn-danger btn-sm" onClick={() => handledelete(data.srno)}>DELETE</button></td>
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
            </div>


        </>
    );
}




export default Party;
