import { ReactElement } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import SearchBar from '../../search-bar'

import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from './constants'
import { tComponentProps } from './types'
import styles from './mobile.module.scss'

export default function MyDragonsSearchContainerMobile({
  checkedGateways,
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
                />
              }
              label={<Typography variant="caption">Appchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedGateways}
                  onChange={handleCheckedChange}
                  name="checkedGateways"
                  size="small"
                />
              }
              label={<Typography variant="caption">Gateways</Typography>}
            />
          </div>

          <Typography className={styles.fieldsFilterForm_sortByLabel} variant="body2">
            Sort by
          </Typography>

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
