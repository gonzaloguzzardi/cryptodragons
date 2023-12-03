import React, { ReactElement, useEffect, useState } from 'react'

import MarketplaceCommons from './marketplace'
import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from 'components/sorting-bar/constants'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import { sortByAttribute } from './utils'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const [dragons, setDragons] = useState([])
  const [myDragons, setMyDragons] = useState([])
  const [filteredDragons, setFilteredDragons] = useState([])
  const [loading, setLoading] = useState(false)
  const [attributeValue, setattributeValue] = useState(0)

  const priceAttr = 'price';
  const attributes = [
    { name: priceAttr, value: 0 },
  ];

  // low to high - change
  const [lowOrHigh, setLowOrHigh] = useState(LOW_TO_HIGH_VALUE)
  const handleChangeSelectLowHigh = (event: React.ChangeEvent<{ value: unknown }>): void => {
    event.preventDefault()
    const value = lowOrHigh === LOW_TO_HIGH_VALUE ? HIGH_TO_LOW_VALUE : LOW_TO_HIGH_VALUE
    setLowOrHigh(value)
    setFilteredDragons(sortByAttribute(dragons, attributes[attributeValue].name, value));
  }

  const updateDragons = (): void => {
    setLoading(true);
    MainchainAPI.getMarketplaceDragons().then((marketplaceTokens) => {
      setDragons(marketplaceTokens);
      setFilteredDragons(sortByAttribute(marketplaceTokens, attributes[attributeValue].name, LOW_TO_HIGH_VALUE));
      setLoading(false);
    })
    MainchainAPI.getMyDragons().then((myDragons) => {
      setMyDragons(myDragons);
    })
  }

  useEffect(() => {
    updateDragons()
  }, [])

  const commonProps = {
    dragons,
    myDragons,
    filteredDragons,
    attributes,
    attributeValue,
    lowOrHigh,
    handleChangeSelectLowHigh,
    loading,
  }

  return deviceType === 'desktop' ? (
    <MarketplaceCommons>
      <MarketplaceDesktop {...commonProps} />
    </MarketplaceCommons>
  ) : (
    <MarketplaceCommons>
      <MarketplaceMobile {...commonProps} />
    </MarketplaceCommons>
  )
}
