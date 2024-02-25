import React from 'react'

export default function About() {
    return (
        <div>
            <h3 className='text-light mb-3 appearfromTop'>Frequently Asked Questions</h3>
            <div className="appearfromTop container accordion col-md-6 text-start">

                <div className=" accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseZero" aria-expanded="false" aria-controls="panelsStayOpen-collapseZero">
                            What are the documents that I need to submit to rent a bike?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseZero" className="accordion-collapse collapse">
                        <div className="accordion-body">
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

                <div className=" accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                            What is you cancellation policy?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Notify us at least 24 hours before your scheduled rental start time to receive a full refund.<br /><br />
                            For cancellations made less than 24 hours in advance, a 50% refund will be issued.<br />
                            No refunds will be provided for cancellations made after the scheduled rental start time or for no-shows.<br /><br />
                            Refunds will be processed using the original payment method.<br />
                            Please allow up to 7 business days for the refund to appear in your account.
                        </div>
                    </div>
                </div>


                <div className="accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Can I return the bike early?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Yes, you can return the bike early. </strong>
                            However, we do not offer refunds for early returns.
                        </div>
                    </div>
                </div>


                <div className="accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Can I rent a bike for multiple days?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Yes, you can rent a bike for multiple days.</strong> Simply select the desired rental dates when making your reservation.
                        </div>
                    </div>
                </div>


                <div className="accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                            What types of bikes do you offer for rent?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            We offer a variety of bikes, including lower cc bikes, higher cc sports bikes, naked sports bikes, scooters, and electric bikes, to suit your riding preferences.
                        </div>
                    </div>
                </div>

                <div className="accordion-item bg-dark text-light">
                    <h2 className="accordion-header">
                        <button className="bigContainer accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                            Will I get a complimentary Helmet?
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Yes. BookMyRide provides one helmet with each booking. </strong>
                            Second helmet will be provided at Rs.100/day, if needed. Both Helmets are subject to the availability. Rs. 1000 deposit needs to be paid for each helmet.<br />
                            If the helmet is damaged or lost, a minimum charge of Rs. 1000 will be levied.<br /><br />
                            Note: Deposits paid through UPI shall be returned in a maximum of 24 hours. Deposits paid through cash shall be returned immediately during bike return.
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}
