import React from 'react'
import renderer from 'react-test-renderer'

import MyDragons from '..'

test('Renders MyDragons desktop', () => {
  const deviceType = 'desktop'
  const component = renderer.create(<MyDragons deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})

test('Renders MyDragons mobile', () => {
  const deviceType = 'mobile'
  const component = renderer.create(<MyDragons deviceType={deviceType} />)

  expect(component).toMatchSnapshot()
})
