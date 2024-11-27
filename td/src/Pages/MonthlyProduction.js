
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { successalert, erroralert } from '../Alert'

import '../Assets/monthlyproduction.css'
import '../Assets/packingslip.css';


import '../Assets/productionreport.css';



import React, { useState, useEffect } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

import { VscServerProcess } from "react-icons/vsc";




const MonthlyProduction = ({ isLoggedIn, setIsLoggedIn }) => {




    const [startdate, setStartdate] = useState("");



    const [warpbr, setWarpbr] = useState(0.00);
    const [weftbr, setWeftbr] = useState(0.00);
    const [eff, setEff] = useState(0.00);
    const [pick, setPick] = useState(0.00);
    const [jobrate, setJobrate] = useState(0.00);
    const [mtr, setmtr] = useState(0.00);
    const [price, setPrice] = useState(0.00);

    const [loading, setLoading] = useState(false);


    const [enddate, setEnddate] = useState("")










    const handlesearch = () => {


        setLoading(true)
        const fetchproductiondata = `http://localhost:5000/productionmonthly/reports?startdate=${startdate}&enddate=${enddate}`;
        axios.get(fetchproductiondata, { withCredentials: true })
            .then(res => {

                if (res.data[0].avg_pick === null) {
                    setLoading(false)
                    erroralert("No data found for selected date range!")



                    // toast.error("No data found for selected date.", { position: "top-center", autoClose: 2000, closeOnClick: true });

                } else {
                    // toast.success("data found for selected date.", { position: "top-center", autoClose: 2000, closeOnClick: true });


                    setLoading(false)
                    //console.log(res.data);
                    setPick(res.data[0].avg_pick)
                    setEff(res.data[0].avrageeff)
                    setJobrate(res.data[0].avragejobrate)
                    setWarpbr(res.data[0].avragewarp)
                    setWeftbr(res.data[0].avrageweft)
                    setPrice(res.data[0].totalPrice)
                }

            })
            .catch(err => {
                // //console.log(err);


            })














    }





    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }









    return (
        <>
            <div className='container-fluid'>
                <ToastContainer></ToastContainer>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone productionrightone border border-1'>
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
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                            <li className="breadcrumb-item active" aria-current="page"><VscServerProcess className='me-2' />Monthly Production report</li>
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
                                                <h4 className="text-start ms-4 mt-2">Monthly PRODUCTION REPORT</h4>
                                            </div>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card  border border-0 m-3'>
                                    <div className='card-body'>
                                        <div className="row d-flex justify-content-center ">
                                            <div className="col-12 col-md-11 ">


                                                <div className="row ms-4 ">
                                                    <div className="col-12 col-md-3">
                                                        <label className="float-start mb-2">Start Date</label>
                                                        <input className="form-control" name="startdate" type="date" onChange={e => setStartdate(e.target.value)} required></input>
                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="float-start mb-2">End Date</label>
                                                        <input className="form-control" name="enddate" type="date" onChange={e => setEnddate(e.target.value)} required></input>
                                                    </div>
                                                    <div className="col-12 col-md-3" style={{ marginTop: "30px" }}>
                                                        <button className="btn btn-primary" onClick={() => handlesearch()} type="submit">SUBMIT</button>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>




                                    </div>


                                </div>

                            </div>




                        </div>



                        <div className='row mt-5'>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>
                                        <div className="row d-flex justify-content-center  ">
                                            <div className="col-12 col-md-11 ">
                                                {/* <div className="row d-flex justify-content-around ms-4 me-4">
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row ">
                                                                <h5 className="text-white">Avg. Pick</h5>
                                                            </div>
                                                            <div className="row  mt-5">
                                                                {pick ? <h5 className="text-white">{pick.toFixed(2)}</h5> : <p>no data</p>}
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg warp break</h5>
                                                            </div>
                                                            <div className="row mt-4">
                                                                <h5 className="text-white">{warpbr ? warpbr.toFixed(2) : <p>no data</p>}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg weft break</h5>
                                                            </div>
                                                            <div className="row mt-4">
                                                                <h5 className="text-white">{weftbr ? weftbr.toFixed(2) : <p>no data</p>}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg Eff</h5>
                                                            </div>
                                                            <div className="row mt-5 ">
                                                                {eff ? <h5 className="text-white">{eff.toFixed(2)}</h5> : <p>no data</p>}
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">

                                                                <h5 className="text-white">Avg job rate</h5>

                                                            </div>
                                                            <div className="row mt-4 ">
                                                                <h5 className="text-white">{jobrate ? jobrate.toFixed(2) : <p>no data</p>}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Total mtr</h5>
                                                            </div>
                                                            <div className="row mt-5 ">
                                                                <h5 className="text-white">{mtr ? mtr.toFixed(2) : <p>no data</p>}</h5>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "200px", height: "170px", background: '#1C204B' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Total Amount</h5>


                                                            </div>
                                                            <div className="row mt-4 ">
                                                                <h5 className="text-white">{price ? price.toFixed(2) : <p>no data</p>}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div> */}


                                                {
                                                    loading ?
                                                        <div class="d-flex justify-content-center">
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                        <div>
                                                            <div className='row mobileproductionmonthlyrow'>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Avrage pick</h5>
                                                                        {pick ? <h3 className='text-white mt-5 ms-3'>{pick.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Avrage Eff</h5>
                                                                        {eff ? <h3 className='text-white mt-5 ms-3'>{eff.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Avrage jobrate</h5>
                                                                        {jobrate ? <h3 className='text-white mt-5 ms-3'>{jobrate.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Total Mtr</h5>
                                                                        {pick ? <h3 className='text-white mt-5 ms-3'>{pick.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>

                                                            </div>




                                                            <div className='row mt-4'>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Avrage Warp br</h5>
                                                                        {warpbr ? <h3 className='text-white mt-5 ms-3'>{warpbr.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Avrage Weft br</h5>
                                                                        {weftbr ? <h3 className='text-white mt-5 ms-3'>{weftbr.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">
                                                                    <div className='omkarcard mobilemoncard'>
                                                                        <h5 className="text-white  pt-3 ms-3">Total billing</h5>
                                                                        {price ? <h3 className='text-white mt-5 ms-3'>{price.toFixed(2)}</h3> : <p>no data</p>}

                                                                    </div>




                                                                </div>
                                                                <div className="col-12 col-md-3 ">





                                                                </div>


                                                            </div>

                                                        </div>


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




export default MonthlyProduction;