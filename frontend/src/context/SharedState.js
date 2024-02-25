import { useState, useEffect } from 'react';
import { createContext } from "react";

const Context = createContext();

const SharedState = (props) => {

    const hostname = "http://localhost:9090"

    const [city, setCity] = useState();
    const [vtype, setVtype] = useState();
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();

    const [result, setResults] = useState({data: {}});
    const [booking, setBooking] = useState({data: {}});


    return (
        <Context.Provider value={{
            hostname,
            booking, setBooking,
            result, setResults, 
            city, setCity, 
            vtype, setVtype, 
            startDate, setStartDate, 
            startTime, setStartTime,
        }}>

            {props.children}

        </Context.Provider>
    );
};

export { Context, SharedState };
