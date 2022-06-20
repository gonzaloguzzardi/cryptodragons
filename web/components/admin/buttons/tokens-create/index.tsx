import React, { ReactElement } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'

import adminButtonsStyles from './admin-buttons.module.scss'

export default function AdminButtonsTokenCreate(): ReactElement {
  const buyDragonInSideChain: () => unknown = () => {
    SidechainAPI.createDragon().then((res) => {
      console.log('[SIDECHAIN]: Dragon create response', res)
    })
  }

  const buyDragonInMainChain: () => unknown = () => {
    MainchainAPI.createDragon().then((res) =>
      console.log('[MAINCHAIN]: Dragon create response', res)
    )
  }

  return (
    <Container className={adminButtonsStyles.container}>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={buyDragonInSideChain}>
            New ERC 721 in Sidechain
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={buyDragonInMainChain}>
            New ERC 721 in Mainchain
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
