import React, { ReactElement, useEffect, useState } from 'react'

import MarketplaceCommons from './marketplace'
import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from 'components/sorting-bar/constants'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'
import { getDragonsFromOracleAPI } from 'services/oracle'
import { mapDragonsResults, updateDragonsBasedOnSearchFilters } from '../my-dragons/utils'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const [dragons, setDragons] = useState([])
  const [filteredDragons, setFilteredDragons] = useState([])
  const [loading, setLoading] = useState(true)

  // low to high - change
  const [lowOrHigh, setLowOrHigh] = useState(LOW_TO_HIGH_VALUE)
  const handleChangeSelectLowHigh = (event: React.ChangeEvent<{ value: unknown }>): void => {
    event.preventDefault()
    setLowOrHigh(lowOrHigh === LOW_TO_HIGH_VALUE ? HIGH_TO_LOW_VALUE : LOW_TO_HIGH_VALUE)
  }

  const updateDragons = (): void => {
    console.log('Updating dragons')
    Promise.all([
      MainchainAPI.getMyDragons(),
      SidechainAPI.getMyDragons(),
      getDragonsFromOracleAPI(),
    ]).then((results) => {
      console.log(`Results: ${results}`)
      if (!results || !results[0] || !results[1] || !results[2]) return setLoading(false)

      const dragons = [
        ...mapDragonsResults(results[0], 'MAINCHAIN'),
        ...mapDragonsResults(results[1], 'SIDECHAIN'),
        ...mapDragonsResults(results[2][0]['sidechain-gateway-results'], 'SIDECHAIN_GATEWAY'),
        ...mapDragonsResults(results[2][1]['mainchain-gateway-results'], 'MAINCHAIN_GATEWAY'),
      ]
      setDragons(dragons)
      setFilteredDragons(updateDragonsBasedOnSearchFilters(dragons, null, null, null, null))
      setLoading(false)
    })
  }

  useEffect(() => {
    updateDragons()
    setInterval(updateDragons, 10000)
  }, [])

  const commonProps = {
    dragons,
    filteredDragons,
    attributes: [{ name: 'Price', value: 0 }],
    attributeValue: 0,
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
