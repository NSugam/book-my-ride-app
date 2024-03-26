import axios from 'axios';
import React, { useState } from 'react'

export default function Contactus(props) {

    const hostname = process.env.REACT_APP_PORTFOLIO_SERVER

    const [userInput, setUserInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const submitData = async (e) => {
        e.preventDefault();
        try {
            await props.showAlert("Sending your message...", "danger");
            await axios.post(hostname+'/api/sendMail', userInput);
            await props.showAlert("Message Sent! I will respond to you probably within 24 hours!", "success");
            await e.target.reset();
            setUserInput({});
        } catch (error) {
            if(error.response.status === 429){
                props.showAlert("Too many request! Try again later", "danger");
                return
            }
            props.showAlert("Server Problem! Try again later", "danger");
            console.log(error);
        }
    };

    return (
        <>
                <div className='container Container bigContainer text-light p-4 appearfromTop col-sm-6 rounded'>
                <section>

                    <div className='container row m-auto'>
                        <div className='col-sm-6 text-start border-end mb-3 mt-3' data-aos="fade-right" data-aos-duration="2000">
                            <span className='fs-1'>Getting in touch is easy!</span>
                            <br />
                            <span className="material-symbols-outlined me-2 mt-3">location_on</span>
                            <span className=''>Bengaluru, Karnataka, India</span>
                            <br />
                            <span className="material-symbols-outlined me-2 mt-3">call</span>
                            <span className=''>(+91) 123 321 1221</span>
                            <br />
                            <span className="material-symbols-outlined me-2 mt-3">mail</span>
                            <span className=''>contact@neupanesugam.com.np</span>
                        </div>

                        <div className='col-sm-6 mt-3 text-start' data-aos="fade-left" data-aos-duration="2000">
                            <form onSubmit={submitData}>
                                <div className="mb-3">
                                    <label className="form-label">Your Name <span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control fs-5" name='name' placeholder='Full name' onChange={handleInput} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email address <span className='text-danger' style={{ fontSize: 15 }}>* must be valid</span></label>
                                    <input type="email" className="form-control fs-5" name='email' placeholder='@' onChange={handleInput} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone Number <span className='text-danger' style={{ fontSize: 14 }}>(optional)</span></label>
                                    <input type="tel" className="form-control fs-5" name='phone' placeholder='+91-' onChange={handleInput} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Your message <span className='text-danger'>*</span></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                                        placeholder='Write your message here' name='message' onChange={handleInput} required></textarea>
                                </div>

                                <div className='text-end'>
                                    <button className={`btn btn-light`} type='submit'>Send Message</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </section>
                </div>
        </>
    )
}
