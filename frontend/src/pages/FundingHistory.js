import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import UserContext from "../context/users/UserContext";

import "./FundingHistory.css";

const FundingHistory = () => {
  const [data, setData] = useState([]);

  const current = useContext(UserContext);

  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/users/${current.state.email}`);
      res = res.data.fundingHistory;
      setData(res);
    } catch {}
  }, [])

  const list = data.map((data, index) => {
    return (
      <li class="list-group-item style-fundingHistory-listItem">{data.id}. {data.title} - {window.web3.utils.fromWei(data.amount, "ether")} ETH</li>
    );
  })

  return (
    <div className="style-fundingHistory-body">
      <h1 style={{fontFamily: "Montserrat sans-serif", fontSize: "2rem"}}>Funding History</h1>
      <br />
      <ul className="list-group style-fundingHistory-list">
        {list}
      </ul>
    </div>
  );
}

export default FundingHistory;