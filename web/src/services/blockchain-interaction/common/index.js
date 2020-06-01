class CommonAPI {
  static async sCreateDragonToken(api, gas) {
    return api.getClientHelper().then(client => {
      const contract = client.tokenContract;
      const ownerAccount = client.account;

      // // createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId)

      // const gasEstimate = await contract.methods
      //   .createDragon('test dragon', 1, 2, 2)
      //   .estimateGas({ from: ownerAccount, gas: 0 });
  
      // if (gasEstimate >= gas) {
      //   throw new Error('Not enough enough gas, send more.');
      // }

      const gasEstimate = gas;
      return contract.methods.createDragon('test dragon', 1, 2, 2).send({ from: ownerAccount, gas: gasEstimate })
        .then(tx => {
          let hash = '';
          console.log(`Dragon created`);
          console.log(`tx hash: ${tx.transactionHash}`);
          hash = tx.transactionHash;
          return hash;
        })
    }).catch(err => console.error(err));
  }


};

export default CommonAPI;
