import React from 'react'
import renderer from 'react-test-renderer'

import Home from '..'

test.skip('Renders Home desktop', () => {
  const deviceType = 'desktop'
  const component = renderer.create(<Home deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})

test.skip('Renders Home mobile', () => {
  const deviceType = 'mobile'
  const component = renderer.create(<Home deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})
