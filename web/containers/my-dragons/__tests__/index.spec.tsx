import React from 'react'
import renderer from 'react-test-renderer'

import MyDragons from '..'
jest.mock('../../../components/app-toolbar', () => ({
  __esModule: true,
  default: 'AppToolbar',
}))
jest.mock('../../../components/footer/mobile', () => ({
  __esModule: true,
  default: 'AppFooter',
}))

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
