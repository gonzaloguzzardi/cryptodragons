import Marketplace from '../containers/marketplace'

import { GetServerSideProps } from 'next'
import getDeviceType from '../utils/get-device-type'

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    deviceType: getDeviceType(context.req.headers['user-agent']),
  },
})

export default Marketplace
