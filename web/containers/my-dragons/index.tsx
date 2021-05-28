import React, { ReactElement, useState } from 'react'

import MyDragonsCommons from './my-dragons'
import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tLowOHigh } from '../../components/my-dragons/search-container/types'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function MyDragons({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const dragons = []

  const [search, setSearch] = useState('')

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

  return deviceType === 'desktop' ? (
    <MyDragonsCommons>
      <MyDragonsDesktop
        checkedGateways={state.checkedGateways}
        checkedMainchain={state.checkedMainchain}
        checkedSidechain={state.checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        search={search}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        lowOrHigh={lowOrHigh as tLowOHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        dragons={dragons}
      />
    </MyDragonsCommons>
  ) : (
    <MyDragonsCommons>
      <MyDragonsMobile
        checkedGateways={state.checkedGateways}
        checkedMainchain={state.checkedMainchain}
        checkedSidechain={state.checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        search={search}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        lowOrHigh={lowOrHigh as tLowOHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        dragons={dragons}
      />
    </MyDragonsCommons>
  )
}
