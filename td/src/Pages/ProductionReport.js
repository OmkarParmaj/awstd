

import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css';

import { inputdateformat } from 'reactjs-dateformat'


import '../Assets/productionreport.css';



import React, { useState } from "react";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

import { VscServerProcess } from "react-icons/vsc";
import { successalert, erroralert } from '../Alert'




const ProductionReport = ({ isLoggedIn, setIsLoggedIn }) => {




    const [date, setDate] = useState("");
    const [alert, setAlert] = useState("");
    const [tabledata, setTabledata] = useState([]);

    const [loading, setLoading] = useState(false)

    const [pdata, setPdata] = useState([]);


    const [warpbr, setWarpbr] = useState(0);
    const [weftbr, setWeftbr] = useState(0);
    const [eff, setEff] = useState(0);
    const [pick, setPick] = useState(0);
    const [jobrate, setJobrate] = useState(0);
    const [mtr, setmtr] = useState(0);
    const [price, setPrice] = useState(0);











    // if (isLoggedIn === false) {
    //     <Navigate to="/login" replace></Navigate>
    // }


    const handlesearch = () => {
        setLoading(true)
        if (!date) {
            erroralert("Please select date");
            setLoading(false)
            return;
        }

        const url = `http://localhost:5000/api/production/reports?date=${date}`;
        axios.get(url, { withCredentials: true })
            .then(res => {
                if (res.data.length === 0) {
                    erroralert("No data found for selected date");
                } else {
                    // Initialize accumulators for summation and counts
                    let totalWarpBreak = 0;
                    let totalWeftBreak = 0;
                    let totalEff = 0;
                    let totalPick = 0;
                    let totalJobRate = 0;
                    let totalMtr = 0;
                    let totalPrice = 0;
                    let entryCount = 0;
                    setLoading(false)

                    // Combine production table data from all entries
                    const combinedData = res.data.reduce((acc, entry) => {
                        const tdata = JSON.parse(entry.productiontable);

                        // Accumulate values and count entries
                        totalWarpBreak += parseFloat(entry.avragewarpbreak) || 0;
                        totalWeftBreak += parseFloat(entry.avrageweftbreak) || 0;
                        totalEff += parseFloat(entry.avrageeff) || 0;
                        totalPick += parseFloat(entry.avragepick) || 0;
                        totalJobRate += parseFloat(entry.avragejobrate) || 0;
                        totalMtr += parseFloat(entry.avragemtr) || 0;
                        totalPrice += parseFloat(entry.totalprice) || 0;

                        entryCount += 1; // Increment entry count

                        // Concatenate data
                        return acc.concat(tdata);
                    }, []);

                    // Calculate averages
                    const avgWarpBreak = entryCount > 0 ? totalWarpBreak / entryCount : 0;
                    const avgWeftBreak = entryCount > 0 ? totalWeftBreak / entryCount : 0;
                    const avgEff = entryCount > 0 ? totalEff / entryCount : 0;
                    const avgPick = entryCount > 0 ? totalPick / entryCount : 0;
                    const avgJobRate = entryCount > 0 ? totalJobRate / entryCount : 0;
                    const avgMtr = entryCount > 0 ? totalMtr / entryCount : 0;

                    // Update state with combined data and aggregated averages
                    setTabledata(combinedData);

                    // Update other state variables
                    const firstEntry = res.data[0];
                    setPdata(firstEntry);

                    setWarpbr(avgWarpBreak);
                    setWeftbr(avgWeftBreak);
                    setEff(avgEff);
                    setPick(avgPick);
                    setJobrate(avgJobRate);
                    setmtr(totalMtr);
                    setPrice(totalPrice); // total price remains summed up
                }
            })
            .catch(err => {
                //console.log(err);
            });
    };




    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }



    const handlePrint = () => {
        window.print();
    };


    return (
        <>

            <div className='container-fluid'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>
                        <div className="omkar8">
                            <Computersidebar></Computersidebar>

                        </div>


                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1'>
                        <div className="omkar7">
                            <Mobilesidebar></Mobilesidebar>

                            {/* header section strts here  */}
                            <Header setIsLoggedIn={setIsLoggedIn}></Header>

                            {/* header section ends here  */}

                        </div>



                        <div className='row pathing mt-4 mb-4 omkar5'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                            <li className="breadcrumb-item active" aria-current="page"><VscServerProcess className='me-2' />Production report</li>
                                        </ol>
                                    </nav>


                                </span>
                            </div>

                        </div>

                        <div className="row packingsliplabel omkar4">
                            <div className="col-md-12 ">
                                <div className="card  shadow-sm m-3 border border-0">
                                    <div className="car-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">DAILY PRODUCTION REPORT</h4>
                                            </div>
                                            {/* <div className="col-md-6">
                                               <button className="packingslipbutton float-end">
                                                   Report
                                               </button>
                                           </div> */}
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="row mt-3 mb-3">
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span>11:11</span><span className="time-sub-text">PM</span></p>
                                    <p className="day-text">Wednesday, June 15th</p>

                                </div>

                            </div>
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span>11:11</span><span className="time-sub-text">PM</span></p>
                                    <p className="day-text">Wednesday, June 15th</p>

                                </div>

                            </div>
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span>11:11</span><span className="time-sub-text">PM</span></p>
                                    <p className="day-text">Wednesday, June 15th</p>

                                </div>

                            </div>
                            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">

                                <div className="beaminwardreportcard psr1">
                                    <p className="time-text"><span>11:11</span><span className="time-sub-text">PM</span></p>
                                    <p className="day-text">Wednesday, June 15th</p>

                                </div>

                            </div>
                        </div> */}

                        <div className='row  '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>
                                        <div className="row d-flex justify-content-center mt-5 ">
                                            <div className="col-12 col-md-11 ">



                                                <div className="row ms-4 mt-4 omkar1">
                                                    <div className="col-12 col-md-3">
                                                        <label className="float-start mb-2">Select Date</label>
                                                        <input className="form-control" name="date" type="date" onChange={e => setDate(e.target.value)}></input>
                                                    </div>
                                                    <div className="col-12 col-md-3" style={{ marginTop: "31px" }}>
                                                        <button className="btn btn-primary" onClick={() => handlesearch()} type="submit">SUBMIT</button>
                                                    </div>
                                                    <div className="col-12 col-md-6 mt-4">
                                                        {tabledata.length > 0 ? <button className="btn btn-primary  float-end" onClick={handlePrint}>Print</button> : <button className="btn btn-primary  float-end" disabled onClick={handlePrint}>Print</button>}


                                                    </div>
                                                </div>

                                                <div className="row d-flex justify-content-around mt-5 ms-4 me-4 omkar2">
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right top, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row ">
                                                                <h5 className="text-white">Avg. Pick</h5>
                                                            </div>
                                                            <div className="row  mt-5">
                                                                {!pick ? <p>no data</p> : <h5>{pick.toFixed(2)}</h5>}
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg warp break</h5>
                                                            </div>
                                                            <div className="row mt-4">
                                                                <h5>{warpbr.toFixed(2)}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg weft break</h5>
                                                            </div>
                                                            <div className="row mt-4">
                                                                <h5>{weftbr.toFixed(2)}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Avg Eff</h5>
                                                            </div>
                                                            <div className="row mt-5 ">
                                                                {eff ? <h5>{eff.toFixed(2)}</h5> : <p>no data</p>}
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">

                                                                <h5 className="text-white">Avg job rate</h5>

                                                            </div>
                                                            <div className="row mt-4 ">
                                                                <h5>{jobrate.toFixed(2)}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Total mtr</h5>
                                                            </div>
                                                            <div className="row mt-5 ">
                                                                <h5>{mtr.toFixed(2)}</h5>
                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="card c1" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <h5 className="text-white">Total Amount</h5>


                                                            </div>
                                                            <div className="row mt-4 ">
                                                                <h5>{price.toFixed(2)}</h5>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row myonetab" style={{ display: "none" }}>
                                                    <h4 className="text-center " >Production Report</h4>
                                                    <label className="form-label">Date: {inputdateformat(date)}</label>

                                                </div>
                                                <div className="row mytwo" style={{ display: "none" }}>
                                                    <div className="col-2">
                                                        <p className="text-center">Avg Pick</p>
                                                        <h5 className="text-center">{pick.toFixed(2)}</h5>

                                                    </div>
                                                    <div className="col-2">
                                                        <p className="text-center">Avg Eff</p>
                                                        <h5 className="text-center">{eff.toFixed(2)}</h5>

                                                    </div>
                                                    <div className="col-2">
                                                        <p className="text-center">Avg Jobrate</p>
                                                        <h5 className="text-center">{jobrate.toFixed(2)}</h5>

                                                    </div>
                                                    <div className="col-2">
                                                        <p className="text-center">Avg Mtr</p>
                                                        <h5 className="text-center">{mtr.toFixed(2)}</h5>

                                                    </div>
                                                    <div className="col-2">
                                                        <p className="text-center">Billing</p>
                                                        <h5 className="text-center">{price.toFixed(2)}</h5>

                                                    </div>

                                                </div>




                                                <div className="row mt-5 ms-4 me-4 mb-5 scroll divToPrint">
                                                    {
                                                        loading ?
                                                            <div class="d-flex justify-content-center">
                                                                <div class="spinner-border" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div> :
                                                            <table className="table table-bordered tablefontone">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Sr no</th>
                                                                        <th>Shift</th>
                                                                        <th>Loom no</th>
                                                                        <th>Set No</th>
                                                                        <th>Design no</th>
                                                                        <th>Pick</th>
                                                                        <th>wp br</th>
                                                                        <th>wf br</th>
                                                                        <th>eff %</th>
                                                                        <th>Job rate</th>
                                                                        <th>Price</th>
                                                                        <th>Mtr</th>
                                                                        <th>Total price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {tabledata.length > 0 ? (
                                                                        tabledata.map((o, index) => (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{o.shift}</td>
                                                                                <td>{o.loomno}</td>
                                                                                <td>{o.setno}</td>
                                                                                <td>{o.designno}</td>
                                                                                <td>{o.pick}</td>
                                                                                <td>{o.wpbr}</td>
                                                                                <td>{o.wfbr}</td>
                                                                                <td>{o.eff}</td>
                                                                                <td>{o.jobrate}</td>
                                                                                <td>{o.price}</td>
                                                                                <td>{o.mtr}</td>
                                                                                <td>{o.totalprice}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="13">No data found</td>
                                                                        </tr>
                                                                    )}
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
            </div>








        </>
    );
}


export default ProductionReport;