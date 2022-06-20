import { useState, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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
        <TableCell align="center">{onSale + ''}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#ddd' }} colSpan={6}>
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
