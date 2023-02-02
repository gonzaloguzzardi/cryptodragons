import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from './tab-panel'

import adminTableStyles from './styles.module.scss'

export default function AdminTable({
  dragonsMData,
  dragonsSData,
  cancelEditHandler,
  editHandler,
  tabValue,
  setTabValue,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  updateTokensData,
}) {
  useEffect(() => {
    updateTokensData()
  }, [tabValue, page, rowsPerPage])

  return (
    <Container className={adminTableStyles.container}>
      <Paper>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={(_e, newValue) => setTabValue(newValue)}
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
            dragonsData={dragonsMData}
            cancelEditHandler={cancelEditHandler}
            editHandler={editHandler}
            location='MAINCHAIN'
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            />
          <TabPanel
            value={tabValue}
            index={1}
            dragonsData={dragonsSData}
            cancelEditHandler={cancelEditHandler}
            editHandler={editHandler}
            location='SIDECHAIN'
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
      </Paper>
    </Container>
  )
}
