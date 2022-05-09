import React from "react";

import "./FundraiserItem.css";

const FundraiserItem = (props) => {
  let percent = window.web3.utils.fromWei(props.amountRaised.toString(), "ether")/window.web3.utils.fromWei(props.totalAmount.toString(), "ether");
  percent = percent * 100;
  percent = percent.toString() + "%";

  return (
    <div className="row style-fundraiserComponent-project-info">
      <div className="col">
        <img
          className="style-fundraiserComponent-project-image"
          src={props.imageURL}
          alt="placeholder"
        />
      </div>
      <div className="col">
        <h1 className="style-fundraiserComponent-project-heading">{parseInt(props.id)}. {props.title}</h1>
        <h3>{props.location}</h3>
        <p className="style-fundraiserComponent-project-description">
          {props.description}
        </p>
        <br />
        <div class="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: percent }}
          ></div>
        </div>
        <br />
        <h5>amount raised: {window.web3.utils.fromWei(props.amountRaised.toString(), "ether")}</h5>
        <h5>total amount: {window.web3.utils.fromWei(props.totalAmount.toString(), "ether")}</h5>
      </div>
    </div>
  );
}

export default FundraiserItem;