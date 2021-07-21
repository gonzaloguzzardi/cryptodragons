export type tDragonSrc = 'SIDECHAIN' | 'MAINCHAIN' | 'MAINCHAIN_GATEWAY' | 'SIDECHAIN_GATEWAY'

export type tDragon = {
  name: string
  id: string
  source: tDragonSrc
}