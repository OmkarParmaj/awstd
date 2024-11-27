import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import Currentmonth from './Currentmonth';
import getCurrentMonth from './Currentmonth';



const Meterlinechart = () => {

    const [mtrData, setMtrData] = useState({});
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);



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


    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/productiondashboard', { withCredentials: true })
            .then(res => {
                //console.log('API Response:', res.data);


                setLoading(false)
                const mydata = res.data;











                const readydata = mydata.map(ind => ({
                    date: ind.date,
                    meter: ind.avragemtr
                }));

                // Assuming the response is an array of objects
                const mtrArray = readydata || [];

                // Check if the array is not empty and properly formatted
                if (Array.isArray(mtrArray) && mtrArray.length > 0) {
                    // Map the data to extract dates and mtr values
                    const mappedData = mtrArray.map(item => ({
                        date: new Date(item.date).toLocaleDateString('en-GB'), // Format the date
                        value: item.meter || null // Default to 0 if value is undefined
                    }));

                    //console.log('Mapped Data:', mappedData);

                    // Create a mapping of date to value
                    const mtrMap = mappedData.reduce((acc, item) => {
                        acc[item.date] = item.value;
                        return acc;
                    }, {});

                    //console.log('Mtr Map:', mtrMap);

                    // Set the data for the chart
                    setMtrData(mtrMap);
                } else {
                    console.error('Expected avragemtr to be a non-empty array, but got:', mtrArray);
                }
            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, []);



    const lineOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#FFE15D'],
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
                text: 'Avrage Meter (mtr)',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " avragemtr";
                },
            },
        },
        grid: {
            show: false, // Hide grid lines
        },
    };

    const chartData = dates.map(date => mtrData[date] || null);

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
                            options={lineOptions}
                            series={[{ name: 'avragemtr', data: chartData }]}
                            type="line"
                            height={250}
                        />
                        <div className='d-flex align-items-center'>
                            <div className=' ms-3 mb-2 mt-1' style={{ width: "14px", height: "10px", background: "#FFE15D" }}></div>
                            <span className='ms-3 mb-2'>: Total meter per day for month of {currentmonth}</span>
                        </div>
                    </div>

            }





        </>
    );
}


export default Meterlinechart