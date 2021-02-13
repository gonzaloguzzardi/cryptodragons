import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import ItemLink from './item-link'

import styles from './mobile.module.scss'

import { ReactElement } from 'react'

import Icon from './icon'

export default function FooterMobile(): ReactElement {
  return (
    <div className={styles.main}>
      <Grid container className={styles.container}>
        <Grid item xs={6}>
          <ItemLink href="/..." text="My profile" />
          <ItemLink href="/..." text="Search" />
          <ItemLink href="/..." text="FAQs" />
          <ItemLink href="/..." text="Latest updates" />
          <ItemLink href="/..." text="Privacy" />
          <ItemLink href="/..." text="Terms and Conditions" />
        </Grid>

        <Grid item xs={6}>
          <ItemLink href="/..." text="About us" />
          <ItemLink href="/..." text="Join us!" />
          <ItemLink href="/..." text="Contact us" />
        </Grid>
      </Grid>

      <Divider className={styles.divider} />

      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            color="primary"
            component="p"
            className={styles.socialMediaText}
          >
            Follow us
          </Typography>

          <Icon href="https://www.facebook.com" id="facebook" className="mr-6" />
          <Icon href="https://www.twitter.com" id="twitter" className="mr-6" />
          <Icon href="https://www.youtube.com" id="youtube" className="mr-6" />
          <Icon href="https://www.instagram.com" id="instagram" className="mr-6" />
        </Grid>
      </Grid>

      <Divider className={styles.divider} />

      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            color="primary"
            component="p"
            className={styles.downloadAppText}
          >
            Download App
          </Typography>

          <Icon href="https://www.android.com" id="android" className="ml-6" />
          <Icon href="https://www.apple.com" id="apple" className="ml-6" />
        </Grid>
      </Grid>

      <Divider className={styles.divider} />

      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Typography
            variant="overline"
            color="primary"
            component="p"
            className={styles.copyRightText}
          >
            CryptoDragons © 2021
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
