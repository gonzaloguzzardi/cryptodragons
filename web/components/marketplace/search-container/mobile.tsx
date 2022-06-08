import { ReactElement } from 'react'
import ComponentContainerMobile from 'components/component-container/mobile'
import SortingBarMobile from 'components/sorting-bar/mobile'

import { tComponentProps } from './types'

export default function MarketplaceSearchContainerMobile({
  attributes,
  attributeValue,
  handleChangeSelectLowHigh,
  lowOrHigh,
}: tComponentProps): ReactElement {
  return (
    <ComponentContainerMobile>
      <SortingBarMobile
        checkboxes={false}
        attributeValue={attributeValue}
        attributes={attributes}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
    </ComponentContainerMobile>
  )
}
