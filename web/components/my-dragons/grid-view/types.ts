import { tDragon } from '../../../types/data'

export type tProps = {
  dragons: tDragon[]
  loading: boolean
  transferMethod?: (id: string, location: string) => unknown
}
