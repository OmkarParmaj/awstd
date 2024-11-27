import react, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';



import { shortmonthformat, yearformat } from 'reactjs-dateformat';



const Payslip = () => {


    const [payslipdetails, setPayslipdetails] = useState([]);


    const { id, id1, id2 } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/payslip/${id}/${id1}/${id2}`, {withCredentials:true})
        .then(res => {
            setPayslipdetails(res.data[0]);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    },[])

    







    return (
        <>
            <div className="container border border-1">
                <div className='row border-bottom'>
                    <h3 className='text-center'>PAYSLIP</h3>



                </div>
                <div className="row">
                    <h3 className="text-center  border-bottom mt-3 mb-3">{shortmonthformat(payslipdetails.date) + '-' + yearformat(payslipdetails.date)}</h3>

                </div>

                <div className='row'>
                    <div className='col-6 col-md-3'>
                        <p className='text-start'>Name</p>
                        <p className='text-start'>ID</p>
                        <p className='text-start'>Designation</p>
                        <p className='text-start'>Function</p>
                        <p className='text-start'>Address</p>
                        <p className='text-start'>Phone no</p>
                       

                    </div>
                    <div className='col-6 col-md-3'>
                        <p className='text-start fw-bold'>{payslipdetails.ename}</p>
                        <p className='text-start'>{payslipdetails.enumber}</p>
                        <p className='text-start'>{payslipdetails.designation}</p>
                        <p className='text-start'>{payslipdetails.efunction}</p>
                        <p className='text-start'>{payslipdetails.address}</p>
                        <p className='text-start'>{payslipdetails.phoneno}</p>
                        
                    </div>

                    <div className='col-6 col-md-3'>
                        
                        <p className='text-start'>Gender</p>
                        <p className='text-start'>Salary day</p>
                        <p className='text-start'>Salary hour</p>
                        <p className='text-start'>Fixed salary</p>
                        <p className='text-start'>Present days</p>
                        <p className='text-start'>Absent days</p>
                        <p className='text-start'>Half days</p>

                    </div>
                    <div className='col-6 col-md-3'>
                       
                        <p className='text-start'>{payslipdetails.gender}</p>
                        <p className='text-start'>{payslipdetails.salaryday}</p>
                        <p className='text-start'>{payslipdetails.salaryhour}</p>
                        <p className='text-start'>{payslipdetails.monthsalaryfix}</p>
                        <p className='text-start'>{payslipdetails.presentdays}</p>
                        <p className='text-start'>{payslipdetails.absentdays}</p>
                        <p className='text-start'>{payslipdetails.halfdays}</p>

                    </div>


                </div>
                <div className='row mt-5'>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Salary</h5>
                        <h2 className='text-center'>{payslipdetails.salaryday ? (payslipdetails.salaryday * payslipdetails.presentdays) + ((payslipdetails.salaryday * payslipdetails.halfdays) / 2)
                                                     : payslipdetails.monthsalaryfix ? (payslipdetails.presentdays >= 26 ? payslipdetails.monthsalaryfix : ((payslipdetails.monthsalaryfix) / 26) * payslipdetails.presentdays)
                                                     : ""
                    
                                                      }</h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Advance</h5>
                        <h2 className='text-center'>{payslipdetails.total_advance_amount}</h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Total Received</h5>
                        <h2 className='text-center'>{payslipdetails.total_received_amount}</h2>
                    </div>
                    <div className='col-6 col-md-3'>
                        <h5 className='text-center'>Balance Amount</h5>
                        <h2 className='text-center'>{payslipdetails.balance_amount}</h2>
                    </div>


                </div>
            </div>



        </>
    );
}




export default Payslip;