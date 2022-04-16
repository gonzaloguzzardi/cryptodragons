class CommonAPI {
  static async sCreateDragonToken(contract, ownerAccount, gas) {
    // createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId)
    const gasEstimate = await contract.methods
      .createDragon('test dragon2', 1, 2, 2)
      .estimateGas({ from: ownerAccount, gas })

    console.log(`[COMMON-API_CREATE-DRAGON]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}, Owner: ${ownerAccount}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    const tx = await contract.methods
      .createDragon('test dragon2', 1, 2, 2)
      .send({ from: ownerAccount, gas: gas })

    console.log(`[COMMON-API]: Dragon created, tx hash: ${tx.transactionHash}`)
    return tx.transactionHash
  }

  static async sCreateSellOrder(dragonId, contract, ownerAccount, gas) {
    const title = "Title of the sell order...";
    const description = "Description of the sell order..."
    const price = 0;
    console.log(contract.methods);
    const gasEstimate = await contract.methods
      .createSellOrder(dragonId, title, description, price)
      .estimateGas({ from: ownerAccount, gas })
    console.log(gasEstimate);
    //console.log(`[COMMON-API_GET-MY-DRAGONS]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}, ownerAccount: ${ownerAccount}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .createSellOrder(dragonId, title, description, price)
      .call({ from: ownerAccount, gas: gasEstimate })
  }
  
  static async sBuyDragon(dragonId, contract, ownerAccount, gas) {
    const gasEstimate = await contract.methods
      .buyDragon(dragonId)
      .estimateGas({ from: ownerAccount, gas })
    //console.log(`[COMMON-API_GET-MY-DRAGONS]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}, ownerAccount: ${ownerAccount}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .buyDragon(dragonId)
      .call({ from: ownerAccount, gas: gasEstimate })
  }

  static async sGetMyDragons(contract, ownerAccount, gas) {
    const gasEstimate = await contract.methods
      .getDragonsIdsByOwner(ownerAccount)
      .estimateGas({ from: ownerAccount, gas })
    //console.log(`[COMMON-API_GET-MY-DRAGONS]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}, ownerAccount: ${ownerAccount}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .getDragonsIdsByOwner(ownerAccount)
      .call({ from: ownerAccount, gas: gasEstimate })
  }

  static async sTransferDragon(contract, ownerAccount, dragonId, gas) {
    const gasEstimate = await contract.methods
      .transferToGateway(dragonId)
      .estimateGas({ from: ownerAccount, gas })

    console.log(`[COMMON-API_TRANSFER-DRAGON]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return contract.methods
      .transferToGateway(dragonId)
      .send({ from: ownerAccount, gas: gasEstimate })
  }

  static async sAreAccountsMapped(contract, ownerAccount, otherChainAccount, gas) {
    const gasEstimate = await contract.methods
      .isMap(otherChainAccount)
      .estimateGas({ from: ownerAccount, gas })

    console.log(
      `[COMMON-API_ARE-ACCOUNTS-MAPPED]:`,
      `Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`,
      `[COMMON-API_ARE-ACCOUNTS-MAPPED]: Main account ${ownerAccount}, Side account: ${otherChainAccount}`
    )
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .isMap(otherChainAccount)
      .call({ from: ownerAccount, gas: gasEstimate })
  }

  static async getDragonDataById(dragonId, contract, ownerAccount, gas) {
    const gasEstimate = await contract.methods
      .getDragonById(dragonId)
      .estimateGas({ from: ownerAccount, gas })

    console.log(`[COMMON-API_GET-DRAGON-DATA]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .getDragonById(dragonId)
      .call({ from: ownerAccount, gas: gasEstimate })
  }

  static async getDragonVisualDataById(dragonId, contract, ownerAccount, gas) {
    const gasEstimate = await contract.methods
      .getVisualAttributes(dragonId)
      .estimateGas({ from: ownerAccount, gas })

    console.log(`[COMMON-API_GET-DRAGON-VISUAL-DATA]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .getVisualAttributes(dragonId)
      .call({ from: ownerAccount, gas: gasEstimate })
  }

  static async getGenerationAttributeFromBytes(genes, contract, ownerAccount, gas) {
    const gasEstimate = await contract.methods
      .getGenerationAttributeFromBytes(genes)
      .estimateGas({ from: ownerAccount, gas })

    console.log(`[COMMON-API_GET-DRAGON-DATA]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`)
    if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

    return await contract.methods
      .getGenerationAttributeFromBytes(genes)
      .call({ from: ownerAccount, gas: gasEstimate })
  }


}

export default CommonAPI
