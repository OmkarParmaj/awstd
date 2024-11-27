import react, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import { ToastContainer } from 'react-toastify';
import Computersidebar from '../sidebar/Computersidebar';

import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import axios from 'axios';

import { monthformat, shortmonthformat } from 'reactjs-dateformat';







const Payroll = ({ isLoggedIn, setIsLoggedIn }) => {

    const [payrolldetails, setPayrolldetails] = useState([]);

    const [loading, setLoading] = useState(false);



    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");











    const handleclick = () => {

        setLoading(true)

        axios.get(`http://localhost:5000/payroll/report?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                //console.log(res.data)
                setPayrolldetails(res.data);
                setLoading(false)
            })
            .catch(err => {
                //console.log(err);
            })


    }




    const handleprint = () => {
        window.print();
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
                                                <h4 className="text-start ms-4 mt-2">PAYROLL</h4>
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


                                        <div className="row scroll">
                                            <div className="col-12 col-md-3">
                                                <label className='form-label'>Start date</label>
                                                <input className="form-control" type="date" onInput={e => setStartdate(e.target.value)} />

                                            </div>
                                            <div className="col-12 col-md-3">
                                                <label className='form-label'>End date</label>
                                                <input className="form-control" type="date" onInput={e => setEnddate(e.target.value)} />

                                            </div>
                                            <div className="col-12 col-md-3">


                                            </div>
                                            <div className="col-12 col-md-3">
                                                <button className='btn btn-primary btn-sm' onClick={() => handleclick()} >SUBMIT</button>
                                            </div>

                                        </div>






                                    </div>


                                </div>

                            </div>




                        </div>


                        <div className='row '>
                            <div className="row d-flex justify-content-end align-items-center">
                                <div className="col-12 col-md-3 me-3">
                                    <button className="btn btn-primary float-end" onClick={handleprint}>PRINT</button>

                                </div>

                            </div>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>

                                        <div className="row scroll">
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
                                                                <th>MONTH</th>
                                                                <th>EMPLOYEE NAME</th>
                                                                <th>EMPLOYEE ID</th>
                                                                <th>DESIGNATION</th>
                                                                <th>PRESENT DAY's</th>
                                                                <th>ABSENT DAYS's</th>
                                                                <th>HALF DAY's</th>
                                                                <th>SALARY DAY</th>
                                                                <th>SALARY HOUR</th>
                                                                <th>FIXED SALARY</th>
                                                                <th>ADVANCE BAL.</th>
                                                                <th>PAYMENT AMOUNT</th>

                                                                <th>PAYSLIP</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {payrolldetails && payrolldetails.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{shortmonthformat(o.date)}</td>
                                                                    <td>{o.ename}</td>
                                                                    <td>{o.enumber}</td>
                                                                    <td>{o.efunction}</td>
                                                                    <td>{o.presentdays}</td>
                                                                    <td>{o.absentdays}</td>
                                                                    <td>{o.halfdays}</td>
                                                                    <td>{o.salaryday}</td>
                                                                    <td>{o.salaryhour}</td>
                                                                    <td>{o.monthsalaryfix}</td>
                                                                    <td>{o.balance_amount}</td>
                                                                    <td>{o.salaryday ? (o.presentdays * o.salaryday) + ((o.halfdays * o.salaryday) / 2)
                                                                        : o.salaryhour ? (o.presentdays * o.salaryhour) + ((o.halfdays * o.salaryhour) / 2)
                                                                            : o.monthsalaryfix ? (o.presentdays >= 26 ? o.monthsalaryfix : ((o.monthsalaryfix / 26) * o.presentdays) + (o.monthsalaryfix / 26) * o.halfdays)
                                                                                : ""


                                                                    }</td>

                                                                    <th><Link to={`https://www.textilediwanji.com/payslip/${o.enumber}/${startdate}/${enddate}`} target='_blank' className='btn btn-success btn-sm'>PAYSLIP</Link></th>
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




            <div className='container-fluid printcontainer' style={{ visibility: "hidden" }}>
                <div className="row mt-3">
                    <h3 className="text-center ">PAYROLL SHEET</h3>

                </div>
                <div className="row mt-4">
                    <h5 className='ms-5'>Date:- From {startdate} to {enddate}</h5>




                </div>
                <div className='row '>
                    <div className='col-12 col-md-12 '>
                        <div className='card m-3 border border-0 '>
                            <div className='card-body'>

                                <div className="row scroll">
                                    <table className='table table-bordered text-center'>
                                        <thead>
                                            <tr>
                                                <th>SR NO</th>
                                                <th>MONTH</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>EMPLOYEE ID</th>
                                                <th>DESIGNATION</th>
                                                <th>PRESENT DAY's</th>
                                                <th>ABSENT DAYS's</th>
                                                <th>HALF DAY's</th>
                                                <th>SALARY DAY</th>
                                                <th>SALARY HOUR</th>
                                                <th>FIXED SALARY</th>
                                                <th>ADVANCE BAL.</th>
                                                <th>PAYMENT AMOUNT</th>

                                                {/* <th>PAYSLIP</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payrolldetails && payrolldetails.map((o, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{shortmonthformat(o.date)}</td>
                                                    <td>{o.ename}</td>
                                                    <td>{o.enumber}</td>
                                                    <td>{o.efunction}</td>
                                                    <td>{o.presentdays}</td>
                                                    <td>{o.absentdays}</td>
                                                    <td>{o.halfdays}</td>
                                                    <td>{o.salaryday}</td>
                                                    <td>{o.salaryhour}</td>
                                                    <td>{o.monthsalaryfix}</td>
                                                    <td>{o.balance_amount}</td>
                                                    <td>{o.salaryday ? (o.presentdays * o.salaryday) + ((o.halfdays * o.salaryday) / 2)
                                                        : o.salaryhour ? (o.presentdays * o.salaryhour) + ((o.halfdays * o.salaryhour) / 2)
                                                            : o.monthsalaryfix ? (o.presentdays >= 26 ? o.monthsalaryfix : ((o.monthsalaryfix / 26) * o.presentdays) + (o.monthsalaryfix / 26) * o.halfdays)
                                                                : ""


                                                    }</td>

                                                    {/* <td><Link to={`https://www.textilediwanji.com/payslip/${o.enumber}/${startdate}/${enddate}`} target='_blank' className='btn btn-success btn-sm'>PAYSLIP</Link></td> */}
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>






                            </div>


                        </div>

                    </div>




                </div>

            </div>




        </>
    );
}



export default Payroll;