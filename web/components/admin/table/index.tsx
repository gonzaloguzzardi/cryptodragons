import * as React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'

interface Column {
  id: 'nft' | 'code' | 'owner' | 'onSale';
  label: string;
  minWidth?: number;
  align?: 'center' | 'right' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'nft', label: 'NFT', minWidth: 170, align: 'center' },
  { id: 'code', label: 'Genetic\u00a0Code', minWidth: 100, align: 'center' },
  {
    id: 'owner',
    label: 'Owner',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'onSale',
    label: 'On\u00a0Sale',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  nft: string;
  code: string;
  owner: number;
  onSale: boolean;
}

function createData(
  nft: string,
  code: string,
  owner: number,
  onSale: boolean,
): Data {
  return { nft, code, owner, onSale };
}

const rows = [
  createData('India', 'IN', 1324171354, true),
  createData('China', 'CN', 1403500365, true),
  createData('Italy', 'IT', 60483973, false),
  createData('United States', 'US', 327167434, false),
  createData('Canada', 'CA', 37602103, false),
  createData('Australia', 'AU', 25475400, true),
  createData('Germany', 'DE', 83019200, true),
  createData('Ireland', 'IE', 4857000, false),
  createData('Mexico', 'MX', 126577691, true),
  createData('Japan', 'JP', 126317000, false),
  createData('France', 'FR', 67022000, false),
  createData('United Kingdom', 'GB', 67545757, true),
  createData('Russia', 'RU', 146793744, true),
  createData('Nigeria', 'NG', 200962417, false),
  createData('Brazil', 'BR', 210147125, false),
];

export default function AdminTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    Promise.all([
      MainchainAPI.getDragonsByPage(page, rowsPerPage),
      SidechainAPI.getDragonsByPage(page, rowsPerPage)
    ]).then(result => {
      const mainchainResults = result[0]
      const sidechainResults = result[1]

      console.log(`[Mocca-result] Total pages Mainchain: ${mainchainResults[0]}`)
      console.log(`[Mocca-result] dragon page data Mainchain: ${mainchainResults[1]}`)

      console.log(`[Mocca-result] Total pages Sidechain: ${sidechainResults[0]}`)
      console.log(`[Mocca-result] dragon page data Sidechain: ${sidechainResults[1]}`)
    });
  })

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (<Box>{children}</Box>)}
      </div>
    );
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Paper>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ backgroundColor: '#88f' }}
            >
              <Tab label="Mainchain" id="simple-tab-0" />
              <Tab label="Sidechain" id="simple-tab-1" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : ''+value}
                              </TableCell>
                            );
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={() =>
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              }
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
