import renderer from 'react-test-renderer'
import DemoPage from '..'
import CommonAPI from '../../../services/blockchain-interaction/common'
import MainchainAPI from '../../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../../services/blockchain-interaction/sidechain'

let originalValues = null

beforeAll(() => {
  originalValues = {
    CommonAPI: { ...CommonAPI },
    MainchainAPI: { ...MainchainAPI },
    SidechainAPI: { ...SidechainAPI },
  }

  CommonAPI.sGetMyDragons = jest.fn()
  CommonAPI.sAreAccountsMapped = jest.fn(() => new Promise((res) => res(true)))
  MainchainAPI.getClientHelper = jest.fn(
    () => new Promise((res) => res({ tokenContract: 123, account: 456 }))
  )
  SidechainAPI.getClientHelper = jest.fn(
    () => new Promise((res) => res({ tokenContract: 123, account: 456 }))
  )
})

afterAll(() => {
  CommonAPI.sGetMyDragons = originalValues.CommonAPI.sGetMyDragons
  CommonAPI.sAreAccountsMapped = originalValues.CommonAPI.sAreAccountsMapped
  MainchainAPI.getClientHelper = originalValues.MainchainAPI.getClientHelper
  SidechainAPI.getClientHelper = originalValues.SidechainAPI.getClientHelper
})

describe('Index page', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<DemoPage {...null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
