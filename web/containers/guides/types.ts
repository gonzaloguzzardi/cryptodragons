import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'
import { tGuideMetadata } from 'types/data'

export type tGuidesProps =
  ISSRPropsDeviceOnly &
  {
    guidesData: tGuideMetadata[]
  }
