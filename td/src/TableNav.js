import React, { useEffect } from 'react';

const TableNav = ({ searchInput, setSearchInput, data, setData, currentPage, setCurrentPage, records, setRecords, recordsPerPage }) => {


    useEffect(() => {
        const filteredData = searchInput
            ? data.filter(s => s.DesignNo && s.DesignNo.toString().toLowerCase().includes(searchInput))
            : data;

        const firstIndex = (currentPage - 1) * recordsPerPage;
        const lastIndex = firstIndex + recordsPerPage;
        setRecords(filteredData.slice(firstIndex, lastIndex));
    }, [data, currentPage, searchInput]);





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




        </>
    );
}



export default TableNav;