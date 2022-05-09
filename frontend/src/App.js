import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";

import CrowdfundingPlatform from "./abis/CrowdfundingPlatform.json";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import RaiseFunds from "./pages/RaiseFunds";
import FundraiserList from "./pages/FundraiserList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FundingHistory from "./pages/FundingHistory";
import UserState from "./context/users/UserState";
import axios from "axios";

export default class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    
    // load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = CrowdfundingPlatform.networks[networkId];
    if(networkData) {
      const crowdfundingPlatform = web3.eth.Contract(CrowdfundingPlatform.abi, networkData.address);
      this.setState({ crowdfundingPlatform: crowdfundingPlatform });
      const noOfFundraisers = await crowdfundingPlatform.methods.noOfFundraisers().call();
      this.setState({ noOfFundraisers });

      // load fundraisers
      for(let i=1; i<=noOfFundraisers; i++) {
        const fundraiser = await crowdfundingPlatform.methods.fundraisers(i).call();
        this.setState({
          fundraisers: [...this.state.fundraisers, fundraiser]
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("CrowdfundingPlatform contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      noOfFundraisers: 0,
      fundraisers: [],
      loading: true
    };

    this.createFundraiserHandler = this.createFundraiserHandler.bind(this);
    this.fundProjectHandler = this.fundProjectHandler.bind(this);
    this.approveFundsHandler = this.approveFundsHandler.bind(this);
    this.reimburseFundsHandler = this.reimburseFundsHandler.bind(this);
  }

  async createFundraiserHandler(data, totalAmount) {
    this.setState({ loading: true });
    this.state.crowdfundingPlatform.methods.raiseFunds(data.title, data.description, data.imageURL, data.location, totalAmount).send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });

    const newFundraiser = { id: this.state.fundraisers.length + 1 };
    
    axios.post("http://localhost:5000/api/fundraisers/add", newFundraiser)
      .then(res => console.log(res.data));
  }

  fundProjectHandler(id, amount, account, email) {
    this.setState({ loading: true });
    this.state.crowdfundingPlatform.methods.fundProject(id).send({ from: this.state.account, value: amount })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
    
    const fundraiserPatch = {
      fund: {
        account: account,
        amount: amount
      }
    };

    const userPatch = {
      fund: {
        id: id,
        title: this.state.fundraisers[id-1].title,
        amount: amount
      }
    };
    
    axios.patch(`http://localhost:5000/api/fundraisers/update/${id}`, fundraiserPatch);

    axios.patch(`http://localhost:5000/api/users/update/${email}`, userPatch);
  }

  approveFundsHandler(id) {
    this.setState({ loading: true });
    this.state.crowdfundingPlatform.methods.approveFunds(id).send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  async reimburseFundsHandler(id) {
    const fundraiser = await axios.get(`http://localhost:5000/api/fundraisers/${id}`);
    const history = fundraiser.data.fundraisingHistory;

    history.map((fund) => {
      this.setState({ loading: true });
      this.state.crowdfundingPlatform.methods.reimburseFunds(id, fund.account, fund.amount).send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
    });
  }

  render() {
    return(
      <UserState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/raiseFunds" element={<RaiseFunds createFundraiser={this.createFundraiserHandler} />} />
            <Route path="/fundProject" element={<FundraiserList fundraisers={this.state.fundraisers} fundProject={this.fundProjectHandler} approveFunds={this.approveFundsHandler} reimburseFunds={this.reimburseFundsHandler} />} />
            <Route path="/fundingHistory" element={<FundingHistory />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserState>
    );
  }
}