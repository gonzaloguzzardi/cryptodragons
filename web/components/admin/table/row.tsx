import { useState, ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { TokenRowType } from './types'
import styles from './row.module.scss'

export default function Row({ row }: { row: TokenRowType }): ReactElement {
  const [open, setOpen] = useState(false)
  const { genes, owner, location, onSale, attributes } = row

  return (
    <>
      <TableRow className={styles.root} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{genes}</TableCell>
        <TableCell align="center">{owner}</TableCell>
        <TableCell align="center">{location}</TableCell>
        <TableCell align="center">{onSale}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#88f' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                Token
              </Typography>
              <Table size="small" aria-label="token-details">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" component="div">
                        Attribute
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" component="div">
                        Value
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(row.attributes).map((attribute) => (
                    <TableRow key={attribute}>
                      <TableCell component="th" scope="row">
                        {attribute}
                      </TableCell>
                      <TableCell>{attributes[attribute]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
