import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'

import Home from './home'

export default function HomeMobile(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="desktop" />
      <Container>
        <Box my={2}>
          {[...new Array(52)]
            .map(
              () => `Desktop Desktop Desktop Desktop Desktop Desktop Desktop
              Desktop Desktop Desktop Desktop Desktop Desktop Desktop Desktop
              Desktop Desktop Desktop Desktop Desktop Desktop Desktop Desktop
              Desktop Desktop Desktop Desktop Desktop Desktop Desktop Desktop
              Desktop Desktop Desktop Desktop Desktop Desktop Desktop Desktop`
            )
            .join('\n')}
        </Box>
      </Container>
    </Home>
  )
}
