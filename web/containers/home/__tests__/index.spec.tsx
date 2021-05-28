import React from 'react'
import renderer from 'react-test-renderer'

import Home from '..'
jest.mock('react-material-ui-carousel', () => ({
  __esModule: true,
  default: 'CarouselSlideMock',
}))

test('Renders Home desktop', () => {
  const deviceType = 'desktop'
  const component = renderer.create(<Home deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})

test('Renders Home mobile', () => {
  const deviceType = 'mobile'
  const component = renderer.create(<Home deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})
