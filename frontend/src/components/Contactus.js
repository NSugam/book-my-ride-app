import React from 'react'

export default function Contactus() {
    return (
        <>
                <div className='container Container bigContainer text-light p-4 appearfromTop col-sm-4 rounded'>
                    <h1>Get in touch!</h1>
                    <hr className='text-light mb-4'/>
                    <form>
                        <div className='row g-2'>
                            <div class=" col form-floating mb-3 me-2">
                                <input type="email" class="form-control rounded-4 border-dark" placeholder="First Name" required />
                                <label className='text-dark'>First Name<span className='text-danger'>*</span></label>
                            </div>
                            <div class=" col form-floating mb-4">
                                <input type="email" class="form-control rounded-4 border-dark" placeholder="Last Name" required />
                                <label className='text-dark'>Last Name<span className='text-danger'>*</span></label>
                            </div>
                        </div>
                        <div class="col form-floating">
                            <input type="email" class="form-control rounded-5 border-dark" placeholder="Password" required />
                            <label className='text-dark'>Email address<span className='text-danger'>*</span></label>
                            <div id="emailHelp" className="form-text text-start text-light ms-3">We'll never share your email with anyone else.</div>
                        </div>

                        <div class="form-floating mt-4">
                            <textarea class="form-control rounded-4 border-dark" placeholder="Leave a comment here" style={{ height: 100 }} required></textarea>
                            <label className='text-dark'>Message<span className='text-danger'>*</span></label>
                        </div>
                        <button type="submit" className="btn btn-success text-center rounded-4 mt-4">Send Message</button>
                    </form>
                </div>
        </>
    )
}
