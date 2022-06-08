export type tLowOHigh = 'LOW_TO_HIGH_VALUE' | 'HIGH_TO_LOW_VALUE'

export type tComponentProps = {
  attributes: { name: string; value: number }[]
  attributeValue: number
  handleChangeSelectLowHigh: (event: React.ChangeEvent<{ value: unknown }>) => void
  lowOrHigh: tLowOHigh
}
