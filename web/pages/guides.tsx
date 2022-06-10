import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetServerSideProps } from 'next'

import getDeviceType from 'utils/get-device-type'
import Guides from 'containers/guides'

const TEMPLATE_PATH = 'containers/guides/templates'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const templates = fs.readdirSync(path.join(TEMPLATE_PATH))
  const guidesData = templates.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join(TEMPLATE_PATH, filename), 'utf-8')
    const { data: metadata } = matter(markdownWithMeta)
    return {
      metadata,
      slug: filename.substring(3).split('.')[0]
    }
  })

  return {
    props: {
      deviceType: getDeviceType(context.req.headers['user-agent']),
      guidesData,
    }
  }
}

export default Guides
