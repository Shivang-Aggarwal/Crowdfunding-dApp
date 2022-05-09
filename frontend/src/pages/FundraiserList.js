import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/users/UserContext";
import FundraiserItem from "../components/FundraiserItem";

const FundraiserList = (props) => {
  let navigate = useNavigate();

  const current = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    const id = event.target.selectFundraiser.value;
    const amount = window.web3.utils.toWei(event.target.amountInvested.value.toString(), "ether");

    props.fundProject(id, amount, current.state.account, current.state.email);

    navigate("/dashboard");
  }

  function handleApproval(event) {
    event.preventDefault();

    const id = event.target.selectFundraiser.value;

    props.approveFunds(id);

    navigate("/dashboard");
  }

  function handleRejection(event) {
    event.preventDefault();

    const id = event.target.selectFundraiser.value;

    props.reimburseFunds(id);

    navigate("/dashboard");
  }

  return (
    <div style={{textAlign: "center", paddingTop: "2rem"}}>
      <div>
        {props.fundraisers.map((fundraiser) => {
          return (
            <div style={{padding: "0 20rem 0 20rem"}}>
              <FundraiserItem
                id={fundraiser.id}
                title={fundraiser.title}
                description={fundraiser.description}
                location={fundraiser.location}
                amountRaised={fundraiser.amountRaised}
                totalAmount={fundraiser.totalAmount}
                imageURL={fundraiser.imageURL}
              />
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <select id="selectFundraiser">
          {props.fundraisers.map((fundraiser) => {
            return <option value={parseInt(fundraiser.id)}>{fundraiser.title}</option>
          })}
        </select>
        Amount (in ether): <input type="number" id="amountInvested" />
        <button type="submit">Fund</button>
      </form>

      <form onSubmit={handleApproval}>
        <select id="selectFundraiser">
          {props.fundraisers.map((fundraiser) => {
            return <option value={parseInt(fundraiser.id)}>{fundraiser.title}</option>
          })}
        </select>
        <button type="submit">Approve</button>
      </form>

      <form onSubmit={handleRejection}>
        <select id="selectFundraiser">
          {props.fundraisers.map((fundraiser) => {
            return <option value={parseInt(fundraiser.id)}>{fundraiser.title}</option>
          })}
        </select>
        <button type="submit">Reject</button>
      </form>
    </div>
  );
}

export default FundraiserList;