import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/SharedState';

export default function Registration(props) {
    const states = useContext(Context)
    const [city, setCity] = useState()
    const [vType, setVtype] = useState()
    const [bikeName, setName] = useState()
    const [modelName, setModel] = useState()
    const [color, setColor] = useState()
    const [limit, setLimit] = useState()
    const [rate, setRate] = useState()
    const [img, setImage] = useState()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(states.hostname + "/api/register/", { city, vType, bikeName, modelName, color, limit, rate, img })

        if (res.data != "Empty") {
            props.showAlert("Vehicle has been registered", "success")
            navigate('/')

        } else {
            props.showAlert("Permission Denied! Contact Admin for registration", "danger")
            navigate('/')
        }

    }

    return (
        <>
            <div className='bigContainer container col-sm-4 text-light rounded-3 p-4 appearfromTop'>
                <h3 className='mb-3'>New Vehicle Registration</h3>
                <hr />

                <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <select id="inputState" className="form-select" defaultValue="" onChange={(e) => { setCity(e.target.value) }} required>
                            <option value="" disabled>Choose your City...</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hydrabad">Hydrabad</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Chennai">Chennai</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select id="inputState" className="form-select" defaultValue="" onChange={(e) => { setVtype(e.target.value) }}>
                            <option value="" disabled>Choose Vehicle Type...</option>
                            <option value="Scooter">Scooters (within city limit)</option>
                            <option value="L300">Less  than 300cc Motorcycle</option>
                            <option value="M300">More than 300cc Motorcycle</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder='Vehicle Name' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Model Name" onChange={(e) => { setModel(e.target.value) }} />
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Color" onChange={(e) => { setColor(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <input type="number" className="form-control" placeholder='Speed Limit' onChange={(e) => { setLimit(e.target.value) }} />
                    </div>
                    <div className="col-12 text-start">
                        <label htmlFor="inputAddress" className="form-label">Image URL (must be the latest image)</label>
                        <input type="text" className="form-control" onChange={(e) => { setImage(e.target.value) }} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputAddress" className="form-label">Rate per hour</label>
                        <input type="number" className="form-control" placeholder='Rs. /per hr' onChange={(e) => { setRate(e.target.value) }} />
                    </div>
                    <div className="col-6 mt-5 d-grid mx-auto">
                        <button type="submit" className="btn btn-outline-danger">Register</button>
                    </div>

                </form>
            </div>
        </>
    )
}
