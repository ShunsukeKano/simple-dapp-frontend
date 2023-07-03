// Inject env variables
require("dotenv").config("./env");

// Imported web3
const Web3 = require('web3');

// ABI
const abi = require("./abi.json");

// Contract address
const Contract_Address = "0x28188Ab304b6ed53762fDC92A068B162fb1Be260";

// WebSocket provider from Infura 
const providerUrl = `wss://goerli.infura.io/ws/v3/${process.env.INFURA_API_KEY}`;

// web3 instance
const web3 = new Web3(providerUrl);

// Get contract instance
const myContract = new web3.eth.Contract(abi, Contract_Address);

// Get count
myContract.methods
    .getCount()
    .call()
    .then((result) => {
        // Output
        console.log("Value is", result);
    });

