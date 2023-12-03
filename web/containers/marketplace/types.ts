import { ChangeEvent } from 'react'
import { tLowOrHigh } from 'components/sorting-bar/types'
import { tMarketplaceDragon } from 'types/data'

export type tProps = {
  dragons: tMarketplaceDragon[]
  myDragons: string[]
  filteredDragons: tMarketplaceDragon[]
  loading: boolean
  accountsState: any // @todo: complete
  attributeValue: number
  attributes: { name: string; value: number }[]
  lowOrHigh: tLowOrHigh
  handleChangeSelectLowHigh: (event: ChangeEvent<{ value: unknown }>) => void
}
