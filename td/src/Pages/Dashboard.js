
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";
import Cookies from 'js-cookie';
import { } from 'reactjs-dateformat'

import { FaEye } from "react-icons/fa";

import Lineareachart from './Lineareachart';

import Effchart from './Effchart';
import Meterlinechart from './Meterlinechart';
import Mtrbarchart from './Mtrbarchart';
import Donutchart from './Donutchart';
import Donutinfo from './Donutinfo';
import getCurrentMonth from './Currentmonth';
import Loomstatustable from './Loomstatustable';


// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

import { inputdateformat } from 'reactjs-dateformat';
import '../Assets/sidebar.css'


import '../Assets/dashboard.css'

import '../Assets/packingslip.css';


import React, { PureComponent } from 'react';




import Header from "../sidebar/Header";
import DashboardCardComponent from "../Page_Components/DashboardCardComponent";
// import { Navigate } from "react-router-dom";




import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, } from 'recharts';
// import { LineChart, Line } from 'recharts';

import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';








const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {


  const [newonedate, setNewonedate] = useState([]);
  const [chartmtr, setChartmtr] = useState([]);
  const [ohh, setOhh] = useState([])

  const [beampending, setBeampending] = useState(0);


  const [number2, setNumber2] = useState("");


  const [sessionstatus, setSessionstatus] = useState(false);

  const [toggle, setToggle] = useState(false)


  const currentmonth = getCurrentMonth()






  const [mydate, setMydate] = useState([])

  const [t1, setT1] = useState("Beams");
  const [t2, setT2] = useState("Sizing meter");
  const [t3, setT3] = useState("Total fabric mtr");
  const [t4, setT4] = useState("Billing");

  const [tc1, setTc1] = useState("Nos")

  const [tc2, setTc2] = useState("Mtr")

  const [tc4, setTc4] = useState("Rs")


  const [chart, setChart] = useState([]);
  const [amo, setAmo] = useState();
  const [production, setProduction] = useState([]);
  const [mtr, setMtr] = useState([]);
  const [price, setPrice] = useState(0);
  const [smeter, setSmeter] = useState([]);
  const [totalbeams, setTotalbeams] = useState([]);
  const [linech, setLinech] = useState([]);
  const [prosrno, setProsrno] = useState([]);
  const [pending, setPending] = useState([]);
  const [eff, setEff] = useState([]);
  const [totalbills, setTotalbills] = useState("");
  const [paidbills, setPaidbills] = useState("");

  const [details, setDetails] = useState([])


  const [mymtrdata, setMymtrdata] = useState([]);
  const [cmonth, setCmonth] = useState("");



  const navigate = useNavigate();

  // const amount = useSelector((select) => select.value.value);

  // const designno = useSelector((sele) => sele.value.packing.DesignNo)










  useEffect(() => {
    // Get current month and set the month name
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    setCmonth(monthNames[currentMonth]);
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  useEffect(() => {
    axios.get('http://localhost:5000/fabricpendingreportdata', { withCredentials: true })
      .then(res => {



        const fabricpendingdata = res.data;

        const filtereddata = fabricpendingdata.filter(item => item.fabricpercentage < 85 && item.designsolved === "unsolved");

        const omkar = fabricpendingdata.filter(item => item.datediff < 25);
        const f1 = filtereddata.length
        const f2 = omkar.length




        setNumber2(f1 - f2);
      })
      .catch(err => {
        //console.log(err);
      })
  }, [])

  useEffect(() => {
    fetchdata()
  }, [])

  const fetchdata = () => {
    axios.get('http://localhost:5000/beaminwardreport', {
      withCredentials: true
    })
      .then((res) => {

        // //console.log(res.data);

        const mydata = res.data

        let nullCount = 0;
        let numberCount = 0;

        mydata.forEach(info => {
          if (info.drawinprice > 1) {
            nullCount++; // Increment null count if drawinprice is null
          } else if (info.drawinprice < 1 && info.club === "nonclub") {
            numberCount++; // Increment number count if drawinprice is a valid number
          }
        });


        setBeampending(numberCount)





      })
      .catch((err) => {
        // //console.log("error to fetch the data", err);
      })
  }



  useEffect(() => {
    axios.get('http://localhost:5000/loomstatusdata', { withCredentials: true })
      .then(res => {
        // //console.log(res)





        const ldata = res.data;
        const sortedloomdata = [...ldata].sort((a, b) => a.loomno - b.loomno);



        setDetails(sortedloomdata);







      })
      .catch(err => {
        //console.log(err);
      })
  }, [])





  useEffect(() => {
    const handlePopState = () => {
      setIsLoggedIn(false);
      navigate('/login');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);



  useEffect(() => {
    axios.get('http://localhost:5000/billdisplaydashboard', { withCredentials: true })
      .then(res => {
        // //console.log(res.data);

        const bby = res.data[0].totalbills;
        setTotalbills(bby);
      })
      .catch(err => {
        //console.log(err);
      })
  }, [])



  useEffect(() => {
    axios.get('http://localhost:5000/totalpaidbillsdashboard', { withCredentials: true })
      .then(res => {

        const paid = res.data[0].totalpaid;
        setPaidbills(paid);

      })
      .catch(err => {
        //console.log(err);
      })
  }, [])







  useEffect(() => {

    axios.get('http://localhost:5000/billreport2', { withCredentials: true })
      .then(res => {
        // //console.log(res.data)
        setAmo(res.data[0].total_amount);
      })
      .catch(err => {
        // //console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/bill2', { withCredentials: true })
      .then(res => {
        // //console.log(res.data[0])
        setPending(res.data[0].pending);
      })
      .catch(err => {
        // //console.log(err);
      })
  }, [])





  useEffect(() => {

    axios.get('http://localhost:5000/productiondashboard', { withCredentials: true })
      .then(res => {


        const productionData = res.data;
        const setnoList = productionData.flatMap(item => {
          const parsedData = JSON.parse(item.productiontable);
          return parsedData; // Assuming parsedData is an array of objects
        });

        // Calculate sum of mtr where designno is '8855'
        // let sumMtr = 0;
        // setnoList.forEach(item => {
        //   if (item.designno === "5456") {
        //     sumMtr += parseFloat(item.mtr); // Convert mtr to float if needed
        //   }
        // });

        const filteredData = setnoList.map(item => ({
          designno: item.designno,
          mtr: item.mtr
        }));

        //console.log("Sum of mtr where designno is '8855':", filteredData);











        // //console.log(res.data);
        setOhh(res.data);










      })
      .catch(err => {
        //console.log(err);
      })

  }, [])








  useEffect(() => {

    axios.get('http://localhost:5000/board2', { withCredentials: true })
      .then(res => {
        // //console.log(res.data);
        setChart(res.data);
      })
      .catch(err => {
        // //console.log("err in the database", err);
      })

  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/sizingmtr', { withCredentials: true })
      .then(res => {
        // //console.log(res.data);
        const size = res.data[0].sizingmeter;
        setSmeter(size);
        setTotalbeams(res.data[0].designno);
      })
      .catch(err => {
        // //console.log(err);
      })
  }, [])

  useEffect(() => {

    axios.get('http://localhost:5000/totalmtrinproduction', { withCredentials: true })
      .then(res => {
        // //console.log(res.data);
        setMtr(res.data[0].Totalmeter);
        setPrice(res.data[0].Totalprice);


      })
      .catch(err => {
        // //console.log(err);
      })

  }, [])



  if (isLoggedIn === false) {
    return <Navigate to='/login' replace></Navigate>
  }


  const seeprice = () => {
    setToggle(prevState => !prevState)
  }

  return (
    <>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-sm-2 leftone sideone '>

            <Computersidebar></Computersidebar>

          </div>
          <div className='col-12 col-sm-10 rightone dashboardmain border border-1'>
            <Mobilesidebar></Mobilesidebar>

            {/* header section strts here  */}
            <Header setIsLoggedIn={setIsLoggedIn}></Header>

            {/* header section ends here  */}


            {/* cards section starts here  */}
            <div className="row d-flex justify-content-center align-items-center cards  mt-4 mb-4 p-3">
              <div className="col-sm-3 col-12 column1">
                <DashboardCardComponent cmonth={` in ${cmonth}`} tc1={tc1} totalbeams={totalbeams} t1={t1}></DashboardCardComponent>

              </div>
              <div className="col-sm-3 col-12 column2">
                <DashboardCardComponent cmonth1={` in ${cmonth}`} tc2={tc2} beammtr={smeter} t2={t2} />
              </div>
              <div className="col-sm-3 col-12 column3">
                <DashboardCardComponent cmonth2={` in ${cmonth}`} tc2={tc2} mtr={mtr} t3={t3}></DashboardCardComponent>
              </div>
              <div className="col-sm-3 col-12 column4">
                <div className="card dashboarduppercard shadow">
                  <div className="title  d-flex justify-content-end">

                    <div className='col-8 '>
                      <p className="title-text" >
                        {t4}{cmonth}
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
                    <div className="row">
                      <div className="col-9">
                        {
                          toggle === false ? <p>*****</p> :
                            <p>
                              {price.toFixed(0)}
                              <span className="t1">{tc4}</span>
                            </p>
                        }

                      </div>
                      <div className="col-3">

                        <div style={{ height: "15px", width: "15px" }} className="d-flex justify-content-center align-items-center">
                          <button onClick={seeprice} style={{border: "none", textDecoration: "none"}}><FaEye /></button>
                        </div>


                      </div>

                    </div>



                    <div className="range">
                      <div className="fill">
                      </div>
                    </div>
                  </div>
                </div>
                {/* <DashboardCardComponent cmonth3={` in ${cmonth}`} t4={t4} tc4={tc4} price={price ? price.toFixed(2) : price}></DashboardCardComponent> */}
              </div>
            </div>

            <div className='row mt-3 '>
              <div className=' col-12 '>
                <div className='ms-2 me-2 bg-white border rounded-3'>

                  <Mtrbarchart></Mtrbarchart>


                </div>
              </div>

            </div>




            <div className="row   mt-2 mb-5 ">
              <div className=' col-6'>
                <div className='ms-2 me-2 mt-3 p-2 mb-3 bg-white border rounded-3'>

                  <Meterlinechart></Meterlinechart>
                </div>

              </div>
              <div className=' col-6'>
                <div className='ms-2 me-2 mt-3 p-2 mb-3 bg-white border rounded-3'>
                  <Effchart></Effchart>
                </div>

              </div>

            </div>








            <div className='row '>
              <diV className='col-4  '>
                <Donutinfo></Donutinfo>

              </diV>


              <div className='col-8 '>
                <div className='row'>
                  <div className='col-6'>
                    <div className='' style={{ marginTop: "90px" }} id="chart">

                      <Donutchart></Donutchart>
                    </div>

                  </div>


                  <div className='col-6'>
                    <h3>Daily Billing Report</h3>
                    <p>Billing per day report for the month {currentmonth}</p>
                    <Lineareachart></Lineareachart>

                  </div>

                </div>

              </div>



            </div>


            <div className="row mt-4">
              <div className="col-12 col-md-12">
                <div className="card border-0 ">

                  <div className="card-body scroll">
                    <div class="row justify-content-between">
                      <div class="col-4">
                        <h5 className='mb-5'>Loom Status</h5>
                      </div>
                      <div class="col-4  d-flex justify-content-end">
                        {/* <Link to='/loomstatus' type="button" class="btn btn-outline-primary text-decoration-none btn-sm me-3">UPDATE STATUS</Link> */}
                      </div>
                    </div>

                    <Loomstatustable></Loomstatustable>



                  </div>

                </div>

              </div>



            </div>















          </div>
        </div>
      </div>


    </>
  );
}


export default Dashboard;
