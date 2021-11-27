import { ReactElement, useState } from 'react'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import Row from './row'
import TablePaginationActions from './table-pagination-actions'
import { createData } from './utils'

const rows = [
  createData('0x123141231231123', 'Mocca', 'MAINCHAIN', false),
  createData('0x123532421312313', 'Mocca', 'SIDECHAIN', true),
  createData('0x523464342312123', 'Mocca', 'SIDECHAIN', false),
  createData('0x512312414123123', 'Mocca', 'MAINCHAIN', false),
  createData('0x422131231412312', 'Mocca', 'MAINCHAIN', true),
]

export default function AdminTable(): ReactElement {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number): void => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Container>
      <Paper elevation={3}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow style={{ backgroundColor: '#88f' }}>
              <TableCell />
              <TableCell>
                <Typography variant="caption" component="div" color="primary">
                  ERC 721
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="caption" component="div" color="primary">
                  Owner
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="caption" component="div" color="primary">
                  Location
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="caption" component="div" color="primary">
                  On sale
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Container>
  )
}
