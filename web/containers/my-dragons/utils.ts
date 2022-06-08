export const mapDragonsResults = (results: any[], source: string): any[] =>
  results ? results.map((dragon: any) => ({ id: dragon, source })) : []

const DRAGONS_DST_OK = {
  MAINCHAIN: 'MAINCHAIN_GATEWAY',
  MAINCHAIN_GATEWAY: 'SIDECHAIN',
  SIDECHAIN: 'SIDECHAIN_GATEWAY',
  SIDECHAIN_GATEWAY: 'MAINCHAIN',
}

const DRAGONS_DST_ERROR = {
  MAINCHAIN_GATEWAY: 'MAINCHAIN',
  SIDECHAIN_GATEWAY: 'SIDECHAIN',
}

export const updateDragonLocationOk = (dragons: any[], id, src): any[] =>
  dragons.map((d) => (d.id === id && d.source === src ? { ...d, source: DRAGONS_DST_OK[src] } : d))

export const updateDragonLocationError = (dragons: any[], id, src): any[] =>
  dragons.map((d) =>
    d.id === id && d.source === src ? { ...d, source: DRAGONS_DST_ERROR[src] } : d
  )

export function updateDragonsBasedOnSearchFilters(
  dragons: any[],
  name: string,
  checked: boolean,
  checkedMainchain: boolean,
  checkedSidechain: boolean
): any[] {
  let finalDragons = dragons
  if ((name === 'Mainchain' && !checked) || (name !== 'Mainchain' && !checkedMainchain)) {
    finalDragons = finalDragons.filter(
      (dragon) => dragon.source !== 'MAINCHAIN' && dragon.source !== 'MAINCHAIN_GATEWAY'
    )
  }
  if ((name === 'Sidechain' && !checked) || (name !== 'Sidechain' && !checkedSidechain)) {
    finalDragons = finalDragons.filter(
      (dragon) => dragon.source !== 'SIDECHAIN' && dragon.source !== 'SIDECHAIN_GATEWAY'
    )
  }
  return finalDragons
}
