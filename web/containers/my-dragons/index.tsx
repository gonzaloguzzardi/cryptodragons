import React from 'react'
import { ReactElement } from 'react'

import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function MyDragons({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  return deviceType === 'desktop' ? <MyDragonsDesktop /> : <MyDragonsMobile />
}
