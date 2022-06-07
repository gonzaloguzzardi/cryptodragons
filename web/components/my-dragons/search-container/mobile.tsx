import { ReactElement } from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SearchBar from '../../search-bar'

import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from './constants'
import { tComponentProps } from './types'
import styles from './mobile.module.scss'

export default function MyDragonsSearchContainerMobile({
  checkedMainchain,
  checkedSidechain,
  handleCheckedChange,
  handleSearchChange,
  search,
  attribute,
  handleChangeAttribute,
  handleChangeSelectLowHigh,
  lowOrHigh,
}: tComponentProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SearchBar value={search} onChange={handleSearchChange} />

        <FormGroup row className={styles.fieldsFilterForm}>
          <div className={styles.fieldsFilterForm_firstGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedMainchain}
                  onChange={handleCheckedChange}
                  name="checkedMainchain"
                  size="small"
                  color="secondary"
                />
              }
              label={<Typography variant="caption">Mainchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedSidechain}
                  onChange={handleCheckedChange}
                  name="checkedSidechain"
                  size="small"
                  color="secondary"
                />
              }
              label={<Typography variant="caption">Sidechain</Typography>}
            />
          </div>

          <Typography variant="overline">Sort by</Typography>

          <div className={styles.fieldsFilterForm_secondGroup}>
            <FormControl className={styles.fieldsFilterForm_secondGroup_sortByValue}>
              <Select value={attribute} onChange={handleChangeAttribute}>
                <MenuItem value={10}>
                  <Typography variant="caption">Age</Typography>
                </MenuItem>
                <MenuItem value={20}>
                  <Typography variant="caption">Strength</Typography>
                </MenuItem>
                <MenuItem value={30}>
                  <Typography variant="caption">Beauty</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className={styles.fieldsFilterForm_secondGroup_sortByValue}>
              <Select value={lowOrHigh} onOpen={handleChangeSelectLowHigh} open={false}>
                <MenuItem value={LOW_TO_HIGH_VALUE}>
                  <Typography variant="caption">low to high</Typography>
                </MenuItem>
                <MenuItem value={HIGH_TO_LOW_VALUE}>
                  <Typography variant="caption">high to low</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </FormGroup>
      </div>
    </div>
  )
}
