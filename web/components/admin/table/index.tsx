import * as React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContent from './tab-content'
import { TabPanelProps } from './types'

import adminTableStyles from './styles.module.scss'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'

export default function AdminTable() {
  function TabPanel({ children, dragonsData, index, location, page, setPage, value, rowsPerPage, setRowsPerPage, ...other }: TabPanelProps) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <TabContent
              dragonsData={dragonsData}
              location={location}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Box>
        )}
      </div>
    );
  }

  // DRAGONS DATA: { dragonId, owner, onSale }
  const [dragonsData, setDragonsData] = React.useState([]);

  // TABS: 0 for Mainchain, 1 for Sidechain
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // PAGES: 1 for page, 10 for page size are default values
  const [pages, setPages] = React.useState(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    setDragonsData([]);
    const API = tabValue === 0 ? MainchainAPI : SidechainAPI;
    const APIName = tabValue === 0 ? 'MainchainAPI' : 'SidechainAPI';

    API.getDragonsByPage(page + 1, rowsPerPage).then(result => {
      if (!result || !result[1][0]) {
        console.log(`[Mocca-result] ${APIName}: No results, ${JSON.stringify(result, null, 2)}.`)
        return
      }
      setPages(result[0])
      setDragonsData(result[1]);

      const pages = result[0];
      const dragonsData = result[1];
      const { dragonId, owner, onSale } = dragonsData[0];

      console.log(`[Mocca-result] Total pages ${APIName}: ${pages}`)
      console.log(`[Mocca-result] Dragons data ${APIName}: ${JSON.stringify(dragonsData, null, 2)}`)
      if (dragonId) {
        console.log(`[Mocca-result] First dragon data ${APIName}: ${dragonId}, ${owner}, ${''+onSale}.`)
      }
    });
  }, [tabValue, page, rowsPerPage])

  return (
    <Container className={adminTableStyles.container}>
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
          <TabPanel
            value={tabValue}
            index={0}
            dragonsData={dragonsData}
            location='MAINCHAIN'
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
          <TabPanel
            value={tabValue}
            index={1}
            dragonsData={dragonsData}
            location='SIDECHAIN'
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
      </Paper>
    </Container>
  );
}
