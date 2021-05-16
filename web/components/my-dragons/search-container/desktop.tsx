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
import styles from './desktop.module.scss'

export default function MyDragonsSearchContainerDesktop({
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
                />
              }
              label={<Typography variant="caption">In Mainchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedSidechain}
                  onChange={handleCheckedChange}
                  name="checkedSidechain"
                />
              }
              label={<Typography variant="caption">In Appchain</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedGateways}
                  onChange={handleCheckedChange}
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
            <FormControl>
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
