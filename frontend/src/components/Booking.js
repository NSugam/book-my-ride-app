import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/SharedState';
import axios from 'axios';

export default function Booking() {
    const states = useContext(Context);
    
    const handleBooking = async () => {
        const bikeId = sessionStorage.getItem('bikeId')
        const res = await axios.post("http://localhost:9090/api/handlebooking", { bikeId })
        const vehicledata = await res.data.Vehicle
        const save = await states.setBooking({data: vehicledata})
        console.log(states.booking)
        sessionStorage.setItem('bikeId', bikeId)
    }

    useEffect(() => {
        handleBooking();
    }, []);

    if (!states.booking.data.map) {
        return <p className='text-light'>Loading Data...</p>;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {states.booking.data.map(data => (
                        <div className="col-sm-4 mt-2" key={data._id}>
                            <div className="card h-100 bigContainer text-light">
                                <a className="link-hover hover-zoom" href="#"><img src={data.img} className="card-img-top" alt="Loading..." height={230} /></a>
                                <div className="card-body">
                                    <h5 className="card-title">{data.bikeName} {data.modelName}</h5>
                                    <div className="card-text text-start table-responsive-xl">
                                        <div className='table-responsive'>
                                            <table className="bigContainer bg-dark table  text-center table-hover table-responsive">
                                                <thead >
                                                    <tr>
                                                        <th scope="col" className='bigContainer text-light'>Rate</th>
                                                        <th scope="col" className='bigContainer text-light'>Speed Limit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='bigContainer text-light'>Rs. {data.rate}/per hr<br />Rs. {data.rate * 24}/per day</td>
                                                        <td className='bigContainer text-light'>{data.limit}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        Pickup Location: <strong> {data.city}</strong>
                                    </div>
                                </div>
                                <div className=" d-flex card-footer justify-content-between">
                                    <small className="text-light text-start"><strong>
                                        {data.vType === "M300" ? "High CC Motorcycle" : "Lower CC Motorcycle"} </strong></small>
                                    <Link to="/booking" className='link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover'>
                                        <strong>Book Now</strong>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
