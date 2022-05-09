import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/users/UserContext";

import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const current = useContext(UserContext);

  function changeHandler(event) {
    const id = event.target.id;
    const change = event.target.value;

    setUser(previous => {
      return ({
        ...previous,
        [id]: change
      });
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await axios.post("http://localhost:5000/api/users/check", user);

    let details = await axios.get(`http://localhost:5000/api/users/${user.email}`);
    details = details.data;

    current.update({
      email: details.email,
      isLoggedIn: true,
      firstname: details.firstname,
      lastname: details.lastname,
      account: details.account
    });

    navigate("/dashboard");
  }

  return (
    <div className="container style-login-main">
      <h1 style={{fontFamily: "Montserrat sans-serif", fontSize: "3rem"}}>Login</h1>
      <br />
      <form className="signup-form style-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter email" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter password" onChange={changeHandler} />
        </div>
        <button type="submit" className="btn btn-dark btn-lg">Login</button>
    </form>
    </div>
  );
}

export default Login;