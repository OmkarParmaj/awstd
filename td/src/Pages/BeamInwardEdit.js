import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaDashcube } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { CgInternal } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';
import '../Assets/beaminwardedit.css';
import { inputdateformat, monthformat } from "../Date";
import { successalert, erroralert } from '../Alert'

import GlassContainer from './GlassContainer';

const BeamInwardEdit = ({ isLoggedIn, setIsLoggedIn }) => {
    const [selectdesignpapertype, setSelectdesignpapertype] = useState("");
    const [date, setDate] = useState("");
    const [temp, setTemp] = useState({
        Date: "",
        UID: "",
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
        jobrate: "",
    });

    const [designfile, setDesignfile] = useState(null)
    const [jacquardfile, setJacquardfile] = useState(null)


    const [loading, setLoading] = useState(false);





    const { id } = useParams();
    const navigate = useNavigate();

    const handledesignpapertype = (e) => {
        setSelectdesignpapertype(e.target.value);
    };



    const handleFileChange = e => {
        setDesignfile(e.target.files[0]);
    };


    const handleFileChange2 = e => {
        setJacquardfile(e.target.files[0]);
    };







    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/beaminwardeditchange/${id}`, { withCredentials: true });
                const data = response.data;

                const omkar = inputdateformat(response.data[0].Date);
                setDate(omkar);

                const cl = response.data[0].club;
                setSelectdesignpapertype(cl);

                if (data && data.length > 0) {
                    const firstItem = data[0];
                    setTemp({
                        Date: omkar || "",
                        UID: firstItem.UID || "",
                        SetNo: firstItem.SetNo || "",
                        DesignNo: firstItem.DesignNo || "",
                        WarpCount: firstItem.WarpCount || "",
                        WeftCount: firstItem.WeftCount || "",
                        Reed: firstItem.Reed || "",
                        Pick: firstItem.Pick || "",
                        SizingName: firstItem.SizingName || "",
                        SizingMtr: firstItem.SizingMtr || "",
                        Count1: firstItem.Count1 || "",
                        Count2: firstItem.Count2 || "",
                        Count3: firstItem.Count3 || "",
                        Count4: firstItem.Count4 || "",
                        Count5: firstItem.Count5 || "",
                        Countwt1: firstItem.Countwt1 || "",
                        Countwt2: firstItem.Countwt2 || "",
                        Countwt3: firstItem.Countwt3 || "",
                        Countwt4: firstItem.Countwt4 || "",
                        Countwt5: firstItem.Countwt5 || "",
                        width: firstItem.width || "",
                        jobrate: firstItem.JobRate || "",
                    });
                }
            } catch (error) {
                // console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {

        setLoading(true);


        e.preventDefault();

        const formData = new FormData();

        // Append form data fields
        formData.append('Date', temp.Date);
        formData.append('uid', temp.UID);
        formData.append('SetNo', temp.SetNo);
        formData.append('DesignNo', temp.DesignNo);
        formData.append('WarpCount', temp.WarpCount);
        formData.append('WeftCount', temp.WeftCount);
        formData.append('Reed', temp.Reed);
        formData.append('Pick', temp.Pick);
        formData.append('SizingName', temp.SizingName);
        formData.append('SizingMtr', temp.SizingMtr);
        formData.append('Count1', temp.Count1);
        formData.append('Count2', temp.Count2);
        formData.append('Count3', temp.Count3);
        formData.append('Count4', temp.Count4);
        formData.append('Count5', temp.Count5);
        formData.append('Countwt1', temp.Countwt1);
        formData.append('Countwt2', temp.Countwt2);
        formData.append('Countwt3', temp.Countwt3);
        formData.append('Countwt4', temp.Countwt4);
        formData.append('Countwt5', temp.Countwt5);

        formData.append('width', temp.width);
        formData.append('selectdesignpapertype', selectdesignpapertype);
        formData.append('jobrate', temp.jobrate)


        // Append files
        if (designfile) {
            formData.append('designfile', designfile);
        }
        if (jacquardfile) {
            formData.append('jacquardfile', jacquardfile);
        }

        try {
            const response = await axios.put(`http://localhost:5000/beaminwardedit/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'  // Make sure to set this header
                }
            });
            if (response.data.message === "Added successfully") {
                // toast.success("Data added successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                setLoading(false);
                successalert("Data added successfully!");



                setTimeout(() => {
                    navigate("/beaminwardreport");
                }, 2000);
            }
        } catch (error) {
            // console.error("Error sending data:", error);
        }
    };

    const val = (valu) => (e) => {
        setTemp({ ...temp, [valu]: e.target.value });
    };

    const gotopage = () => {
        setTimeout(() => {
            navigate("/beaminwardreport");
        }, 2000);
    };

    const gopage = () => {
        navigate("/beaminwardreport");
    };

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
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
                                            <li className="breadcrumb-item"><CgInternal className='me-2' />Beaminward report</li>
                                            <li className="breadcrumb-item active" aria-current="page"><FiEdit className='me-2' />Beaminward edit</li>
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
                                                <h4 className="text-start ms-4">BEAM INWARD EDIT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <button className="packingslipbutton float-end">
                                                Report
                                            </button> */}
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
                                            <div className='row mb-3 mt-3 me-3 ms-3' >
                                                <div className='col-12 col-md-3'>
                                                    <label className='text-start float-start '>Design paper type</label>
                                                    <div className="input-group mb-3">
                                                        <select className="form-select" value={selectdesignpapertype} onChange={handledesignpapertype} required>
                                                            <option value="">Choose type</option>
                                                            <option value="nonclub">nonclub</option>
                                                            <option value="club">club</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-3'></div>
                                                <div className='col-12 col-md-3'></div>
                                                <div className='col-12 col-md-3'>
                                                    <label className='form-label float-start mb-2'>Date</label>
                                                    <input className='form-control' type='date' value={date} onChange={val("Date")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>UID</label>
                                                    <input className='form-control mt-2' type='number' value={temp.UID} onChange={val("UID")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Set no</label>
                                                    <input className='form-control mt-2' type='text' value={temp.SetNo} onChange={val("SetNo")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Design no</label>
                                                    <input className='form-control mt-2' type='text' value={temp.DesignNo} onChange={val("DesignNo")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Warp count</label>
                                                    <input className='form-control mt-2' type='text' value={temp.WarpCount} onChange={val("WarpCount")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Weft count</label>
                                                    <input className='form-control mt-2' type='text' value={temp.WeftCount} onChange={val("WeftCount")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Reed</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Reed} onChange={val("Reed")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Pick</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Pick} onChange={val("Pick")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Sizing name</label>
                                                    <input className='form-control mt-2' type='text' value={temp.SizingName} onChange={val("SizingName")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Sizing mtr</label>
                                                    <input className='form-control mt-2' type='text' value={temp.SizingMtr} onChange={val("SizingMtr")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count 1</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Count1} onChange={val("Count1")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count 2</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Count2} onChange={val("Count2")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count 3</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Count3} onChange={val("Count3")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count 4</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Count4} onChange={val("Count4")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count 5</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Count5} onChange={val("Count5")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count wt 1</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Countwt1} onChange={val("Countwt1")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count wt 2</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Countwt2} onChange={val("Countwt2")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count wt 3</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Countwt3} onChange={val("Countwt3")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count wt 4</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Countwt4} onChange={val("Countwt4")} />
                                                </div>
                                            </div>
                                            <div className='row me-3 ms-3'>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Count wt 5</label>
                                                    <input className='form-control mt-2' type='text' value={temp.Countwt5} onChange={val("Countwt5")} />
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <label className='form-label'>Width</label>
                                                    <input className='form-control mt-2' type='text' value={temp.width} onChange={val("width")} />
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
                                                <div className="col-12 col-md-3">
                                                    <label className='form-label float-start'>Job Rate</label>
                                                    <input className='form-control' type='text' value={temp.jobrate} onChange={val("jobrate")} style={{ height: "32px" }} required></input>

                                                </div>

                                            </div>
                                            <div className='row me-3 ms-3 mb-3 d-flex justify-content-end align-items-center'>
                                                <div className='col-12 col-md-4'>
                                                    <button className='packingslipbutton mt-4 float-end' type='submit'>Save</button>
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



        </>);
};

export default BeamInwardEdit;
