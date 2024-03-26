import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/SharedState';
import axios from 'axios';
import Loader from './Loader';
import Getuser from '../user/Getuser';

export default function User(props) {
    const states = useContext(Context)
    const [edit, setEdit] = useState(false)

    const [userInput, setUserInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...states.user.data,
            [name]: value
        })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        states.setLoading(true)
        axios.post(states.hostname + '/api/handleuser/edit', userInput)
            .then(async res => {
                await Getuser(states);
                props.showAlert('User details updated successfully', 'success')
                states.setLoading(false)
            })
            .catch(error => {
                states.setLoading(false)
                props.showAlert(error.data.message, 'danger')
            })
            setEdit(false)
    }


    if (!states.user.data) {
        return (
            <Loader />
        )
    }

    return (
        <>
        {states.loading && <Loader/>}
            <div className='container Container bigContainer text-light p-3 appearfromTop col-sm-5 rounded mt-3'>
                <section>
                    <div className='container row m-auto'>
                        <div className='col-sm-6 text-center border-end'>
                            <span className="material-symbols-outlined" style={{ fontSize: '20rem' }}>
                                account_circle
                            </span><br />
                            <span className='fs-2'>{states.user.data.username}</span>
                        </div>

                        <div className='col-sm-6 mt-3 text-start'>
                            <form>
                                <div className="mb-3">
                                    <label className="fs-4">Name</label>
                                    {edit ?
                                        <input type="text" className="form-control" name='username' defaultValue={states.user.data.username} onChange={handleInput} required /> :
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.username}</div>
                                    }

                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Phone</label>
                                    {edit ?
                                        <input type="tel" className="form-control" name='phone' defaultValue={states.user.data.phone} onChange={handleInput} required /> :
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.phone}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Email</label>
                                    <div className='fw-bold fs-6 ms-4'>{states.user.data.email}</div>
                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Password</label>
                                    <div className='fw-bold fs-6 ms-4'>* * * * * * * * * * *</div>
                                </div>

                                <div className='text-end mt-5'>
                                    {edit ?
                                        <>
                                            <button className='btn btn-danger me-2'  onClick={(e)=>(e.preventDefault(), props.showAlert("Not available right now",'danger'))}>Change Password</button>
                                            <button className='btn btn-success' onClick={handleChanges}>Save Changes</button>
                                        </> :

                                        <>
                                            <button className='btn btn-danger me-2' onClick={(e)=>(e.preventDefault(), props.showAlert("Not available right now",'danger'))}>Delete account</button>
                                            <button className='btn btn-light' onClick={(e) => (e.preventDefault(), setEdit(true))}>Edit</button>
                                        </>
                                    }
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
            </div>

        </>
    )
}
