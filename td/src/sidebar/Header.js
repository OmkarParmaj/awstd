

import '../Assets/sidebar.css';
import { FcBusinessman } from "react-icons/fc";
import { IoMenuSharp } from "react-icons/io5";
import '../Assets/header.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import GlassContainer from '../Pages/GlassContainer';

import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";


import { Link, Navigate, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useEffect, useState } from 'react';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {

    

    const navigate = useNavigate();
    const [companyname, setCompanyname] = useState("");


    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:5000/headerinfo', { withCredentials: true })
            .then(res => {
                const company = res.data[0].Name;
                // console.log(res.data);

                setCompanyname(company);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    // const handlelogout = () => {
    //    return setIsLoggedIn(false);
    // }
    const handleLogout = async () => {
        setLoading(true)
     
        try {
             const res = await axios.post('http://localhost:5000/logout', {}, {withCredentials: true});
             console.log(res.data.message);
             setIsLoggedIn(false);
            // window.location.href = '/loggedout';

            setLoading(false);

        } catch (err) {
            console.error('Logout error:', err.response ? err.response.data : err.message);
            
        }
      




        
        
    };

    if (isLoggedIn === false) {
        return <Navigate to='/login' replace></Navigate>
    }






    return (
        <>

            <div className='row  computerheader shadow-sm mobileheader'>
                <ToastContainer></ToastContainer>
                <div className='col-12 col-sm-2 d-flex justify-content-end me-3'>
                    <span><IoMenuSharp className='menubuttonformobilesidebar' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" /></span>
                    <div className=' mt-1'>
                        <div className="dropdown">
                            <button className="border-0 bg-white " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Stack direction="row" spacing={2}>

                                    <Avatar>O</Avatar>
                                </Stack>
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item text-center">{companyname}</span></li>
                                <li className='mt-1'><Link className="dropdown-item text-center" to="/dashboard" ><IoHomeOutline /><span className="ms-2">HOME</span></Link></li>
                                <li className='mt-1'><Link className="dropdown-item text-center" to="/profilesetting"><CgProfile /><span className="ms-2">PROFILE</span></Link></li>
                                <li className='mt-1'><button className="dropdown-item text-center" onClick={handleLogout}  ><TbLogout2 />
                                <span className="ms-2">LOG OUT</span></button></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>


            <div>
                {
                    loading === true ?
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


export default Header;
