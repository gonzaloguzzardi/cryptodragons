import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import GuideViewDesktop from 'components/guides/view/desktop'
import FooterDesktop from 'components/footer/desktop'

function GuidesDesktop({ accountsState, guideData }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="guides" accountsState={accountsState} />
      <GuideViewDesktop guideData={guideData} />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(GuidesDesktop)

// metadata: {
//   title: string
//   description: string
//   thumbnailUrl: string
// }
// slug: string
// mdxContent
