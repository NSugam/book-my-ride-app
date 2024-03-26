import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

export default function UserBookings(props) {

    const navigate = useNavigate();
    const states = useContext(Context);

    const getRentalDetails = async () => {

        axios.get(states.hostname + "/api/getRentalDetails")
            .then(async res => {
                const result = res.data
                if (result == "") {
                    sessionStorage.clear()
                    navigate('/')
                    props.showAlert("Sorry! you haven't booked any vehicles yet", "danger")
                } else {
                    await states.setResults({ data: result })
                }
            })
            .catch(err => {
                navigate('/login')
                props.showAlert(err.response.data, "danger")
            })
    };


    useEffect(() => {
        getRentalDetails();
    }, []);


    if (!states.result.data.map) {
        return <Loader/>;
    }

    return (
        <>
            <div className="container">
                <h3 className='text-light text-start'>All booking details</h3>
                <p className='text-light text-start'>All your completed and on-going bookings will be displayed here. You cannot delete or update any booking details here.</p>
                <hr />
                <div className="row appearfromTop">
                    {states.result.data.map(data => (
                        <div className="col-sm-4 mt-3 mb-3" key={data._id}>
                            <div className="card h-100 bigContainer text-light">
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", top: 0, right: 0, background: "rgba(0, 0, 0, 0.5)", color: "white", padding: "5px 10px" }}>
                                        On Going
                                    </span>
                                    <img src={data.img} className="card-img-top" alt="Loading..." height={230} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{data.bikeName} {data.modelName}</h5>
                                    <div className="card-text text-end table-responsive-xl">
                                        <div className='table-responsive'>
                                            <table className="bigContainer bg-dark table  text-center table-hover table-responsive">
                                                <thead >
                                                    <tr>
                                                        <th scope="col" className='bigContainer text-light'>Rate</th>
                                                        <th scope="col" className='bigContainer text-light'>Speed Limit</th>
                                                        <th scope="col" className='bigContainer text-light'>Engine</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='bigContainer text-light'>Rs. {data.rate} /per hr</td>
                                                        <td className='bigContainer text-light'>{data.limit}</td>
                                                        <td className='bigContainer text-light'>{data.cc} cc</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='table-responsive'>
                                            <table className="bigContainer bg-dark table  text-center table-hover table-responsive">
                                                <thead >
                                                    <tr>
                                                        <th scope="col" className='bigContainer text-light'>Pickup Date</th>
                                                        <th scope="col" className='bigContainer text-light'>Drop Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='bigContainer text-light'>{data.startDate}</td>
                                                        <td className='bigContainer text-light'>{data.endDate}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="text-start">
                                            Booked on: {new Date(data.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-start">
                                            Paid amount: Rs. {data.payment}
                                        </div>

                                    </div>
                                </div>
                                <div className=" d-flex card-footer justify-content-between">
                                    <small className="text-light text-start">Pick up Location: <strong> {data.city}</strong></small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
