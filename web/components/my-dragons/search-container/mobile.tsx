import { ReactElement } from 'react'
import ComponentContainerMobile from 'components/component-container/mobile'
import SearchBar from 'components/search-bar'
import SortingBarMobile from 'components/sorting-bar/mobile'

import { tComponentProps } from './types'

export default function MyDragonsSearchContainerMobile({
  chMainchain,
  chSidechain,
  handleCheckedChange,
  handleSearchChange,
  search,
  attributes,
  attributeValue,
  handleChangeAttribute,
  handleChangeSelectLowHigh,
  lowOrHigh,
}: tComponentProps): ReactElement {
  return (
    <ComponentContainerMobile>
      <SearchBar value={search} onChange={handleSearchChange} />
      <SortingBarMobile
        chMainchain={chMainchain}
        chSidechain={chSidechain}
        handleCheckedChange={handleCheckedChange}
        attributes={attributes}
        attributeValue={attributeValue}
        handleChangeAttribute={handleChangeAttribute}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        lowOrHigh={lowOrHigh}
      />
    </ComponentContainerMobile>
  )
}
