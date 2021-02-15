import React from 'react'
import { ReactElement } from 'react'

import Layout from '../../components/layout'

export default function Home({ children }: { children: ReactElement[] }): ReactElement {
  return <Layout>{children}</Layout>
}
