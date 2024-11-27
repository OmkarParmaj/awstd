import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Header from "../sidebar/Header";
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { successalert, erroralert } from '../Alert'

import { FaDashcube } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";

import '../Assets/packingslip.css';
import { ToastContainer, toast } from "react-toastify";


const PackingSlipEdit = ({ isLoggedIn, setIsLoggedIn }) => {


    const [month1, setMonth1] = useState("");

    const { id } = useParams(); // Extract packingslipno from URL
    const [rowNum, setRowNum] = useState(2);
    const [totalmtr, setTotalmtr] = useState(0);
    const [totalwt, setTotalwt] = useState(0);
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState("");
    const [uid, setUid] = useState("");
    const [date, setDate] = useState("");
    const [setno, setSetno] = useState("");
    const [designno, setDesignno] = useState("");
    const [totalrolls, setTotalrolls] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [packno, setPackno] = useState("");
    const [packdata, setPackdata] = useState({
        date: "",
        packingslipno: "",
        uid: "",
        SetNo: "",
        DesignNo: ""
    });

    const [packingrowdata, setPackingrowdata] = useState([]);

    const [loading, setLoading] = useState(false)

    // Function to calculate total meters and total weight
    const calculateTotals = () => {
        let totalMtr = 0;
        let totalWeight = 0;

        packingrowdata.forEach(row => {
            totalMtr += parseFloat(row.mtr) || 0;
            totalWeight += parseFloat(row.weight) || 0;
        });

        setTotalmtr(totalMtr);
        setTotalwt(totalWeight);
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    useEffect(() => {
        calculateTotals(); // Calculate totals when packing row data changes
        setTotalrolls(packingrowdata.length)
    }, [packingrowdata]);

    const fetchData = async () => {
        try {

            setLoading(true)
            const response = await axios.get(`http://localhost:5000/packingslipedit/${id}`, { withCredentials: true });

            // //console.log(response.data);
            setPackdata(response.data[0]);
            // setDate(response.data[0].date);
            setPackno(response.data[0].Packingslipno);
            setUid(response.data[0].uid);
            setSetno(response.data[0].SetNo);
            setDesignno(response.data[0].DesignNo);

            const innerdataarray = JSON.parse(response.data[0].packingdata);


            // const parsedate = new Date(response.data[0].date);
            // const newonedate = parsedate.toISOString().split('T')[0];



            const parsedate = new Date(response.data[0].date);
            parsedate.setDate(parsedate.getDate()); // Adding one day

            setLoading(false);




            const day1 = parsedate.getDate();
            const month3 = parsedate.getMonth() + 1;
            const year4 = parsedate.getFullYear();

            // //console.log(day1);
            // //console.log(month3);
            // //console.log(year4);









            // Format the date as 'YYYY-MM-DD'
            const year = parsedate.getFullYear();
            const month = ('0' + (parsedate.getMonth() + 1)).slice(-2); // Months are zero indexed
            const day = ('0' + parsedate.getDate()).slice(-2);

            const newonedate = `${year}-${month}-${day}`;

            if (month === "02") {

                setMonth1("February");



            }


            // //console.log(month1)
            // //console.log(parsedate)



            setDate(newonedate)




            setPackingrowdata(innerdataarray);

            // const sumMtr = innerdataarray.data.reduce((acc, packdata) => acc + packdata.toalmtr, 0);

            // setTotalmtr(sumMtr);


        } catch (error) {
            // //console.log(error);
        }
    };

    const addRow = () => {
        setRowNum(prevRowNum => prevRowNum + 1);
        const newRow = {
            rollNo: "",
            mtr: "",
            weight: ""
        };
        setPackingrowdata(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...packingrowdata];
        updatedRows.splice(index, 1);
        setPackingrowdata(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...packingrowdata];
        updatedRows[index][name] = value;
        setPackingrowdata(updatedRows);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            date,
            packingslipno: packno,
            SetNo: setno,
            DesignNo: designno,
            uid: uid,
            packingrowdata,
            totalmtr,
            totalwt,
            totalrolls
        };

        try {
            if (id) {
                const res = await axios.put(`http://localhost:5000/packingslipedit/${id}`, payload, { withCredentials: true });
                // //console.log(res.data);
                if (res.data.message === "data updated") {
                    // toast.success("Data has been Updated!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Data has been updated")
                }
            } else {
                const res = await axios.post("http://localhost:5000/packslip", payload, { withCredentials: true });
                // //console.log(res.data);
                // toast.success("Data submitted successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Data submitted successfully!")
            }
        } catch (err) {
            // //console.log(err);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
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
                        <ToastContainer />

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

                                            <li className="breadcrumb-item " ><Link to='/packingslipreport'><IoNewspaperOutline className='me-2' />Packing slip report</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><FiEdit className='me-2' />Packing slip edit</li>
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
                                                <h4 className="text-start ms-4 mt-2">PACKING SLIP EDIT</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to='/packingslipreport' className="packingslipbutton text-decoration-none float-end">
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
                                    <div className='card-body'>
                                        <div className="row">
                                            <h1>Packing slip </h1>
                                        </div>
                                        {alert && (
                                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                <strong>Congratulations!</strong> {alert}
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        )}
                                        <form onSubmit={handleSubmit}>
                                            <div className="row d-flex justify-content-end">
                                                <div className="col-12 col-md-2">
                                                    <label className="float-start">Date</label>
                                                    <input type="date" name="date" className="form-control" onChange={e => setDate(e.target.value)} value={date} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-md-2">
                                                    <label className="float-start">Packing slip no </label>
                                                    <input className="form-control" name="packingslipno" type="number" required onChange={e => setPackno(e.target.value)} value={packno} />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-12 col-md-2">
                                                    <label className="float-start">UID</label>
                                                    <input className="form-control" name="uid" type="number" required onChange={e => setUid(e.target.value)} value={uid} />
                                                </div>
                                                <div className="col-12 col-md-2">
                                                    <label className="float-start">Set No</label>
                                                    <input className="form-control" type="number" name="SetNo" required onChange={e => setSetno(e.target.value)} value={setno} />
                                                </div>
                                                <div className="col-12 col-md-2">
                                                    <label className="float-start">Design No</label>
                                                    <input className="form-control" type="text" name="DesignNo" required onChange={e => setDesignno(e.target.value)} value={designno} />
                                                </div>
                                            </div>
                                            <div className="row pt-3 justify-content-end mb-4">
                                                <div className="col-12 col-md-3 ">
                                                    <button type="button" className="btn btn-primary float-end" onClick={addRow}>ADD ROW</button>
                                                </div>
                                            </div>
                                            <div className="row scroll">
                                                {
                                                    loading ?
                                                        <div class="d-flex justify-content-center">
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                        <table className="table text-center table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Sr no</th>
                                                                    <th scope="col">Roll No</th>
                                                                    <th scope="col">Mtr</th>
                                                                    <th scope="col">Weight</th>
                                                                    <th scope="col">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {packingrowdata.map((row, index) => (
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
                                                                            <button type="button" className="btn btn-danger" onClick={() => deleteRow(index)}>DELETE</button>
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

                                                }

                                            </div>
                                            <div className="row justify-content-end mb-4">
                                                <div className="col-3">
                                                    <button type="submit" className="btn btn-success float-end">Submit</button>
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


export default PackingSlipEdit;