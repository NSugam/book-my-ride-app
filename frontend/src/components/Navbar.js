import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import setAuthToken from './setAuthToken'

export default function Navbar(props) {
  const location = useLocation()

  const handlelogout = () => {
    props.showAlert("Signing out...", "danger")
    localStorage.clear()
    sessionStorage.clear()
    setAuthToken(false)
    window.location.reload(false)
  }

  return (
    <>
      <nav className="navbar bigContainer navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand link-danger" to="/">BookMyRide</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact us</Link>
              </li>
            </ul>

            {localStorage.getItem("jwtToken") ?
              <div className="btn-group">
                <span className="material-symbols-outlined dropdown-toggle text-light fs-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                  settings_account_box
                </span>

                <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/registration">Register new vehicle</Link></li>
                  <li><Link className="dropdown-item" to="/mybooking">My Bookings</Link></li>
                  <li><a className="dropdown-item" href="#">Profile Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item text-danger fw-bold" onClick={handlelogout}>Logout</Link></li>
                </ul>
              </div> :
              <Link className="btn btn-outline-light" to="/login">Login/Signup</Link>
            }
          </div>
        </div>
      </nav>

    </>
  )
}
