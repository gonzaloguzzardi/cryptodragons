import { tMarketplaceDragon } from 'types/data'

export type tProps = {
  dragons: tMarketplaceDragon[]
  myDragons: string[]
  filteredDragons: tMarketplaceDragon[]
  loading: boolean
}
