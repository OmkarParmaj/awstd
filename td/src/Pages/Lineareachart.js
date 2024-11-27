
import axios from 'axios'
import { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';



const Lineareachart = () => {
    const [bills, setBills] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);
    const [loading, setLoading] = useState(false);





    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5000/productiondashboard', { withCredentials: true })
            .then(res => {



                const mydata = res.data;



                setLoading(false)



                const billing = mydata.map(ind => ({
                    date: ind.date,
                    bill: ind.bill

                }))

                if (billing) {
                    const mappedbill = billing.map(item => ({
                        date: new Date(item.date).toLocaleDateString('en-GB'),
                        value: item.bill || null
                    }))
                    //console.log(mappedbill)

                    const billmap = mappedbill.reduce((acc, item) => {
                        acc[item.date] = item.value;
                        return acc;
                    }, {});

                    //console.log(billmap);
                    setBills(billmap);

                }

                const billMap = new Map(billing.map(item => [item.date, item.bill]));

                // Extract dates and create the series data
                const dates = billing.map(item => item.date);
                const billdata = dates.map(date => billMap.get(date) || null);

                // Separate configuration for chart options
                const options = {
                    chart: {
                        type: 'area',

                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        categories: dates,
                        labels: {
                            show: false, // Hide the x-axis labels
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Bill Amount (Rs)'
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy'
                        }
                    },
                    grid: {
                        show: false, // Hide grid lines
                    },
                    colors: ['#00E396']
                };

                // Separate configuration for chart series
                const series = [
                    {
                        name: 'Billing Amount',
                        data: billdata
                    }
                ];

                // Update state with options and series
                setChartOptions(options);
                setChartSeries(series);




            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, []);



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
                    <div className=''>


                        <ReactApexChart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height={350}
                        />


                    </div>

            }





        </>
    );
    ;
}



export default Lineareachart;