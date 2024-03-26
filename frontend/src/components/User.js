import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/SharedState';
import axios from 'axios';
import Loader from './Loader';

export default function User() {
    const states = useContext(Context)
    const [edit, setEdit] = useState(false)

    const [userInput, setUserInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const handleChanges = (e) => {
        e.preventDefault();
        setEdit(false)

    }


    if (!states.user.data) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <div className='container Container bigContainer text-light p-3 appearfromTop col-sm-5 rounded'>
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
                                        <input type="text" className="form-control" name='name' value={states.user.data.username} onChange={handleInput} required /> :
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.username}</div>
                                    }

                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Phone</label>
                                    {edit ?
                                        <input type="tel" className="form-control" name='phone' value={states.user.data.phone} onChange={handleInput} required /> :
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.phone}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Email</label>
                                    {edit ?
                                        <input type="email" className="form-control" name='email' value={states.user.data.email} onChange={handleInput} required /> :
                                        <div className='fw-bold fs-6 ms-4'>{states.user.data.email}</div>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="fs-4">Password</label>
                                    {edit ?
                                        <input type="email" className="form-control" name='email' placeholder='@' value="************" onChange={handleInput} disabled required /> :
                                        <div className='fw-bold fs-6 ms-4'>* * * * * * * * * * *</div>
                                    }
                                </div>

                                <div className='text-end mt-5'>
                                    {edit ?
                                        <button className='btn btn-success' type='submit' onClick={handleChanges}>Save Changes</button>: 
                                        <>
                                            <button className='btn btn-danger me-2' type='submit'>Delete account</button>
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
