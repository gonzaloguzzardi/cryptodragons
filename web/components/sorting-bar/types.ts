export type tLowOrHigh = 'LOW_TO_HIGH_VALUE' | 'HIGH_TO_LOW_VALUE'

export type tComponentProps = {
  checkboxes?: boolean
  chMainchain?: boolean
  chSidechain?: boolean
  handleCheckedChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  attributeValue: number
  attributes: { name: string; value: number }[]
  handleChangeAttribute?: (event: React.ChangeEvent<{ value: unknown }>) => void
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  lowOrHigh: tLowOrHigh
}
