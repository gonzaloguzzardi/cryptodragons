import React from 'react'
import Grid from '@material-ui/core/Grid'
import FeaturedCard from '../featured-card/index'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function ShowcaseCardDemo(): ReactElement {
  return (
    <Grid container justify="space-between">
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
      <Grid container item justify="center" xs={3}>
        <FeaturedCard />
      </Grid>
    </Grid>
  )
}
