const { expect } = require("chai");

describe("", function () {
  this.timeout(120000);

  it("Donot Excede the limit of public sale", async function () {
    const acc = await ethers.getSigners();
    const whiteListAccounts = [];
    const [addr1] = await ethers.getSigners();
    for (let i = 0; i < 1000; i++) {
      let wallet = ethers.Wallet.createRandom();
      // add the provider from Hardhat
      wallet = wallet.connect(ethers.provider);
      await addr1.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1"),
      });
      whiteListAccounts.push(wallet);
    }

    const TestContract = await ethers.getContractFactory("NFTA");
    const contract = await TestContract.deploy("a", "A", "B", "C", [], []);

    for (let i = 0; i < 1000; i++) {
      await contract.connect(whiteListAccounts[i]).publicMint(1);
    }
    expect(await contract.publicFreeMinted()).to.equal(1000);
    console.log();
  });

  it("Excede the limit of public sale", async function () {
    const acc = await ethers.getSigners();
    const whiteListAccounts = [];
    const [addr1] = await ethers.getSigners();
    for (let i = 0; i < 1001; i++) {
      let wallet = ethers.Wallet.createRandom();
      // add the provider from Hardhat
      wallet = wallet.connect(ethers.provider);
      await addr1.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1"),
      });
      whiteListAccounts.push(wallet);
    }

    const TestContract = await ethers.getContractFactory("NFTA");
    const contract = await TestContract.deploy("a", "A", "B", "C", [], []);

    for (let i = 0; i < 1001; i++) {
      await contract.connect(whiteListAccounts[i]).publicMint(1);
    }
    console.log(await contract.publicFreeMinted());
    expect(await contract.publicFreeMinted()).to.throw(
      new Error(
        "VM Exception while processing transaction: reverted with reason string 'Insuffiecient funds transfered'"
      )
    );
  });

  it("Donot Excede the limit of whitelist sale", async function () {
    const acc = await ethers.getSigners();
    const whiteListAccounts = [];
    const whiteListAccountsAddr = [];
    const [addr1] = await ethers.getSigners();
    for (let i = 0; i < 250; i++) {
      let wallet = ethers.Wallet.createRandom();
      // add the provider from Hardhat
      wallet = wallet.connect(ethers.provider);
      await addr1.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1"),
      });
      whiteListAccounts.push(wallet);
      whiteListAccountsAddr.push(wallet.address);
    }

    const TestContract = await ethers.getContractFactory("NFTA");
    const contract = await TestContract.deploy(
      "a",
      "A",
      "B",
      "C",
      whiteListAccountsAddr,
      []
    );

    for (let i = 0; i < 250; i++) {
      await contract.connect(whiteListAccounts[i]).preSaleMint(2);
    }
    expect(await contract.whitelistFreeMinted()).to.equal(500);
    console.log();
  });

  it("Excede the limit of whitelist sale", async function () {
    const acc = await ethers.getSigners();
    const whiteListAccounts = [];
    const whiteListAccountsAddr = [];
    const [addr1] = await ethers.getSigners();
    for (let i = 0; i < 251; i++) {
      let wallet = ethers.Wallet.createRandom();
      // add the provider from Hardhat
      wallet = wallet.connect(ethers.provider);
      await addr1.sendTransaction({
        to: wallet.address,
        value: ethers.utils.parseEther("1"),
      });
      whiteListAccounts.push(wallet);
      whiteListAccountsAddr.push(wallet.address);
    }

    const TestContract = await ethers.getContractFactory("NFTA");
    const contract = await TestContract.deploy(
      "a",
      "A",
      "B",
      "C",
      whiteListAccountsAddr,
      []
    );

    for (let i = 0; i < 251; i++) {
      await contract.connect(whiteListAccounts[i]).preSaleMint(2);
    }
    expect(await contract.publicFreeMinted()).to.throw(new Error());
    console.log();
  });
});

//   it("Public mint 1 free mint", async function () {
//     // Create the smart contract object to test from
//     const [owner] = await ethers.getSigners();
//     // console.log(owner);
//     const TestContract = await ethers.getContractFactory("NFTA");
//     const contract = await TestContract.deploy("a", "A", "B", "C", [], []);

//     // Get output from functions
//     const mint = await contract.publicMint(1);
//     // console.log(mint);
//     // expect(mint).to.equal(10);
//   });
