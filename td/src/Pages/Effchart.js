
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

import getCurrentMonth from './Currentmonth';

const Effchart = () => {



    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false)



    const [eff, setEff] = useState([]);


    const currentmonth = getCurrentMonth();








    useEffect(() => {
        // Generate dates for the current month
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const datesArray = [];

        for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            datesArray.push(date.toLocaleDateString('en-GB')); // Format: DD/MM/YYYY
        }

        setDates(datesArray);
    }, []);


    //chart data

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/productiondashboard', { withCredentials: true })
            .then(res => {
                //console.log('API Response:', res.data);


                setLoading(false)


                const mydata = res.data;










                const avrageeff = mydata.map(ind => ({
                    date: ind.date,
                    eff: ind.aeff



                }))

                if (avrageeff) {
                    const mappedeff = avrageeff.map(item => ({
                        date: new Date(item.date).toLocaleDateString('en-GB'),
                        value: item.eff || null
                    }))
                    //console.log(mappedeff)

                    const effmap = mappedeff.reduce((acc, item) => {
                        acc[item.date] = item.value;
                        return acc;
                    }, {});

                    //console.log(effmap)
                    setEff(effmap);
                }





            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, []);



    const effdata = dates.map(date => eff[date] || null);


    const lineOptions2 = {
        chart: {
            type: 'line',
            height: 350,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#FF5733'],
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: dates,
            labels: {
                show: false, // Hide the x-axis labels
            },
        },
        yaxis: {
            title: {
                text: 'Avrage eff',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " avrageeff";
                },
            },
        },
        grid: {
            show: false, // Hide grid lines
        },
    };



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
                            options={lineOptions2}
                            series={[{ name: 'avragemtr', data: effdata }]}
                            type="line"
                            height={250}
                        />

                        <div className='d-flex align-items-center'>
                            <div className=' ms-3 mb-2 mt-1' style={{ width: "14px", height: "10px", background: "#FF7051" }}></div>
                            <span className='ms-3 mb-2'>: Total Eff per day for month of {currentmonth}</span>
                        </div>
                    </div>

            }



        </>
    );
}


export default Effchart