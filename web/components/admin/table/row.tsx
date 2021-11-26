import { useState } from 'react'
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

import styles from './row.module.scss'

export default function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className={styles.root} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#88f' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Token
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Attributes</TableCell>
                    <TableCell>Ranges</TableCell>
                    <TableCell align="center">Initial Value</TableCell>
                    <TableCell align="center">Current Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.attributes.map((attributesRow) => (
                    <TableRow key={attributesRow.date}>
                      <TableCell component="th" scope="row">
                        {attributesRow.date}
                      </TableCell>
                      <TableCell>{attributesRow.customerId}</TableCell>
                      <TableCell align="center">{attributesRow.amount}</TableCell>
                      <TableCell align="center">
                        {Math.round(attributesRow.amount * 100) / 100}
                      </TableCell>
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
