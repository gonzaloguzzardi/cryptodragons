import React, { ReactElement /*, useEffect, useState*/ } from 'react'
// import { useRouter } from 'next/router'
// import marked from 'marked'

// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import AboutMarkdown from './templates/hola.mdx'

import GuidesCommons from './guides'
import GuidesDesktop from './guides.desktop'
import GuidesMobile from './guides.mobile'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Guides({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  // const router = useRouter()
  // const { pid } = router.query

  // const [markdown, setMarkdown] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const markdown = require(`./templates/hola.md`)
  // console.log('MOCKITA', markdown)
  // const content = markdown ? (
  //   // <ReactMarkdown /*remarkPlugins={[remarkGfm]}*/>{markdown}</ReactMarkdown>

  //   ) : (
  //   'Content not found'
  // )

  // const readmePath = require('./templates/hola.md')

  // useEffect(() => {
  //   fetch(readmePath)
  //     .then((response) => response.text())
  //     .then((text) => console.log('MOCKY', text) || setMarkdown(marked.parse(text)))
  // }, [])

  return deviceType === 'desktop' ? (
    <GuidesCommons>
      <GuidesDesktop content={<AboutMarkdown />} />
    </GuidesCommons>
  ) : (
    <GuidesCommons>
      <GuidesMobile content={<AboutMarkdown />} />
    </GuidesCommons>
  )
}
