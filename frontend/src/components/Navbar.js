import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/users/UserContext";

import "./Navbar.css";

const Navbar = () => {
  const current = useContext(UserContext);

  let navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  function goToRegister() {
    navigate("/register");
  }

  function goToLogout() {
    current.update({
      email: "",
      isLoggedIn: false,
      firstname: "",
      lastname: "",
      account: ""
    });

    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary style-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" style={{color: "#ffcc00", fontFamily: "Montserrat", fontWeight: "bolder", fontSize: "1.5rem"}}>
          Crypto - Funder
        </a>
        <div>
          <ul className="navbar-nav me-auto">
            {!current.state.isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" onClick={goToLogin}>
                  Login
                </a>
              </li>
            }
            {!current.state.isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" onClick={goToRegister}>
                  Register
                </a>
              </li>
            }
            {current.state.isLoggedIn &&
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={goToLogout}>
                  Logout
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;