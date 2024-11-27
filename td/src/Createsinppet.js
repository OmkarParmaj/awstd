
import { Navigate, Link } from 'react-router-dom'


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



    useEffect(() => {
        fechemployee()
    }, [])


    const fechemployee = () => {

        axios.get('http://localhost:5000/getemployee', { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                setEmployeedetails(res.data);

            })
            .catch(err => {
                console.log(err);
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
                    toast.success("Production is uploaded", { position: "top-center", autoClose: 2000, closeOnClick: true });

                }

            })
            .catch(err => {
                console.log(err);
            })
    }



    const handledelete = (id) => {
        axios.delete(`http://localhost:5000/employeedelete/${id}`, { withCredentials: true })
            .then(res => {
                if (res.data.message === "employee deleted") {
                    toast.success("Employee deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });



                }
            })
            .catch(err => {
                console.log(err);
            })
    }








    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }
    return (
        <>


        


        </>
    );
}



export default AddEmployee;