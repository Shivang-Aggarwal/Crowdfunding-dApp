import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/users/UserContext";

import raise_funds from "../images/raise_funds.jpeg";
import fund_project from "../images/fund_project.jpg";
import fundraising_history from "../images/fundraising_history.jpg";
import "./Dashboard.css";

const Dashboard = () => {
  let navigate = useNavigate();

  const current = useContext(UserContext);

  function goToRaiseFunds() {
    navigate("/raiseFunds");
  }

  function goToFundProject() {
    navigate("/fundProject");
  }

  function goToFundingHistory() {
    navigate("/fundingHistory");
  }

  return (
    <div className="style-dashboard-main">
    <h1 style={{color: "#1E2022", fontFamily: "Montserrat sans-serif", fontWeight: "bolder", fontSize: "3rem"}}>Hello, {current.state.firstname} {current.state.lastname}</h1>
    <br /><br /><br />
    
    <table className="style-dashboard-table">
        <tr>
            <td>
                <div className="card" style={{width: "18rem"}}>
                    <img style={{height: "18rem"}} className="card-img-top" src={raise_funds} alt="raise funds" />
                    <div className="style-card-body">
                        <button className="btn btn-secondary btn-lg" onClick={goToRaiseFunds}>Raise Funds</button>
                    </div>
                </div>
            </td>
            <td>
                <div class="card" style={{width: "18rem"}}>
                    <img style={{height: "18rem"}} className="card-img-top" src={fund_project} alt="fund project" />
                    <div className="style-card-body">
                        <button className="btn btn-secondary btn-lg" onClick={goToFundProject}>Fund Project</button>
                    </div>
                </div>
            </td>
            <td>
                <div class="card" style={{width: "18rem"}}>
                    <img style={{height: "18rem"}} className="card-img-top" src={fundraising_history} alt="fundraising history" />
                    <div className="style-card-body">
                        <button className="btn btn-secondary btn-lg" onClick={goToFundingHistory}>History</button>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>
  );
}

export default Dashboard;