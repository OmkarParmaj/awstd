
import React, { useEffect, useState } from "react";
// import { Navigate, json } from "react-router-dom";
import axios from "axios";

import '../Assets/packingslip.css';
import GlassContainer from './GlassContainer';
import { toast } from "react-toastify";
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import { Navigate } from "react-router-dom";

import { Link } from 'react-router-dom'

import { FaDashcube } from "react-icons/fa6";
import {successalert, erroralert} from '../Alert'
import { IoNewspaperOutline } from "react-icons/io5";   












const PackingSlip = ({ isLoggedIn, setIsLoggedIn }) => {
    const [rowNum, setRowNum] = useState(2);
    const [totalmtr, setTotalmtr] = useState(0);
    const [totalwt, setTotalwt] = useState(0);
    const [rows, setRows] = useState([]);
    // const [alert, setAlert] = useState("");
    // const [packingslipno, setPackingslipno] = useState("");
    const [uid, setUid] = useState("");
    const [date, setDate] = useState("");
    const [setno, setSetno] = useState("");
    const [designno, setDesignno] = useState("");
    const [totalrolls, setTotalrolls] = useState("");
    const [packno, setPackno] = useState("");
    const [dno, setDno] = useState([]);
    const [salert, setSalert] = useState("");
    const [designnumberalert, setDesignnumberalert] = useState("")
    const [loading, setLoading] = useState(false);



    // const [beamdesignno, setBeamdesignno] = useState([]);
    // const [url, setUrl] = useState("");


    // useEffect(() => {
    //     // setUrl(`http:www.textilediwanji.com/packprint/${packno}/${uid}`);
    // }, [packno, uid]);


    const handlestatus = (e) => {
        const status = "Ready to dispatch"
        axios.put(`http://localhost:5000/packslipstatus?setnumber=${setno}&designnumber=${designno}`, {status}, {withCredentials:true})
        .then(res => {

        })
        .catch(err =>{
            console.log(err)
        })
    } 


   






    useEffect(() => {
        axios.get('http://localhost:5000/packslipnofetch', { withCredentials: true })
            .then(res => {
                const data = res.data;
                if (data.length > 0) {
                    const lastpackslipno = data[data.length - 1].Packingslipno;
                    setPackno(lastpackslipno + 1);
                } else {
                    setPackno(packno + 1);
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    useEffect(() => {
        if(designno === "") {
            setDesignnumberalert("")

            
        }

        else {
            axios.post('http://localhost:5000/packislipbeam', { designno }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if(res.data[0].yes === 0) {
                    setDesignnumberalert("design number is not present")

                }

                else {
                    setDno(res.data[0].yes);
                    setDesignnumberalert("")

                }

                
               
            })
            .catch(err => {
               
            })

        }
       
    }, [designno])


    useEffect(() => {

        if (setno.length < 1) {
            setSalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber2/data?dn=${setno}`, { withCredentials: true })
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



    }, [setno])



    useEffect(() => {
        calculateTotals();
        setTotalrolls(rows.length);
    }, [rows]);

    function calculateTotals() {
        let totalMtr = 0;
        let totalWeight = 0;

        rows.forEach(row => {
            totalMtr += parseFloat(row.mtr) || 0;
            totalWeight += parseFloat(row.weight) || 0;
        });

        setTotalmtr(totalMtr);
        setTotalwt(totalWeight);

    }

    const addRow = () => {
        setRowNum(rowNum + 1);
        const newRow = {
            rollNo: "",
            mtr: "",
            weight: ""
        };
        setRows([...rows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    // const handleSubmit = async () => {
    //   try {
    //     await axios.post("http://localhost:5000/packslip", rows);
    //     alert("Data submitted successfully!");
    //   } catch (error) {
    //     console.error("Error submitting data:", error);
    //     alert("An error occurred while submitting data.");
    //   }
    // };



    const handleSubmit = (e) => {
        setLoading(true)

        e.preventDefault();

        const payload = {
            date,
            packno,
            setno,
            designno,
            uid,
            rows,
            totalmtr,
            totalwt,
            totalrolls
        }
        if(salert === "set number not exit") {
            setLoading(false);
            erroralert("set number is not exist")
        }

        else if (dno) {
            axios.post('http://localhost:5000/packslip', payload, { withCredentials: true })
                .then(res => {
                    //  alert("Data has submitted");
                    // console.log("data has submiited");
                    if (res.data.message === "Data inserted successfully") {
                        setLoading(false);
                        // toast.success("Data has been subimmited successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                        successalert("Data has been submitted successfully")
                    }

                })
                .catch(err => {
                    // console.log("err in the inserting data", err);
                })
        }
        else {
            // toast.error("Design no is not present", { position: "top-center", autoClose: 2000, closeOnClick: true });
            setLoading(false);
            erroralert("Design number is not present")
        }



    }


    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
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

                                            <li className="breadcrumb-item active" aria-current="page"><IoNewspaperOutline className='me-2' />Packingslip</li>
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
                                                <h4 className="text-start ms-4 mt-2">PACKING SLIP</h4>
                                            </div>
                                            <div className="col-md-6">
                                                
                                                <Link to='/packingslipreport' className="packingslipbutton text-decoration-none float-end">
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
                                    <div className='card-body'>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row d-flex justify-content-end me-2">
                                                <div className="col-12 col-md-2">
                                                    <label className="form-label float-start">Date <sup className="text-danger">*</sup></label>
                                                    <input type="date" className="form-control" onChange={e => setDate(e.target.value)} required></input>
                                                </div>
                                            </div>
                                            <div className="row ms-3 me-3">
                                                <div className="col-12 col-md-2">
                                                    <label className=" float-start form-label mobilepackingslipno">Packing slip no</label>
                                                    <input className="form-control" value={packno} type="number" required onChange={e => setPackno(e.target.value)}></input>
                                                </div>


                                            </div>

                                            <div className="row mt-3 ms-3 me-3" >
                                                <div className="col-12 col-md-2">
                                                    <label className="form-label float-start">UID</label>
                                                    <input className="form-control" type="number" required onChange={e => setUid(e.target.value)}></input>
                                                </div>
                                                <div className="col-12 col-md-2">
                                                    <label className="form-label float-start mobilesetno">Set No</label>
                                                    <input className="form-control" type="number" required onChange={e => setSetno(e.target.value)}></input>
                                                    <p className="text-danger">{salert}</p>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label float-start moniledesignno">Design No</label>
                                                    <input className="form-control" type="text" required onChange={e => setDesignno(e.target.value)}></input>
                                                    <p className="text-danger">{designnumberalert}</p>
                                                </div>
                                            </div>

                                            <div className="row pt-3 justify-content-end mb-4">
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
                                            <p className="text-start">Note:- <span className="text-danger">You can add development fabric sample''s meter to packing slip at last row</span></p>
                                            <div className="row ms-2 me-2 scroll">
                                                <table className="table text-center table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">SR NO</th>

                                                            <th scope="col">ROLL NO</th>
                                                            <th scope="col">MTR</th>
                                                            <th scope="col">WEIGHT</th>
                                                            <th scope="col">DELETE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>

                                                                <td>
                                                                    <input
                                                                        name="rollNo"
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={row.rollNo}
                                                                        onChange={e => handleInputChange(index, "rollNo", e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        name="mtr"
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={row.mtr}
                                                                        onChange={e => handleInputChange(index, "mtr", e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        name="weight"
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={row.weight}
                                                                        onChange={e => handleInputChange(index, "weight", e.target.value)}
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
                                                            <td>{totalmtr.toFixed(2)}</td>
                                                            <td>{totalwt.toFixed(2)}</td>
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="row justify-content-end mb-4">
                                                <div className="col-3 ">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success float-end"
                                                    onClick={e => handlestatus(e)}
                                                    >
                                                        SUBMIT
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


            <div>
                {
                    loading === true ?
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



export default PackingSlip;