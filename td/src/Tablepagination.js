import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tablepagination = () => {
    const [searchInput, setSearchInput] = useState('')
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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

    const Filter = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);
        setCurrentPage(1); // Reset current page to 1 when filtering
    }

    useEffect(() => {
        const filteredData = searchInput
            ? data.filter(s => s.totalprice && s.totalprice.toString().toLowerCase().includes(searchInput))
            : data;

        const firstIndex = (currentPage - 1) * recordsPerPage;
        const lastIndex = firstIndex + recordsPerPage;
        setRecords(filteredData.slice(firstIndex, lastIndex));
    }, [data, currentPage, searchInput]);

    const [records, setRecords] = useState([]);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changeCPage = (n) => {
        setCurrentPage(n);
    };

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = () => {
        setCurrentPage(Math.ceil(data.length / recordsPerPage));
    };

    


    const npage = Math.ceil(data.length / recordsPerPage);
    // Calculate pagination numbers to display based on current page
    const paginationStart = currentPage > 3 ? currentPage - 2 : 1;
    const paginationEnd = paginationStart + 4 > npage ? npage : paginationStart + 4;
    const numbers = Array.from({ length: paginationEnd - paginationStart + 1 }, (_, index) => paginationStart + index);

    return (
        <>
            <div className='container'>

                <div className='row ms-4 me-4 mt-4 mb-4 d-flex justify-content-end'>
                    <div className="col-12 col-md-3">
                        <h6 className='text-start'>Search result using Design no</h6>
                        <input type='number' className="form-control" onChange={Filter} placeholder="search on Design no"></input>

                    </div>


                </div>




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
                        <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <button className='page-link' onClick={firstPage}>First</button>
                                </li>
                                <li className='page-item'>
                                    <button className='page-link' onClick={prePage}>Prev</button>
                                </li>
                                {numbers.map((n) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                                        <button className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                                    </li>
                                ))}
                                <li className='page-item'>
                                    <button className='page-link' onClick={nextPage}>Next</button>
                                </li>
                                <li className='page-item'>
                                    <button className='page-link' onClick={lastPage}>Last</button>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Tablepagination;
