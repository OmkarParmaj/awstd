import react from 'react';

import { Link } from 'react-router-dom'



const Title = ({beaminward, bmurl, production, productionurl, billing, billingurl, setting, settingurl}) => {




    return (
        <>

            <div className="col-md-12 ">
                <div className="card  shadow-sm m-3 border border-0">
                    <div className="car-body">
                        <div className="row mt-2 mb-2">
                            <div className="col-md-6">
                                <h4 className="text-start ms-4 mt-2">{beaminward}{production} {billing} {setting}</h4>
                            </div>
                            <div className="col-md-6">
                                {/* <Link to={[bmurl, productionurl, billingurl, settingurl]} className="packingslipbutton text-decoration-none float-end">
                                    Report
                                </Link> */}
                                <Link  to={[`${bmurl}`, `${productionurl}`]} className="packingslipbutton text-decoration-none float-end">
                                    Report
                                </Link >
                               
                            </div>
                        </div>



                    </div>
                </div>
            </div>



        </>
    );
}



export default Title