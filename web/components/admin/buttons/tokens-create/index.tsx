import React, { ReactElement } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import MainchainAPI from 'services/blockchain-interaction/mainchain'

import adminButtonsStyles from './styles.module.scss'

export default function AdminButtonsTokenCreate({ setLoading }): ReactElement {
  const buyDragonInMainChain: () => unknown = () => {
    setLoading(true)
    MainchainAPI.createDragon()
      .then((res) =>
        console.log('[MAINCHAIN]: Dragon create response', res)
      )
      .catch((err) => 
        console.error("Handle this error appropriately", err)
      )
      .finally(() => setLoading(false))
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
