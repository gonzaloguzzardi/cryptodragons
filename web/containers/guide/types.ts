import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'
import { tGuideData } from 'types/data'

export type tGuideProps =
  ISSRPropsDeviceOnly &
  {
    guideData: tGuideData
  }
