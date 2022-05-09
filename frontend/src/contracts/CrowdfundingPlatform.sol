pragma solidity ^0.5.0;

contract CrowdfundingPlatform {
    address public administrator;
    uint public noOfFundraisers = 0;

    struct Fundraiser {
        uint id;
        string title;
        string description;
        string imageURL;
        string location;
        uint totalAmount;
        uint amountRaised;
        uint amountReleased;
        address payable owner;
        bool approved;
        bool completed;
    }

    mapping(uint => Fundraiser) public fundraisers;

    event FundraiserCreated(
        uint id,
        string title,
        string description,
        string imageURL,
        string location,
        uint totalAmount,
        uint amountRaised,
        uint amountReleased,
        address payable owner,
        bool approved,
        bool completed
    );

    event FundsRaised(
        uint amountRaised
    ); 

    constructor() public {
        administrator = msg.sender;
    }

    function raiseFunds(
        string memory _title,
        string memory _description,
        string memory _imageURL,
        string memory _location, 
        uint _totalAmount
        ) public {
        require(_totalAmount > 0);

        noOfFundraisers++;

        fundraisers[noOfFundraisers] = Fundraiser(
            noOfFundraisers, _title, _description, _imageURL, _location, _totalAmount, 0, 0, msg.sender, true, false
            );

        emit FundraiserCreated(
            noOfFundraisers, _title, _description, _imageURL, _location, _totalAmount, 0, 0, msg.sender, true, false
        );
        
    }

    function fundProject(uint _id) public payable {
        require(msg.value > 0 && msg.value <= msg.sender.balance);

        fundraisers[_id].amountRaised += msg.value;

        if(fundraisers[_id].amountRaised >= fundraisers[_id].totalAmount) {
            fundraisers[_id].completed = true;
        }

        emit FundsRaised(msg.value);
    }

    function approveFunds(uint _id) public {
        require(msg.sender == administrator);

        address payable _to = fundraisers[_id].owner;
        uint _amount = fundraisers[_id].amountRaised - fundraisers[_id].amountReleased;

        _to.transfer(_amount);

        fundraisers[_id].amountReleased += _amount;
    }

    function reimburseFunds(uint _id, address payable _to, uint _amount) public {
        require(msg.sender == administrator);

        _to.transfer(_amount);

        fundraisers[_id].approved = false;
    }
}