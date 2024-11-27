import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

import '../Assets/beaminwardprint.css';

import Barcode, {} from 'react-barcode';




const BeamInwardPrint = () => {
    const { id1, id2 } = useParams();

    const [bdata, setBdata] = useState();
    const [barcodeval, setBarcodeval] = useState("");




    useEffect(() => {
        fetchdata();
    }, [id1, id2])


    const fetchdata = async () => {

        try {
            const res = await axios.get(`http://localhost:5000/beaminwardprintnew/${id1}/${id2}`, {
                withCredentials: true
            })
            // console.log(res.data)
            setBdata(res.data[0]);
            setBarcodeval(res.data[0].barcodevalue);
        } catch (err) {
            // console.log(err);
        }
    }


    // If the user is not logged in, redirect to the login page


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }






    return (
        <div className="container-fluid" >
            <div className="row mt-2">

                <div className="col-12 col-md ">
                    <div className="container-fluid border border-1 ">

                        <div className="row">
                            <div className="col-4 col-md-2 border-end border-bottom  d-flex justify-content-center align-items-center ">

                                {bdata && <img src={`http://localhost:5000/companyimage/${bdata.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${bdata.filenameas}`} ></img>}
                            </div>
                            <div className="col-8 col-md-10 border-bottom ">
                                {bdata && <h3 className="m-0 text-center">{bdata.companyname}</h3>}
                                {bdata && <p className="m-0 text-center">Address: {bdata.companyaddress}</p>}
                                {bdata && <p className="m-0 text-center">Email: {bdata.emailid} phone:+91-{bdata.phoneno}</p>}
                                {bdata && <p className="m-0 text-center">GST no: {bdata.gst}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <h3 className="text-center mt-2 mb-2 border-bottom">BEAMINWARD REPORT</h3>
                        </div>
                        <div className="row d-flex justify-content-end align-items-center">
                            <div className="col-3 col-md-3 d-flex justify-content-end">
                                <Barcode
                                value={barcodeval}
                                height={33}
                                width={1.6}
                                
                                >

                                </Barcode>

                            </div>

                        </div>

                        <div className="row mt-3">
                            <div className="col-6 col-md-6">
                                {bdata && <p className="text-start ">Set no:- {bdata.SetNo}</p>}
                            </div>
                            <div className="col-6 col-md-6">
                                {bdata && <p className="text-end">Date:- {formatDate(bdata.Date)}</p>}
                            </div>
                        </div>
                        <div className="row d-flex border-top">

                            {/* <hr></hr> */}
                            <h5 className="text-start mt-2">Party Details</h5>
                            {bdata && <h5 className="m-0 text-start">{bdata.partyname}</h5>}
                            <div className="col-6 col-md-2 mt-2 mb-2 ">
                                <p className="m-0 text-start">Party person</p>
                                <p className="m-0 text-start">Address</p>
                                <p className="m-0 text-start">GST No</p>
                                <p className="m-0 text-start">Phone No</p>
                            </div>
                            <div className="col-6 col-md-8 mt-2 mb-2">
                                {bdata && <p className="m-0 text-start">: {bdata.personname}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.address}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.gst}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.phoneno}</p>}
                            </div>
                            {/* <hr></hr> */}
                        </div>
                        <div className="row border-top">
                            <div className="col-6 col-md-3 mt-3 ">
                                {bdata && <p className="text-start ">UID: {bdata.UID}</p>}
                                {bdata && <p className="text-start ">Design no: {bdata.DesignNo}</p>}
                            </div>
                            <div className="col-6 col-md-3 mt-3">
                                {bdata && <p className="text-start ">Warp count: {bdata.WarpCount}</p>}
                                {bdata && <p className="text-start ">Weft count: {bdata.WeftCount}</p>}
                            </div>
                            <div className="col-6 col-md-3 mt-3">
                                {bdata && <p className="text-start ">Reed: {bdata.Reed}</p>}
                                {bdata && <p className="text-start ">Pick: {bdata.Pick}</p>}
                            </div>
                            <div className="col-6 col-md-3 mt-3">
                                {bdata && <p className="text-start ">Sizing Name: {bdata.SizingName}</p>}
                                {bdata && <p className="text-start ">Sizing Meter: {bdata.SizingMtr}</p>}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <h5>Total weft count in this beam and repeat pattern</h5>
                            <div className="col-6 col-md-3">
                                {bdata && <p className="text-start m-0">Count 1: <span className="fw-bold pattern">{bdata.Count1}</span></p>}
                                {bdata && <p className="text-start m-0">Count 2: <span className="fw-bold pattern">{bdata.Count2}</span></p>}
                                {bdata && <p className="text-start m-0">Count 3: <span className="fw-bold pattern">{bdata.Count3}</span></p>}
                                {bdata && <p className="text-start m-0">Count 4: <span className="fw-bold pattern">{bdata.Count4}</span></p>}
                                {bdata && <p className="text-start m-0">Count 5: <span className="fw-bold pattern">{bdata.Count5}</span></p>}
                            </div>
                            <div className="col-6 col-md-3">
                                {bdata && <p className="text-start m-0">Pattern 1: <span className="fw-bold pattern">{bdata.Countwt1}</span>  </p>}
                                {bdata && <p className="text-start m-0">Pattern 2: <span className="fw-bold pattern">{bdata.Countwt2}</span>  </p>}
                                {bdata && <p className="text-start m-0">Pattern 3: <span className="fw-bold pattern">{bdata.Countwt3}</span>  </p>}
                                {bdata && <p className="text-start m-0">Pattern 4: <span className="fw-bold pattern">{bdata.Countwt4}</span>  </p>}
                                {bdata && <p className="text-start m-0">Pattern 5: <span className="fw-bold pattern">{bdata.Countwt5}</span>  </p>}
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-md-8  ">
                                <h5 className="text-start">Statements</h5>
                            </div>
                            <div className="col-12 col-md-4 ">
                                <p className="mobilefor">For</p>

                                {bdata && <p className="m-0 companymobilelast">{bdata.companyname}</p>}
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default BeamInwardPrint;





