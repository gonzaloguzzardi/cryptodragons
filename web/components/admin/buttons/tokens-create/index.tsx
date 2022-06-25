import React, { ReactElement } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import MainchainAPI from 'services/blockchain-interaction/mainchain'

import adminButtonsStyles from './tokens-create-buttons.module.scss'

export default function AdminButtonsTokenCreate(): ReactElement {
  const buyDragonInMainChain: () => unknown = () => {
    MainchainAPI.createDragon().then((res) =>
      console.log('[MAINCHAIN]: Dragon create response', res)
    )
  }

  return (
    <Container className={adminButtonsStyles.container}>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={buyDragonInMainChain}>
            New ERC 721 in Mainchain
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
