require('dotenv').config({ path: '../.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledEventFactory = require('./build/EventFactory.json');

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_ENDPOINT
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledEventFactory.abi)
      .deploy({ data: compiledEventFactory.evm.bytecode.object })
      .send({ gas: '3000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
  } catch (error) {
    console.error('An error occurred during deployment:', error);
  } finally {
    provider.engine.stop();
  }
};

deploy();
