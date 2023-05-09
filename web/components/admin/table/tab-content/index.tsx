import React, { ReactElement } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
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
  { id: 'nft', label: 'NFT', align: 'center' },
  { id: 'owner', label: 'Owner', align: 'center', editable: true },
]

export default function TabContent({
  adminAccount,
  dragonsData,
  cancelEditHandler,
  editHandler,
  editingLoading,
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
                >
                  <Typography variant='overline'>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dragonsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dragonData) => { // For each row
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={dragonData.dragonId}>
                    {columns.map((column) => { // For each column
                      const value = dragonData[column.id]

                      // NFT column (special render)
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

                      // Editing column view
                      if (dragonData.editing === column.id) {
                        if (editingLoading) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              { editingLoading && (
                                <CircularProgress color="secondary" />
                              )}
                            </TableCell>
                          )
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              color='secondary'
                              sx={{ minWidth: 385 }}
                              value={editingValue}
                              onChange={onChangeEditHandler}
                            />

                            <IconButton
                              color="success"
                              aria-label="allows to edit dragon properties"
                              onClick={() => submitEditHandler(dragonData.dragonId, column.id, editingValue)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              aria-label="allows to edit dragon properties"
                              onClick={cancelEditHandler}
                            >
                              <ClearIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }

                      // Reading column view
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Typography display="inline">
                            { value }
                          </Typography>
                          {
                            column.editable &&
                            location === 'MAINCHAIN' && ( // We are only editing values on mainchain
                            <IconButton
                              color="secondary"
                              aria-label="allows to edit dragon properties"
                              onClick={() => editHandler(dragonData.dragonId, column.id)}
                              disabled={adminAccount !== dragonData.owner.toLowerCase()}
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
