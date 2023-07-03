// Load environment variables
require('dotenv').config();

// Import web3
const Web3 = require('web3');

// Load ABI and bytecode
const abi = require('./abi.json');
const { bytecode } = require('./bytecode');

// Provider URL
const providerUrl = `wss://goerli.infura.io/ws/v3/${process.env.INFURA_API_KEY}`;

// Your private key
const privateKey = `${process.env.PRIVATE_KEY}`;

// Initialize Web3
const web3 = new Web3(providerUrl);

// Create account instance
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Deploy the contract
const deployContract = async () => {
  // Create a new contract instance with the provided ABI
  const Contract = new web3.eth.Contract(abi);
  // Get the current gas price on the Ethereum network  
  const gasPrice = await web3.eth.getGasPrice();
  // Estimate the amount of gas required to deploy the contract
  const gasEstimate = await Contract.deploy({
    data: `0x${bytecode}`,
  }).estimateGas();
  // Prepare the options for deployment, including the bytecode, gas, and gas price
  const deployOptions = {
    data: `0x${bytecode}`,
    gas: gasEstimate,
    gasPrice: gasPrice,
  };
  // Sign the deployment transaction using the private key associated with the account
  const signedTx = await account.signTransaction(deployOptions);
  // Send the signed transaction to the Ethereum network
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  // Log the contract address to the console after successful deployment
  console.log(`Contract deployed at: ${receipt.contractAddress}`);
};

deployContract();