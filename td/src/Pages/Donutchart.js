import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';





const Donutchart = () => {
    const [readytodispatch, setReadytodispatch] = useState(0);
    const [onloom, setOnloom] = useState(0)
    const [onfloor, setOnFloor] = useState(0)
    const [undermending, setUndermending] = useState(0);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);

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


    const options = {
        series: [readytodispatch, onloom, onfloor, undermending], // Series data as an array of numbers
        chart: {
            type: 'donut',
        },
        responsive: [{
            // breakpoint: 480,
            // options: {
            //     chart: {
            //         width: 100
            //     }
            // }
        }],
        labels: ['Ready to Dispatch', 'On Loom', 'On Floor', 'Under Mending'],
        legend: {
            show: false // Hide the legend
        },
        dataLabels: {
            enabled: false // Hide data labels
        }
    };

    // Define the chart's type and height
    const chartType = 'donut';
    const chartHeight = 350; // You can adjust this value



    return (
        <>
            {
                loading ?
                    <div className='row' style={{ height: "350px" }}>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </div> :
                    <div>
                        <ApexCharts
                            options={options}
                            series={options.series}
                            type={chartType}
                            height={chartHeight}
                        />
                    </div>


            }






        </>
    );
}


export default Donutchart