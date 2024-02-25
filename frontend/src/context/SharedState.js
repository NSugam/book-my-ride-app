import { useState, useEffect } from 'react';
import { createContext } from "react";

const Context = createContext();

const SharedState = (props) => {

    const hostname = "http://localhost:9090"

    const [city, setCity] = useState();
    const [vtype, setVtype] = useState();
    const [dateString, setDate] = useState();
    const [timeString, setTime] = useState();
    const [bikeId, setBikeId] = useState();

    const [result, setResults] = useState({data: {}});
    const [booking, setBooking] = useState({data: {}});


    return (
        <Context.Provider value={{
            hostname,
            booking, setBooking,
            result, setResults, 
            city, setCity, 
            vtype, setVtype, 
            dateString, setDate, 
            timeString, setTime,
            bikeId, setBikeId
        }}>

            {props.children}

        </Context.Provider>
    );
};

export { Context, SharedState };
