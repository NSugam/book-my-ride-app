import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../context/SharedState';
import Loader from "./Loader";
export default function MainBody(props) {

  //  Here I am using some values from STATES and some from SESSION-STORAGE just to know how both of these things work in realworld.
  const states = useContext(Context);
  const city = states.city
  const vtype = states.vtype
  const startDate = sessionStorage.getItem('startDate')
  const startTime = sessionStorage.getItem('startTime')
  const endDate = sessionStorage.getItem('endDate')
  const endTime = sessionStorage.getItem('endTime')

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  var currentDate = yyyy + "-" + mm + "-" + dd;

  const navigate = useNavigate();

  function checkStartDateTime(dateInput, timeInput) {
    const [year, month, day] = dateInput.split("-");
    const [hours, minutes] = timeInput.split(":");

    const givenDateTime = new Date(year, month - 1, day, hours, minutes);
    const currentDateTime = new Date();

    return givenDateTime > currentDateTime;
  }

  const handleSubmit = async (e) => {
    states.setLoading(true);
    e.preventDefault();

    if (checkStartDateTime(sessionStorage.getItem('startDate'), sessionStorage.getItem('startTime'))) {
      axios.post(states.hostname+"/api/search/", { city, vtype, startDate, startTime })
        .then(res => {
          if (res.data === "Empty") {
            states.setLoading(false);
            props.showAlert("Sorry! Vehicle(s) are not available", "danger")
            return
          }
          states.setLoading(false);
          sessionStorage.setItem('city', states.city)
          sessionStorage.setItem('vtype', states.vtype)
          navigate('/search')
        })
        .catch(err => {
          states.setLoading(false);
          navigate('/login')
          props.showAlert(err.response.data, "danger")
        })
    }
    else {
      states.setLoading(false);
      props.showAlert("Date and Time is incorrect", "danger")
    }
  };

  return (
    <>
    
      <div className="row m-auto">
          {states.loading && <Loader/>}
        <div className="container col-sm-7">
          <img src="images/car.png" alt="Loading..." width="105%" height="100%" className="floatOnY" />
        </div>

        <div className="container col-sm-3 appearfromRight mb-3">
          <div className="container bigContainer text-light rounded-3 p-4">
            <h3 className="mb-2"> Book your Ride Now</h3>
            <marquee className="text-danger fs-5 mb-2" direction="left">
              <strong>10% off on your first ride. Use code FIRSTFLY during checkout.</strong>
            </marquee>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <select id="inputState" className="form-select" defaultValue="" onChange={e => { states.setCity(e.target.value); }} required>
                  <option value="" disabled>Your City...</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hydrabad">Hydrabad</option>
                </select>
              </div>
              <div className="col-md-6">
                <select id="inputState" className="form-select" defaultValue="" onChange={e => { states.setVtype(e.target.value); }} required>
                  <option value="" disabled>Vehicle Type... </option>
                  <option value="Scooter">Scooters (within city limit)</option>
                  <option value="L300">Less than 300cc Motorcycle</option>
                  <option value="M300">More than 300cc Motorcycle</option>
                  <option value="Any">Any Available</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Pickup Date</label>
                <input type="date" className="form-control" min={currentDate} onChange={e => { states.setStartDate(e.target.value); sessionStorage.setItem('startDate', e.target.value); }} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Pickup Time</label>
                <input type="time" id="time" name="time" className="form-control" onChange={e => { sessionStorage.setItem('startTime', e.target.value); }} required />
              </div>

              <div className="col-md-6">
                <label className="form-label" > Drop Date</label>
                <input type="date" className="form-control" min={sessionStorage.getItem('startDate')} onChange={e => { sessionStorage.setItem('endDate', e.target.value); }} required />
              </div>
              <div className="col-md-6">
                <label className="form-label"> Drop Time</label>
                <input type="time" className="form-control" onChange={e => { sessionStorage.setItem('endTime', e.target.value); }} required />
              </div>
              <hr />
              <div className="col-12">
                <button type="submit" className="btn btn-outline-danger"> Search Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Below Main Page */}
      <div className="container-fluid bg-light" style={{ height: "auto" }}>
        <div className="row">

          <div className="container col-sm-7 " >
            <div id="carouselExampleCaptions" className="carousel slide m-2 appearfromLeft" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://wallpapercave.com/wp/wp7709776.jpg" className="d-block w-100" />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>BMW S1000RR</h5>
                    <p>Coming soon on our stock...</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://images.pexels.com/photos/17243638/pexels-photo-17243638/free-photo-of-superbike-kawasaki-ninja-zx-6r.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>We have higher cc motorcycles at affordable cost</h5>
                    <p>Available now, Book and ride !</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://www.financialexpress.com/wp-content/uploads/2021/05/traffic-rule-01.jpg" className="d-block w-100" />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Never forget rules!</h5>
                    <p>Never overspeed, always follow traffic rules. Stay Safe!</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="container col-sm-4 mt-4 mb-4 p-3 h-auto appearfromRight">
            <h3 className="fw-bold">Our Happy Customers</h3>
            <hr className="me-5 ms-5" />

            <div id="myCarousel" className="carousel slide " data-bs-ride="carousel" data-bs-interval="4000">
              <div className="carousel-inner text-start">

                <div className="carousel-item active">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span className="material-symbols-outlined me-2">
                          record_voice_over
                        </span>
                        Sugam Neupane</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Ninja ZX10R</h6>
                      <p className="card-text pe-5">
                        "The Kawasaki ZX-10R is a thrilling and powerful sportbike that offers exceptional performance and handling on the track."
                      </p>
                      <a href="#" className="card-link">Read more</a>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span className="material-symbols-outlined me-2">
                          record_voice_over
                        </span>
                        Ram Bahadur</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Honda Activa</h6>
                      <p className="card-text pe-5">
                        "The Honda Activa is a practical choice, offering smooth performance and great fuel efficiency for daily commutes."
                      </p>
                      <a href="#" className="card-link">Read more</a>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span className="material-symbols-outlined me-2">
                          record_voice_over
                        </span>
                        Barun Shrestha</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Pulsar NS200</h6>
                      <p className="card-text pe-5">
                        "The Pulsar NS 200 is a powerful and stylish bike, ideal for those looking for a thrilling ride with great performance and handling."
                      </p>
                      <a href="#" className="card-link">Read more</a>
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                      <span className="material-symbols-outlined me-2">
                          record_voice_over
                        </span>
                        Rahul Moktan</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Royal Enfield Classic 350</h6>
                      <p className="card-text pe-5">
                        "The Royal Enfield Classic 350 is a timeless beauty, perfect for those who crave a blend of style and power."
                      </p>
                      <a href="#" className="card-link">Read more</a>
                    </div>
                  </div>
                </div>


              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next btn btn-dark" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <h3 className="fw-bold mt-5">Why us?</h3>
            <hr className="me-5 ms-5" />
            We offer you a seamless and convenient way to book well-maintained bikes for your travel needs.
            What sets us apart is our commitment to providing top-quality bikes that are regularly serviced and in excellent condition,
            ensuring a safe and enjoyable ride every time. Our easy booking process and transparent pricing make renting a bike with us a hassle-free experience.
            Whether you're a local looking for a reliable ride or a traveler exploring new destinations,
            choose us for a superior bike rental experience.<br />
            <a className="btn btn-outline-success mt-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> Book a ride now </a>
            <Link className="btn btn-warning mt-3 ms-3" to='/contact'>Contact us</Link>

          </div>
        </div>
      </div>

      <footer className="footer mt-auto py-3 bigContainer text-light text-end">
        <div className="container text-center">
          <span>© 2024 www.bookmyride.com || Sugam Neupane</span>
        </div>
      </footer>

    </>
  );
}
