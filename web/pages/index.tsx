import Layout from '../components/layout'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

import viewStyles from '../styles/index.module.scss'

import { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <Layout>
      <section>
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
