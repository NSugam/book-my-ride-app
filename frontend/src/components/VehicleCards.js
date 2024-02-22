import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VehicleCards(props) {
    const navigate = useNavigate();
    const states = useContext(Context);

    const city = sessionStorage.getItem('city')
    const vtype = sessionStorage.getItem('vtype')
    const dateString = sessionStorage.getItem('dateString')
    const timeString = sessionStorage.getItem('timeString')

    const handleSubmit = async (e) => {

        if (e) {
            e.preventDefault();
        }
        axios.post("http://localhost:9090/api/search/", { city, vtype })
            .then(res => {
                const result = res.data
                if (res.data === "Empty") {
                    props.showAlert("Sorry! Vehicle(s) are not available", "danger")
                    navigate('/')

                } else {
                    if (e) {
                        window.location.reload(false)
                    }
                    states.setResults({ data: result })
                }
            })
            .catch(err => {
                navigate('/login')
                props.showAlert(err.response.data, "danger")
            })
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleBooking = async (bikeId) => {
        sessionStorage.setItem('bikeId', bikeId)
        const bikeId2 = sessionStorage.getItem('bikeId')
        console.log(bikeId)
        const res = await axios.put("http://localhost:9090/api/handlebooking", { bikeId })
        const vehicledata = await res.data.Vehicle
        console.log("From server res", vehicledata)
        await states.setBooking({ data: vehicledata })
        console.log(states.booking)
        // navigate('/booking')
    }

    if (!states.result.data.map) {
        return <p className='text-light'>Loading Data...</p>;
    }

    return (
        <>
            <div className="container m-auto p-2 bigContainer text-start rounded" role="alert">
                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Modify Details
                </button>
                <strong className='text-light mx-2'>Crossing speed limit is strictly prohibited</strong>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-light" style={{ backgroundColor: "rgba(0, 60, 100, 0.8)" }}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modify Search</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <select id="inputState" className="form-select" defaultValue={city} onChange={e => { sessionStorage.setItem('city', e.target.value) }} required>
                                            <option value="" disabled>Choose your City...</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Hydrabad">Hydrabad</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Chennai">Chennai</option>
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
                                        <input type="date" className="form-control" defaultValue={dateString} onChange={e => { sessionStorage.setItem('dateString', e.target.value) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pickup Time</label>
                                        <input type="time" id="time" name="time" className="form-control" defaultValue={timeString} onChange={e => { sessionStorage.setItem('timeString', e.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> Drop Date</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label"> Drop Time</label>
                                        <input type="time" className="form-control" />
                                    </div>
                                    <div className='text-end'>
                                        <button className="btn btn-outline-danger">Save changes</button>
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
                                                        <th scope="col" className='bigContainer text-light'>Engine</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='bigContainer text-light'>Rs. {data.rate}/per hr<br />Rs. {data.rate * 24}/per day</td>
                                                        <td className='bigContainer text-light'>{data.limit}</td>
                                                        <td className='bigContainer text-light'>{data.cc} cc</td>
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
                                    <a onClick={() => handleBooking(data._id)} className='btn btn-sm btn-outline-danger link-underline-opacity-50-hover'>
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
