import { ReactElement } from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import { LOW_TO_HIGH_VALUE, HIGH_TO_LOW_VALUE } from './constants'
import { tComponentProps } from './types'
import styles from './mobile.module.scss'

export default function SortingBarMobile({
  checkboxes = true,
  chMainchain,
  chSidechain,
  handleCheckedChange,
  attributes,
  attributeValue,
  handleChangeAttribute,
  lowOrHigh,
  handleChangeSelectLowHigh,
}: tComponentProps): ReactElement {
  return (
    <FormGroup row className={styles.fieldsFilterForm}>
      {checkboxes && (
        <div className={styles.fieldsFilterForm_firstGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={chMainchain}
                onChange={handleCheckedChange}
                name="Mainchain"
                size="small"
                color="secondary"
              />
            }
            label={<Typography variant="caption">Mainchain</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={chSidechain}
                onChange={handleCheckedChange}
                name="Sidechain"
                size="small"
                color="secondary"
              />
            }
            label={<Typography variant="caption">Sidechain</Typography>}
          />
        </div>
      )}

      {attributes && attributes.length > 0 && (
        <>
          <Typography variant="overline">Sort by</Typography>
          <div className={styles.fieldsFilterForm_secondGroup}>
            <FormControl className={styles.fieldsFilterForm_secondGroup_sortByValue}>
              {attributes.length === 1 ? (
                <MenuItem value={attributeValue}>
                  <Typography variant="caption">{attributes[0]['name']}</Typography>
                </MenuItem>
              ) : (
                <Select value={attributeValue} onChange={handleChangeAttribute}>
                  {attributes.map((attr) => (
                    <MenuItem value={attr.value} key={attr.value}>
                      <Typography variant="caption">{attr.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              )}
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
        </>
      )}
    </FormGroup>
  )
}
