import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/SharedState';
import axios from 'axios';
import Loader from './Loader';

export default function Booking(props) {
    const states = useContext(Context);
    const navigate = useNavigate()
    const { bikeId } = useParams()

    //calculating total amount to be payed and to store in db
    const totalHours = sessionStorage.getItem('totalHours')
    const rate = sessionStorage.getItem("rate")
    const taxRate = 0.13;
    const payment = Math.round((rate * totalHours) * (1 + taxRate))

    const [user, setUser] = useState({ data: {} });

    const getBookingData = async () => {
        axios.put(states.hostname + "/api/handlebooking/?bikeId=" + bikeId).then(res => {
            const vehicle = res.data.details
            const user = res.data.user
            setUser({ data: user })
            states.setBooking({ data: vehicle })
        }).catch(err => {
            props.showAlert("Data not found! Don't interfere with the URL pattern", "danger")
            navigate("/search")
        })
    }
    useEffect(() => {
        getBookingData();
    }, []);

    const submitBooking = async () => {

        console.log("Amount",rate)
        console.log("Payment",payment)

        const data = {
            bikeId: bikeId,
            startDate: sessionStorage.getItem('startDate'),
            startTime: sessionStorage.getItem('startTime'),
            endDate: sessionStorage.getItem('endDate'),
            endTime: sessionStorage.getItem('endTime'),
            payment: payment
        };
        axios.put(states.hostname + "/api/handlebooking/checkout", data)
            .then(res => {
                navigate('/')
                props.showAlert("Booking Confirmed!", "success")

            }).catch(err => {
                if (err.response.status == '409') {
                    props.showAlert("Booking already done for this vehicle", "danger")
                    sessionStorage.clear()
                    navigate("/")
                }
                if (err.response.status == '500') {
                    props.showAlert("Data not found! Don't interfere with URL pattern", "danger")
                    navigate("/search")
                }
            })
    }

    const handleCoupon = () => {
        props.showAlert("Invalid Coupon Code", "danger")
    }


    if (!states.booking.data.map || !user.data.map) {
        return (
            <>
                <Loader/>
            </>
        );
    }

    return (
        <>

            <div className="container m-auto p-2 bigContainer text-start rounded">
                <marquee className='fw-bold text-danger mx-2'>
                    Crossing speed limit is strictly prohibited. Rs.1000/- will be fined each time the speed limit is crossed.
                    Every vehicles are attached with a realtime-GPS system for your safety! </marquee>
            </div>

            <div className="container mt-4">
                <div className="row">

                    {user.data.map(user => (
                        <div className="col-sm-8 mt-2 text-start appearfromTop" key={user._id}>
                            <div className="card bigContainer text-light">
                                <h5 className="card-header">Booking Information: {user.username}</h5>
                                <div className="card-body">
                                    <p>Once the payment is done, confirmation mail will be sent on: {user.email}</p>
                                    <p className="card-text">If you want to change your user information. Go to profile settings</p>
                                    <div>
                                        <strong>Following documents need to be submitted before you rent the bike:</strong><br />
                                        (1) Driving License will be verified in original.<br />
                                        (2) Original ID proof (Passport, Voter ID, Driving License) needs to be deposited.<br />
                                        (3) Passport needs to be deposited for bikes above 500cc (Mandatory).<br /><br />
                                        <strong>For International Visitors:</strong><br />
                                        (1) Valid Driving License from their home country with international riding permit, and a valid Visa. (Original to be brought).<br />
                                        (2) Passport need to be deposited (Mandatory)<br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {states.booking.data.map(data => (
                        <div className="col-sm-4 mt-2 mb-4 appearfromRight" key={data._id}>
                            <div className="card h-100 bigContainer text-light">
                                <a className="link-hover hover-zoom" href="#"><img src={data.img} className="card-img-top" alt="Loading..." height={230} /></a>
                                <span className='text-danger'>Image shown above may or may not be the latest condition of the vehicle</span>
                                <div className="card-body">
                                    <h5 className="card-title">{data.bikeName} {data.modelName}</h5>
                                    <div className="card-text text-end table-responsive-xl">
                                        <div className='table-responsive'>
                                            <table className="bigContainer bg-dark table text-center table-hover table-responsive">
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
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" onClick={handleCoupon}>Apply</button>
                                        </div>

                                        Amount:  Rs. {data.rate * totalHours}<br />
                                        Tax (13%):  Rs. {Math.round((data.rate * totalHours) * taxRate)}<br />
                                        Total to be paid: <strong> Rs. {Math.round((data.rate * totalHours) * (1 + taxRate))}</strong>
                                    </div>
                                </div>
                                <div className=" d-flex card-footer justify-content-between">
                                    <small className="text-light text-start">Pickup: <strong> {data.city}</strong></small>
                                    <a onClick={() => submitBooking(data._id)} className='btn btn-sm btn-outline-danger'>
                                        <strong>Pay Now Rs. { payment }</strong>
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
