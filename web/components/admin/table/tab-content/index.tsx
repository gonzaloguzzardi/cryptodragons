import React, { ReactElement } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Column } from '../types'
import Dragon from 'components/dragon'

const columns: Column[] = [
  { id: 'dragonId', label: 'Id', minWidth: 100, align: 'center' },
  { id: 'nft', label: 'NFT', minWidth: 170, align: 'center' },
  { id: 'owner', label: 'Owner', minWidth: 170, align: 'center', editable: true },
  { id: 'onSale', label: 'On\u00a0Sale', minWidth: 170, align: 'center', editable: true },
]

const onSaleValues = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

export default function TabContent({
  dragonsData,
  cancelEditHandler,
  editHandler,
  editingValue,
  location,
  onChangeEditHandler,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  submitEditHandler
}): ReactElement {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant='overline'>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dragonsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dragonData) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={dragonData.dragonId}>
                    {columns.map((column) => {
                      const value = dragonData[column.id]

                      if (column.id === 'nft') {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                          >
                            <Dragon
                              key={`MAINCHAIN${dragonData.dragonId}`}
                              id={dragonData.dragonId}
                              location={location}
                            />
                          </TableCell>
                        )
                      }

                      // Editing view
                      if (dragonData.editing === column.id) {
                        return (
                          <TableCell key={column.id} align={column.align}>

                            { column.id === 'owner' && (
                              <TextField
                                id="standard-basic"
                                variant="standard"
                                color='secondary'
                                sx={{ minWidth: 360 }}
                                value={editingValue}
                                onChange={onChangeEditHandler}
                              />
                            )}

                            { column.id === 'onSale' && (
                              <TextField
                                id="outlined-select-currency"
                                select
                                value={editingValue}
                                onChange={onChangeEditHandler}
                              >
                                {onSaleValues.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}

                            <IconButton
                              color="success"
                              aria-label="allows to edit dragon properties"
                              onClick={() => submitEditHandler(location, dragonData.dragonId, column.id, editingValue)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              aria-label="allows to edit dragon properties"
                              onClick={() => cancelEditHandler(location)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }

                      // Reading view
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Typography display="inline">
                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                          </Typography>
                          {
                            column.editable && (
                            <IconButton
                              color="secondary"
                              aria-label="allows to edit dragon properties"
                              onClick={() => editHandler(location, dragonData.dragonId, column.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            )
                          }
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dragonsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
