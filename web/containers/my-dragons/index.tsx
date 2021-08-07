import React, { ReactElement, useEffect, useState } from 'react'

import MyDragonsCommons from './my-dragons'
import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
import { getDragonsFromOracleAPI } from '../../services/oracle'
import { mapDragonsResults, updateDragonLocationError, updateDragonLocationOk } from './utils'
import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tLowOHigh } from '../../components/my-dragons/search-container/types'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

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
  const [state, setState] = useState({
    checkedMainchain: true,
    checkedSidechain: true,
  })
  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.checked })

    let finalDragons = [...dragons]
    if (
      (event.target.name === 'checkedMainchain' && !event.target.checked) ||
      (event.target.name !== 'checkedMainchain' && !state.checkedMainchain)
    ) {
      finalDragons = finalDragons.filter(
        (dragon) => dragon.source !== 'MAINCHAIN' && dragon.source !== 'MAINCHAIN_GATEWAY'
      )
    }
    if (
      (event.target.name === 'checkedSidechain' && !event.target.checked) ||
      (event.target.name !== 'checkedSidechain' && !state.checkedSidechain)
    ) {
      finalDragons = finalDragons.filter(
        (dragon) => dragon.source !== 'SIDECHAIN' && dragon.source !== 'SIDECHAIN_GATEWAY'
      )
    }
    setFilteredDragons(finalDragons)
  }

  // Sort by - change
  const [attribute, setAttribute] = useState(10)
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
      setDragons([
        ...mapDragonsResults(results[0], 'MAINCHAIN'),
        ...mapDragonsResults(results[1], 'SIDECHAIN'),
        ...mapDragonsResults(results[2][0]['sidechain-gateway-results'], 'SIDECHAIN_GATEWAY'),
        ...mapDragonsResults(results[2][1]['mainchain-gateway-results'], 'MAINCHAIN_GATEWAY'),
      ])
      setFilteredDragons([
        ...mapDragonsResults(results[0], 'MAINCHAIN'),
        ...mapDragonsResults(results[1], 'SIDECHAIN'),
        ...mapDragonsResults(results[2][0]['sidechain-gateway-results'], 'SIDECHAIN_GATEWAY'),
        ...mapDragonsResults(results[2][1]['mainchain-gateway-results'], 'MAINCHAIN_GATEWAY'),
      ])
      setLoading(false)
    })
  }

  useEffect(() => {
    updateDragons()
    setInterval(updateDragons, 7000)
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

  if (deviceType === 'desktop') {
    return (
      <MyDragonsCommons>
        <MyDragonsDesktop
          attribute={attribute}
          checkedMainchain={state.checkedMainchain}
          checkedSidechain={state.checkedSidechain}
          dragons={filteredDragons}
          handleChangeAttribute={handleChangeAttribute}
          handleChangeSelectLowHigh={handleChangeSelectLowHigh}
          handleCheckedChange={handleCheckedChange}
          handleSearchChange={handleSearchChange}
          loading={loading}
          lowOrHigh={lowOrHigh as tLowOHigh}
          transferMethod={transferDragon}
          search={search}
        />
      </MyDragonsCommons>
    )
  }

  return (
    <MyDragonsCommons>
      <MyDragonsMobile
        attribute={attribute}
        checkedMainchain={state.checkedMainchain}
        checkedSidechain={state.checkedSidechain}
        dragons={filteredDragons}
        handleChangeAttribute={handleChangeAttribute}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        loading={loading}
        lowOrHigh={lowOrHigh as tLowOHigh}
        transferMethod={transferDragon}
        search={search}
      />
    </MyDragonsCommons>
  )
}
