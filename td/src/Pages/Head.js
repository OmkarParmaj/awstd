import React from 'react'
import { Link } from 'react-router-dom';


function Head() {
  return (
    <>
    <header id="header" className="header d-flex align-items-center fixed-top">
                <div className="container-fluid container-xl position-relative d-flex align-items-center">

                    <a href="index.html" className="logo d-flex align-items-center me-auto">
                        <img src="logo.png" alt=""/>
                            <h1 className="sitename"></h1>
                    </a>

                    <nav id="navmenu" className="navmenu">
                        
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    {/* <a className="btn-getstarted" href="index.html#about">Get Started</a> */}
                    <Link to="/login" className='btn-getstarted'>Get Started</Link>

                </div>
            </header>
    
    
    </>
  )
}

export default Head
