import React from 'react'

import './Assets/sidebar.css';

import { IoMenuSharp } from "react-icons/io5";
import Mobilesidebar from './sidebar/Mobilesidebar';
import Computersidebar from './sidebar/Computersidebar';

function Sidebar() {


    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div id='sideone' className='col-12 col-sm-2 leftone border border-1 sideone'>

                        <Computersidebar></Computersidebar>

                    </div>
                    <div className='col-12 col-sm-10 rightone border border-1'>


                        <Mobilesidebar></Mobilesidebar>
                        <div className='row border border-1 computerheader'>
                            <div className='col-12 col-sm-2 d-flex border border-1 '>
                                <span><IoMenuSharp className='menubuttonformobilesidebar' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" /></span>
                                <h6 className='avtarmobile'>omkar parmaj</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>









        </>
    )
}

export default Sidebar 