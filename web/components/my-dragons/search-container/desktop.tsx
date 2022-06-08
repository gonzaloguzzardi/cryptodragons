import { ReactElement } from 'react'
import SearchBar from 'components/search-bar'
import SortingBarDesktop from 'components/sorting-bar/desktop'
import ComponentContainerDesktop from 'components/component-container/desktop'

import { tComponentProps } from './types'

export default function MyDragonsSearchContainerDesktop({
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
    <ComponentContainerDesktop>
      <SearchBar value={search} onChange={handleSearchChange} />
      <SortingBarDesktop
        chMainchain={chMainchain}
        chSidechain={chSidechain}
        handleCheckedChange={handleCheckedChange}
        attributes={attributes}
        attributeValue={attributeValue}
        handleChangeAttribute={handleChangeAttribute}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        lowOrHigh={lowOrHigh}
      />
    </ComponentContainerDesktop>
  )
}
