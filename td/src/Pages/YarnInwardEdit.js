import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import { inputdateformat } from 'reactjs-dateformat';
import { FiEdit } from "react-icons/fi";
import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import {successalert, erroralert} from '../Alert'

const YarnInwardEdit = ({ isLoggedIn, setIsLoggedIn }) => {
    const [fileomkar, setFileomkar] = useState(null);
    const [date, setDate] = useState("");
    const [setno, setSetno] = useState(0);
    const [designno, setDesignno] = useState("");
    const [yarnparty, setYarnparty] = useState("");
    const [count, setCount] = useState(0);
    const [party, setParty] = useState("");
    const [yarnwt, setYarnwt] = useState(0);

    const [alert, setAlert] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialdate, setInitialdate] = useState("");

    useEffect(() => {
        fetchdata();
    }, [id]);

    const fetchdata = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/yarninwardedit/${id}`, { withCredentials: true });
             const predate = new Date(res.data[0].date).toISOString().split('T')[0];
            setDate(predate);
            setInitialdate(predate);
            setSetno(res.data[0].setNo);
            setDesignno(res.data[0].Designno);
            setYarnparty(res.data[0].yarnParty);
            setCount(res.data[0].count);
            setParty(res.data[0].party);
            setYarnwt(res.data[0].weight);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = e => {
        setFileomkar(e.target.files[0]);
    };

    const handlesubmit = (e) => {
        e.preventDefault();
           
              const mydateformat = inputdateformat(date);

        const formData = new FormData();
        formData.append('setnumber', setno);
        formData.append('designnumber', designno);
         if(date !== initialdate) {
          formData.append('date', date);


        }
       
        formData.append('yarnparty', yarnparty);
        formData.append('count', count);
        formData.append('party', party);
        formData.append('weight', yarnwt);
        if (fileomkar) {
            formData.append('file', fileomkar);
        }

        axios.put(`http://localhost:5000/yarninwardedit/${id}`, formData, { withCredentials: true })
            .then(res => {
                if (res.data.message === "Updated") {
                    // toast.success("Updated Yarn data!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Updated yarn data")
                    setTimeout(() => {
                        navigate("/yarninwardreport");
                    }, 2000);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>
                        <Computersidebar />
                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1'>
                        <Mobilesidebar />
                        <Header setIsLoggedIn={setIsLoggedIn} />
                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>
                                            <li className="breadcrumb-item " ><Link to='/yarninwardreport'><IoNewspaperOutline className='me-2' />Yarn inward report</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><FiEdit className='me-2' />Yarn inward edit</li>
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
                                                <h4 className="text-start ms-4 mt-2">YARN INWARD EDIT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to='/yarninwardreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link>
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
                                        <div className="row">
                                            <h1 className="text-center">Yarn inward </h1>
                                        </div>
                                        <form onSubmit={handlesubmit}>
                                            <div className="row mt-5">
                                                <div className="col-12 col-md-3 float-end">
                                                    <label className="form-label float-start">Date</label>
                                                    <input
                                                        name="date"
                                                        type="date"
                                                        className="form-control"
                                                        value={date}
                                                        onChange={e => setDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Set No</label>
                                                    <input
                                                        name="setNo"
                                                        type="number"
                                                        className="form-control"
                                                        value={setno}
                                                        onChange={e => setSetno(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Design No</label>
                                                    <input
                                                        name="Designno"
                                                        type="number"
                                                        className="form-control"
                                                        value={designno}
                                                        onChange={e => setDesignno(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-5 mt-3">
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Yarn party</label>
                                                    <input
                                                        name="yarnParty"
                                                        type="text"
                                                        className="form-control"
                                                        value={yarnparty}
                                                        onChange={e => setYarnparty(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Count</label>
                                                    <input
                                                        name="count"
                                                        type="number"
                                                        className="form-control"
                                                        value={count}
                                                        onChange={e => setCount(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Party</label>
                                                    <input
                                                        name="party"
                                                        type="text"
                                                        className="form-control"
                                                        value={party}
                                                        onChange={e => setParty(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Yarn Weight</label>
                                                    <input
                                                        name="weight"
                                                        type="number"
                                                        className="form-control"
                                                        value={yarnwt}
                                                        onChange={e => setYarnwt(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-12 col-md-3">
                                                    <input
                                                        type="file"
                                                        name="file"
                                                        className="form-control"
                                                        id="inputGroupFile02"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-end mb-5">
                                                <div className="col-12 col-md-2 ">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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

export default YarnInwardEdit;
