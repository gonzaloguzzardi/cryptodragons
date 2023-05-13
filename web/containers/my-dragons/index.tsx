import React, { ReactElement, useEffect, useRef, useState } from 'react'

import MyDragonsCommons from './my-dragons'
import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'
import { getDragonsFromOracleAPI } from 'services/oracle'
import {
  mapDragonsResults,
  updateDragonLocationError,
  updateDragonLocationOk,
  updateDragonsBasedOnSearchFilters,
} from './utils'
import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from 'components/sorting-bar/constants'
import { tLowOHigh } from 'components/my-dragons/search-container/types'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function MyDragons({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const [dragons, setDragons] = useState([])
  const [filteredDragons, setFilteredDragons] = useState([])
  const [loading, setLoading] = useState(true)

  // Search - change
  const [search, setSearch] = useState('')
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  // Checkbox - change
  const chMainchain = useRef(true)
  const chSidechain = useRef(true)
  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'Mainchain') {
      chMainchain.current = event.target.checked
    }
    if (event.target.name === 'Sidechain') {
      chSidechain.current = event.target.checked
    }
    setFilteredDragons(
      updateDragonsBasedOnSearchFilters(
        dragons,
        chMainchain.current,
        chSidechain.current
      )
    )
  }

  // Sort by - change
  const attributes = [
    { name: 'Strength', value: 0 },
    { name: 'Fire', value: 1 },
    { name: 'Whatever', value: 2 },
  ]
  const [attributeValue, setAttribute] = useState(0)
  const handleChangeAttribute = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setAttribute(event.target.value as number)
  }

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
      setFilteredDragons(
        updateDragonsBasedOnSearchFilters(
          dragons,
          chMainchain.current,
          chSidechain.current
        )
      )
      setLoading(false)
    })
  }

  useEffect(() => {
    updateDragons()
    setInterval(updateDragons, 10000)
  }, [])

  const transferDragon = (id: string, location: string): void => {
    setDragons((drgs) => updateDragonLocationOk(drgs, id, location))
    setFilteredDragons((drgs) => updateDragonLocationOk(drgs, id, location))

    console.log(`Starting ${id} - ${location}`)
    if (location === 'SIDECHAIN') {
      SidechainAPI.transferDragon(id)
        .then(() => {
          // setTimeout(updateDragons, 2000) We are using interval cause this callback was not being executed always..(weird)
          console.log(`Dragon ${id} transferred to Mainchain successfully`)
        })
        .catch((err) => {
          setDragons((drgs) => updateDragonLocationError(drgs, id, 'SIDECHAIN_GATEWAY'))
          setFilteredDragons((drgs) => updateDragonLocationError(drgs, id, 'SIDECHAIN_GATEWAY'))
          console.log(`Dragon ${id} error transferring to Mainchain: ${err}`)
        })
    }
    if (location === 'MAINCHAIN') {
      MainchainAPI.transferDragon(id)
        .then(() => {
          // setTimeout(updateDragons, 2000) We are using interval cause this callback was not being executed always..(weird)
          console.log(`Dragon ${id} transferred to Sidechain successfully`)
        })
        .catch((err) => {
          setDragons((drgs) => updateDragonLocationError(drgs, id, 'MAINCHAIN_GATEWAY'))
          setFilteredDragons((drgs) => updateDragonLocationError(drgs, id, 'MAINCHAIN_GATEWAY'))
          console.log(`Dragon ${id} error transferring to Sidechain: ${err}`)
        })
    }
  }

  const commonProps = {
    dragons,
    filteredDragons,
    search,
    handleSearchChange,
    chMainchain: chMainchain.current,
    chSidechain: chSidechain.current,
    handleCheckedChange,
    attributes,
    attributeValue,
    handleChangeAttribute,
    lowOrHigh: lowOrHigh as tLowOHigh,
    handleChangeSelectLowHigh,
    loading,
    transferMethod: transferDragon,
  }

  if (deviceType === 'desktop') {
    return (
      <MyDragonsCommons>
        <MyDragonsDesktop {...commonProps} />
      </MyDragonsCommons>
    )
  }

  return (
    <MyDragonsCommons>
      <MyDragonsMobile {...commonProps} />
    </MyDragonsCommons>
  )
}
