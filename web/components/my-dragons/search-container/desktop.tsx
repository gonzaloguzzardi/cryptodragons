import { ReactElement, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import SearchBar from '../../search-bar'

import styles from './desktop.module.scss'

export default function MyDragonsSearchContainerDesktop(): ReactElement {
  const [search, setSearch] = useState('')

  const handleSearchChange = (event): void => {
    setSearch(event.target.value)
  }

  const [state, setState] = useState({
    checkedMainchain: true,
    checkedSidechain: true,
    checkedGateways: true,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const [age, setAge] = useState(10)
  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setAge(event.target.value as number)
  }

  const LOW_TO_HIGH_VALUE = 'LOW_TO_HIGH_VALUE'
  const HIGH_TO_LOW_VALUE = 'HIGH_TO_LOW_VALUE'
  const [lowOrHigh, setLowOrHigh] = useState(LOW_TO_HIGH_VALUE)
  const handleChangeSelectLowHigh = (event: React.ChangeEvent<{ value: unknown }>): void => {
    event.preventDefault()
    setLowOrHigh(lowOrHigh === LOW_TO_HIGH_VALUE ? HIGH_TO_LOW_VALUE : LOW_TO_HIGH_VALUE)
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SearchBar value={search} onChange={handleSearchChange} />

        <FormGroup row className={styles.fieldsFilterForm}>
          <div className={styles.fieldsFilterForm_firstGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedMainchain}
                  onChange={handleChange}
                  name="checkedMainchain"
                />
              }
              label={<Typography variant="caption">In Mainchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedSidechain}
                  onChange={handleChange}
                  name="checkedSidechain"
                />
              }
              label={<Typography variant="caption">In Appchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedGateways}
                  onChange={handleChange}
                  name="checkedGateways"
                />
              }
              label={<Typography variant="caption">In Gateways</Typography>}
            />
          </div>

          <div className={styles.fieldsFilterForm_secondGroup}>
            <Typography
              className={styles.fieldsFilterForm_secondGroup_sortByLabel}
              variant={'body2'}
            >
              Sort by
            </Typography>
            <FormControl className={styles.fieldsFilterForm_secondGroup_sortByValue}>
              <Select value={age} onChange={handleChangeSelect}>
                <MenuItem value={10}>Age</MenuItem>
                <MenuItem value={20}>Strength</MenuItem>
                <MenuItem value={30}>Beauty</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Select value={lowOrHigh} onOpen={handleChangeSelectLowHigh} open={false}>
                <MenuItem value={LOW_TO_HIGH_VALUE}>low to high</MenuItem>
                <MenuItem value={HIGH_TO_LOW_VALUE}>high to low</MenuItem>
              </Select>
            </FormControl>
          </div>
        </FormGroup>
      </div>
    </div>
  )
}
