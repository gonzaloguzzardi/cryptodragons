import { ReactElement } from 'react'
import SortingBarDesktop from 'components/sorting-bar/desktop'
import ComponentContainerDesktop from 'components/component-container/desktop'

import { tComponentProps } from './types'

export default function MarketplaceSearchContainerDesktop({
  attributes,
  attributeValue,
  handleChangeSelectLowHigh,
  lowOrHigh,
}: tComponentProps): ReactElement {
  return (
    <ComponentContainerDesktop>
      <SortingBarDesktop
        checkboxes={false}
        attributeValue={attributeValue}
        attributes={attributes}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
    </ComponentContainerDesktop>
  )
}
