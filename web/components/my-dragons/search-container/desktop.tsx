import { ReactElement } from 'react'
import SearchBar from 'components/search-bar'
import SortingBarDesktop from 'components/sorting-bar/desktop'
import ComponentContainerDesktop from 'components/component-container/desktop'

import { tComponentProps } from './types'

export default function MyDragonsSearchContainerDesktop({
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
    <ComponentContainerDesktop>
      <SearchBar value={search} onChange={handleSearchChange} />
      <SortingBarDesktop
        checkedMainchain={checkedMainchain}
        checkedSidechain={checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        lowOrHigh={lowOrHigh}
      />
    </ComponentContainerDesktop>
  )
}
