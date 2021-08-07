import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tDragon } from '../../types/data'

export type tProps = {
  accountsState: any // @todo: complete
  attribute: number
  checkedMainchain: boolean
  checkedSidechain: boolean
  dragons: tDragon[]
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeAttribute: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  loading: boolean
  lowOrHigh: typeof LOW_TO_HIGH_VALUE | typeof HIGH_TO_LOW_VALUE
  transferMethod?: (id: string, location: string) => unknown
  search: string
}
