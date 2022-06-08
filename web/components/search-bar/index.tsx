import { ReactElement } from 'react'

import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

import styles from './desktop.module.scss'

type tProps = {
  value: string
  onChange: (newValue) => void
}

export default function SearchBar({ value, onChange }: tProps): ReactElement {
  return (
    <div className={styles.searchbar}>
      <TextField
        id="standard-secondary"
        placeholder="Search"
        color="secondary"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
