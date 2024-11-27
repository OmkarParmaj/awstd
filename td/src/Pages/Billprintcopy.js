import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import '../Assets/packingslip.css';
import '../Assets/billprint.css';

import {successalert, erroralert} from '../Alert'

const Billprintcopy = () => {
    const [yesprint, setYesprint] = useState([]);
    const [bnprint, setBnprint] = useState({});
    const [hello, setHello] = useState([])
    const [companyprint, setCompanyprint] = useState({});
    const [firm, setFirm] = useState({});
    const [bankdetails, setBankdetails] = useState([]);
    const [bank, setBank] = useState([]);

    const location = useLocation();

    const query = new URLSearchParams(location.search);

    const srno = query.get('srno');
    

    // const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/billprint2/${srno}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setYesprint(res.data);
                setBnprint(res.data[0]);
                setHello(res.data[0]);
                const bbank = res.data[0].bankname
                setBank(bbank);
                console.log(res.data[0].bankname);
            })
            .catch(err => {
                // console.log("Error fetching data:", err);
            });
    }, [srno]);

    useEffect(() => {
        axios.get(`http://localhost:5000/companyregister/${srno}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                setFirm(res.data[0]);
            })
            .catch(err => {
                // console.log("Error fetching company data:", err);
            });
    }, [srno]);

    useEffect(() => {
        if (bnprint.partyname) {
            axios.get(`http://localhost:5000/billprint?partyname=${bnprint.partyname}`, { withCredentials: true })
                .then(res => {
                    // console.log(res.data);
                    setCompanyprint(res.data[0]);
                })
                .catch(err => {
                    // console.log("Error fetching company print data:", err);
                });
        }
    }, [bnprint.partyname]);

    useEffect(() => {
        if (bank) {
            axios.get(`http://localhost:5000/bankdetailsforbill?bankname=${bank}`, { withCredentials: true })
                .then(res => {
                    // console.log(res.data);
                    setBankdetails({
                        bankName: res.data[0].bankname,
                        accountNo: res.data[0].accountno,
                        branch:  res.data[0].branch,
                        ifsc: res.data[0].ifsccode
                    })

                })
                .catch(err => {
                    console.log(err);
                })
        }





    }, [bank])




    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">

                    <div className="col">
                        <div className="container-fluid border border-1">
                            <div className="row">
                                <div className="col-4 col-md-2 border-bottom border-end d-flex justify-content-center align-items-center">
                                    {<img src={`http://localhost:5000/companyimage/${firm.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${firm.filenameas}`} ></img> || <Skeleton></Skeleton>}
                                </div>
                                <div className="col-8 col-md-10  border-bottom">
                                    <h3 className="m-0 text-center">{firm.companyname}</h3>
                                    <p className="m-0 text-center">Address:{firm.companyaddress}</p>
                                    <p className="m-0 text-center">Email: {firm.emailid} phone: {firm.phoneno}</p>
                                    <p className="m-0 text-center">GST no: {firm.gst}</p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between  mt-3">
                                <div className="col-2 col-md-2">

                                    <h6>Bill No: {bnprint.prefix}{bnprint && bnprint.billNo}{bnprint.suffix}</h6>
                                </div>
                                <div className="col-4 col-md-4 ">

                                    <h6 className="text-end">Date: {formatDate(bnprint.date)}</h6>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6 col-md-6 border-top border-bottom">
                                    <p className="m-0 text-start" style={{ fontSize: "15px" }} >Consignee (Ship to)</p>
                                    <h4 className="m-0 text-start" style={{ fontSize: "20px" }} >{companyprint.partyname}</h4>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >Address: {companyprint.address}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >Phone no: {companyprint.phoneno}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >GSTIN/UIN : {companyprint.gst}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >State Name: Maharashtra, Code:27</p>
                                </div>
                                <div className="col-6 col-md-6 border-top border-bottom border-start">
                                    <p className="m-0 text-start" style={{ fontSize: "15px" }} >Buyer (Bill to)</p>
                                    <h4 className="m-0 text-start" style={{ fontSize: "20px" }} >{companyprint.partyname}</h4>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >Address: {companyprint.address}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >Phone no: {companyprint.phoneno}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >GSTIN/UIN : {companyprint.gst}</p>
                                    <p className="m-0 text-start mobilepartydetails computerpartydetails"  >State Name: Maharashtra, Code:27</p>
                                </div>
                            </div>

                            <div className="row mt-2 scroll computertable">
                                <table className="table table-bordered text-center">
                                    <thead>
                                        <tr>
                                            <th>Sr no</th>
                                            <th>Design No</th>
                                            <th>Description of goods/Services</th>
                                            <th>HSN/SAC code</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>CGST</th>
                                            <th>SGST</th>
                                            <th>IGST</th>

                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yesprint.map((item, index) => {
                                            const tableData = JSON.parse(item.tableData);
                                            return tableData.map((yess, idi) => (
                                                <tr key={idi}>
                                                    <td>{idi + 1}</td>
                                                    <td>{yess.Designno}</td>
                                                    <td>{yess.Description}</td>
                                                    <td>43432</td>
                                                    <td>{yess.Quantity}</td>
                                                    <td>{yess.Price}</td>
                                                    <td>{yess.CGST}</td>
                                                    <td>{yess.SGST}</td>
                                                    <td>{yess.IGST}</td>

                                                    <td>{yess.Totalprice}</td>
                                                </tr>
                                            ));
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4}>Total</td>
                                            <td>{bnprint.totalquantity}</td>
                                            <td></td>
                                            <td>{bnprint.Totalcgst}</td>
                                            <td>{bnprint.Totalsgst}</td>
                                            <td>{bnprint.Totaligst}</td>
                                            <td>{bnprint.totalmeters}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="row d-flex mb-0">
                                <h5 className="text-start">Bank details</h5>
                                <div className="col-6 col-md-2">
                                  
                                    <p className="m-0 text-start">Bank Name: </p>
                                    <p className="m-0 text-start">Account Number: </p>
                                    <p className="m-0 text-start">Branch & IFS Code:</p>
                                </div>
                                <div className="col-6 col-md-5">
                              
                                <p className="m-0 text-start">: {bankdetails.bankName}</p>
                                <p className="m-0 text-start">: {bankdetails.accountNo}</p>
                                <p className="m-0 text-start">: {bankdetails.branch}, {bankdetails.ifsc}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-8  ">
                                    <h6 className="text-start">Declaration</h6>
                                    <p className="text-start m-0 mobiledec">We declare that this invoice shows the actual</p>
                                    <p className="text-start m-0 mobiledec">price of the goods describe and that all </p>
                                    <p className="text-start m-0 mobiledec">particulars are true and correct.</p>
                                </div>
                                <div className="col-4  ">
                                    <p className="computerbillfor mobilebillfor">For</p>
                                    <p className="mt-5 computerbillcompanyname mobilebillcompanyname">{firm.companyname}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Billprintcopy;
