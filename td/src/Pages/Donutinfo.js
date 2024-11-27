import React, { useEffect, useState } from 'react';

import axios from 'axios';



const Donutinfo = () => {

    const [readytodispatch, setReadytodispatch] = useState(0);
    const [onloom, setOnloom] = useState(0)
    const [onfloor, setOnFloor] = useState(0)
    const [undermending, setUndermending] = useState(0);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/beaminward', { withCredentials: true })
            .then(res => {
                //console.log(res.data)

                const data = res.data;
                const countOnLoom = data.filter(item => item.beamstatus === "Ready to dispatch").length;
                const countonloom = data.filter(item => item.beamstatus === "on loom").length;
                const countonfloor = data.filter(item => item.beamstatus === "on floor").length;
                const countundermending = data.filter(item => item.beamstatus === "under mending").length

                setLoading(false);

                setReadytodispatch(countOnLoom)
                setOnloom(countonloom);
                setOnFloor(countonfloor);
                setUndermending(countundermending);





            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    return (
        <>
            {
                loading ?
                    <div className='row'>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </div> :
                    <div>
                        <div className='ms-2 mb-4'>
                            <h3 clssName=''>Beam Design Status</h3>
                            <p className='ms-1'>Designwise beam status report as of today</p>

                        </div>


                        <div className='row ms-2' style={{ marginTop: "80px" }}>
                            <div className='col-12 col-md-6'>
                                <span className='fw-bold mt-4'>Beam Status</span>

                            </div>
                            <div className='col-12 col-md-6 d-flex justify-content-end'>
                                <span className='' style={{ marginLeft: "50px" }}>Total beams: <span className='fw-bold mt-4'>{readytodispatch + onloom + onfloor + undermending}</span></span>

                            </div>

                        </div>


                        <hr className='ms-2'></hr>

                        <div className='row'>
                            <div className='col-12 col-md-6 '>
                                <div className='row '>
                                    <div className='col-2 '>
                                        <div className='bg-primary' style={{ width: "14px", height: "10px", marginTop: "12px" }}></div>
                                        <div className='' style={{ width: "14px", height: "10px", marginTop: "12px", background: "#FFE15D" }}></div>
                                        <div className='' style={{ width: "14px", height: "10px", marginTop: "12px", background: "#00E396" }}></div>
                                        <div className='' style={{ width: "14px", height: "10px", marginTop: "12px", background: "#FF788F" }}></div>

                                    </div>
                                    <div className='col-10 '>
                                        <p className=' m-0'> Ready to dispatch</p>

                                        <p className=' m-0'>On Loom</p>

                                        <p className=' m-0'>On Floor</p>

                                        <p className=' m-0'>Under Mending</p>

                                    </div>

                                </div>



                            </div>
                            <div className='col-12 col-md-6'>
                                <p className='text-end m-0'>{readytodispatch}</p>
                                <p className='text-end m-0'>{onloom}</p>
                                <p className='text-end m-0'>{onfloor}</p>
                                <p className='text-end m-0'>{undermending}</p>

                            </div>

                            <div>
                                <button className='btn btn-primary mt-5 btn-sm'>Know More</button>
                            </div>

                        </div>

                    </div>

            }




        </>
    );
}


export default Donutinfo