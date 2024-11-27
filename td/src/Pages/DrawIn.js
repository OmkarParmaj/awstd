

import { Navigate, Link } from 'react-router-dom'
import Header from '../sidebar/Header';
import Mobilesidebar from '../sidebar/Mobilesidebar';
import Computersidebar from '../sidebar/Computersidebar';
import { FcManager } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { FaDashcube } from "react-icons/fa6";
import { useEffect, useState } from 'react'
import DrawinPrint from './DrawinPrint';
import { successalert, erroralert } from '../Alert'
import GlassContainer from './GlassContainer';
import axios from 'axios';
import '../Assets/drawin.css';


import { toast, ToastContainer } from 'react-toastify';

import { inputdateformat } from 'reactjs-dateformat';





const DrawIn = ({ isLoggedIn, setIsLoggedIn }) => {


    const [date, setDate] = useState("")
    const [setno, setSetno] = useState("")
    const [designno, setDesignno] = useState("");
    const [drawinprice, setDrawinprice] = useState("");
    const [reedprice, setReedprice] = useState("");
    const [note, setNote] = useState("");

    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("");
    const [drawindata, setDrawindata] = useState([]);
    const [filtereddata, setFiltereddata] = useState([]);
    const [totalprice, setTotalprice] = useState(0);

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);





    const [notpresent, setNotpresent] = useState("");
    const [omkaralert, setOmkaralert] = useState("");
    const [salert, setSalert] = useState("");




    useEffect(() => {

        if (setno.length < 1) {
            setSalert("");

        }
        else {
            axios.get(`http://localhost:5000/getdesignnumber2/data?dn=${setno}`, { withCredentials: true })
                .then(res => {
                    //console.log(res.data);

                    if (res.data.length > 0) {
                        setSalert("");

                    }
                    else {
                        setSalert("set number not exit");
                    }


                })
                .catch(err => {
                    //console.log(err);

                })

        }



    }, [setno])













    const fetchdata = () => {






        setLoading(true)

        axios.get(`http://localhost:5000/getdrawindata/data?startdate=${startdate}&enddate=${enddate}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                setDrawindata(res.data);

                setLoading(false)
                const mydata = res.data
                const filtereddata = mydata.map(value => value.drawinprice)
                // //console.log(filtereddata)


                const initialprice = 0;
                const totalPrice = filtereddata.reduce((accumulator, currentValue) => accumulator + currentValue, initialprice);

                // Set the total price in state
                setTotalprice(totalPrice);
                // //console.log(totalPrice);







            })
            .catch(err => {
                //console.log(err)
            })


    }


    useEffect(() => {

        if (designno === "") {
            setNotpresent("");
        }
        else {

            setNotpresent("Design number is not present");

            axios.get(`http://localhost:5000/getbeaminwarddatafordrawin?setnumber=${setno}&designnumber=${designno}`, { withCredentials: true })
                .then(res => {
                    const data = res.data[0].srno
                    //console.log(data)

                    const drawinprice = res.data[0].drawinprice;

                    //console.log(res.data[0])
                    //    if(data > 0) {
                    //     setNotpresent("")
                    //     setOmkaralert("")

                    //    }
                    if (drawinprice > 1) {
                        setNotpresent("Drawin already added!")
                    }
                    else {
                        setNotpresent("")
                    }



                })

                .catch(err => {
                    //console.log(err);
                })

        }

    }, [designno, setno])







    const handlesubmit = (e) => {

        setSubmitting(true);


        e.preventDefault();
        const values = {
            date: date,
            setno: setno,
            designno: designno,
            drawinprice: drawinprice,
            reedprice: reedprice,
            note: note
        }

        if (notpresent === "Design number is not present") {
            
            // toast.error("Design number not present! please give correct design no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            setSubmitting(false);
            erroralert("Design number not present!");
        }
        else if (notpresent === "Drawin already added!") {
            // toast.error("Drawin already added!", { position: "top-center", autoClose: 2000, closeOnClick: true });
            setSubmitting(false);
            erroralert("Drawin already added!");

        }

        else if (salert === "set number not exit") {
            setSubmitting(false);
            erroralert("set number not exist");
        }
        else {
            axios.post(`http://localhost:5000/drawinpost`, values, { withCredentials: true })
                .then(res => {

                    if (res.data.message === "drawin added successfully") {
                         setSubmitting(false);
                        // toast.success("Drawin added successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                        successalert("Drawin added successfully!");

                        setDate("")
                        setSetno("")
                        setDesignno("")
                        setDrawinprice("")
                        setReedprice("")

                    }

                })
                .catch(err => {
                    //console.log(err);
                })

        }

    }




    const handleprint = () => {
        window.print();
    }



    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }
    return (
        <>

            <div className='container-fluid maincontainer'>

                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone m5 sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone addemployeemain border border-1'>
                        <ToastContainer></ToastContainer>
                        <Mobilesidebar></Mobilesidebar>

                        {/* header section strts here  */}
                        <Header setIsLoggedIn={setIsLoggedIn}></Header>

                        {/* header section ends here  */}


                        <div className='row pathing mt-4 mb-4 m4'>
                            <div className='col-12 col-sm-12 d-flex justify-content-start '>
                                <span className="ms-4 mt-2">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to='/dashboard'> <FaDashcube className='me-2' />Home</Link></li>

                                            <li className="breadcrumb-item active" aria-current="page"><IoMdSettings className='me-2' />Drawin</li>
                                        </ol>
                                    </nav>


                                </span>
                            </div>

                        </div>

                        <div className="row packingsliplabel m3">
                            <div className="col-md-12 ">
                                <div className="card  shadow-sm m-3 border border-0">
                                    <div className="car-body">
                                        <div className="row mt-2 mb-2">
                                            <div className="col-md-6">
                                                <h4 className="text-start ms-4 mt-2">DRAWIN {omkaralert}</h4>
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





                        <div className='row m2'>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>


                                        <form onSubmit={handlesubmit}>
                                            <div className='row d-flex'>
                                                <div className='col-12 col-md-3'>
                                                    <label className='form-label align-self-end float-start'>Date</label>
                                                    <input className='form-control align-self-end' type='date' onChange={e => setDate(e.target.value)} required></input>



                                                </div>
                                                <div className='row mt-3'>
                                                    <div className="col-12 col-md-3">
                                                        <label className="form-labelfloat-start">Set No</label>
                                                        <input className='form-control' type="number" onChange={e => setSetno(e.target.value)} required></input>
                                                        <p className='text-danger'>{salert}</p>
                                                        <label className="form-labelfloat-start mt-3">Design No</label>
                                                        <input className='form-control' type="text" onChange={e => setDesignno(e.target.value)} required></input>
                                                        <p className='text-danger'>{notpresent}</p>
                                                        <label className="form-labelfloat-start mt-3">Drawin price</label>
                                                        <input className='form-control' type="number" onChange={e => setDrawinprice(e.target.value)} required></input>
                                                        <label className="form-labelfloat-start mt-3">Reed price</label>
                                                        <input className='form-control' type="number" onChange={e => setReedprice(e.target.value)}></input>
                                                        <label className="form-labelfloat-start mt-3">Note</label>
                                                        <input className='form-control' type="text" onChange={e => setNote(e.target.value)}></input>

                                                    </div>
                                                </div>
                                                <div className='row mt-4 d-flex justify-content-start align-items-center'>
                                                    <div className='col-12 col-md-3'>
                                                        <button className='btn btn-primary btn-sm float-end'>SUBMIT</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>












                                    </div>


                                </div>

                            </div>




                        </div>


                        <div className='row mt-3'>
                            <div className='col-12 col-md-12 '>
                                <div className='card m-3 border border-0 '>
                                    <div className='card-body'>
                                        <div className='row mt-4'>
                                            <h4 className='text-center'>DRAWIN DATA</h4>
                                        </div>
                                        <div className='row m1'>
                                            <div className='col-12 col-md-3'>
                                                <label className='form-label float-start'>Start Date</label>
                                                <input className='form-control' type='date' onChange={e => setStartdate(e.target.value)}></input>


                                            </div>
                                            <div className='col-12 col-md-3'>
                                                <label className='form-label float-start'>End Date</label>
                                                <input className='form-control' type='date' onChange={e => setEnddate(e.target.value)}></input>



                                            </div>

                                            <div className='col-12 col-md-3'>
                                                <button className='btn btn-primary btn-sm float-start' style={{ marginTop: "34px", marginLeft: "20px" }} onClick={() => fetchdata()}>SUBMIT</button>

                                            </div>
                                            <div className='col-12 col-md-3'>
                                                {drawindata.length > 0 ?
                                                    <button className="btn btn-primary float-end" onClick={handleprint}>PRINT</button> : <button className="btn btn-primary float-end" disabled onClick={handleprint}>PRINT</button>}

                                            </div>


                                        </div>
                                        <div className='row mt-5 scroll'>
                                            {
                                                loading ?
                                                    <div class="d-flex justify-content-center">
                                                        <div class="spinner-border" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> :
                                                    <table className='table table-hover text-center divToPrint'>
                                                        <thead>
                                                            <tr>
                                                                <th>SR NO</th>
                                                                <th>DRAWIN DATE</th>
                                                                <th>SET NO</th>
                                                                <th>DESIGN NO</th>
                                                                <th>REEED</th>
                                                                <th>CLUB</th>
                                                                <th>DRAWIN PRICE</th>
                                                                <th>REED PRICE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {drawindata && drawindata.map((o, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{inputdateformat(o.drawindate)}</td>
                                                                    <td>{o.SetNo}</td>
                                                                    <td>{o.DesignNo}</td>
                                                                    <td>{o.Reed}</td>
                                                                    <td><span
                                                                        className={`badge rounded-pill ${o.club === "nonclub" ? "text-bg-success" : "text-bg-danger"}`}
                                                                        style={{ width: "120px" }}
                                                                    >
                                                                        {o.club}
                                                                    </span>
                                                                    </td>
                                                                    <td>{o.drawinprice}</td>
                                                                    <td>{o.reedprice}</td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Total</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{totalprice}</td>
                                                                <td></td>
                                                            </tr>
                                                        </tfoot>

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






            <div className='container-fluid printcontainer'>
                <div className='row mt-5'>
                    <h4 className='text-center'>DRAWININ REPORT</h4>

                </div>
                <div className='row ms-3 me-3'>
                    <div className='col-3'>
                        <label className='form-label'>Date</label>
                        <p>From {startdate} To {enddate}</p>

                    </div>

                </div>

                <div className='row mt-5 ms-3 me-3'>
                    <table className='table table-bordered text-center divToPrint'>
                        <thead>
                            <tr>
                                <th>SR NO</th>
                                <th>DRAWIN DATE</th>
                                <th>SET NO</th>
                                <th>DESIGN NO</th>
                                <th>REEED</th>
                                <th>DRAWIN PRICE</th>
                                <th>REED PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drawindata && drawindata.map((o, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{inputdateformat(o.drawindate)}</td>
                                    <td>{o.SetNo}</td>
                                    <td>{o.DesignNo}</td>
                                    <td>{o.Reed}</td>
                                    <td>{o.drawinprice}</td>
                                    <td>{o.reedprice}</td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td>{totalprice}</td>
                                <td></td>
                            </tr>
                        </tfoot>

                    </table>

                </div>

            </div>



            <div>
                {
                    submitting === true ?
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



export default DrawIn;