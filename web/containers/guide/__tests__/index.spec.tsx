import React from 'react'
import renderer from 'react-test-renderer'

// import Guides from '..'
jest.mock('components/app-toolbar', () => ({
  __esModule: true,
  default: 'AppToolbar',
}))
jest.mock('components/footer/mobile', () => ({
  __esModule: true,
  default: 'AppFooter',
}))

test.skip('Renders Guides desktop', () => {
  const deviceType = 'desktop'
  // const component = renderer.create(<Guides deviceType={deviceType} />)

  // expect(component).toMatchSnapshot()
})

test.skip('Renders Guides mobile', () => {
  const deviceType = 'mobile'
  // const component = renderer.create(<Guides deviceType={deviceType} />)

  // expect(component).toMatchSnapshot()
})
