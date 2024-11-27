import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";



const Beaminwardprintsample = () => {
    const { id1, id2 } = useParams();

    const [bdata, setBdata] = useState();




    useEffect(() => {
        fetchdata();
    }, [id1, id2])


    const fetchdata = async () => {

        try {
            const res = await axios.get(`http://localhost:5000/beaminwardprintnew/${id1}/${id2}`, {withCredentials: true})
            // console.log(res.data)
            setBdata(res.data[0]);
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
                    <div className="container border border-1 ">

                        <div className="row">
                            <div className="col-2 col-md-2 border border-1 d-flex justify-content-center align-items-center ">

                                {bdata && <img src={`http://localhost:5000/companyimage/${bdata.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${bdata.filenameas}`} ></img>}
                            </div>
                            <div className="col-10 col-md-10 border border-1">
                                <h5 className="m-0 text-center" style={{}}>SOURABH TEXTILE</h5>{bdata && <h3 className="m-0">{bdata.companyname}</h3>}
                                <p className="m-0 text-center" style={{fontSize: "11px"}}>8/251/1, Vikram nagar near Bishops school, Ichalkaranji</p>{bdata && <p className="m-0">Address: {bdata.companyaddress}</p>}
                                <p className="m-0 text-center" style={{fontSize: "11px"}}>sourabhtextile1@gmail.com Phone no. + 91-8624934453</p>{bdata && <p className="m-0">Email: {bdata.emailid} phone:+91-{bdata.phoneno}</p>}
                                <p className="m-0 text-center" style={{fontSize: "10px"}}>GST No: 27CGVPP7811D1ZY</p>{bdata && <p className="m-0">GST no: {bdata.gst}</p>}
                            </div>
                        </div>
                        <div className="row mt-3 ">
                            <div className="col-6 col-md-6  d-flex justify-content-start align-items-center">
                               <p>Set no: 3421</p> {bdata && <p className="text-start ">Set no:- {bdata.SetNo}</p>}
                            </div>
                            <div className="col-6 col-md-6  d-flex justify-content-end  align-items-center">
                                <p>Date: 2/3/2024</p>{bdata && <p className="text-end">Date:- {formatDate(bdata.Date)}</p>}
                            </div>
                        </div>
                        <div className="row d-flex">

                            <hr></hr>
                            <h5 className="text-start">Party Details</h5>
                            <h4>Sawant Textile</h4>{bdata && <h4 className="m-0 text-start">{bdata.partyname}</h4>}
                            <div className="col-4 col-md-2 ">
                                <p className="m-0 text-start">Party person</p>
                                <p className="m-0 text-start">Address</p>
                                <p className="m-0 text-start">GST No</p>
                                <p className="m-0 text-start">Phone No</p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="m-0">Sawant Textile</p> {bdata && <p className="m-0 text-start">: {bdata.personname}</p>}
                                <p className="m-0">Layakar Theater, Ichalkaranji</p> {bdata && <p className="m-0 text-start">: {bdata.address}</p>}
                               <p className="m-0">27CGVPP3254E3SU</p> {bdata && <p className="m-0 text-start">: {bdata.gst}</p>}
                                <p className="m-0">7654346786</p> {bdata && <p className="m-0 text-start">: {bdata.phoneno}</p>}
                            </div>
                            <hr></hr>
                        </div>
                        <div className="row">
                            <div className="col-6 col-md-3">
                               <p>UID: 34</p> {bdata && <p className="text-start ">UID: {bdata.UID}</p>}
                                <p>Design no: 6542</p>{bdata && <p className="text-start ">Design no: {bdata.DesignNo}</p>}
                            </div>
                            <div className="col-6 col-md-3">
                               <p>Warp count: 60</p> {bdata && <p className="text-start ">Warp count: {bdata.WarpCount}</p>}
                               <p>weft count: 60</p> {bdata && <p className="text-start ">Weft count: {bdata.WeftCount}</p>}
                            </div>
                            <div className="col-6 col-md-3">
                               <p>Reed: 108</p> {bdata && <p className="text-start ">Reed: {bdata.Reed}</p>}
                              <p>Pick: 102</p>  {bdata && <p className="text-start ">Pick: {bdata.Pick}</p>}
                            </div>
                            <div className="col-6 col-md-3">
                              <p>Sizing Name: Mudgal Sizing</p>  {bdata && <p className="text-start ">Sizing Name: {bdata.SizingName}</p>}
                              <p>Sizing meter: 3432</p>  {bdata && <p className="text-start ">Sizing Meter: {bdata.SizingMtr}</p>}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 col-md-3">
                              <p>Count : 60</p>  {bdata && <p className="text-start m-0">Count 1: {bdata.Count1}</p>}
                              <p>Count : 60</p>  {bdata && <p className="text-start m-0">Count 1: {bdata.Count2}</p>}
                              <p>Count : 60</p>  {bdata && <p className="text-start m-0">Count 1: {bdata.Count3}</p>}
                              <p>Count : 60</p>  {bdata && <p className="text-start m-0">Count 1: {bdata.Count4}</p>}
                              <p>Count : 60</p>  {bdata && <p className="text-start m-0">Count 1: {bdata.Count5}</p>}
                            </div>
                            <div className="col-6 col-md-3">
                              <p>Count wt: 23</p>  {bdata && <p className="text-start m-0">CountWt 1: <span className="fw-bold">{bdata.Countwt1}</span>  Kg</p>}
                              <p>Count wt: 23</p>  {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt2}</span>  Kg</p>}
                              <p>Count wt: 23</p>  {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt3}</span>  Kg</p>}
                              <p>Count wt: 23</p>  {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt4}</span>  Kg</p>}
                              <p>Count wt: 23</p>  {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt5}</span>  Kg</p>}
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-md-8 ">
                                <h5 className="text-start">Statements</h5>
                            </div>
                            <div className="col-12 col-md-4">
                                <p className="texti-end">For</p>

                               <p className="texti-end">SOURABH TEXTILE</p> {bdata && <p className="m-0">{bdata.companyname}</p>}
                            </div>
                        </div>

                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Beaminwardprintsample;





