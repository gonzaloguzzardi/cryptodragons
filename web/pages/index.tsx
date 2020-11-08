import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import Button from '@material-ui/core/Button'

import viewStyles from './index.module.scss'
import { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <div className={viewStyles.container}>
          <div className={viewStyles.header}>
            <h2>Welcome to CryptoDragons</h2>
          </div>
          <Button variant="contained" color="primary" href="dragons">
            Start
          </Button>
        </div>
      </section>
    </Layout>
  )
}
