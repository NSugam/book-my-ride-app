import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import setAuthToken from './setAuthToken'

export default function Navbar(props) {
  const location = useLocation()

  const handlelogout = ()=> {
    localStorage.clear()
    setAuthToken(false)
    window.location.reload(false)
    props.showAlert("Signing out...", "danger")
  }

  return (
    <>
      <nav className="navbar bigContainer navbar-expand-lg navbar-dark d-flex justify-content-between">
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

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Admin Control</a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/registration">Register new vehicle</Link></li>
                  <li><a className="dropdown-item" href="#">Site Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Main Dashboard</a></li>
                </ul>
              </li>

            </ul>
            {localStorage.getItem("jwtToken")?<button className="btn btn-outline-danger" onClick={handlelogout}>Signout</button>:
            <Link className="btn btn-outline-danger" to="/login">Login/Signup</Link>
            }

          </div>
        </div>
      </nav>

    </>
  )
}
