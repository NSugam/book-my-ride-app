import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Loader from './Loader';

export default function VehicleCards(props) {
    const navigate = useNavigate();
    const states = useContext(Context);

    sessionStorage.removeItem("bikeId");
    const city = sessionStorage.getItem('city')
    const vtype = sessionStorage.getItem('vtype')
    const startDate = sessionStorage.getItem('startDate')
    const startTime = sessionStorage.getItem('startTime')
    const endDate = sessionStorage.getItem('endDate')
    const endTime = sessionStorage.getItem('endTime')
    const sortBy = sessionStorage.getItem('sortBy')

    const startDateTime = moment(`${startDate}T${startTime}`);
    const endDateTime = moment(`${endDate}T${endTime}`);

    const totalDays = endDateTime.diff(startDateTime, 'days');
    const Hours = endDateTime.diff(startDateTime, 'hours') % 24
    const totalHours = endDateTime.diff(startDateTime, 'hours')
    sessionStorage.setItem("totalHours", totalHours)

    const handleSubmit = async (e) => {

        if (e) {
            e.preventDefault();
        }
        axios.post(states.hostname + "/api/search/", { city, vtype, sortBy })
            .then(async res => {
                const result = res.data
                if (res.data === "Empty") {
                    sessionStorage.clear()
                    navigate('/')
                    props.showAlert("Sorry! Vehicle(s) are not available", "danger")
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
        handleSubmit();
    }, [sortBy, city, vtype, startDate, startTime]);

    const handleBooking = async (bikeId, rate) => {
        sessionStorage.setItem("rate", rate)
        navigate("/booking/" + bikeId);
    }

    if (!states.result.data.map) {
        return <Loader/>;
    }

    return (
        <>
            <div className="container m-auto p-2 bigContainer text-start rounded d-flex justify-content-between">
                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#ModifyDataModal">
                    Modify Details
                </button>

                <strong className='text-light mx-2'>Time Period: {totalDays} days {Hours} hours (Total: {totalHours} hrs) </strong>

                <select className="rounded p-2" value="" onChange={e => { sessionStorage.setItem('sortBy', e.target.value); handleSubmit(); }}>
                    <option value="" disabled>Sort by:</option>
                    <option value="rate">Price Rate</option>
                    <option value="cc">Lower cc</option>
                </select>

                <div className="modal fade" id="ModifyDataModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true"  >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-light" style={{ backgroundColor: "rgba(0, 60, 100, 0.8)" }}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Modify Search</h1>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <select id="inputState" className="form-select" defaultValue={city} onChange={e => { sessionStorage.setItem('city', e.target.value) }} required>
                                            <option value="" disabled>Choose your City...</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Hydrabad">Hydrabad</option>
                                            <option value="Delhi">Delhi</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <select id="inputState" className="form-select" defaultValue={vtype} onChange={e => { sessionStorage.setItem('vtype', e.target.value) }} required>
                                            <option value="" disabled> Choose Vehicle Type... </option>
                                            <option value="Scooter">Scooters (within city limit)</option>
                                            <option value="L300">Less than 300cc Motorcycle</option>
                                            <option value="M300">More than 300cc Motorcycle</option>
                                            <option value="Any">Any Available</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Pickup Date</label>
                                        <input type="date" className="form-control" defaultValue={startDate} onChange={e => { sessionStorage.setItem('startDate', e.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pickup Time</label>
                                        <input type="time" id="time" name="time" className="form-control" defaultValue={startTime} onChange={e => { sessionStorage.setItem('startTime', e.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> Drop Date</label>
                                        <input type="date" className="form-control" defaultValue={endDate} onChange={e => { sessionStorage.setItem('endDate', e.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label"> Drop Time</label>
                                        <input type="time" className="form-control" defaultValue={endTime} onChange={e => { sessionStorage.setItem('endTime', e.target.value) }} />
                                    </div>
                                    <div className='text-end'>
                                        <button type="submit" className="btn btn-outline-danger mt-2" onSubmit={handleSubmit} data-bs-dismiss="modal" aria-label="Close">Save Changes</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row appearfromTop">
                    {states.result.data.map(data => (
                        <div className="col-sm-4 mt-3 mb-3" key={data._id}>
                            <div className="card h-100 bigContainer text-light">
                                <a><img src={data.img} className="card-img-top" alt="Loading..." height={230} /></a>
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
                                        Price: <strong> Rs. {data.rate * totalHours}/-</strong>
                                    </div>
                                </div>
                                <div className=" d-flex card-footer justify-content-between">
                                    <small className="text-light text-start">Pickup: <strong> {data.city}</strong></small>
                                    <a onClick={() => handleBooking(data._id, data.rate)} className='btn btn-sm btn-outline-danger'>
                                        <strong>Book Now</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
