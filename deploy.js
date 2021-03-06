const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

const MNEMONIC_PHRASE = 'video monster benefit field trim jungle blossom nothing rose tooth refuse decorate';
const INFURA_API_KEY = 'https://rinkeby.infura.io/v3/2e5d5b3653fb4f408c5305b7b5490a42';
const INITIAL_MESSAGE = 'Hi there!';

const provider = new HDWalletProvider(MNEMONIC_PHRASE, INFURA_API_KEY);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
};
deploy();
