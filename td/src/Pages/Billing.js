import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import '../Assets/packingslip.css'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDashcube } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import Title from "./Title";

import { FaFileInvoiceDollar } from "react-icons/fa6";
import { successalert, erroralert } from '../Alert'




const Billing = ({ isLoggedIn, setIsLoggedIn }) => {

    const [billingvalue, setBillingvalue] = useState({
        billing: "BILLING",
        url: "/billingreport"
    })


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
    const [billdatadate, setBilldatadate] = useState("");
    // const [dno, setDno] = useState([]);
    // const [designNo, setDesignNo] = useState("");
    const [setNo, setSetNo] = useState("");
    const [designno, setDesignno] = useState("");

    const [othergst, setOthergst] = useState(0);

    const [bankselected, setBankselected] = useState('');
    const [banks, setBanks] = useState([]);

    const [prefix, setPrefix] = useState("")
    const [suffix, setSuffix] = useState("");
    const [cgstsgst, setCgstsgst] = useState(0);


    const [dalert, setDalert] = useState("");
    const [salert, setSalert] = useState("");



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

        if (setNo.length < 1) {
            setSalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber2/data?dn=${setNo}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);

                    if (res.data.length > 0) {
                        setSalert("");

                    }
                    else {
                        setSalert("set number not exit");
                    }


                })
                .catch(err => {
                    console.log(err);

                })

        }



    }, [setNo])

    const selectedoptionforgst = (e, index) => {
        const updatedRows = [...rows];
        updatedRows[index]['cgstsgstnumber'] = e.target.value;
        setRows(updatedRows);

        // Trigger a recalculation after updating the GST rate
        handleInputChange(index, 'cgstsgstnumber', e.target.value);
    };

    const selectedoptionforgst2 = (e, index) => {
        const updatedRows = [...rows];
        updatedRows[index]['igstnumber'] = e.target.value;
        setRows(updatedRows);

        // Trigger a recalculation after updating the GST rate
        handleInputChange(index, 'igstnumber', e.target.value);
    };




    useEffect(() => {
        axios.get('http://localhost:5000/billingprefixdata', { withCredentials: true })
            .then(res => {


                setPrefix(res.data[0].prefix)



                setSuffix(res.data[0].suffix);


            })
            .catch(err => {
                console.log(err);
            });
    }, []);



    const handlestatus = (e) => {
        const status = "Fabric dispatched"

        axios.put(`http://localhost:5000/dispatchedstatus?setnumber=${setNo}&designnumber=${designno}`, { status }, { withCredentials: true })
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }



    useEffect(() => {
        axios.get('http://localhost:5000/billingsettingget', { withCredentials: true })
            .then(res => {


            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSelectChange2 = (e) => {
        setBankselected(e.target.value);
    };

    useEffect(() => {
        calculateTotals();
    }, [rows]);

    function calculateTotals() {
        let totalMtr = 0;
        rows.forEach(row => {
            totalMtr += parseFloat(row.Amount) || 0;
        });
        setTotalmtr(totalMtr);

        let tquantity = 0;

        rows.forEach(ro => {
            tquantity += parseFloat(ro.Quantity) || 0;
        });

        setTotalquantity(tquantity);

        let cgst = 0;

        rows.forEach(roo => {
            cgst += parseFloat(roo.CGST) || 0;
        });
        setCgst(cgst);

        let sgst = 0;

        rows.forEach(roraw => {
            sgst += parseFloat(roraw.SGST) || 0;
        });
        setSgst(sgst);


        let othgs = 0;

        rows.forEach(row => {
            othgs += parseFloat(row.IGST) || 0;
        });

        setOthergst(othgs);


    }



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
            Designno: "",
            Description: "",
            Quantity: "",
            Price: "",
            Totalprice: "",
            CGST: "",
            SGST: "",
            IGST: "",
            Amount: ""
        };
        setRows(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        // Calculate Totalprice and taxes when relevant fields are changed
        if (['Quantity', 'Price', 'CGST', 'SGST', 'IGST', 'cgstsgstnumber', 'igstnumber'].includes(name)) {
            const quantity = parseFloat(updatedRows[index]['Quantity']) || 0;
            const price = parseFloat(updatedRows[index]['Price']) || 0;
            // const IGST = parseFloat(updatedRows[index]['IGST']) || 0;
            const gstRate = parseFloat(updatedRows[index]['cgstsgstnumber']) || 0;
            const igstRate = parseFloat(updatedRows[index]['igstnumber']) || 0;

            // Calculate CGST and SGST based on gstRate
            const CGST = ((quantity * price) / 100) * gstRate;
            const SGST = ((quantity * price) / 100) * gstRate;
            const IGST = ((quantity * price) / 100) * igstRate;


            updatedRows[index]['CGST'] = CGST.toFixed(2);
            updatedRows[index]['SGST'] = SGST.toFixed(2);
            updatedRows[index]['IGST'] = IGST.toFixed(2);

            // Calculate Totalprice and Amount
            const Totalprice = (quantity * price).toFixed(2);
            const Amount = (quantity * price + CGST + SGST + IGST).toFixed(2);

            updatedRows[index]['Totalprice'] = Totalprice;
            updatedRows[index]['Amount'] = Amount;
        }

        setRows(updatedRows);
    };



    useEffect(() => {
        axios.get('http://localhost:5000/billing', { withCredentials: true })
            .then(res => {

                setBilldata(res.data);

                const bidata = res.data
                const data = res.data;
                if (data.length > 0) {
                    const lastBill = data[data.length - 1].billNo;
                    setBillno(lastBill + 1);
                } else {
                    setBillno(billno + 1);
                }
            })
            .catch(err => {
                // console.log("err fetching data", err);
            });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:5000/billingbankdetails', { withCredentials: true })
            .then(res => {
                const bank = res.data;
                setBanks(bank);


            })
            .catch(err => {
                console.log(err);
            })
    }, [])




    const handleSubmit = (e) => {
        e.preventDefault();

        if (!date) {
            // toast.error("Please fill Date", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("Please fill date");
            return;
        }

        

        if (!designno) {
            // toast.error("Please fill set no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("please fill design no")

            return;
        }

        if (!setNo) {
            // toast.error("Please fill set no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("please fill set no")

            return;
        }

        if (!bankselected) {
            // toast.error("Please fill set no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("please select bank")

            return;
        }
        if (!selectedOption) {
            // toast.error("Please fill set no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            erroralert("please select party")

            return;
        }

        else {



            // const bilno = document.getElementById("bilno").value;
            const Uid = document.getElementById("Uid").value;
            const billpackingslipno = document.getElementById("billpackingslipno").value
            const payload = {
                date,
                billno,
                setNo,
                designno,

                rows,
                Uid,
                selectedOption,
                totalmtr,
                totalquantity,
                billpackingslipno,
                cgst,
                sgst,
                othergst,
                bankselected,
                prefix,

                suffix
            };

          if(salert === "set number not exit") {
            erroralert("set number is not exist")
          }
          else if(dalert === "Design number not exit") {
            erroralert("design number is not exist")
          }
          else {
            axios.post('http://localhost:5000/billingpost', payload, { withCredentials: true })
            .then(res => {
                // console.log("Data has been submitted successfully!");

                if (res.data.message === "Date cannot be earlier than or equal to existing record dates") {
                    // toast.success("Date can not be less than Today", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Date can not be less than today");
                }

                if (res.data.message === 'Data inserted successfully') {
                    // toast.success("Data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data submitted successfully!")

                    // Update packingslip table status to 'yes' for the provided billpackingslipno
                    axios.post('http://localhost:5000/updatePackingslipStatus', { billpackingslipno })
                        .then(response => {
                            // console.log("Packingslip status updated successfully!");
                        })
                        .catch(error => {
                            console.error("Error updating packingslip status:", error);
                        });
                }
            })
            .catch(err => {
                console.log("Error in inserting data:", err);
            });

          }

           

        }

    };


    if (isLoggedIn === false) {
        return <Navigate to='/login'></Navigate>
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
                        <Header setIsLoggedIn={setIsLoggedIn}></Header>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>

                                            <li className="breadcrumb-item active" aria-current="page"><FaFileInvoiceDollar className='me-2' />Billing</li>
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
                                                <h4 className="text-start ms-4 mt-2">BILLING</h4>
                                            </div>
                                            <div className="col-md-6">

                                                <Link to='/billingreport' className="packingslipbutton text-decoration-none float-end">
                                                    Report
                                                </Link >

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
                                                {/* <h1 className="mt-3 mb-3">BILLING </h1> */}
                                                {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                    <strong>Congractulation!</strong> {alert}
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                <div className="row mt-3 mb-3 d-flex justify-content-between ms-3 me-3">
                                                    <div className="col-12 col-md-4">
                                                        <div className="row">
                                                            <label className="form-label float-start">Bill no</label>


                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-2 m-0  d-flex align-items-center">
                                                                <span className="text-end">{prefix}</span>

                                                            </div>
                                                            <div className="col-md-4 m-0 ">
                                                                <input id="bilno" className="form-control" type="number" value={billno} onChange={e => setBillno(e.target.value)} ></input>

                                                            </div>
                                                            <div className="col-md-4 m-0  d-flex align-items-center">
                                                                {suffix}

                                                            </div>

                                                        </div>








                                                    </div>
                                                    <div className="col-12 col-md-2">
                                                        <label className="form-label float-start">Date</label>
                                                        <input className="form-control" type="date" onChange={e => setDate(e.target.value)} required ></input>
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-start ms-3 mt-4 me-3">

                                                    <div className="col-12 col-md-3">

                                                        <label className="form-label float-start">Design no</label>
                                                        <input id="designno" className="form-control" type="text" onChange={e => setDesignno(e.target.value)} required></input>
                                                        <p className="text-danger">{dalert}</p>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start">Set No</label>
                                                        <input id="setNo" className="form-control" type="number" required onChange={e => setSetNo(e.target.value)}></input>
                                                        <p className="text-danger">{salert}</p>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label  float-start">Packing slip No</label>
                                                        <input id="billpackingslipno" className="form-control" type="number" required ></input>

                                                    </div>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float-start ">Comapany Name</label>
                                                        <select className="form-select" value={selectedOption} onChange={handleSelectChange} required>
                                                            <option value="" required>--Please choose an option--</option>
                                                            {partydata.map((option, index) => (
                                                                <option key={index} value={option.partyname} required>{option.partyname}</option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="row mt-3 ms-3 me-3">
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-label float start">Bank Name <sup className="text-danger" style={{ fontSize: "20px", marginTop: "10px" }}>*</sup></label>
                                                        <select className="form-select" value={bankselected} onChange={handleSelectChange2} required>
                                                            <option value="">Please choose bank name</option>
                                                            {banks.map((o, index) => (
                                                                <option key={index} value={o.bankname}>{o.bankname}</option>
                                                            ))

                                                            }


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
                                                    <div className="row ms-1 me-1 scroll">
                                                        <table className="table text-center table-bordered">
                                                            <thead>
                                                                <tr>

                                                                    <th scope="col">UID</th>

                                                                    <th scope="col">Discription</th>
                                                                    <th scope="col">Quantity</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">Total Price</th>
                                                                    <th>CGST/SGST</th>
                                                                    <th>IGST</th>
                                                                    <th>CGST</th>
                                                                    <th>SGST</th>
                                                                    <th>IGST</th>
                                                                    <th>Amount</th>
                                                                    <th scope="col">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {rows.map((row, index) => (
                                                                    <tr key={index}>



                                                                        <td>
                                                                            <input
                                                                                name="Uid"
                                                                                type="number"
                                                                                className="form-control"
                                                                                id="Uid"
                                                                                required
                                                                            />
                                                                        </td>

                                                                        {/* <td>
                                                                            <input
                                                                                name="Designno"
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.Designno}
                                                                                onChange={e => handleInputChange(index, "Designno", e.target.value)}
                                                                                required
                                                                            />
                                                                        </td> */}

                                                                        <td>
                                                                            <input
                                                                                name="Description"
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.Description}
                                                                                onChange={e => handleInputChange(index, "Description", e.target.value)}
                                                                                required
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
                                                                            <select
                                                                                className="form-select form-select-sm"
                                                                                name="cgstsgstnumber"
                                                                                onChange={e => selectedoptionforgst(e, index)}
                                                                                aria-label="Small select example"
                                                                                value={row.cgstsgstnumber || ''}
                                                                            >
                                                                                <option value={0}>Select GST Rate</option>
                                                                                <option value={2.5}>2.5%</option>
                                                                                <option value={6}>6%</option>
                                                                                <option value={9}>9%</option>
                                                                                <option value={14}>14%</option>
                                                                            </select>


                                                                        </td>
                                                                        <td>
                                                                            <select
                                                                                className="form-select form-select-sm"
                                                                                name="igstnumber"
                                                                                onChange={e => selectedoptionforgst2(e, index)}
                                                                                aria-label="Small select example"
                                                                                value={row.igstnumber || ''}
                                                                            >
                                                                                <option value={0}>Select igst Rate</option>
                                                                                <option value={2.5}>2.5%</option>
                                                                                <option value={6}>6%</option>
                                                                                <option value={9}>9%</option>
                                                                                <option value={14}>14%</option>
                                                                            </select>


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
                                                                    <td colSpan="2">Total</td>
                                                                    <td>{totalquantity}</td>
                                                                    <td></td>
                                                                    <td></td>
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
                                                                onClick={e => handlestatus(e)}
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



export default Billing;