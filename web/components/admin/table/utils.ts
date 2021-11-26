export function createData(genes: string, owner: string, location: string, onSale: boolean): any {
  return {
    genes,
    owner,
    location,
    onSale,
    attributes: {
      name: 'mocked-value for name',
      creationTime: 'mocked-value for creationTime',
      dadId: 'mocked-value for dadId',
      motherId: 'mocked-value for motherId',
      blockchainOriginId: 'mocked-value for blockchainOriginId',
      health: 'mocked-value for health',
      strength: 'mocked-value for strength',
      agility: 'mocked-value for agility',
      fortitude: 'mocked-value for fortitude',
      hatchTime: 'mocked-value for hatchTime',
      currentExperience: 'mocked-value for currentExperience',
      actionCooldown: 'mocked-value for actionCooldown',
    },
  }
}
