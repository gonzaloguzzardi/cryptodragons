import { Dispatch, SetStateAction } from 'react'

export interface Column {
  id: 'nft' | 'dragonId' | 'owner' | 'onSale' | 'actions'
  label: string
  minWidth?: number
  maxWidth?: number
  align?: 'center' | 'right' | 'left'
  format?: (value: number) => string
  editable?: boolean
}

export interface TabPanelProps {
  children?: React.ReactNode
  dragonsData?: any
  cancelEditHandler: () => void
  editHandler: () => void
  index: number
  location: string
  page: number
  setPage: Dispatch<SetStateAction<number>>
  value: number
  rowsPerPage: number
  setRowsPerPage: Dispatch<SetStateAction<number>>
}
