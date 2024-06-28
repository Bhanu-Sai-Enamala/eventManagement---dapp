const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts' , 'Event.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Event.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};


const output = JSON.parse(solc.compile(JSON.stringify(input)));


fs.ensureDirSync(buildPath);

for (const contractName in output.contracts['Event.sol']) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contractName}.json`),
        output.contracts['Event.sol'][contractName]
    );
}



