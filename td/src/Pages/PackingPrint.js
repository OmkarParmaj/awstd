import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {successalert, erroralert} from '../Alert'

// import '../Assets/packingslip.css';
import '../Assets/packprint.css';

const Packingprint = () => {
    const [packingslipData, setPackingslipData] = useState({});
    const [finaldata, setFinaldata] = useState([]);
    const [totalmtr, setTotalmtr] = useState(0);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const { id1, id2, id3, id4 } = useParams();

    useEffect(() => {
        // Get the URL parameters directly from the window location


        if (id1 && id2) {
            fetchdata(id1, id2);
        }
        setUrl(`https://www.textilediwanji.com/scanpackingslip/packingdata?packingslipno=${id1}&uidno=${id2}&serialno=${id3}&emailid=${id4}`)
    }, [id1, id2]);



    const fetchdata = async (id1, id2) => {
        try {
            const res = await axios.get(`http://localhost:5000/packingprint/${id1}/${id2}`, { withCredentials: true });
            setPackingslipData(res.data[0]);
            setTotalmtr(res.data[0].toalmtr);
            const safedata = JSON.parse(res.data[0].packingdata);
            setFinaldata(safedata);

        } catch (err) {
            // console.log(err);
            // Handle error
            // toast.error("Failed to fetch data", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("Failed to fetch data")
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sendPackslip = () => {
        setLoading(true);
        axios.post("http://localhost:5000/mailpackslip", { url }, { withCredentials: true })
            .then(() => {
                // toast.success("Packing slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Packing slip sent")
            })
            .catch(error => {
                // toast.error("Packing slip not sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Packing slip not sent")
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            <div className="container-fluid" >


                <div className="row mt-3">
                    <div className="col">
                        <div className="container-fluid border border-1" >
                            <div className="row">
                                <div className="col-4 col-md-2 border-bottom border-end d-flex justify-content-center align-items-center ">
                                    {<img className="logomobile" src={`http://localhost:5000/companyimage/${packingslipData.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${packingslipData.filenameas}`} ></img> || <Skeleton></Skeleton>}
                                </div>
                                <div className="col-8 col-md-10 border-bottom " >
                                    <h3 className="m-0 text-center companymobile">{packingslipData.company || <Skeleton />}</h3>
                                    <p className="m-0 text-center addressmobile">Address:- {packingslipData.companyaddress || <Skeleton />}</p>
                                    <p className="m-0 text-center mailmobile">Email Id:- {packingslipData.emailid} Phone No:- {packingslipData.phoneno || <Skeleton />}</p>
                                    <p className="m-0 text-center gstmobile">GST No:- {packingslipData.gst || <Skeleton />}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-3 text-start mt-3">
                                    {packingslipData && <h6>Packing slip No:- {packingslipData.Packingslipno}</h6>}
                                </div>
                            </div>
                            <div className="row m-1">
                                <div className="col-6 col-md-6">
                                    {packingslipData && <p className="text-start">Set no:- {packingslipData.SetNo}</p>}
                                </div>
                                <div className="col-6 col-md-6">
                                    {packingslipData && <p className="text-end">Date:- {formatDate(packingslipData.date)}</p>}
                                </div>
                            </div>
                         
                            <div className="row m-0 border-top">
                                <div className="col-4 col-md-2  mt-2">
                                    {/* <p className="m-0 text-start">Party Details</p> */}
                                     <p className="m-0 partydetailsmobile text-start  ">Party Name:- </p>
                                     <p className="m-0 partydetailsmobile text-start">Person Name:-</p>
                                     <p className="m-0 partydetailsmobile text-start">Address:- </p>
                                     <p className="m-0 partydetailsmobile text-start">GST No:- </p>
                                     <p className="m-0 partydetailsmobile text-start">Phone No:- </p>
                                </div>
                                <div className="col-4 col-md-4  mt-2">
                                {packingslipData && <p className="m-0 partydetailsmobile text-start fw-bold">{packingslipData.partyname}</p>}
                                    {packingslipData && <p className="m-0 partydetailsmobile text-start"> {packingslipData.personname}</p>}
                                    {packingslipData && <p className="m-0 partydetailsmobile text-start">{packingslipData.address}</p>}
                                    {packingslipData && <p className="m-0 partydetailsmobile text-start">{packingslipData.gst}</p>}
                                    {packingslipData && <p className="m-0 partydetailsmobile text-start"> {packingslipData.phoneno}</p>}
                                </div>
                                <div className="col-4 col-md-6 mobileqrcode computerqrcode">
                                    <QRCode className="me-5 text-end " style={{ height: "90px", width: "90px" }} value={url} />
                                </div>
                            </div>
                           
                            <div className="row mt-2 border-top ">
                                <div className="col-6 col-md-3 mt-3">
                                    {packingslipData && <p className="text-start m-0">UID: {packingslipData.UID}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Design no: {packingslipData.DesignNo}</p>}
                                </div>
                                <div className="col-6 col-md-3 mt-3">
                                    {packingslipData && <p className="text-start m-0 ">Warp count: {packingslipData.WarpCount}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Weft count: {packingslipData.WeftCount}</p>}
                                </div>
                                <div className="col-6 col-md-3 mt-3">
                                    {packingslipData && <p className="text-start m-0 ">Reed: {packingslipData.Reed}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Pick: {packingslipData.Pick}</p>}
                                </div>
                                <div className="col-6 col-md-3 mt-3">
                                    {packingslipData && <p className="text-start m-0 ">Sizing Name: {packingslipData.SizingName}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Sizing Meter: {packingslipData.SizingMtr}</p>}
                                </div>
                            </div>
                            <div className="row mt-3 scroll computertablerow">
                                <table className="table table-bordered  table-responsive-sm text-center">
                                    <thead>
                                        <tr>
                                            <th>Sr no</th>
                                            <th>Roll no</th>
                                            <th>Meter</th>
                                            <th>Fabric weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {finaldata.map((o, index) => (
                                            <tr key={index} >
                                                <td style={{ fontSize: "14px" }} >{index + 1}</td>
                                                <td style={{ fontSize: "14px" }} >{o.rollNo}</td>
                                                <td style={{ fontSize: "14px" }} >{o.mtr}</td>
                                                <td style={{ fontSize: "14px" }} >{o.weight}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style={{ fontSize: "14px" }} colSpan={1}>Total</td>
                                            <td style={{ fontSize: "14px" }} >{packingslipData.totalrolls}</td>
                                            <td style={{ fontSize: "14px" }} >{totalmtr.toFixed(2)}</td>
                                            <td style={{ fontSize: "14px" }} >{packingslipData.totalwt}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row mt-5 lastmobile">
                                <div className="col-12 col-md-8  ">
                                    <h5 className="text-start">Statements</h5>
                                </div>
                                <div className="col-12 col-md-2 ">
                                </div>
                                <div className="col-12 col-md-2 ">
                                    <p className="packingfor">For</p>
                                    <p className="mt-5 packprintsourabh">{packingslipData && packingslipData.companyname}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Packingprint;
