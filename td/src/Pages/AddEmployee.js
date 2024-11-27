
import { Navigate, Link } from 'react-router-dom'
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { FcManager } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { useEffect, useState } from 'react'

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';

import { inputdateformat } from 'reactjs-dateformat';

import '../Assets/addemployee.css';


const AddEmployee = ({ isLoggedIn, setIsLoggedIn }) => {

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
    const [employeedetails, setEmployeedetails] = useState([])
    const [details, setDetails] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fechemployee()
    }, [])


    const fechemployee = () => {
        setLoading(true)

        axios.get('http://localhost:5000/getemployee', { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setEmployeedetails(res.data);
                setDetails(res.data);
                setLoading(false)


            })
            .catch(err => {
                //console.log(err);
            })

    }



    const handlesubmit = (e) => {
        e.preventDefault();
        const values = {
            Date: date,
            Employeename: employeename,
            Employeenumber: employeenumber,
            Designation: designation,
            Employeefunction: employeefunction,
            Location: location,
            Gender: gender,
            Address: address,
            Phoneno: phoneno,
            Salaryday: salaryday,
            Salaryhour: salaryhour,
            Monthsalaryfix: monthsalaryfix

        }

        axios.post('http://localhost:5000/employee', values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "employee added") {
                    toast.success("Employee added", { position: "top-center", autoClose: 2000, closeOnClick: true });

                }

            })
            .catch(err => {
                //console.log(err);
            })
    }


    const handleprint = () => {
        window.print();
    }


    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        setEmployeedetails(details.filter(s => s.ename && s.ename.toString().toLowerCase().includes(number)))
    }



    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/employeedelete/${id}`, { withCredentials: true })
            .then(res => {
                if (res.data.message === "employee deleted") {
                    toast.success("Employee deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });



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
            <div className='container-fluid maincontainer'>

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
                                                    <label clasName="form-label">Employee Joining Date</label>
                                                    <input className="form-control" type='date' onChange={e => setDate(e.target.value)}></input>

                                                </div>



                                            </div>

                                            <div className='row'>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Employee Name</label>
                                                    <input className="form-control" type='text' onChange={e => setEmployeename(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Employee number</label>
                                                    <input className="form-control" type='number' onChange={e => setEmployeenumber(e.target.value)}></input>



                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Designation</label>
                                                    <input className="form-control" type='text' onChange={e => setDesignation(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Function</label>
                                                    <input className="form-control" type='text' onChange={e => setEmployeefunction(e.target.value)}></input>

                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Location</label>
                                                    <input className="form-control" type='text' onChange={e => setLocation(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Gender</label>
                                                    <input className="form-control" type='text' onChange={e => setGender(e.target.value)}></input>


                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Address</label>
                                                    <input className="form-control" type='text' onChange={e => setAddress(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Phone no</label>
                                                    <input className="form-control" type='text' onChange={e => setPhoneno(e.target.value)}></input>


                                                </div>

                                            </div>

                                            <div className='row'>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Employee Salary per day</label>
                                                    <input className="form-control" type='number' onChange={e => setSalaryday(e.target.value)}></input>
                                                    <label clasName="form-label mt-2">Employee salary hour</label>
                                                    <input className="form-control" type='number' onChange={e => setSalaryhour(e.target.value)}></input>



                                                </div>
                                                <div className='col-12 col-md-3'>
                                                    <label clasName="form-label mt-3 mb-2">Employee salary fix</label>
                                                    <input className="form-control" type='number' onChange={e => setMonthsalaryfix(e.target.value)}></input>

                                                </div>


                                            </div>

                                            <div className='row d-flex justify-content-end align-items-center'>
                                                <div className="col-12 col-md-3">
                                                    <button className='btn btn-primary float-end me-3 btn-sm'>SUBMIT</button>

                                                </div>

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
                                        <div className="row d-flex justify-content-end align-items-center">
                                            <div className="col-12 col-md-3 me-3">
                                                <button className="btn btn-primary float-end" onClick={handleprint}>PRINT</button>

                                            </div>

                                        </div>


                                        <div className='row ms-4 me-4 mt-4 mb-4 d-flex justify-content-end'>
                                            <div className="col-12 col-md-3">
                                                <h6 className='text-start'>Search result using employee name</h6>
                                                <input type='text' className="form-control" onChange={filter} placeholder="search employee name"></input>

                                            </div>


                                        </div>

                                        <div className="row scroll">
                                            <div className="col-12">
                                                {
                                                    loading ?
                                                        <div class="d-flex justify-content-center">
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                        <table className='table table-hover text-center'>
                                                            <thead>
                                                                <tr>
                                                                    <th>SR NO</th>
                                                                    <th>EMPLOYEE NAME</th>
                                                                    <th>DATE OF JOINING</th>
                                                                    <th>EMPLOYEE ID</th>
                                                                    <th>DESIGNATION</th>
                                                                    <th>FUNCTION</th>
                                                                    <th>SALARY DAY</th>
                                                                    <th>SALARY HOUR</th>
                                                                    <th>SALARY FIX</th>
                                                                    <th>CLOSING BALANCE</th>
                                                                    <th>ADVANCE</th>

                                                                    <th>EDIT</th>
                                                                    <th>DELETE</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    employeedetails && employeedetails.map((o, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{o.ename}</td>
                                                                            <td>{inputdateformat(o.date)}</td>
                                                                            <td>{o.enumber}</td>
                                                                            <td>{o.designation}</td>
                                                                            <td>{o.efunction}</td>
                                                                            <td>{o.salaryday}</td>
                                                                            <td>{o.salaryhour}</td>
                                                                            <td>{o.monthsalaryfix}</td>
                                                                            <td>{o.Advance}</td>
                                                                            <td><Link to={`https://www.textilediwanji.com/employeeadvance/${o.srno}`} className="btn btn-primary btn-sm">ADVANCE</Link></td>

                                                                            <td><Link to={`https://www.textilediwanji.com/employeeedit/${o.srno}`} className='btn btn-success btn-sm'>EDIT</Link ></td>
                                                                            <td><button className='btn btn-danger btn-sm' onClick={() => handledelete(o.srno)}>DELETE</button></td>
                                                                        </tr>
                                                                    ))
                                                                }
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
            </div>




            <div className='container-fluid printcontainer' style={{ visibility: "hidden" }}>
                <div className="row mt-3">
                    <h3 className="text-center ">EMPLOYEE SHEET</h3>

                </div>
                <div className="row mt-4">
                    {/* <h5 className='ms-5'>Date:- From {startdate} to {enddate}</h5> */}




                </div>
                <div className="row scroll">
                    <div className="col-12">
                        <table className='table table-bordered text-center'>
                            <thead>
                                <tr>
                                    <th>SR NO</th>
                                    <th>EMPLOYEE NAME</th>
                                    <th>DATE OF JOINING</th>
                                    <th>EMPLOYEE ID</th>
                                    <th>DESIGNATION</th>
                                    <th>FUNCTION</th>
                                    <th>SALARY DAY</th>
                                    <th>SALARY HOUR</th>
                                    <th>SALARY FIX</th>
                                    <th>CLOSING BALANCE</th>
                                    {/* <th>ADVANCE</th>

                                    <th>EDIT</th>
                                    <th>DELETE</th> */}

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employeedetails && employeedetails.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.ename}</td>
                                            <td>{inputdateformat(o.date)}</td>
                                            <td>{o.enumber}</td>
                                            <td>{o.designation}</td>
                                            <td>{o.efunction}</td>
                                            <td>{o.salaryday}</td>
                                            <td>{o.salaryhour}</td>
                                            <td>{o.monthsalaryfix}</td>
                                            <td>{o.Advance}</td>
                                            {/* <td><Link to={`https://www.textilediwanji.com/employeeadvance/${o.srno}`} className="btn btn-primary btn-sm">ADVANCE</Link></td>

                                            <td><Link to={`https://www.textilediwanji.com/employeeedit/${o.srno}`} className='btn btn-success btn-sm'>EDIT</Link ></td>
                                            <td><button className='btn btn-danger btn-sm' onClick={() => handledelete(o.srno)}>DELETE</button></td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>
    );
}



export default AddEmployee;