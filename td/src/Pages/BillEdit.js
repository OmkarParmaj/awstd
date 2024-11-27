
import React, { useEffect, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { inputdateformat } from 'reactjs-dateformat';
import { FiEdit } from "react-icons/fi";

import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";


import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import {successalert, erroralert} from '../Alert'

import '../Assets/packingslip.css';
import Header from "../sidebar/Header";


const BillEdit = ({ isLoggedIn, setIsLoggedIn }) => {


    const [rowNum, setRowNum] = useState(2);
    const [totalmtr, setTotalmtr] = useState(0);
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState("");
    const [billno, setBillno] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [partydata, setPartydata] = useState([]);
    const [totalquantity, setTotalquantity] = useState("");
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [date, setDate] = useState("");
    const [billdata, setBilldata] = useState([]);
    const [billtabledata, setBilltabledata] = useState([]);
    const [date1, setDate1] = useState("");
    const [billno1, setBillno1] = useState("");
    const [setno1, setSetno1] = useState([]);
    const [designno1, setDesignno1] = useState("");
    const [uid1, setUid1] = useState("");
    const [packslipno1, setPackslipno1] = useState("");
    const [tabledata, setTabledata] = useState([]);
    const [partynamedata, setPartynamedata] = useState("");
    const [newdate, setNewdate] = useState("");
    const [test, setTest] = useState("");
    const [bankselect, setBankselect] = useState("");
    const [banks, setBanks] = useState([])



    const [othergst, setOthergst] = useState(0);

    const { id } = useParams();

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSelectChange2 = (e) => {
        setBankselect(e.target.value);
    };

    useEffect(() => {
        calculateTotals();
    }, [tabledata]);

    function calculateTotals() {
        let totalMtr = 0;
        tabledata.forEach(row => {
            totalMtr += parseFloat(row.Amount) || 0;
        });
        setTotalmtr(totalMtr);

        let tquantity = 0;

        tabledata.forEach(ro => {
            tquantity += parseFloat(ro.Quantity) || 0;
        });

        setTotalquantity(tquantity);

        let cgst = 0;

        tabledata.forEach(roo => {
            cgst += parseFloat(roo.CGST) || 0;
        });
        setCgst(cgst);

        let sgst = 0;

        tabledata.forEach(roraw => {
            sgst += parseFloat(roraw.SGST) || 0;
        });
        setSgst(sgst);


        let othgs = 0;

        tabledata.forEach(row => {
            othgs += parseFloat(row.IGST) || 0;
        });

        setOthergst(othgs);


    }

    useEffect(() => {
        axios.get('http://localhost:5000/billingbankdetails', { withCredentials: true })
            .then(res => {
                const bank = res.data;
                setBanks(bank);
                // setBankselect(res.data[0].bankname)


            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/party', { withCredentials: true })
            .then(res => {
                setPartydata(res.data);
            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            });
    }, []);

    const addRow = () => {
        setRowNum(prevRowNum => prevRowNum + 1);
        const newRow = {

            Description: "",
            Quantity: "",
            Price: "",
            Totalprice: "",
            CGST: "",
            SGST: "",
            IGST: "",
            Amount: ""
        };
        setTabledata(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...tabledata];
        updatedRows.splice(index, 1);
        setTabledata(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...tabledata];
        updatedRows[index][name] = value;

        // Calculate Totalprice when Quantity or Price is changed
        if (name === 'Quantity' || name === 'Price' || name === 'CGST' || name === 'SGST' || name === 'IGST') {
            const quantity = parseFloat(updatedRows[index]['Quantity']) || 0;
            const price = parseFloat(updatedRows[index]['Price']) || 0;
            const cgst = parseFloat(updatedRows[index]['CGST']) || 0;
            const sgst = parseFloat(updatedRows[index]['SGST']) || 0;
            const IGST = parseFloat(updatedRows[index]['IGST']) || 0;

            updatedRows[index]['Totalprice'] = (quantity * price).toFixed(2); // Calculate total and round to 2 decimal places
            updatedRows[index]['Amount'] = ((quantity * price) + cgst + sgst + IGST).toFixed(2);
        }

        setTabledata(updatedRows);
    };


    // useEffect(() => {
    //     axios.get(`http://localhost:5000/billedit/${id}`, { withCredentials: true })
    //         .then(res => {
    //             console.log(res.data)
    //             setBilldata(res.data);
    //             // setBilltabledata(res.data[0]);
    //             const day = new Date(res.data[0].date).toISOString().slice(0, 10)
    //             // console.log(day)
    //             setDate1(day);
    //             setNewdate(day);

    //             const omkar = res.data[0].SetNo;
    //             setTest(omkar);

    //             const myone = res.data[0].SetNo;
    //             console.log(myone)

    //             setDesignno1(res.data[0].DesignNo);
    //             setPackslipno1(res.data[0].billpackingslipno);
    //             setBillno1(res.data[0].billNo);
    //             setPartynamedata(res.data[0].partyname);
    //             setUid1(res.data[0].UID);
    //             setSelectedOption(res.data[0].partyname)


    //             const bdata = JSON.parse(res.data[0].tableData);
    //             console.log(bdata);
    //             setTabledata(bdata);

    //         })
    //         .catch(err => {
    //             // console.log("err fetching data", err);
    //         });
    // }, [id]);


    useEffect(() => {
        axios.get(`http://localhost:5000/billedit/${id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setBilldata(res.data);
                // setBilltabledata(res.data[0]);
                // const day = new Date(res.data[0].date).toISOString().slice(0, 10)
                // console.log(day)
                // setDate1(day);
                // setNewdate(day);

                const omkar = res.data[0].SetNo;
                setTest(omkar);

                setSetno1(res.data[0].SetNo);

                const billdateindatabase = res.data[0].date;

                const inputdate = inputdateformat(billdateindatabase);

                setNewdate(inputdate);



                setDesignno1(res.data[0].DesignNo);
                setPackslipno1(res.data[0].billpackingslipno);
                setBillno1(res.data[0].billNo);
                setPartynamedata(res.data[0].partyname);
                setUid1(res.data[0].UID);
                setSelectedOption(res.data[0].partyname)
                setBankselect(res.data[0].bankname);


                const bdata = JSON.parse(res.data[0].tableData);
                console.log(bdata);
                setTabledata(bdata);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])








    const handleSubmit = (e) => {
        e.preventDefault();
        // const date = document.getElementById("datenumber").value;
        const billNo = document.getElementById("billNo").value;
        const setNo = document.getElementById("setNo").value;
        const designno = document.getElementById("designNo").value;
        const Uid = document.getElementById("uidnumber").value;
        const billpackingslipno = document.getElementById("billpackingslipno").value
        const payload = {
            newdate,
            billNo,
            setNo,
            designno,
            tabledata,
            Uid,
            selectedOption,
            totalmtr,
            totalquantity,
            billpackingslipno,
            cgst,
            sgst,
            othergst,
            bankselect
        };




        axios.put(`http://localhost:5000/billingedit/${id}`, payload, { withCredentials: true })
            .then(res => {
                // console.log("Data has been submitted successfully!");

                if (res.data.message === "bill updated") {
                    // toast.success("Bill updated succefully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Bill updated successfully!");
                    
                }
            })
            .catch(err => {
                // console.log("Error in inserting data:", err);
            });
    };



    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
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
                        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>
                                            <li className="breadcrumb-item"> <TbReportAnalytics className='me-2' />Reports</li>

                                            <li className="breadcrumb-item " ><Link to='/billingreport'><IoNewspaperOutline className='me-2' />Billing report</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><FiEdit className='me-2' />Bill edit</li>
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
                                                <h4 className="text-start ms-4 mt-2">BILL EDIT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to='/billingreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body '>
                                        <div className="row d-flex justify-content-center mt-4">
                                            <div className="col-12 col-md-11 bg-white ">
                                                <h1 className="mt-3 mb-3">BILLING </h1>
                                                {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                    <strong>Congractulation!</strong> {alert}
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                <div className="row mt-3 mb-3 d-flex justify-content-between ms-3 me-3">
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">Bill no</label>
                                                        <input id="billNo" className="form-control" type="number" value={billno1}  ></input>
                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">UID</label>
                                                        <input id="uidnumber" className="form-control" type="number" value={uid1} required ></input>
                                                    </div>
                                                    <div className="col-12 col-md-3">

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">Date</label>
                                                        <input id="datenumber" className="form-control" type="date" value={newdate} onChange={e => setNewdate(e.target.value)} required ></input>
                                                    </div>

                                                </div>
                                                <div className="row d-flex justify-content-start ms-3 mt-4 me-3">

                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">Design No</label>
                                                        <input id="designNo" className="form-control" value={designno1} type="number" ></input>


                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">Set No</label>
                                                        <input id="setNo" className="form-control" type="number" value={setno1} ></input>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label  float-start">Packing slip No</label>
                                                        <input id="billpackingslipno" className="form-control" value={packslipno1} type="number" required ></input>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start ">Comapany Name</label>
                                                        <select className="form-select" value={selectedOption} onChange={handleSelectChange} required>
                                                            <option >Please select party</option>
                                                            {partydata.map((option, index) => (
                                                                <option key={index} value={option.partyname}>{option.partyname}</option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="row ms-3 me-3 mt-3">
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start ">Bank name</label>
                                                        <select className="form-select" value={bankselect} onChange={handleSelectChange2} required>
                                                            <option >Please select bank</option>
                                                            {banks.map((option, index) => (
                                                                <option key={index} value={option.bankname}>{option.bankname}</option>
                                                            ))}
                                                        </select>

                                                    </div>


                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row  ms-2 mt-5 me-2 justify-content-end mb-4">
                                                        <div className="col-12 col-md-3 ">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary float-end"
                                                                onClick={addRow}
                                                            >
                                                                ADD ROW
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row ms-3 me-3 scroll">
                                                        <table className="table text-center table-bordered">
                                                            <thead>
                                                                <tr>

                                                                    {/* <th scope="col">UID</th> */}
                                                                    {/* <th scope="col">Design No</th> */}
                                                                    <th scope="col">Discription</th>
                                                                    <th scope="col">Quantity</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">Total Price</th>
                                                                    <th>CGST</th>
                                                                    <th>SGST</th>
                                                                    <th>IGST</th>
                                                                    <th>Amount</th>
                                                                    <th scope="col">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tabledata.map((row, index) => (
                                                                    <tr key={index}>






                                                                        <td>
                                                                            <input
                                                                                name="Description"
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.Description}
                                                                                onChange={e => handleInputChange(index, "Description", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="Quantity"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.Quantity}
                                                                                onChange={e => handleInputChange(index, "Quantity", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="Price"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.Price}
                                                                                onChange={e => handleInputChange(index, "Price", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="Totalprice"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.Totalprice}
                                                                                onChange={e => handleInputChange(index, "Totalprice", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="CGST"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.CGST}
                                                                                onChange={e => handleInputChange(index, "CGST", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="SGST"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.SGST}
                                                                                onChange={e => handleInputChange(index, "SGST", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="IGST"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.IGST}
                                                                                onChange={e => handleInputChange(index, "IGST", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                name="Amount"
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={row.Amount}
                                                                                onChange={e => handleInputChange(index, "Amount", e.target.value)}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-danger"
                                                                                onClick={() => deleteRow(index)}
                                                                            >
                                                                                DELETE
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td >Total</td>
                                                                    <td>{totalquantity}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td colSpan="1">{cgst}</td>
                                                                    <td>{sgst}</td>
                                                                    <td>{othergst}</td>
                                                                    <td>{totalmtr.toFixed(2)}</td>
                                                                    {/* <td>{totalwt.toFixed(2)}</td> */}
                                                                    <td></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                    <div className="row justify-content-end  mt-3 ms-2 me-2 mb-5">
                                                        <div className="col-3 float-end">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success float-end"
                                                            >
                                                                Submit
                                                            </button>
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
                </div>
            </div>





        </>
    );
}



export default BillEdit;