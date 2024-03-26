import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import setAuthToken from './setAuthToken'
import { Context } from '../context/SharedState';
import Loader from './Loader';

export default function LoginSignup(props) {
    const states = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        states.setLoading(true)
        e.preventDefault();
        axios.post(states.hostname + "/api/handleuser/login", { email, password })
            .then(res => {
                const token = res.data.authtoken
                props.showAlert("Welcome! " + res.data.username + " you are logged in", "danger")
                localStorage.setItem("jwtToken", token)
                setAuthToken(token)

                axios.post(states.hostname+'/api/handleuser/getuser') //for getting user details in user state
                    .then(async res => {
                        const username = res.data
                        await states.setUser({ data: username })
                    }).catch(error => {
                        if (error.response === 403) {
                            states.setUser(null)
                        }
                    })
                states.setLoading(false)
                navigate('/')
            }

            ).catch(error => {
                states.setLoading(false)
                props.showAlert(error.response.data, "danger")
            })
    }

    return (
        <>
            {states.loading && <Loader />}
            <div className="bigContainer text-light container col-md-3 p-4 mt-5 appearfromRight">
                <form onSubmit={handleLogin}>
                    <h3>Login</h3>
                    <hr />
                    <div className="mb-3 mt-4">
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' required />
                    </div>
                    <div className="mb-3 mt-4">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='password' required />
                    </div>

                    <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover" href="#">
                        Forgot Password?
                    </a>

                    <button type="submit" className="btn btn-outline-danger mx-3 my-2">Continue Login</button>
                    <hr />

                    OR
                    <Link to="/signup" className="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-50-hover mx-3">
                        Create new Account </Link>
                </form>
            </div>


        </>
    )
}
