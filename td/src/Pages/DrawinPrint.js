import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { inputdateformat } from 'reactjs-dateformat';
import axios from 'axios'





const DrawinPrint = () => {


    const { id1, id2 } = useParams();



    const [drawindata, setDrawindata] = useState([]);

    const [totalprice, setTotalprice] = useState(0);

    const [loading, setLoading] = useState(false);





    useEffect(() => {
        fetchdata();

    }, [])


    const fetchdata = () => {






        setLoading(true)

        axios.get(`http://localhost:5000/getdrawindata/data?startdate=${id1}&enddate=${id2}`, { withCredentials: true })
            .then(res => {
                // //console.log(res.data)
                if (res.data) {
                    setDrawindata(res.data);
                    setLoading(false);


                    const mydata = res.data
                    const filtereddata = mydata.map(value => value.drawinprice)
                    // //console.log(filtereddata)


                    const initialprice = 0;
                    const totalPrice = filtereddata.reduce((accumulator, currentValue) => accumulator + currentValue, initialprice);

                    // Set the total price in state
                    setTotalprice(totalPrice);
                    // //console.log(totalPrice);

                    setTimeout(() => {
                        window.print();
                    }, 100);


                }





            })
            .catch(err => {
                //console.log(err)
            })


    }

















    return (
        <>

            <div className="container-fluid">
                <div className="row">
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


                    }

                </div>

            </div>




        </>
    );
}



export default DrawinPrint;