import { ReactElement } from 'react'

import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

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
