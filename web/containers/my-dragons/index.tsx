import React, { ReactElement, useEffect, useState } from 'react'

import MyDragonsCommons from './my-dragons'
import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tLowOHigh } from '../../components/my-dragons/search-container/types'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function MyDragons({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [dragons, setDragons] = useState([])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
  }

  const [state, setState] = useState({
    checkedMainchain: true,
    checkedSidechain: true,
    checkedGateways: true,
  })

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const [attribute, setAttribute] = useState(10)
  const handleChangeAttribute = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setAttribute(event.target.value as number)
  }

  const [lowOrHigh, setLowOrHigh] = useState(LOW_TO_HIGH_VALUE)
  const handleChangeSelectLowHigh = (event: React.ChangeEvent<{ value: unknown }>): void => {
    event.preventDefault()
    setLowOrHigh(lowOrHigh === LOW_TO_HIGH_VALUE ? HIGH_TO_LOW_VALUE : LOW_TO_HIGH_VALUE)
  }

  const mapDragonsResults = (results: any[], source: string): any[] =>
    results ? results.map((dragon: any) => ({ id: dragon, source })) : []

  useEffect(() => {
    Promise.all([MainchainAPI.getMyDragons(), SidechainAPI.getMyDragons()]).then((results) => {
      setDragons([
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
          dragons={dragons}
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
