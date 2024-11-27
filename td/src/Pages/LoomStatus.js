import reaact, { useEffect, useState } from 'react'
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { Link, Navigate } from 'react-router-dom'
import '../Assets/loomstatus.css'
import '../Assets/packingslip.css';
import { inputdateformat } from 'reactjs-dateformat';
import { successalert, erroralert } from '../Alert'

import GlassContainer from './GlassContainer';
import { FaDashcube } from "react-icons/fa6";
import { CgInternal } from "react-icons/cg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';





const LoomStatus = ({ isLoggedIn, setIsLoggedIn }) => {
    const [loomno, setLoomno] = useState("");
    const [designno, setDesignno] = useState("")
    const [uid, setUid] = useState("")
    const [details, setDetails] = useState([])
    const [loomindate, setLoomindate] = useState("");


    const [loom, setLoom] = useState(0);
    const [design, setDesign] = useState("")
    const [ud, setUd] = useState("");
    const [date, setDate] = useState("");
    const [dalert, setDalert] = useState("");
    const [lnumber, setLnumber] = useState("");
    const [ddesignnumber, setDdesignnumber] = useState("");
    const [loading, setLoading] = useState(true);
    const [closewindow, setClosewindow] = useState("");

    const [submitting, setSubmitting] = useState(false);










    useEffect(() => {


        if (loomno.length < 1) {
            setLnumber("");

        }
        axios.get(`http://localhost:5000/getloomnumber/data?loomnumber=${loomno}`, { withCredentials: true })
            .then(res => {



                if (res.data.length > 0) {
                    setLnumber("Loom number already exist")

                }
                else {
                    setLnumber("")
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, [loomno])


    useEffect(() => {



        if (designno.length < 1) {
            setDalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber/data?dn=${designno}`, { withCredentials: true })
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



    }, [designno])



    useEffect(() => {


        if (design < 1) {
            setDdesignnumber("");
        }
        else {

            axios.get(`http://localhost:5000/getdesignnumber/data?dn=${design}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);

                    if (res.data.length > 0) {
                        setDdesignnumber("");

                    }
                    else {
                        setDdesignnumber("Design number not exit");
                    }


                })
                .catch(err => {
                    console.log(err);

                })


        }
    }, [design])




    useEffect(() => {

        setLoading(true);
        axios.get('http://localhost:5000/loomstatusdata', { withCredentials: true })
            .then(res => {
                //  console.log(res)

                const ldata = res.data;
                const sortedloomdata = [...ldata].sort((a, b) => a.loomno - b.loomno);
                setDetails(sortedloomdata);
                setLoading(false);

            })
            .catch(err => {
                console.log(err);
            })

    }, [])





    const handleupdate = (id) => {


        axios.get(`http://localhost:5000/loomstatusget/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setLoom(res.data[0].loomno);
                setDesign(res.data[0].designno);
                setUd(res.data[0].uid)

                const data134 = inputdateformat(res.data[0].date);
                setLoomindate(data134);

            })
            .catch(err => {
                console.log(err);
            })

    }

    const handlemodalupdate = (id, e) => {
        e.preventDefault();
     

        if (ddesignnumber === "Design number not exit") {
            erroralert("Design number not exit");
            setLoading(false);
        } else {
            const data = { loom, design, ud, loomindate };
            axios.put(`http://localhost:5000/loomstatusupdate/${id}`, data, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "loom status updated") {
                        successalert("Loom status updated successfully!");
                  



                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };


    const handlesubmit = (e) => {

        setSubmitting(true);


        e.preventDefault();



        const values = {
            loomno: loomno,
            designno: designno,
            uid: uid,
            date: date
        }

        if (dalert === "Design number not exit") {
            setSubmitting(false);

            erroralert("Design number is not exist")
        }

        else if (lnumber === "Loom number already exist") {
            setSubmitting(false);

            erroralert(`Design number is already assigned to loom no '${loomno}'`);
        }
        else {
            axios.post('http://localhost:5000/loomstatus', values, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "loomstatus") {
                        setSubmitting(false);

                        // toast.success("Loomstatus data submitted successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                        successalert("Loom status data submitted successfully!");
                        setLoomno("")
                        setDesignno("")
                        setUid("")
                    }

                })
                .catch(err => {
                    // console.error(err);
                    // toast.error("Failed to submit Loomstatus data", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    erroralert("Failed to submit loomstatus data");
                });

        }



    }

    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
    }


    const handlePrint = () => {
        window.print();
    };


    return (
        <>
            <div className='container-fluid'>
                <ToastContainer></ToastContainer>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>
                        <div className="omkar6">
                            <Computersidebar ></Computersidebar>
                        </div>


                    </div>
                    <div className='col-12 col-sm-10 rightone loomstatusmain border border-1'>
                        <Mobilesidebar className="omkar5"></Mobilesidebar>
                        <div className="omkar4">
                            <Header setIsLoggedIn={setIsLoggedIn}></Header>
                        </div>
                        {/* header section strts here  */}


                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4 omkar3'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>

                                            <li className="breadcrumb-item active" aria-current="page"><CgInternal className='me-2' />Loom status</li>
                                        </ol>
                                    </nav>


                                </span>
                            </div>

                        </div>


                        <div className="row packingsliplabel omkar2">
                            <div className="col-md-12 ">
                                <div className="card  shadow-sm m-3 border border-0">
                                    <div className="car-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">Loom Status</h4>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <Link to={[bmurl, productionurl, billingurl, settingurl]} className="packingslipbutton text-decoration-none float-end">
                                    Report
                                </Link> */}
                                                {/* <Link to='/beaminwardreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link > */}

                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row omkar1'>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>
                                        <div className='row d-flex justify-content-end'>


                                        </div>
                                        <form onSubmit={handlesubmit}>
                                            <div className='row mb-2'>
                                                <div className='col-12 col-md-3'>
                                                    <div className='float-start form-label'>
                                                        Date

                                                    </div>
                                                    <input className='form-control' type='date' value={date} onChange={e => setDate(e.target.value)} required></input>


                                                </div>

                                            </div>
                                            <div className='row mt-3 mb-4'>
                                                <div className='col-12 col-md-3 '>
                                                    <div className='float-start form-label'>
                                                        Loom no

                                                    </div>
                                                    <input className='form-control' type='number' value={loomno} onChange={e => setLoomno(e.target.value)} required></input>
                                                    <p className="text-danger">{lnumber}</p>

                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <div className='float-start form-label'>
                                                        Design no

                                                    </div>
                                                    <input className='form-control' type='text' value={designno} onChange={e => setDesignno(e.target.value)} required></input>
                                                    <p className='text-danger'>{dalert}</p>


                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <div className='float-start form-label'>
                                                        UID

                                                    </div>
                                                    <input className='form-control' type='number' value={uid} onChange={e => setUid(e.target.value)} required></input>


                                                </div>


                                            </div>
                                            <div className='row d-flex justify-content-end align-items-center'>
                                                <div className='col-12 col-md-3'>
                                                    <button className="btn btn-primary mobilebuttonloomstatus float-end me-3" style={{ height: "40px", width: "200px" }}>
                                                        ADD LOOM
                                                    </button>


                                                </div>

                                            </div>

                                        </form>

                                        <div className='row'>


                                        </div>


                                    </div>


                                </div>

                            </div>




                        </div>


                        <div className='row mt-3 divToPrint'>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border-0'>
                                    <div className='card-body'>
                                        <div className='row d-flex justify-content-end align-items-center'>
                                            <div className="col-12 col-md-3">
                                                <button className="btn btn-primary float-end me-3 printbutton" onClick={handlePrint}>Print</button>

                                            </div>

                                        </div>
                                        <div className='row companyname' style={{ display: "none" }}>
                                            <h4 className='text-center '>SOURABH TEXTILE</h4>
                                        </div>

                                        <div className='row scroll mt-5'>
                                            <h5 className='text-center'>LOOM STATUS REPORT</h5>
                                            {
                                                loading ? (
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <table className='table table-hover text-center tableone'>
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
                                                                <th className='updateone'>UPDATE</th>

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
                                                                        <td className="updatetwo">
                                                                            <button className='btn btn-primary btn-sm ' data-bs-toggle="modal"
                                                                                data-bs-target={`#exampleModal-${o.DesignNo}`} onClick={e => handleupdate(o.DesignNo)}>UPDATE</button>




                                                                            <div className="modal fade"
                                                                                id={`exampleModal-${o.DesignNo}`}
                                                                                tabIndex="-1"
                                                                                aria-labelledby={`exampleModalLabel-${o.DesignNo}`}
                                                                                aria-hidden="true">
                                                                                <div className="modal-dialog modal-dialog-centered">

                                                                                    <div className="modal-content">
                                                                                        <form onSubmit={(e) => handlemodalupdate(o.DesignNo, e)}>

                                                                                        
                                                                                               
                                                                                                    <div className="modal-body">
                                                                                                        <div className="row">
                                                                                                            <div className="col-12">
                                                                                                                <label className="form-label float-start">Date</label>
                                                                                                                <input className="form-control" value={loomindate} onChange={e => setLoomindate(e.target.value)} type='date'></input>
                                                                                                                <label className="float-start form-label">Loom no</label>
                                                                                                                <input className="form-control" value={loom} type="number" onChange={e => setLoom(e.target.value)}></input>
                                                                                                                <label className="float-start form-label mt-2">Design no</label>
                                                                                                                <input className="form-control" value={design} type="text" onChange={e => setDesign(e.target.value)} />
                                                                                                                <p className="text-danger">{ddesignnumber}</p>
                                                                                                                <label className="float-start form-label mt-2">UID</label>
                                                                                                                <input className="form-control" value={ud} type="number" onChange={e => setUd(e.target.value)} ></input>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="row mt-3">
                                                                                                            <div className="col-12 d-flex justify-content-end">
                                                                                                                <button className="btn btn-primary ms-3" type="submit">
                                                                                                                    SUBMIT
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                             
                                                                                        


                                                                                        </form>
                                                                                    </div>

                                                                                </div>
                                                                            </div>


                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }

                                                        </tbody>

                                                    </table>

                                                )
                                            }



                                        </div>


                                    </div>

                                </div>

                            </div>

                        </div>






                    </div>
                </div>
            </div>


            <div>
                {
                    submitting === true ?
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




export default LoomStatus;
