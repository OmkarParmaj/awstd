import React from "react";


import '../Assets/dashboard_card.css';


const DashboardCardComponent = ({ beamdrawn, beampending, cmonth, cmonth1, cmonth2, cmonth3, totalbeams, beammtr, t1, t2, t3, t4, mtr, price, tc1, tc2, tc4 }) => {
    return (
        <>

            <div className="card dashboarduppercard shadow">
                <div className="title  d-flex justify-content-end">
                   
                    <div className='col-8 '>
                        <p className="title-text" >
                            {t1}{cmonth}{t2}{cmonth1}{t3}{cmonth2} {t4}{cmonth3}
                        </p>
                    </div>
                    <div className='col-4 '>
                        <p className="percent  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                                </path>
                            </svg> 20%
                        </p>
                    </div>



                </div>
                <div className="data" >
                    <p>
                   {beamdrawn}{beampending}{totalbeams}{beammtr}{mtr}{price}
                     <span className="t1">{tc1}{tc2}{tc4}</span>
                    </p>
                    

                    <div className="range">
                        <div className="fill">
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default DashboardCardComponent;
