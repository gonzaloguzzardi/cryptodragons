import { ReactElement } from 'react'
import ComponentContainerMobile from 'components/component-container/mobile'
import SearchBar from '../../search-bar'
import SortingBarMobile from 'components/sorting-bar/mobile'

import { tComponentProps } from './types'

export default function MyDragonsSearchContainerMobile({
  checkedMainchain,
  checkedSidechain,
  handleCheckedChange,
  handleSearchChange,
  search,
  attribute,
  handleChangeAttribute,
  handleChangeSelectLowHigh,
  lowOrHigh,
}: tComponentProps): ReactElement {
  return (
    <ComponentContainerMobile>
      <SearchBar value={search} onChange={handleSearchChange} />
      <SortingBarMobile
        checkedMainchain={checkedMainchain}
        checkedSidechain={checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        lowOrHigh={lowOrHigh}
      />
    </ComponentContainerMobile>
  )
}
