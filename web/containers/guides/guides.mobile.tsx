import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'

import Guides from './guides'

export default function GuidesMobile(): ReactElement {
  return (
    <Guides>
      <AppToolbar deviceType="mobile" section="guides" />
      <p>Guides</p>
    </Guides>
  )
}
