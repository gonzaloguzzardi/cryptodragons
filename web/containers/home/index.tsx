import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { ReactElement } from 'react'

import Layout from '../../components/layout'
import AppToolbar from '../../components/app-toolbar/index'

export default function Home(props): ReactElement {
  return (
    <Layout>
      {console.log(props)}
      <AppToolbar />
      <Container>
        <Box my={2}>
          {[...new Array(52)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </Box>
      </Container>
    </Layout>
  )
}
