import Layout from '../../components/layout'

import Button from '@material-ui/core/Button'

import { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="header">
            <h2>Welcome to CryptoDragons</h2>
          </div>
          <Button variant="contained" color="primary" href="dragons">
            Start
          </Button>
        </div>
      </section>

      <style global jsx>
        {`
          .container {
            text-align: center;
          }

          .header {
            background-color: #222;
            height: 150px;
            padding: 20px;
            color: white;
            margin-bottom: 25px;
            text-align: center;
          }
        `}
      </style>
    </Layout>
  )
}
