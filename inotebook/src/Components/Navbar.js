import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { React, useContext } from 'react'
import Alert from './Alert';
import noteContext from '../Context/noteContext';

function Navbar() {
  const context = useContext(noteContext);
  const { showAlert } = context;

  let location = useLocation();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      localStorage.removeItem('authToken');
      showAlert("You Logged out Successfully", 'danger');
      navigate('/login');
    } else {
      showAlert("No user is currently logged in", 'warning');
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" >Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About us</NavLink>
              </li>


            </ul>
            {!localStorage.getItem('authToken')? <form className="d-flex" role="search">
              <NavLink className="btn btn-primary mx-1" to="/login" role="button" >Login</NavLink>
              <NavLink className="btn btn-primary mx-1" to="/signup" role="button">SignUp</NavLink>
              
            </form>:<button className="btn btn-primary mx-1" onClick={logout}>Logout</button>}
          </div>
        </div>
      </nav>
      <Alert />
    </>
  )
}

export default Navbar

