import React from 'react'
import { ReactElement } from 'react'

import Layout from '../../components/layout'

export default function Guides({ children }: { children: ReactElement[] }): ReactElement {
  return <Layout>{children}</Layout>
}
