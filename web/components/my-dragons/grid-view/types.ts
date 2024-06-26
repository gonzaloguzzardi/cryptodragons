import { tDragon } from '../../../types/data'

export type tProps = {
  dragons: tDragon[]
  filteredDragons: tDragon[]
  loading: boolean
  transferMethod?: (id: string, location: string) => unknown
  mappedAccounts: boolean
}
