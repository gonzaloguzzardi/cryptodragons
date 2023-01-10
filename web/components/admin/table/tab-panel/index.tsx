import React from 'react'
import Box from '@mui/material/Box'
import TabContent from '../tab-content'
import { TabPanelProps } from '../types'

export default function TabPanel({
  children,
  dragonsData,
  index,
  location,
  page,
  setPage,
  value,
  rowsPerPage,
  setRowsPerPage,
  ...other
}: TabPanelProps) {
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
