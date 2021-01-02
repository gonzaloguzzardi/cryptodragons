import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'

import MyDragons from './my-dragons'

export default function HomeMobile(): ReactElement {
  return (
    <MyDragons>
      <AppToolbar deviceType="desktop" section="my-dragons" />
      <p>My Dragons</p>
    </MyDragons>
  )
}
