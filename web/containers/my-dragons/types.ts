import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tDragon } from '../../types/data'

export type tProps = {
  accountsState: any // @todo: complete
  checkedGateways: boolean
  checkedMainchain: boolean
  checkedSidechain: boolean
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  search: string
  attribute: number
  handleChangeAttribute: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  lowOrHigh: typeof LOW_TO_HIGH_VALUE | typeof HIGH_TO_LOW_VALUE
  dragons: tDragon[]
}
