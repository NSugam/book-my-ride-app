import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainBody from './components/MainBody';
import Navbar from './components/Navbar';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import Alerts from './components/Alerts';
import VehicleCards from './components/VehicleCards';
import Registration from './components/Registration';
import { Context, SharedState } from './context/SharedState';
import setAuthToken from './components/setAuthToken';
import { useContext, useEffect, useState } from 'react';
import Booking from './components/Booking';
import UserBookings from './components/MyBookings';
import Page404 from './components/Page404';
import Contactus from './components/Contactus';
import "./MainBody.css";
import './App.css';
import User from './components/User';

function App() {

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
  } else {
    setAuthToken(false)
  }

  const [alert, setAlert] = useState()
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
    
  return (
    <>
      <SharedState>
        <Router>
          <div className="App">
            <Navbar showAlert={showAlert} />
            <Alerts alert={alert} />
            <Routes>
              <Route exact path="/" element={<MainBody showAlert={showAlert} />} />
              <Route exact path="/about" element={<About showAlert={showAlert} />} />
              <Route exact path="/contact" element={<Contactus showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/search" element={<VehicleCards showAlert={showAlert} />} />
              <Route exact path="/booking/:bikeId" element={<Booking showAlert={showAlert} />} />
              <Route exact path="/registration" element={<Registration showAlert={showAlert} />} />
              <Route exact path="/mybooking" element={<UserBookings showAlert={showAlert} />} />
              <Route exact path="/user" element={<User showAlert={showAlert} />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </Router>
      </SharedState>


    </>
  );
}

export default App;
