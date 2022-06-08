export type tLowOHigh = 'LOW_TO_HIGH_VALUE' | 'HIGH_TO_LOW_VALUE'

export type tComponentProps = {
  chMainchain: boolean
  chSidechain: boolean
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  search: string
  attributes: { name: string; value: number }[]
  attributeValue: number
  handleChangeAttribute: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  lowOrHigh: tLowOHigh
}
