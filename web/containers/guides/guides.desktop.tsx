import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'

import Guides from './guides'

export default function GuidesDesktop(): ReactElement {
  return (
    <Guides>
      <AppToolbar deviceType="desktop" section="guides" />
      <p>Guides</p>
    </Guides>
  )
}
