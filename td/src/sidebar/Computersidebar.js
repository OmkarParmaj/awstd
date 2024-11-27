import React from "react";
import { NavLink } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";

import { FaDashcube } from "react-icons/fa6";
import '../Assets/computersidebar.css';

import { CgInternal } from "react-icons/cg";
import { VscServerProcess } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";
// import { PiYarnFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";


const Computersidebar = () => {
    return (
        <>
            <div className="computersidebarmycss" >
                {/* sidebar header starts here  */}
                <div className="row  d-flex justify-content-center align-items-center">

                    <img className="tdlogo" src="/logo.png" alt="logo"></img>
                </div>
                {/* sidebar header ends here  */}

                {/* sidebar body starts here  */}
                <div className="row mt-5 ms-1 me-1 ">
                    <NavLink className="btn btn-success dashboardbutton mt-2 " to="/dashboard" >
                        <FaDashcube className='me-2' /> Dashboard
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/mis">
                        <CgInternal className='me-2' /> MIS
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/beaminward">
                        <CgInternal className='me-2' /> Beam Inward
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/production" >
                        <VscServerProcess className='me-2' /> Production
                    </NavLink>
                    
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/packingslip" >
                        <IoNewspaperOutline className='me-2' /> Packing slip
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/yarninward" >
                        <CgInternal className='me-2' /> Yarn Inward
                    </NavLink>
                    {/* <NavLink className="btn btn-success dashboardbutton mt-2" to="/billing" >
                        <FaFileInvoiceDollar className='me-2' /> Billing
                    </NavLink> */}
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/loomstatus" >
                        <FaFileInvoiceDollar className='me-2' /> Loom status
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to="/drawin" >
                        <FaFileInvoiceDollar className='me-2' /> Draw-In
                    </NavLink>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to='/tallygstreport'>
                      <FaFileInvoiceDollar className="me-2">
                        
                      </FaFileInvoiceDollar>
                      Tally GST Report
                    </NavLink>

                    <button className="btn btn-success dashboardbutton mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <TbReport className='me-2' /> Reports <FaAngleDown style={{ marginLeft: "110px" }} />
                    </button>
                    <div className="collapse" id="collapseExample">
                        <div className="border border-0  collapsecard  ">
                            <NavLink className="btn btn-success-emphasis button1 ms-3  mt-1 " to="/beaminwardreport" >
                                Beam inward
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/productionreport' >
                                Production
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/productionedit' >
                                Production edit
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/monthlyproduction' >
                                Monthly Production
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/packingslipreport' >
                                Packing slip
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to="/yarninwardreport" >
                                Yarn inward
                            </NavLink>
                            {/* <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/billingreport' >
                                Billing Inward
                            </NavLink>
                            <NavLink className="btn btn-success button2  ms-3 mt-2 " to='/billpending' >
                                Bill pending
                            </NavLink> */}
                        </div>
                    </div>
                    <NavLink className="btn btn-success dashboardbutton mt-2" to='/setting' >
                        <IoMdSettings className='me-2' /> Setting
                    </NavLink>


                </div>

                {/* sidebar body ends here  */}



            </div>







        </>
    );
}


export default Computersidebar;