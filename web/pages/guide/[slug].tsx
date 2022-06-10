import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetServerSideProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import getDeviceType from 'utils/get-device-type'

import Guide from 'containers/guide'

const TEMPLATE_PATH = 'containers/guides/templates'

export const getServerSideProps: GetServerSideProps = async ({ params: { slug }, req }) => {
  const templates = fs.readdirSync(path.join(TEMPLATE_PATH))
  const fullFilename = templates.find(filename => filename.includes(slug as string))
  const markdownWithMeta = fs.readFileSync(path.join(TEMPLATE_PATH, fullFilename), 'utf-8')
  const { data: metadata, content } = matter(markdownWithMeta)
  const mdxContent = await serialize(content)

  return {
    props: {
      deviceType: getDeviceType(req.headers['user-agent']),
      guideData: {
        metadata,
        slug,
        mdxContent,
      }
    }
  }
}

export default Guide
