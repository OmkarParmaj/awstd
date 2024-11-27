






const FilterTableData = ({setSearchInput, setCurrentPage}) => {

    const Filter = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);
        setCurrentPage(1); // Reset current page to 1 when filtering
    }



    return (
        <>

            <div className='row ms-4 me-4 mt-4 mb-4 d-flex justify-content-end'>
                <div className="col-12 col-md-3">
                    <h6 className='text-start'>Search result using Design no</h6>
                    <input type='number' className="form-control" onChange={Filter} placeholder="search on Design no"></input>

                </div>


            </div>


        </>
    );
}



export default FilterTableData