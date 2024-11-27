import { Navigate, Link } from "react-router-dom";
import Computersidebar from "../sidebar/Computersidebar";
import Header from "../sidebar/Header";
import Mobilesidebar from "../sidebar/Mobilesidebar";

import { ToastContainer, toast } from 'react-toastify'

import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { inputdateformat } from 'reactjs-dateformat';
import { FcEditImage } from "react-icons/fc";
import axios from 'axios'




const Attendance = ({ isLoggedIn, setIsLoggedIn }) => {


    const [date, setDate] = useState("");
    const [employeedetails, setEmployeedetails] = useState([]);
    const [attendance, setAttendance] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [presentdays, setPresentdays] = useState("")
    const [absentdays, setAbsentdays] = useState("")
    const [halfdays, setHalfdays] = useState("");
    const [attendancedata, setAttendancedata] = useState([]);
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");


    const [edate, setEdate] = useState("");
    const [ename, setEname] = useState("");
    const [epresentdays, setEpresentdays] = useState("");
    const [eabsentdays, setEabsentdays] = useState("");
    const [ehalfdays, setEhalfdays] = useState("");

    const [loading, setLoading] = useState(false);





    const handleprint = () => {
        window.print();
    }




    const handleupdate = (srno) => {
        axios.get(`http://localhost:5000/fetchattendancedataforedit/${srno}`, { withCredentials: true })
            .then(res => {

                setEdate(res.data[0].date);
                setEname(res.data[0].ename);
                setEpresentdays(res.data[0].presentdays);
                setEabsentdays(res.data[0].absentdays);
                setEhalfdays(res.data[0].halfdays);


            })
            .catch(err => {
                //console.log(err);
            })
    }




    const handlemodalupdate = (e, srno) => {
        e.preventDefault();

        const values = {
            date: edate,
            name: ename,
            presentdays: epresentdays,
            absentdays: eabsentdays,
            halfdays: ehalfdays
        }
        axios.put(`http://localhost:5000/employeeattendanceedit/${srno}`, values, { withCredentials: true })
            .then(res => {
                if (res.data.message === "employee attendance updated") {
                    toast.success(`Attendance updated`, { position: "top-center", autoClose: 2000, closeOnClick: true });

                }
            })
            .catch(err => {
                //console.log(err);
            })
    }




    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSelectChange2 = (e) => {
        setEname(e.target.value);
    };


    // useEffect(() => {
    //     fetchdata();
    // }, [])


    const fetchdata = () => {
        setLoading(true)
        axios.get(`http://localhost:5000/attendancedata/data?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                setAttendancedata(res.data);
                //console.log(res.data)
                setLoading(false)

            })
            .catch(err => {
                //console.log(err);
            })
    }










    useEffect(() => {
        axios.get('http://localhost:5000/getemployee', { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setEmployeedetails(res.data);

            })
            .catch(err => {
                //console.log(err);
            })
    }, [])







    const handlesubmit = (e) => {
        e.preventDefault();


        const values = {
            Date: date,
            option: selectedOption,
            present: presentdays,
            absent: absentdays,
            half: halfdays
        }

        axios.post('http://localhost:5000/addattendance', values, { withCredentials: true })
            .then(res => {

                if (res.data.message === "attendance added") {
                    toast.success(`Attendance added for ${selectedOption}`, { position: "top-center", autoClose: 2000, closeOnClick: true });
                }

            })
            .catch(err => {
                //console.log(err);
            })

    }









    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
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
                                                <h4 className="text-start ms-4 mt-2">EMPLOYEE ATTENDANCE</h4>
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
                                                    <label clasName="form-label"> Date</label>
                                                    <input className="form-control" type='date' onChange={e => setDate(e.target.value)}></input>

                                                </div>



                                            </div>


                                            <div className="row">

                                                <div className="col-12 col-md-4">
                                                    <label className="form-label">Employee Name</label>
                                                    <select className="form-select" value={selectedOption} onChange={handleSelectChange} required>
                                                        <option value="" required>--Please choose an option--</option>
                                                        {employeedetails.map((option, index) => (
                                                            <option key={index} value={option.ename} required>{option.ename}</option>
                                                        ))}
                                                    </select>

                                                    <label className="form-label mt-3">Present days</label>
                                                    <input className="form-control" type="number" onChange={e => setPresentdays(e.target.value)}></input>
                                                    <label className="form-label mt-3">Absent days</label>
                                                    <input className="form-control" type="number" onChange={e => setAbsentdays(e.target.value)}></input>
                                                    <label className="form-label mt-3">Half days</label>
                                                    <input className="form-control" type="number" onChange={e => setHalfdays(e.target.value)}></input>
                                                    <button className="btn btn-primary btn-sm mt-4 " >SUBMIT</button>


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
                                                <button className='btn btn-primary btn-sm float-start ' style={{ marginTop: "34px" }} onClick={() => fetchdata()}>SUBMIT</button>

                                            </div>


                                        </div>

                                        <div className="row scroll m-5">
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
                                                                <th>PRESENT DAYS</th>
                                                                <th>HALF DAYS</th>
                                                                <th>ABSENT DAYS</th>
                                                                <th>EDIT</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                attendancedata && attendancedata.map((o, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{o.ename}</td>
                                                                        <td>{o.presentdays}</td>
                                                                        <td>{o.halfdays}</td>
                                                                        <td>{o.absentdays}</td>
                                                                        <td>
                                                                            <button className='btn btn-primary btn-sm ' data-bs-toggle="modal"
                                                                                data-bs-target={`#exampleModal-${o.srno}`} onClick={e => handleupdate(o.srno)}>UPDATE</button>


                                                                            <div className="modal fade"
                                                                                id={`exampleModal-${o.srno}`}
                                                                                tabIndex="-1"
                                                                                aria-labelledby={`exampleModalLabel-${o.srno}`}
                                                                                aria-hidden="true">

                                                                                <div class="modal-dialog  modal-dialog-centered">


                                                                                    <div class="modal-content">
                                                                                        <form onSubmit={e => handlemodalupdate(e, o.srno)}>
                                                                                            <div class="modal-body">

                                                                                                <div className='row'>
                                                                                                    <div className='col-12'>
                                                                                                        <label className='form-label float-start'>Date</label>
                                                                                                        <input className='form-control' type='date' value={inputdateformat(edate)} onChange={e => setEdate(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Employee name</label>
                                                                                                        <select className="form-select" value={ename} onChange={handleSelectChange2} required>
                                                                                                            <option value="" required>--Please choose an option--</option>
                                                                                                            {employeedetails.map((option, index) => (
                                                                                                                <option key={index} value={option.ename} required>{option.ename}</option>
                                                                                                            ))}
                                                                                                        </select>
                                                                                                        <label className='form-label float-start'>Present days</label>
                                                                                                        <input className='form-control' type='number' value={epresentdays} onChange={e => setEpresentdays(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Absent days</label>
                                                                                                        <input className='form-control' type='number' value={eabsentdays} onChange={e => setEabsentdays(e.target.value)}></input>
                                                                                                        <label className='form-label float-start'>Half days</label>
                                                                                                        <input className='form-control' type='number' value={ehalfdays} onChange={e => setEhalfdays(e.target.value)}></input>

                                                                                                    </div>

                                                                                                </div>
                                                                                                <div className="row mt-3">
                                                                                                    <div className='col-12 d-flex justify-content-end'>
                                                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                        <button type="submit" class="btn btn-primary ms-3"
                                                                                                            data-bs-dismiss="modal">UPDATE</button>


                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>



                                                                                        </form>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </td>

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




            <div className="container-fluid printcontainer" style={{ visibility: "hidden" }}>
                <div className="row mt-3">
                    <h3 className="text-center ">ATTENDANCE SHEET</h3>

                </div>
                <div className="row mt-4">
                    <h5 className='ms-5'>Date:- From {startdate} to {enddate}</h5>




                </div>
                <div className="row scroll m-5">
                    <table className='table table-bordered text-center'>
                        <thead>
                            <tr>
                                <th>SR NO</th>
                                <th>EMPLOYEE NAME</th>
                                <th>PRESENT DAYS</th>
                                <th>HALF DAYS</th>
                                <th>ABSENT DAYS</th>
                                {/* <th>EDIT</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                attendancedata && attendancedata.map((o, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{o.ename}</td>
                                        <td>{o.presentdays}</td>
                                        <td>{o.halfdays}</td>
                                        <td>{o.absentdays}</td>
                                        {/* <td>
                                            <button className='btn btn-primary btn-sm ' data-bs-toggle="modal"
                                                data-bs-target={`#exampleModal-${o.srno}`} onClick={e => handleupdate(o.srno)}>UPDATE</button>


                                            <div className="modal fade"
                                                id={`exampleModal-${o.srno}`}
                                                tabIndex="-1"
                                                aria-labelledby={`exampleModalLabel-${o.srno}`}
                                                aria-hidden="true">

                                                <div class="modal-dialog  modal-dialog-centered">


                                                    <div class="modal-content">
                                                        <form onSubmit={e => handlemodalupdate(e, o.srno)}>
                                                            <div class="modal-body">

                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <label className='form-label float-start'>Date</label>
                                                                        <input className='form-control' type='date' value={inputdateformat(edate)} onChange={e => setEdate(e.target.value)}></input>
                                                                        <label className='form-label float-start'>Employee name</label>
                                                                        <select className="form-select" value={ename} onChange={handleSelectChange2} required>
                                                                            <option value="" required>--Please choose an option--</option>
                                                                            {employeedetails.map((option, index) => (
                                                                                <option key={index} value={option.ename} required>{option.ename}</option>
                                                                            ))}
                                                                        </select>
                                                                        <label className='form-label float-start'>Present days</label>
                                                                        <input className='form-control' type='number' value={epresentdays} onChange={e => setEpresentdays(e.target.value)}></input>
                                                                        <label className='form-label float-start'>Absent days</label>
                                                                        <input className='form-control' type='number' value={eabsentdays} onChange={e => setEabsentdays(e.target.value)}></input>
                                                                        <label className='form-label float-start'>Half days</label>
                                                                        <input className='form-control' type='number' value={ehalfdays} onChange={e => setEhalfdays(e.target.value)}></input>

                                                                    </div>

                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className='col-12 d-flex justify-content-end'>
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="submit" class="btn btn-primary ms-3"
                                                                            data-bs-dismiss="modal">UPDATE</button>


                                                                    </div>

                                                                </div>

                                                            </div>



                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </td> */}

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>





        </>
    );
}



export default Attendance;