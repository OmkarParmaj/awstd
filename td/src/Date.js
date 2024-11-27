import React from "react";




const inputdateformat = (data) => {
    const parsedate = new Date(data);

    const year = parsedate.getFullYear();
    const month = ('0' + (parsedate.getMonth() + 1)).slice(-2); // Months are zero indexed
    const day = ('0' + parsedate.getDate()).slice(-2);


    const newonedate = `${year}-${month}-${day}`;

    return newonedate;

}




const fulldayformat = (data) => {
    const parsedate = new Date(data);

    // const month = parsedate.getMonth() + 1;


    const day = parsedate.toLocaleString('en-us', { weekday: 'long' });

    return day;


} 


const fullmonthformat = (data) => {
    const parsedate = new Date(data);


     const month = parsedate.toLocaleString('en-us', { month: 'long' });

     return month
}

const shortdayformat = (data) => {
    const parsedate = new Date(data);

    // const month = parsedate.getMonth() + 1;


    const day = parsedate.toLocaleString('en-us', { weekday: 'short' });

    return day;


} 


const shortmonthformat = (data) => {
    const parsedate = new Date(data);


     const month = parsedate.toLocaleString('en-us', { month: 'short' });

     return month
}


const yearformat = (data) => {
    const parseyear = new Date(data);

    const year = parseyear.getFullYear();

    return year;
}
    

const dayformat = (data) => {
    const parsedate = new Date(data);

    const day = parsedate.getDate();


    return day;
}

const monthformat = (data) => {
    const parsemonth = new Date(data);

    const month = parsemonth.getMonth() + 1;

    return month;
}




export {inputdateformat} ;

export {fulldayformat};

export {fullmonthformat};


export {shortdayformat};

export {shortmonthformat};


export {yearformat};

export {dayformat};

export {monthformat}




