
import Computersidebar from '../sidebar/Computersidebar';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Header from '../sidebar/Header';

import '../Assets/companybedit.css';


import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { successalert, erroralert } from '../Alert'





const Companybedit = ({ isLoggedIn, setIsLoggedIn }) => {


    const [bankDetails, setBankDetails] = useState({
        bankname: "",
        accountno: "",
        branch: "",
        ifsccode: "",
        bankaddress: ""
    });

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            return;  // Early return if not logged in
        }
        fetchdata();
    }, [id, isLoggedIn]);  // Added isLoggedIn to dependency array

    const fetchdata = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/companybankedit/${id}`, { withCredentials: true });
            if (res.data.length > 0) {
                setBankDetails({
                    bankname: res.data[0].bankname,
                    accountno: res.data[0].accountno,
                    branch: res.data[0].branch,
                    ifsccode: res.data[0].ifsccode,
                    bankaddress: res.data[0].bankaddress

                });
                setLoading(false);

            } else {
                // toast.success("No bank details found.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("No bank details found")
            }
        } catch (err) {
            // console.error("Error fetching bank details:", err);
            // toast.success("Failed to fetch bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("Failed to fetch bank details")
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/companybanked/${id}`, bankDetails, { withCredentials: true })
            .then(res => {
                // toast.success("Bank details updated successfully.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Bank details updated successfully!");

            })
            .catch(err => {
                console.error("Error submitting bank details:", err);
                // toast.success("Error updating bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                erroralert("Error updating bank details")
            });
    };

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }




    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1 companybeditmobile'>
                        <Mobilesidebar></Mobilesidebar>

                        {/* header section strts here  */}
                        <Header setIsLoggedIn={setIsLoggedIn}></Header>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <h3 className=''>Comapany bank edit</h3><div classNamw="vl"></div><span className='ms-4 mt-1'></span>
                            </div>

                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12'>
                                <div className='card m-3 border border-0'>
                                    <div className='card-body'>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                {
                                                    loading ?
                                                        <div class="d-flex justify-content-center">
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                        <div className="col-12 col-md-6">

                                                            <div className="mb-3">
                                                                <label className="form-label float-start">Bank Name</label>
                                                                <input className="form-control" type="text" name="bankname" value={bankDetails.bankname} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label float-start">Account Number</label>
                                                                <input className="form-control" type="text" name="accountno" value={bankDetails.accountno} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label float-start">Branch Name</label>
                                                                <input className="form-control" type="text" name="branch" value={bankDetails.branch} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label float-start">Bank Address</label>
                                                                <input className="form-control" type="text" name="bankaddress" value={bankDetails.bankaddress} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label float-start">IFS Code</label>
                                                                <input className="form-control" type="text" name="ifsccode" value={bankDetails.ifsccode} onChange={handleInputChange} />
                                                            </div>



                                                        </div>

                                                }

                                            </div>
                                            <div className="row d-flex justify-content-around align-items-center">
                                                <div className='col-6'>
                                                    <button className="btn btn-primary">Update</button>
                                                </div>
                                                <div className='col-6 '>
                                                    <Link className="btn btn-success ms-4 mobilecompanydetails" to="/companybankdetails">Company Details</Link>
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


        </>
    );
}


export default Companybedit;





