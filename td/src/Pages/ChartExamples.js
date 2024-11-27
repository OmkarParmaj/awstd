
// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
import Computersidebar from "../sidebar/Computersidebar";
import Mobilesidebar from "../sidebar/Mobilesidebar";


import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

import Header from "../sidebar/Header";


const ChartExamples = ({ ohh }) => {

  const yes = ohh;
 
 console.log(yes)

  // const myonedata = [
  //   {
  //     date: "11-1-2024",
  //     value: 102

  //   }
  //   ,
  //   {
  //     date: "12-1-2024",
  //     value: 105
  //   },
  //   {
  //     date: "13-1-2024",
  //     value: 107
  //   },
  //   {
  //     date: "14-1-2024",
  //     value: 101
  //   },
  //   {
  //     date: "15-1-2024",
  //     value: 108
  //   },
  //   {
  //     date: "16-1-2024",
  //     value: 110
  //   },
  //   {
  //     date: "17-1-2024",
  //     value: 105
  //   },
  //   {
  //     date: "18-1-2024",
  //     value: 123
  //   }

  // ]


  return (
    <>

      <div className='container-fluid'>
        <div className='row'>
          <div id='sideone' className='col-12 col-sm-2 leftone sideone'>

            <Computersidebar></Computersidebar>

          </div>
          <div className='col-12 col-sm-10 rightone dashboardmain border border-1'>
            <Mobilesidebar></Mobilesidebar>

            {/* header section strts here  */}
            <Header ></Header>

            {/* header section ends here  */}


            {/* cards section starts here  */}


            {/* cards section ends here  */}


            <div className="row">
              <div className="col-12 border border-1 col-md-6  d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                {/* <h3>hi there</h3> */}
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={ohh}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="srno" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avragemtr" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                  </LineChart>
                </ResponsiveContainer>

              </div>

            </div>



          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6'>

          </div>
        </div>
      </div>




    </>
  );
}



export default ChartExamples;