import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import ItemLink from '../item-link'

import styles from './desktop.module.scss'

import { ReactElement } from 'react'

export default function footerDesktop(): ReactElement {
  return (
    <div className={styles.main}>
      <Grid container className={styles.container}>
        <Grid item xs={2}>
          <ItemLink href="/..." text="My profile" />
          <ItemLink href="/..." text="Search" />
          <ItemLink href="/..." text="FAQs" />
          <ItemLink href="/..." text="Latest updates" />
          <ItemLink href="/..." text="Privacy" />
          <ItemLink href="/..." text="Terms and Conditions" />
        </Grid>
        <Grid item xs={2}>
          <ItemLink href="/..." text="About us" />
          <ItemLink href="/..." text="Join us!" />
          <ItemLink href="/..." text="Contact us" />
        </Grid>
      </Grid>

      <Divider />

      <Grid container className={styles.container}>
        <Grid item xs={2}>
          <Typography variant="overline" color="textPrimary" component="p">
            CryptoDragons © 2021
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
