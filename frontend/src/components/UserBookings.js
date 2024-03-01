import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

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
        return <p className='text-light'>Loading Data...</p>;
    }

    return (
        <>
            <div className="container">
                <div className="row appearfromTop">
                    {states.result.data.map(data => (
                        <div className="col-sm-4 mt-3 mb-3" key={data._id}>
                            <div className="card h-100 bigContainer text-light">
                                <a className="link-hover hover-zoom" href="#"><img src={data.img} className="card-img-top" alt="Loading..." height={230} /></a>
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
                                                        <th scope="col" className='bigContainer text-light'>Pickup</th>
                                                        <th scope="col" className='bigContainer text-light'>Drop details</th>
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
                                    </div>
                                </div>
                                <div className=" d-flex card-footer justify-content-between">
                                    <small className="text-light text-start">Picked up from: <strong> {data.city}</strong></small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
