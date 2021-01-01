import Home from '../containers/home'
import { GetServerSideProps } from 'next'

import getDeviceType from '../utils/get-device-type'

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    deviceType: getDeviceType(context.req),
  },
})

export default Home
