








const filtertabledata = (e, setFilteredData, fetchedData, columnname) => {
    const number = e.target.value.toLowerCase();
    const filtered = fetchedData.filter(s => s[columnname] && s[columnname].toString().toLowerCase().includes(number));
    return setFilteredData(filtered);
}

export default filtertabledata;
