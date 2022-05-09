import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    account: ""
  });

  function changeHandler(event) {
    const id = event.target.id;
    const change = event.target.value;

    setUser(previous => {
      return({
        ...previous,
        [id]: change
      });
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    axios.post("http://localhost:5000/api/users/add", user)
      .then(res => console.log(res.data));
    
    navigate("/login");
  }

  return (
    <div className="container style-register-main">
      <h1 style={{fontFamily: "Montserrat sans-serif", fontSize: "3rem"}}>Register</h1>
      <br />
      <form className="signup-form style-register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="firstname">First Name</label>
          <input type="text" className="form-control form-control-lg" id="firstname" placeholder="John" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label for="lastname">Last Name</label>
          <input type="text" className="form-control form-control-lg" id="lastname" placeholder="Appleseed" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="emal" className="form-control form-control-lg" id="email" placeholder="johnappleseed@email.com" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control form-control-lg" id="password" placeholder="password" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label for="account">Account</label>
          <input type="text" className="form-control form-control-lg" id="account" placeholder="0x . . . . . . . . ." onChange={changeHandler} />
        </div>
        <button type="submit" className="btn btn-dark btn-lg">Register</button>
    </form>
    </div>
  );
}

export default Register;