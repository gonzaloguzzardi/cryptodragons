import React, { useState } from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import MyDragonsSearchContainerDesktop from '../../components/my-dragons/search-container/desktop'
import {
  LOW_TO_HIGH_VALUE,
  HIGH_TO_LOW_VALUE,
} from '../../components/my-dragons/search-container/constants'
import { tLowOHigh } from '../../components/my-dragons/search-container/types'
import MyDragonsGridViewDesktop from '../../components/my-dragons/grid-view/desktop'
import FooterDesktop from '../../components/footer/desktop'

function MyDragonsDesktop({ accountsState }): ReactElement {
  const [search, setSearch] = useState('')

  const handleSearchChange = (event): void => {
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

  return (
    <>
      <AppToolbar deviceType="desktop" section="my-dragons" accountsState={accountsState} />
      <MyDragonsSearchContainerDesktop
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
      />
      <MyDragonsGridViewDesktop />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MyDragonsDesktop)
