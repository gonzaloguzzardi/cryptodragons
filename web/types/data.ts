export type tDragonSrc = 'SIDECHAIN' | 'MAINCHAIN' | 'MAINCHAIN_GATEWAY' | 'SIDECHAIN_GATEWAY'

export type tDragon = {
  name: string
  id: string
  source: tDragonSrc
}

export type tGuideMetadata = {
  metadata: {
    title: string
    description: string
    thumbnailUrl: string
  }
  slug: string
}

export type tGuideData =
  tGuideMetadata &
  { mdxContent }
