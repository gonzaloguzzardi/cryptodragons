import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar/index'

import Home from './home'

export default function HomeMobile(): ReactElement {
  return (
    <Home>
      <AppToolbar />
      <Container>
        <Box my={2}>
          {[...new Array(52)]
            .map(
              () => `Mobile Mobile Mobile Mobile Mobile Mobile Mobile
              Mobile Mobile Mobile Mobile Mobile Mobile Mobile Mobile
              Mobile Mobile Mobile Mobile Mobile Mobile Mobile Mobile
              Mobile Mobile Mobile Mobile Mobile Mobile Mobile Mobile
              Mobile Mobile Mobile Mobile Mobile Mobile Mobile Mobile`
            )
            .join('\n')}
        </Box>
      </Container>
    </Home>
  )
}
