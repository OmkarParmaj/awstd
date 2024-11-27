import React, { useEffect, useState } from "react";
import '../Assets/production.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { VscServerProcess } from "react-icons/vsc";
import { FaDashcube } from "react-icons/fa";
import { inputdateformat } from 'reactjs-dateformat';
import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Header from '../sidebar/Header';
import { Link, Navigate } from "react-router-dom";

const ProductionEdit = ({ isLoggedIn, setIsLoggedIn }) => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (date) {

            setLoading(true)
            axios.get(`http://localhost:5000/get_productiondata_for_edit/data?date=${date}`, { withCredentials: true })
                .then(res => {
                    if (res.data) {
                        setData(res.data);
                        setLoading(false)
                    } else {
                        toast.error("No data found.");
                        setLoading(false)
                    }
                })
                .catch(err => {
                    console.error("Error fetching data:", err);
                    toast.error("Failed to fetch data.");
                });
        }
    }, [date]);

    if (isLoggedIn === false) {
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
                            <div className='col-12 col-sm-12 d-flex justify-content-start'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to='/dashboard'>
                                                <FaDashcube className='me-2' />Home
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <VscServerProcess className='me-2' />Production edit
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="row packingsliplabel">
                            <div className="col-md-12">
                                <div className="card shadow-sm m-3 border border-0">
                                    <div className="card-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">PRODUCTION EDIT</h4>
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
                                        <div className='row ms-4 me-4 mt-4 mb-4 d-flex justify-content-end'>
                                            <div className="col-12 col-md-3">
                                                <h6 className='text-start'>Search result using Date</h6>
                                                <input
                                                    type='date'
                                                    className="form-control"
                                                    onChange={e => setDate(e.target.value)}
                                                    placeholder="search using Date"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
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
                                                                <th>Sr no</th>
                                                                <th>DATE</th>
                                                                <th>EDIT</th>
                                                                <th>DELETE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data && data.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{inputdateformat(o.date)}</td>
                                                                    <td>
                                                                        <Link to={`https://www.textilediwanji.com/production_edit_datewise/${o.srno}`} className="btn btn-primary btn-sm">
                                                                            EDIT
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={() => {
                                                                                // Implement delete functionality
                                                                                toast.info(`Delete functionality is not implemented for ${o.srno}`);
                                                                            }}
                                                                        >
                                                                            DELETE
                                                                        </button>
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
        </>
    );
};

export default ProductionEdit;
