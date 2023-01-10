import React, { ReactElement } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { Column } from '../types'
import Dragon from 'components/dragon'

const columns: Column[] = [
  { id: 'dragonId', label: 'Id', minWidth: 100, align: 'center' },
  { id: 'nft', label: 'NFT', minWidth: 170, align: 'center' },
  {
    id: 'owner',
    label: 'Owner',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'onSale',
    label: 'On\u00a0Sale',
    minWidth: 170,
    align: 'center',
  },
];

export default function TabContent({ dragonsData, page, setPage, rowsPerPage, setRowsPerPage }): ReactElement {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                      const value = dragonData[column.id];

                      return column.id === 'nft' ? (
                        <TableCell key={column.id} align={column.align} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Dragon
                            key={`MAINCHAIN${dragonData.dragonId}`}
                            id={dragonData.dragonId}
                            location='MAINCHAIN'
                          />
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'number' ? value.toLocaleString('en-US') : ''+value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                );
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
