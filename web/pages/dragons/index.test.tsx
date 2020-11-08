import renderer from 'react-test-renderer'
import IndexPage from '.'

describe('Index page', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<IndexPage {...null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
