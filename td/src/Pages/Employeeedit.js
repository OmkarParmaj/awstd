
import { Navigate, useParams } from 'react-router-dom';


import { Link } from 'react-router-dom'
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { FcManager } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import {successalert, erroralert} from '../Alert'

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

import { inputdateformat } from 'reactjs-dateformat';





const Employeeedit = ({ isLoggedIn, setIsLoggedIn }) => {
    const [date, setDate] = useState("")
    const [employeename, setEmployeename] = useState("")
    const [employeenumber, setEmployeenumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [employeefunction, setEmployeefunction] = useState("")
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [salaryday, setSalaryday] = useState("")
    const [salaryhour, setSalaryhour] = useState("")
    const [monthsalaryfix, setMonthsalaryfix] = useState("");
   


    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/employeeedit/${id}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                const mydate = inputdateformat(res.data[0].date);
              setDate(mydate)
              setEmployeename(res.data[0].ename)
              setEmployeenumber(res.data[0].enumber);
              setDesignation(res.data[0].designation)
              setEmployeefunction(res.data[0].efunction)
              setLocation(res.data[0].location)
              setGender(res.data[0].gender)
              setAddress(res.data[0].address)
              setPhoneno(res.data[0].phoneno)
              setSalaryday(res.data[0].salaryday)
              setSalaryhour(res.data[0].salaryhour)
              setMonthsalaryfix(res.data[0].monthsalaryfix)
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    const handlesubmit = (e) => {
        e.preventDefault();

        const values = {
            date: date,
            employeename: employeename,
            employeenumber:employeenumber,
            designation: designation,
            efunction: employeefunction,
            location: location,
            gender: gender,
            address: address,
            phoneno: phoneno,
            salaryday: salaryday,
            salaryhour: salaryhour,
            monthsalaryfix: monthsalaryfix
        }

        axios.put(`http://localhost:5000/employeeeditput/${id}`, values, {withCredentials:true} )
        .then(res => {

            if(res.data.message === "Employee data updated") {
                // toast.success("Employee data updated", { position: "top-center", autoClose: 2000, closeOnClick: true });
                successalert("Employee data updated");
            }

        })
        .catch(err => {
            console.log(err);
        })

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
                    <div className='col-12 col-sm-10 rightone addemployeemain border border-1'>
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
                                                <h4 className="text-start ms-4 mt-2">EMPLOYEE</h4>
                                            </div>
                                            <div className="col-md-6">

                                                {/* <Link to='/setting' className="packingslipbutton text-decoration-none float-end">
                    Report
                </Link > */}

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

                                        <form onSubmit={handlesubmit}>

                                            <div className="row d-flex justify-content-end align-items-center">
                                                <div className="col-12 col-md-3">
                                                    <label className="form-label">Employee Joining Date</label>
                                                    <input className="form-control" type='date' value={date}  onChange={e => setDate(e.target.value)}></input>

                                                </div>



                                            </div>

                                            <div className='row'>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Employee Name</label>
                                                    <input className="form-control" type='text' value={employeename} onChange={e => setEmployeename(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Employee number</label>
                                                    <input className="form-control" type='number' value={employeenumber} onChange={e => setEmployeenumber(e.target.value)}></input>



                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Designation</label>
                                                    <input className="form-control" type='text' value={designation} onChange={e => setDesignation(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Function</label>
                                                    <input className="form-control" type='text' value={employeefunction} onChange={e => setEmployeefunction(e.target.value)}></input>

                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Location</label>
                                                    <input className="form-control" type='text' value={location} onChange={e => setLocation(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Gender</label>
                                                    <input className="form-control" type='text' value={gender} onChange={e => setGender(e.target.value)}></input>


                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Address</label>
                                                    <input className="form-control" type='text' value={address} onChange={e => setAddress(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Phone no</label>
                                                    <input className="form-control" type='text' value={phoneno} onChange={e => setPhoneno(e.target.value)}></input>


                                                </div>

                                            </div>

                                            <div className='row'>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Employee Salary per day</label>
                                                    <input className="form-control" type='number' value={salaryday} onChange={e => setSalaryday(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Employee salary hour</label>
                                                    <input className="form-control" type='number' value={salaryhour} onChange={e => setSalaryhour(e.target.value)}></input>



                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label">Employee salary fix</label>
                                                    <input className="form-control" type='number' value={monthsalaryfix} onChange={e => setMonthsalaryfix(e.target.value)}></input>

                                                </div>


                                            </div>

                                            <div className='row d-flex justify-content-end align-items-center'>
                                                <div className="col-12 col-md-3">
                                                    <button className='btn btn-primary btn-sm' >SUBMIT</button>

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



export default Employeeedit;