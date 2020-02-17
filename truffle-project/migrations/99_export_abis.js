const fs = require('fs')
const path = require('path')
const contracts = path.resolve(__dirname, '../src/contracts/')
const unityAbisPath = path.resolve(__dirname, '../../UnityClient/Assets/Contracts/Resources')
const oracleJsonsPath = path.resolve(__dirname, '../../oracle/contracts_jsons')

module.exports = async function(deployer, network, accounts) {
    let builtContracts = fs.readdirSync(contracts)
    // loop over every contract
    builtContracts.forEach(contract => {
        // Get the JSON for a specific contract
        let json = JSON.parse(fs.readFileSync(path.resolve(contracts, contract)))
        // Extract just the abi
        let { abi } = json
        // Write the abi to a new file in the unityAbis directory
        fs.writeFileSync(path.resolve(unityAbisPath, contract), JSON.stringify(json.abi))

        // Write the abi to a new file in the unityAbis directory
        fs.writeFileSync(path.resolve(oracleJsonsPath, contract), JSON.stringify(json))
    });
}