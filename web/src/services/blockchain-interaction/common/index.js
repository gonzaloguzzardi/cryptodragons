class CommonAPI {

  static async sCreateDragonToken(contract, ownerAccount, gas) {
    // createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId)
    const gasEstimate = await contract.methods
      .createDragon('test dragon', 1, 2, 2)
      .estimateGas({ from: ownerAccount, gas });

    console.log(`[COMMON-API_CREATE-DRAGON]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`);
    if (gasEstimate >= gas) { throw new Error('Not enough enough gas, send more.'); }

    const tx = await contract.methods
      .createDragon('test dragon', 1, 2, 2)
      .send({ from: ownerAccount, gas: gasEstimate });

    console.log(`[COMMON-API]: Dragon created, tx hash: ${tx.transactionHash}`);
    return tx.transactionHash;
  }

  static async sGetMyDragons(contract, ownerAccount, gas) {
      const gasEstimate = await contract.methods
        .getDragonsIdsByOwner(ownerAccount)
        .estimateGas({ from: ownerAccount, gas });

      console.log(`[COMMON-API_GET-MY-DRAGONS]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`);
      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.');

      return await contract.methods
        .getDragonsIdsByOwner(ownerAccount)
        .call({ from: ownerAccount, gas: gasEstimate });
  }

  static async sTransferDragon(api, dragonId, gas) {
    return api.getClientHelper().then(client => {
      const contract = client.tokenContract;
      const ownerAccount = client.account;

      // const gasEstimate = await contract.methods
      //   .transferToGateway(dragonId)
      //   .estimateGas({ from: ownerAccount, gas: 0 });
      // if (gasEstimate >= gas) { throw new Error('Not enough enough gas, send more.'); }

      const gasEstimate = gas || 350000;
      return contract.methods
        .transferToGateway(dragonId)
        .send({ from: ownerAccount, gas: gasEstimate })
        .then(res => res)
        .catch(err => console.error(err));
    }).catch(err => console.error(err));
  }

  static async sAreAccountsMapped(contract, ownerAccount, otherChainAccount, gas) {
    const gasEstimate = await contract.methods
      .isMap(otherChainAccount)
      .estimateGas({ from: ownerAccount, gas: 0 });

    console.log(`[COMMON-API_ARE-ACCOUNTS-MAPPED]: Gas sent: ${gas}, Gas Estimate: ${gasEstimate}`);
    if (gasEstimate >= gas) { throw new Error('Not enough enough gas, send more.'); }

    return await contract.methods
      .isMap(otherChainAccount)
      .call({ from: ownerAccount, gas: gasEstimate });
  }

};

export default CommonAPI;
