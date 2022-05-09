import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./RaiseFunds.css";

const RaiseFunds = (props) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    totalAmount: 0,
    description: "",
    imageURL: "",
    location: ""
  });

  function submitHandler(event) {
    event.preventDefault();
    const totalAmountConverted = window.web3.utils.toWei(formData.totalAmount.toString(), "ether");
    props.createFundraiser(formData, totalAmountConverted);
    
    navigate("/dashboard");
  }

  function changeHandler(event) {
    const id = event.target.id;
    const change = event.target.value;

    setFormData(previous => {
      return ({
        ...previous,
        [id]: change
      });
    })
  }

  return (
    <div className="style-raiseFunds-body">
    <h1 style={{fontFamily: "Montserrat sans-serif", fontSize: "3rem"}}>Register</h1>
    <br />
    <form className="style-raiseFunds-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label for="title">Title</label>
          <input type="text" value={formData.title} onChange={changeHandler} className="form-control" id="title" />
        </div>
        <div className="form-group">
          <label for="totalAmount">Amount (in ether)</label>
          <input type="number" value={formData.totalAmount} onChange={changeHandler} className="form-control" id="totalAmount" />
        </div>
        <div className="form-group">
          <label for="imageURL">Image URL</label>
          <input type="text" value={formData.imageURL} onChange={changeHandler} className="form-control" id="imageURL" />
        </div>
        <div className="form-group">
          <label for="location">Location</label>
          <input type="text" value={formData.location} onChange={changeHandler} className="form-control" id="location" />
        </div>
        Description <br />
        <textarea value={formData.description} rows="4" cols="50" placeholder="Tell us about your project." onChange={changeHandler} id="description">{formData.description}</textarea>
        <br /><br /><br />
        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
    </form>
</div>
  );
}

export default RaiseFunds;