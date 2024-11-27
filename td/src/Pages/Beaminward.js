
import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Header from '../sidebar/Header';
import { FaDashcube } from "react-icons/fa6";
import '../Assets/beaminward.css';
import '../Assets/packingslip.css';
import GlassContainer from './GlassContainer';

import { CgInternal } from "react-icons/cg";

import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
// import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';

import Title from './Title';

import { successalert, erroralert } from '../Alert';



const Beaminward = ({ isLoggedIn, setIsLoggedIn }) => {

    const [beaminwardvalues, setBeaminwardvalues] = useState({
        title: "BEAMINWARD",
        url: "beaminwardreport"
    })



    // const [alert, setAlert] = useState("");

    const [selectdesignpapertype, setSelectdesignpapertype] = useState("");
    const [loading, setLoading] = useState(false);


    const [company, setCompany] = useState([]);
    const [party, setParty] = useState([]);
    const [selectCompany, setSelectCompany] = useState();
    const [selectParty, setSelectParty] = useState();
    const [uniqueid, setUniqueid] = useState(0);
    const [uid, setUid] = useState("");
    const [values, setValues] = useState({
        Date: "",

        SetNo: "",
        DesignNo: "",
        WarpCount: "",
        WeftCount: "",
        Reed: "",
        Pick: "",
        SizingName: "",
        SizingMtr: "",
        Count1: "",
        Count2: "",
        Count3: "",
        Count4: "",
        Count5: "",
        Countwt1: "",
        Countwt2: "",
        Countwt3: "",
        Countwt4: "",
        Countwt5: "",
        width: "",
        beamnumber: "",
        jobrate: "",
    });


    const [combinedValue, setCombinedValue] = useState(""); // New state variable for combined value
    const [dalert, setDalert] = useState("");

    const [designfile, setDesignfile] = useState(null)
    const [jacquardfile, setJacquardfile] = useState(null)

    const [papernumber, setPapernumber] = useState("");





    const handleFileChange = e => {
        setDesignfile(e.target.files[0]);
    };


    const handleFileChange2 = e => {
        setJacquardfile(e.target.files[0]);
    };




    useEffect(() => {

        axios.get(`http://localhost:5000/getdesignnumber/data?dn=${values.DesignNo}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);

                if (res.data.length > 0) {
                    setDalert("Design number already exist");

                }
                else {
                    setDalert("");
                }


            })
            .catch(err => {
                console.log(err);

            })

    }, [values.DesignNo])











































    // useEffect to update combinedValue whenever SetNo, DesignNo, or uid changes
    useEffect(() => {
        setCombinedValue(`${values.SetNo}-${values.DesignNo}-${uid}`);
    }, [values.SetNo, values.DesignNo, uid]);









    const handleCompanySelect = (e) => {
        setSelectCompany(e.target.value);
    };

    const handledesignpapertype = (e) => {
        setSelectdesignpapertype(e.target.value);
    };

    const handlePartySelect = (e) => {
        setSelectParty(e.target.value);
    };

    const val = (value) => (e) => {
        setValues({ ...values, [value]: e.target.value });
    };

    //   const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:5000/beaminwarduniqueidno', { withCredentials: true })
            .then(res => {

                const data = res.data;
                if (data.length > 0) {
                    const lastuidno = data[data.length - 1].UID;
                    // Set uniqueid to the next available UID
                    setUid(lastuidno + 1); // Initialize uid with the last UID
                }
                else {

                    setUid(uid + 1);
                }
            })
            .catch(err => {

            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/company`, { withCredentials: true })
            .then(res => {
                setCompany(res.data);
            })
            .catch(err => {
                // console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/partyname', { withCredentials: true })
            .then(res => {
                setParty(res.data);
            })
            .catch(err => {
                // console.log(err);
            });
    }, []);


    const submitData = (e) => {

        setLoading(true);

        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData();

        // Append form data fields
        formData.append('Date', values.Date);
        formData.append('uid', uid);
        formData.append('SetNo', values.SetNo);
        formData.append('DesignNo', values.DesignNo);
        formData.append('WarpCount', values.WarpCount);
        formData.append('WeftCount', values.WeftCount);
        formData.append('Reed', values.Reed);
        formData.append('Pick', values.Pick);
        formData.append('SizingName', values.SizingName);
        formData.append('SizingMtr', values.SizingMtr);
        formData.append('Count1', values.Count1);
        formData.append('Count2', values.Count2);
        formData.append('Count3', values.Count3);
        formData.append('Count4', values.Count4);
        formData.append('Count5', values.Count5);
        formData.append('Countwt1', values.Countwt1);
        formData.append('Countwt2', values.Countwt2);
        formData.append('Countwt3', values.Countwt3);
        formData.append('Countwt4', values.Countwt4);
        formData.append('Countwt5', values.Countwt5);
        formData.append('selectCompany', selectCompany);
        formData.append('selectParty', selectParty);
        formData.append('width', values.width);
        formData.append('selectdesignpapertype', selectdesignpapertype);
        formData.append('barcodevalue', combinedValue);
        formData.append('beamstatus', "on floor")
        formData.append('jobrate', values.jobrate);

        // Append files
        if (designfile) {
            formData.append('designfile', designfile);
        }
        if (jacquardfile) {
            formData.append('jacquardfile', jacquardfile);
        }

        if (dalert === "Design number already exist") {
            setLoading(false)
            erroralert("Design number already exist! Design number should be unique");
        }
        else {

            axios.post('http://localhost:5000/beaminward', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'  // Make sure to set this header
                }
            })
                .then((res) => {
                    if (res.data.message === "Inserted successfully") {
                        // toast.success("Data submitted successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                        setLoading(false);
                        
                        successalert("Beaminward data added successfully!");

                      



                    }
                })
                .catch((err) => {
                    // console.log("Failed to submit data to database", err);
                });

        }


    };







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
                    <div className='col-12 col-sm-10 rightone border border-1'>
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

                                            <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />Beaminward</li>
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
                                                <h4 className="text-start ms-4 mt-2">BEAMINWARD </h4>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <Link to={[bmurl, productionurl, billingurl, settingurl]} className="packingslipbutton text-decoration-none float-end">
                                    Report
                                </Link> */}
                                                <Link to='/beaminwardreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link >
                                                <Link to='/countconverter' className="packingslipbutton text-decoration-none float-end" target='_blank'>
                                                    Count converter
                                                </Link >

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
                                        <form onSubmit={submitData}>
                                            <div className='row mb-5 bg-white'>
                                                <div className='row'>
                                                    {/* <p className='ms-3 mb-2' style={{ fontSize: "30px" }}>BEAM INWARD</p> */}
                                                </div>
                                                {/* <hr></hr> */}
                                                <div className='row mb-3 mt-3 ms-1 me-5 ' >
                                                    <div className='col-12 col-md-3'>
                                                        <label className='text-danger float-start'>Select company <sup>*</sup></label>
                                                        <div className="input-group mb-3">
                                                            <select className="form-select" value={selectCompany} onChange={handleCompanySelect} required>
                                                                <option value="">Choose company</option>
                                                                {company.map((comp, index) => (
                                                                    <option key={index} value={comp.companyname}>{comp.companyname}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='text-danger float-start'>Select Party <sup>*</sup></label>
                                                        <div className="input-group mb-3">
                                                            <select className="form-select" value={selectParty} onChange={handlePartySelect} required>
                                                                <option value="">Choose party</option>
                                                                {party.map((p, index) => (
                                                                    <option key={index} value={p.partyname}>{p.partyname}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-md-3'></div>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='float-start mb-2'>Date</label>
                                                        <input className='form-control' type='date' name="Date" onChange={val("Date")} required></input>
                                                    </div>
                                                </div>
                                                {/* <div className='row ms-1 me-5 mb-3'>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='form-label float-start' onChange={e => setPapernumber(e.target.value)} >Unique number for club and non club</label>
                                                        <input className='form-control' type='text'></input>

                                                    </div>

                                                </div> */}
                                                <div className='row  ms-1 me-5'>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='text-start float-start ' >UID(Unique Identification Number)</label>
                                                        <input className='form-control mt-2' type='number' value={uid} onChange={e => setUid(e.target.value)} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start '>Set number</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("SetNo")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start '>Design number</label>
                                                        <input className='form-control mt-2' type='text' onChange={val("DesignNo")} style={{ height: "32px" }} required></input>
                                                        <p className='text-danger'>{dalert}</p>

                                                    </div>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='text-start float-start '>Design paper type</label>
                                                        <div className="input-group mb-3">
                                                            <select className="form-select" value={selectdesignpapertype} onChange={handledesignpapertype} required>
                                                                <option value="">Choose type</option>

                                                                <option >nonclub</option>
                                                                <option >club</option>

                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start'>Width/R.S</label>
                                                        <input className='form-control mt-2' type="number" step="any" onChange={val("width")} style={{ height: "32px" }} required></input>
                                                    </div>



                                                </div>

                                                <div className='row mt-2 ms-1 me-5'>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Warp count</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("WarpCount")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Weft count</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("WeftCount")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Reed</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Reed")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Pick</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Pick")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Sizing Name</label>
                                                        <input className='form-control mt-2' type='text' onChange={val("SizingName")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Sizing meter</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("SizingMtr")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                </div>
                                                <div className='row ms-1 me-5 mt-4'>
                                                    <div className="col-12 col-md-2">
                                                        <label className='form-label float-start'>Beam number</label>
                                                        <input className='form-control' type='number' onChange={val("beamnumber")} style={{ height: "32px" }} required></input>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className='form-label float-start'>Design paper</label>

                                                        <input type="file" name="designfile" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />


                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className='form-label float-start'>Jacquard name</label>

                                                        <input type="file" name="jacquardfile" className="form-control" id="inputGroupFile02" onChange={handleFileChange2} />

                                                    </div>
                                                    <div className='col-12 col-md-3'>
                                                        <label className='form-label float-start'>Job Rate</label>
                                                        <input className='form-control' type='number' style={{height: "32px"}} required onChange={val("jobrate")}></input>

                                                    </div>

                                                </div>


                                                <div className='row mt-5 ms-1 me-5'>
                                                    <h6 className='text-start text-danger'>WEFT COUNT DETAILS</h6>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2 '>Count 1</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Count1")} style={{ height: "32px" }} required></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Count 2</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Count2")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Count 3</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Count3")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Count 4</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Count4")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className='text-start float-start mt-2'>Count 5</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Count5")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                </div>

                                                <div className='row mt-2 ms-1 me-5'>
                                                    <div className='col-12 col-md-2'>
                                                        <label className=' float-start mt-2 '>Pick Pattern</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Countwt1")} style={{ height: "32px" }} required ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className=' float-start mt-2'>Pick Pattern</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Countwt2")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className=' float-start mt-2'>Pick Pattern</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Countwt3")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className=' float-start mt-2'>Pick Pattern</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Countwt4")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                    <div className='col-12 col-md-2'>
                                                        <label className=' float-start mt-2'>Pick Pattern</label>
                                                        <input className='form-control mt-2' type='number' onChange={val("Countwt5")} style={{ height: "32px" }} ></input>
                                                    </div>
                                                </div>
                                                <div className='row d-flex justify-content-end align-items-center mt-5'>
                                                    <div className='col-12 col-md-2 mb-3  '>
                                                        <button className='btn btn-primary float-end me-3' type='submit' >Submit</button>
                                                    </div>
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



export default Beaminward;
