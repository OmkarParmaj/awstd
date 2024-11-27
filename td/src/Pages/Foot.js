import React from 'react'
import { FaXTwitter, FaInstagram, FaFacebook   } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from 'react-router-dom';


function Foot() {
    return (
        <>

            <footer id="footer" className="footer position-relative">

                <div className="container footer-top">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6 footer-about">
                            <a href="index.html" className="logo d-flex align-items-center">
                            <img src="tdlogo.png" alt=""/>
                                {/* <span className="sitename">QuickStart</span> */}
                            </a>
                            <div className="footer-contact pt-3">
                                <p>8/251/1, Vikram nagar near Bishops English</p>
                                <p>school, Ichalkaranji, India 416 115</p>
                                <p className="mt-3"><strong>Phone:</strong> <span>+91 8624934453</span></p>
                                <p><strong>Email:</strong> <span>textilediwanji@gmail.com</span></p>
                            </div>
                            <div className="social-links d-flex mt-4">
                                {/* <a href=""><i className="bi bi-twitter-x"></i></a> */}
                                <a href=""><FaXTwitter className='bi bi-twitter-x' /></a>
                                
                                
                                <a href=""><FaFacebook className='bi bi-facebook' /></a>
                               
                                <a href=""><FaInstagram  className='bi bi-instagram' /></a>
                               
                                <a href=""><IoLogoLinkedin  className='bi bi-linkedin' /></a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Terms of service</a></li>
                                <li><a href="#">Privacy policy</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><a href="#">Weaving Operations</a></li>
                                <li><a href="#">Fabric trading</a></li>
                                <li><a href="#">Yarn Market</a></li>
                                <li><a href="#">Fabric program lead</a></li>
                                <li><a href="#">Sizing Program lead</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-12 footer-newsletter">
                            <h4>Our Newsletter</h4>
                            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
                            <form action="forms/newsletter.php" method="post" className="php-email-form">
                                <div className="newsletter-form"><input type="email" name="email"/><input type="submit" value="Subscribe"/></div>
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your subscription request has been sent. Thank you!</div>
                                </form>
                                </div>

                        </div>
                    </div>

                    <div className="container copyright text-center mt-4">
                        <p>© <span>Copyright</span> <strong className="px-1 sitename">Textilediwanji</strong><span>All Rights Reserved</span></p>
                        <div className="credits">
                           
                            {/* Designed by <a href="https://bootstrapmade.com/">Omkar Parmaj</a> */}
                        </div>
                    </div>

            </footer>





        </>
    )
}

export default Foot
