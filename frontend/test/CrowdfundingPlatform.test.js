const { assert } = require("chai");

require("chai")
  .use(require("chai-as-promised"))
  .should();

const CrowdfundingPlatform = artifacts.require("./CrowdfundingPlatform.sol");

contract("CrowdfundingPlatform", (accounts) => {
  let crowdfundingPlatform;

  before(async () => {
    crowdfundingPlatform = await CrowdfundingPlatform.deployed();
  })

  describe("1. Deployment", async () => {
    it("(a) deployed successfully", async () => {
      const address = await crowdfundingPlatform.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("(b) has an administrator", async () => {
      const administrator = await crowdfundingPlatform.administrator();
      assert.notEqual(administrator, 0x0);
      assert.notEqual(administrator, "");
      assert.notEqual(administrator, null);
      assert.notEqual(administrator, undefined);
      assert.equal(administrator, accounts[0]);
    });
  })

  describe("2. Fundraisers", async () => {
    let result, noOfFundraisers;

    before(async () => {
      result = await crowdfundingPlatform.raiseFunds("Infinity Blade X", "10th installment", "ib-x-img", "virtual", web3.utils.toWei("80", "ether"), {from: accounts[1]});
      noOfFundraisers = await crowdfundingPlatform.noOfFundraisers();
    })

    it("(a) creates fundraiser", async () => {
      assert.equal(noOfFundraisers, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), noOfFundraisers.toNumber(), "id is correct");
      assert.equal(event.title, "Infinity Blade X", "title is correct");
      assert.equal(event.description, "10th installment", "description is correct");
      assert.equal(event.imageURL, "ib-x-img", "image url is correct");
      assert.equal(event.location, "virtual", "location is correct");
      assert.equal(event.totalAmount, web3.utils.toWei("80", "ether"), "total amount is correct");
      assert.equal(event.amountRaised, 0, "amount raised is correct");
      assert.equal(event.amountReleased, 0, "amount released is correct");
      assert.equal(event.owner, accounts[1], "owner is correct");
      assert.equal(event.approved, true, "approval is correct");
      assert.equal(event.completed, false, "completed is correct");
    });

    it("(b) funds fundraiser", async () => {
      let oldFunderBalance;
      oldFunderBalance = await web3.eth.getBalance(accounts[2]);
      oldFunderBalance = new web3.utils.BN(oldFunderBalance);

      // SUCCESS: funding process is successful
      result = await crowdfundingPlatform.fundProject(0, {from: accounts[2], value: web3.utils.toWei("5", "ether")});
      const event = result.logs[0].args;
      assert.equal(event.amountRaised, web3.utils.toWei("5", "ether"), "amount raised successfully");

      // check that funder's balance is reduced
      let newFunderBalance;
      newFunderBalance = await web3.eth.getBalance(accounts[2]);
      newFunderBalance = new web3.utils.BN(newFunderBalance);

      let amountRaised;
      amountRaised = web3.utils.toWei("5", "ether");
      amountRaised = new web3.utils.BN(amountRaised);

      const expectedBalance = newFunderBalance.add(amountRaised);
      assert.equal(oldFunderBalance.toString().substr(0, 4), expectedBalance.toString().substr(0, 4), "funds correctly deducted");

      // FAILURE: funds exceeding account balance
      await crowdfundingPlatform.fundProject(0, {from: accounts[2], value: web3.utils.toWei("10000", "ether")}).should.be.rejected;
    });
  })
})