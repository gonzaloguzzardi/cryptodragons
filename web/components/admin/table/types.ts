import { Dispatch, SetStateAction } from "react"

export interface Column {
  id: 'nft' | 'dragonId' | 'owner' | 'onSale'
  label: string
  minWidth?: number
  align?: 'center' | 'right' | 'left'
  format?: (value: number) => string
}

export interface TabPanelProps {
  children?: React.ReactNode
  dragonsData?: any
  index: number
  location: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
  value: number
  rowsPerPage: number
  setRowsPerPage: Dispatch<SetStateAction<number>>
}
