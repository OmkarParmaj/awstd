import react from 'react';


import { Navigate, Link, useParams } from 'react-router-dom'
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { FcManager } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import { successalert, erroralert } from '../Alert'

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

import { inputdateformat } from 'reactjs-dateformat';







const EmployeeAdvance = ({ isLoggedIn, setIsLoggedIn }) => {

    const [employeedetails, setEmployeedetails] = useState([]);
    const [advanceamount, setAdvanceamount] = useState("");
    const [receivedamount, setReceivedamount] = useState("");
    const [employeesrno, setEmployeesrno] = useState("");
    const [advancedetails, setAdvancedetails] = useState([]);

    const [loading, setLoading] = useState(false)

    const [advancedate, setAdvancedate] = useState("");
    const [receiveddate, setReceiveddate] = useState("");
    const [totaladvancetaken, setTotaladvancetaken] = useState(0);
    const [totaladvancereceived, setTotaladvancereceived] = useState(0);
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");













    const { id } = useParams();



    useEffect(() => {
        axios.get(`http://localhost:5000/totaladvancetaken/${id}`, { withCredentials: true })
            .then(res => {
                setTotaladvancetaken(res.data[0].totaladvance)
                setTotaladvancereceived(res.data[0].receivedadvance);
            })
            .catch(err => {
                //console.log(err)

            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/getemployeedetails/${id}`, { withCredentials: true })
            .then(res => {
                //console.log(res.data);
                setEmployeedetails(res.data[0])
                setEmployeesrno(res.data[0].srno);

            })
            .catch(err => {
                //console.log(err);
            })
    }, [id])



    const fetchdata = () => {
        setLoading(true)
        axios.get(`http://localhost:5000/advancereport/data?id=${id}&startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data);
                setAdvancedetails(res.data);
                setLoading(false)

            })
            .catch(err => {
                //console.log(err)
            })
    }

    // useEffect(() => {

    // }, [advancedetails, id])


    const handlesubmit1 = (e) => {
        e.preventDefault();

        const values = {
            advancedate: advancedate,
            esrno: employeesrno,
            adamount: advanceamount

        }

        axios.post('http://localhost:5000/giveadvance', values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "advance given") {
                    // toast.success("Advance given", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Advance given");
                }

            })
            .catch(err => {
                //console.log(err);
            })
    }


    const handlesubmit2 = (e) => {
        e.preventDefault();

        const values = {
            receivedate: receiveddate,
            esrno: employeesrno,
            reamount: receivedamount

        }

        axios.post('http://localhost:5000/receivedamount', values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "amount received") {
                    // toast.success("Amount received", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Amount received")
                }

            })
            .catch(err => {
                //console.log(err);
            })

    }



    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/employeeadvancedelete/${id}`, { withCredentials: true })
            .then(res => {

                if (res.data.message === "deleted") {
                    // toast.success("Entry deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    successalert("Entry deleted")
                }

            })
            .catch(err => {
                //console.log(err);

            })
    }



    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }




    return (
        <>
            <div className='container-fluid'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone  sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone addemployeemain border border-1' style={{ minHeight: "1500px" }}>

                        <ToastContainer></ToastContainer>
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

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Setting</li>
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
                                                <h4 className="text-start ms-4 mt-2">EMPLOYEE ADVANCE</h4>
                                            </div>
                                            <div className="col-md-6">



                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='row m-3'>
                            <div className='col-12 col-md-3 '>
                                <div className="card dashboarduppercard shadow mt-4 pt-4">
                                    <div className="title  d-flex justify-content-end">

                                        <div className='col-8 '>
                                            <p className="title-text  ">
                                                Total Advance taken
                                            </p>
                                        </div>
                                        <div className='col-4 '>
                                            <p className="percent  ">

                                            </p>
                                        </div>



                                    </div>

                                    <div className="data text-center">


                                        <p className="text-center" >
                                            <span style={{ fontSize: "18px" }}>Rs.</span> {totaladvancetaken} <span className="t1 text-center"></span>
                                        </p>










                                        <div className="range">
                                            <div className="fill">
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className='col-12 col-md-3  '>
                                <div className="card dashboarduppercard shadow mt-4 pt-4">
                                    <div className="title  d-flex justify-content-end">

                                        <div className='col-8 '>
                                            <p className="title-text  ">
                                                Total advance received
                                            </p>
                                        </div>
                                        <div className='col-4 '>
                                            <p className="percent  ">

                                            </p>
                                        </div>



                                    </div>

                                    <div className="data text-center">


                                        <p className="text-center" >
                                            <span className='' style={{ fontSize: "18px" }}>Rs.</span>  {totaladvancereceived} <span className="t1 text-center"></span>
                                        </p>










                                        <div className="range">
                                            <div className="fill">
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='col-12 col-md-3  '>
                                <div className="card dashboarduppercard shadow mt-4 pt-4">
                                    <div className="title  d-flex justify-content-end">

                                        <div className='col-8 '>
                                            <p className="title-text  ">
                                                Closing Balance
                                            </p>
                                        </div>
                                        <div className='col-4 '>
                                            <p className="percent  ">

                                            </p>
                                        </div>



                                    </div>

                                    <div className="data text-center">


                                        <p className="text-center" >
                                            <span className='' style={{ fontSize: "18px" }}>Rs.</span>  {totaladvancetaken - totaladvancereceived} <span className="t1 text-center"></span>
                                        </p>










                                        <div className="range">
                                            <div className="fill">
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





                                        <div className="row  ">
                                            <h4>Employee details</h4>
                                            <div className='col-12 col-md-2   mt-4'>

                                                <p className="">Employee Name: </p>

                                                <p className="">Employee designation: </p>
                                                <p className="">Employee function: </p>
                                                <p className="">Employee address: </p>
                                                <p className="">Employee joining date: </p>


                                            </div>
                                            <div className='col-12 col-md-3   mt-4'>

                                                <p className="">{employeedetails.ename}</p>

                                                <p className=""> {employeedetails.designation}</p>
                                                <p className="">{employeedetails.efunction}</p>
                                                <p className=""> {employeedetails.address}</p>
                                                <p className="">{inputdateformat(employeedetails.date)}</p>


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



                                        <form onSubmit={handlesubmit1}>
                                            <div className="col-12 col-md-3  rounded-14 m-3">
                                                <h4 className='mt-3 text-center'>GIVE MONEY</h4>
                                                <label className="form-label mt-3">Date</label>
                                                <input className="form-control" type="date" onChange={e => setAdvancedate(e.target.value)}></input>

                                                <label className="form-label mt-3">ADVANCE AMOUNT</label>
                                                <input className="form-control" type="number" onChange={e => setAdvanceamount(e.target.value)}></input>
                                                <button className="btn btn-success mt-4 btn-sm float-end mb-3">GIVE</button>


                                            </div>
                                        </form>












                                    </div>


                                </div>

                            </div>




                        </div>



                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>



                                        <form onSubmit={handlesubmit2}>
                                            <div className="col-12 col-md-3  rounded-14 m-3">
                                                <h4 className='mt-3 text-center'>RECEIVE MONEY</h4>
                                                <label className='form-label mt-3'>Date</label>
                                                <input className="form-control" type="date" onChange={e => setReceiveddate(e.target.value)}></input>
                                                <label className='form-label mt-3'>RECEIVE AMOUNT</label>
                                                <input className="form-control" type="number" onChange={e => setReceivedamount(e.target.value)}></input>
                                                <button className="btn btn-success mt-4 btn-sm float-end mb-3">RECEIVE</button>



                                            </div>
                                        </form>











                                    </div>


                                </div>

                            </div>




                        </div>



                        <div className='row '>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>



                                        <div className="row d-flex justify-content-end align-items-center scroll">
                                            <h3>Transactions</h3>
                                            <div className='row'>
                                                <div className='col-12 col-md-3'>
                                                    <label className='form-label float-start'>Start Date</label>
                                                    <input className='form-control' type='date' onChange={e => setStartdate(e.target.value)}></input>


                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label className='form-label float-start'>End Date</label>
                                                    <input className='form-control' type='date' onChange={e => setEnddate(e.target.value)}></input>



                                                </div>

                                                <div className='col-12 col-md-3'>
                                                    <button className='btn btn-primary btn-sm float-start' style={{ marginTop: "35px" }} onClick={() => fetchdata()}>SUBMIT</button>

                                                </div>


                                            </div>


                                            {
                                                loading ?
                                                    <div class="d-flex justify-content-center">
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table id="example" className='table table-hover text-center'>
                                                        <thead>
                                                            <tr>
                                                                <th>SR NO</th>
                                                                <th>DATE</th>
                                                                <th>ADVANCE AMOUNT</th>
                                                                <th>RECEIVED AMOUNT</th>
                                                                <th>DELETE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {advancedetails && advancedetails.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{inputdateformat(o.date)}</td>
                                                                    <td>{o.advanceamount}</td>
                                                                    <td>{o.receivedamount}</td>
                                                                    <td><button className="btn btn-danger btn-sm" onClick={() => handledelete(o.advancestno)}>DELETE</button></td>

                                                                </tr>
                                                            ))}
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






        </>
    );
}



export default EmployeeAdvance;