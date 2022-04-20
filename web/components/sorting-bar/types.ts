export type tLowOrHigh = 'LOW_TO_HIGH_VALUE' | 'HIGH_TO_LOW_VALUE'

export type tComponentProps = {
  checkedMainchain: boolean
  checkedSidechain: boolean
  handleCheckedChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  attribute: number
  handleChangeAttribute: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  lowOrHigh: tLowOrHigh
}
