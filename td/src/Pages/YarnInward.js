import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import { FaDashcube } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";

import GlassContainer from './GlassContainer';
import { CgInternal } from "react-icons/cg";
import { successalert, erroralert } from '../Alert'

import '../Assets/packingslip.css';
import '../Assets/yarninward.css'

import { Bounce, cssTransition, toast } from 'react-toastify';
import { Link, Navigate } from "react-router-dom";


const YarnInward = ({ isLoggedIn, setIsLoggedIn }) => {

    const [file, setFile] = useState(null);

    const [rowData, setRowData] = useState({
        setNo: "",
        Designno: "",
        date: "",
        yarnParty: "",
        count: "",
        party: "",
        weight: ""
    });

    const [totalwt, setTotalwt] = useState(0);
    // const [alert, setAlert] = useState("");

    const [dalert, setDalert] = useState("");
    const [salert, setSalert] = useState("");

    const [loading, setLoading] = useState(false);




    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };




    useEffect(() => {

        if (rowData.Designno.length < 1) {
            setDalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber/data?dn=${rowData.Designno}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);

                    if (res.data.length > 0) {
                        setDalert("");

                    }
                    else {
                        setDalert("Design number not exit");
                    }


                })
                .catch(err => {
                    console.log(err);

                })

        }



    }, [rowData.Designno])



    useEffect(() => {

        if (rowData.setNo.length < 1) {
            setSalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber2/data?dn=${rowData.setNo}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);

                    if (res.data.length > 0) {
                        setSalert("");

                    }
                    else {
                        setSalert("set number not exit");
                    }


                })
                .catch(err => {
                    console.log(err);

                })

        }



    }, [rowData.setNo])




    useEffect(() => {
        calculateTotalWeight();
    }, [rowData]);

    function calculateTotalWeight() {
        const totalWeight = parseFloat(rowData.weight) || 0;
        setTotalwt(totalWeight);
    }

    const handleInputChange = (name, value) => {
        setRowData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        setLoading(true);


        e.preventDefault();

        const formData = new FormData();
        formData.append('setnumber', rowData.setNo);
        formData.append('designnumber', rowData.Designno);
        formData.append('date', rowData.date);
        formData.append('yarnparty', rowData.yarnParty);
        formData.append('count', rowData.count);
        formData.append('party', rowData.party);
        formData.append('weight', rowData.weight);



        if (file) {
            formData.append('file', file);
        }



        if (dalert === "Design number not exit") {
            setLoading(false);
            erroralert("Design number not exist!");
        }

        else if(salert === "set number not exit") {
            setLoading(false);
            erroralert("Set number not exist");
        }

        else {
            axios.post('http://localhost:5000/yarninward', formData, { withCredentials: true })
                .then(res => {
                    setLoading(false);
                    // console.log("Data inserted successfully");
                    // toast.success("data has submmitted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data has submitted")
                    setRowData({
                        setNo: "",
                        Designno: "",
                        date: "",
                        yarnParty: "",
                        count: "",
                        party: "",
                        weight: ""
                    })

                })
                .catch(err => {
                    // console.log("Error in submitting data:", err);
                });

        }




    }


    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }



    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone yarinwardmain border border-1'>
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

                                            <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />YarnInward</li>
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
                                            <div className="col-md-6 d-flex">
                                                <h4 className="text-start ms-4 mt-2">YARN INWARD</h4>

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
                                        <form onSubmit={handleSubmit}>

                                            <div className="row mt-5">
                                                <div className="col-12 col-md-3 float-end">
                                                    <label className="form-label float-start">Date</label>
                                                    <input name="date"
                                                        type="date"
                                                        className="form-control"
                                                        value={rowData.date}
                                                        onChange={e => handleInputChange("date", e.target.value)} required></input>
                                                </div>

                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Set No</label>
                                                    <input
                                                        name="setNo"
                                                        type="number"
                                                        className="form-control"
                                                        value={rowData.setNo}
                                                        onChange={e => handleInputChange("setNo", e.target.value)}
                                                        required
                                                    />
                                                    <p className="text-danger">{salert}</p>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Design No</label>
                                                    <input name="Designno" type="number" className="form-control" value={rowData.Designno} onChange={e => handleInputChange("Designno", e.target.value)} required></input>
                                                    <p className="text-danger">{dalert}</p>
                                                </div>
                                            </div>
                                            <div className="row mb-5 mt-3">
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Yarn party</label>
                                                    <input
                                                        name="yarnParty"
                                                        type="text"
                                                        className="form-control"
                                                        value={rowData.yarnParty}
                                                        onChange={e => handleInputChange("yarnParty", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Count</label>
                                                    <input
                                                        name="count"
                                                        type="number"
                                                        className="form-control"
                                                        value={rowData.count}
                                                        onChange={e => handleInputChange("count", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Party</label>
                                                    <input
                                                        name="party"
                                                        type="text"
                                                        className="form-control"
                                                        value={rowData.party}
                                                        onChange={e => handleInputChange("party", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start">Yarn Weight</label>
                                                    <input
                                                        name="weight"
                                                        type="number"
                                                        className="form-control"
                                                        value={rowData.weight}
                                                        onChange={e => handleInputChange("weight", e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-12 col-md-3">
                                                    <input type="file" name="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />

                                                </div>

                                            </div>
                                            <div className="row d-flex justify-content-end mb-5">
                                                <div className="col-12 col-md-2 ">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success float-end me-3"
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



            <div>
                {
                    loading === true ?
                        <GlassContainer>
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>




                        </GlassContainer> :

                        <div></div>
                }
            </div>







        </>
    );
}


export default YarnInward;