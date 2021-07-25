import React, { ReactElement, useEffect, useState } from 'react'

import MyDragonsCommons from './my-dragons'
import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
import { mapDragonsResults } from './utils'
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
    checkedGateways: true,
  })
  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.checked })

    let finalDragons = [...dragons]
    if (
      (event.target.name === 'checkedMainchain' && !event.target.checked) ||
      (event.target.name !== 'checkedMainchain' && !state.checkedMainchain)
    ) {
      finalDragons = finalDragons.filter((dragon) => dragon.source !== 'MAINCHAIN')
    }
    if (
      (event.target.name === 'checkedSidechain' && !event.target.checked) ||
      (event.target.name !== 'checkedSidechain' && !state.checkedSidechain)
    ) {
      finalDragons = finalDragons.filter((dragon) => dragon.source !== 'SIDECHAIN')
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

  useEffect(() => {
    Promise.all([MainchainAPI.getMyDragons(), SidechainAPI.getMyDragons()]).then((results) => {
      setDragons([
        ...mapDragonsResults(results[0], 'MAINCHAIN'),
        ...mapDragonsResults(results[1], 'SIDECHAIN'),
      ])
      setFilteredDragons([
        ...mapDragonsResults(results[0], 'MAINCHAIN'),
        ...mapDragonsResults(results[1], 'SIDECHAIN'),
      ])
      setLoading(false)
    })
  }, [])

  if (deviceType === 'desktop') {
    return (
      <MyDragonsCommons>
        <MyDragonsDesktop
          checkedGateways={state.checkedGateways}
          checkedMainchain={state.checkedMainchain}
          checkedSidechain={state.checkedSidechain}
          handleCheckedChange={handleCheckedChange}
          handleSearchChange={handleSearchChange}
          search={search}
          loading={loading}
          attribute={attribute}
          handleChangeAttribute={handleChangeAttribute}
          lowOrHigh={lowOrHigh as tLowOHigh}
          handleChangeSelectLowHigh={handleChangeSelectLowHigh}
          dragons={filteredDragons}
        />
      </MyDragonsCommons>
    )
  }

  return (
    <MyDragonsCommons>
      <MyDragonsMobile
        checkedGateways={state.checkedGateways}
        checkedMainchain={state.checkedMainchain}
        checkedSidechain={state.checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        search={search}
        loading={loading}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        lowOrHigh={lowOrHigh as tLowOHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        dragons={dragons}
      />
    </MyDragonsCommons>
  )
}
