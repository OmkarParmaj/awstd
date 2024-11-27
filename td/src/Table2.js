import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableNav from './TableNav';
import FilterTableData from './FilterTableData';










const Table2 = () => {


    const [searchInput, setSearchInput] = useState('')
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState([]);

    const recordsPerPage = 5;


    useEffect(() => {
        axios.get('http://localhost:5000/tablepagination', { withCredentials: true })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

   



    return (
        <>
            <div className='container'>

            <FilterTableData setSearchInput={setSearchInput} setCurrentPage={setCurrentPage} ></FilterTableData>

            

                <div className='row'>
                    <div className='col'>
                        <h4>hi there</h4>
                        <table className='table table-bordered text-center'>
                            <thead>
                                <tr>
                                    <th>SR NO</th>
                                    <th>DATE</th>
                                    <th>TOTAL PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records && records.map((o, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                                        <td>{o.date}</td>
                                        <td>{o.totalprice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <TableNav searchInput={searchInput} setSearchInput={setSearchInput} data={data} setData={setData} currentPage={currentPage} setCurrentPage={setCurrentPage} records={records} setRecords={setRecords} recordsPerPage={recordsPerPage}>

                        </TableNav>

                    </div>
                </div>
            </div>

        </>
    );
}



export default Table2