import React from 'react'
import renderer from 'react-test-renderer'

import Marketplace from '..'

jest.mock('components/app-toolbar', () => ({
  __esModule: true,
  default: 'AppToolbar',
}))
jest.mock('components/footer/desktop', () => ({
  __esModule: true,
  default: 'AppFooter',
}))
jest.mock('components/footer/mobile', () => ({
  __esModule: true,
  default: 'AppFooter',
}))

test('Renders Marketplace desktop', () => {
  const deviceType = 'desktop'
  const component = renderer.create(<Marketplace deviceType={deviceType} />)
  
    expect(component).toMatchSnapshot()
})

test('Renders Marketplace mobile', () => {
  const deviceType = 'mobile'
  const component = renderer.create(<Marketplace deviceType={deviceType} />)
    
    expect(component).toMatchSnapshot()
})
