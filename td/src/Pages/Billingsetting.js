import React, { useEffect, useState } from "react";
import Computersidebar from "../sidebar/Computersidebar";
import { ToastContainer, toast } from "react-toastify";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { Navigate, Link } from "react-router-dom";
import axios from 'axios';
import {inputdateformat} from 'reactjs-dateformat'
import {successalert, erroralert} from '../Alert'

const Billingsetting = ({ isLoggedIn, setIsLoggedIn }) => {
    const [date, setDate] = useState("");
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");
    const [omkar, setOmkar] = useState([]);
    const [alert, setAlert] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/getprefix', { withCredentials: true })
            .then(res => {
            
                setOmkar(Array.isArray(res.data) ? res.data : []);  // Ensure omkar is an array
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
        const values = { date, prefix, suffix };
        axios.post('http://localhost:5000/billingsetting', values, { withCredentials: true })
            .then(res => {
                if (res.data.message === "data added") {
                    // toast.success("Data added successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data added successfully!");
                    setAlert("data submitted");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone sideone'>
                        <Computersidebar />
                    </div>
                    <div className='col-12 col-sm-10 rightone addemployeemain border border-1'>
                        <ToastContainer />
                        <Mobilesidebar />
                        <Header setIsLoggedIn={setIsLoggedIn} />

                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Setting</li>
                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Billing setting</li>
                                        </ol>
                                    </nav>
                                </span>
                            </div>
                        </div>

                        <div className="row packingsliplabel">
                            <div className="col-md-12">
                                <div className="card shadow-sm m-3 border border-0">
                                    <div className="card-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">BILLING SETTING</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <form onSubmit={handlesubmit}>
                                            <div className='row'>
                                                <div className="col-12 col-md-3">
                                                    <label className='form-label float-start'>Date</label>
                                                    <input className='form-control' type='date' onChange={e => setDate(e.target.value)} />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className='form-label float-start'>Prefix</label>
                                                    <input className='form-control' type='text' onChange={e => setPrefix(e.target.value)} />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className='form-label float-start'>Suffix</label>
                                                    <input className='form-control' type='text' onChange={e => setSuffix(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-end mt-4 align-items-center">
                                                <div className="col-12 col-md-3 float-end">
                                                    <button className="btn btn-primary btn-sm">SUBMIT</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <h4>Billing prefix and suffix data</h4>
                                        <table className='table table-hover text-center'>
                                            <thead>
                                                <tr>
                                                    <th>SRNO</th>
                                                    <th>DATE</th>
                                                    <th>PREFIX</th>
                                                    <th>SUFFIX</th>
                                                    <th>DELETE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(omkar) && omkar.map((o, index) => (
                                                    <tr key={o.srno}>
                                                        <td>{index + 1}</td>
                                                        <td>{inputdateformat(o.date)}</td>
                                                        <td>{o.prefix}</td>
                                                        <td>{o.suffix}</td>
                                                        <td><button className="btn btn-danger btn-sm">DELETE</button></td>
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
        </>
    );
};

export default Billingsetting;
