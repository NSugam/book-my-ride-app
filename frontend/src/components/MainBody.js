import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../context/SharedState';

export default function MainBody(props) {

  const states = useContext(Context);
  const city = states.city
  const vtype = states.vtype


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  var currentDate = yyyy + "-" + mm + "-" + dd;

  const navigate = useNavigate();

  function checkDate(dateInput, timeInput) {
    const [year, month, day] = dateInput.split("-");
    const [hours, minutes] = timeInput.split(":");
    
    const givenDateTime = new Date(year, month - 1, day, hours, minutes);
    const currentDateTime = new Date();
    
    return givenDateTime > currentDateTime;
}

  const handleSubmit = async e => {
    e.preventDefault();

    if (checkDate(states.dateString, states.timeString)) {
      axios.post("http://localhost:9090/api/search/", { city, vtype })
      .then(res => {
        const result = res.data
        console.log("Server bata responce aayo: " + res.data)
        if(res.data==="Empty"){
          props.showAlert("Sorry! Vehicle(s) are not available", "danger")
          return
        }
        states.setResults({data: result})
        sessionStorage.setItem('city', states.city)
        sessionStorage.setItem('vtype', states.vtype)
        sessionStorage.setItem('dateString', states.dateString)
        sessionStorage.setItem('timeString', states.timeString)
        navigate('/search')
      })
      .catch(err=> {
        navigate('/login')
        props.showAlert(err.response.data, "danger")
      })
    }
    else {
      props.showAlert("Date and Time is incorrect", "danger")
    }
  };

  return (
    <>
      <div className="row m-auto">
        <div className="container col-sm-8">
          <img
            src="images/car.png" alt="Loading..." width="105%" height="100%" className="floatOnY" />
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
                  <option value="" disabled>Choose your City...</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hydrabad">Hydrabad</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="col-md-6">
                <select id="inputState" className="form-select" defaultValue="" onChange={e => { states.setVtype(e.target.value); }} required>
                  <option value="" disabled> Choose Vehicle Type... </option>
                  <option value="Scooter">Scooters (within city limit)</option>
                  <option value="L300">Less than 300cc Motorcycle</option>
                  <option value="M300">More than 300cc Motorcycle</option>
                  <option value="Any">Any Available</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Pickup Date</label>
                <input type="date" className="form-control" min={currentDate} onChange={e => { states.setDate(e.target.value); }} required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Pickup Time</label>
                <input type="time" id="time" name="time" className="form-control" onChange={e => { states.setTime(e.target.value); }} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label"> Drop Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label"> Drop Time</label>
                <input type="time" className="form-control" />
              </div>
              <hr />
              <div className="col-12">
                <button type="submit" className="btn btn-outline-danger"> Search Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
