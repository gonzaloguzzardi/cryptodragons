import { tDragon } from 'types/data'
import { tLowOrHigh } from 'components/sorting-bar/types'

export type tProps = {
  accountsState: any // @todo: complete
  attribute: number
  checkedMainchain: boolean
  checkedSidechain: boolean
  dragons: tDragon[]
  filteredDragons: tDragon[]
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeAttribute: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  loading: boolean
  lowOrHigh: tLowOrHigh
  transferMethod?: (id: string, location: string) => unknown
  search: string
}
