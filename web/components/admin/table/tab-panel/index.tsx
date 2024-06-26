import React from 'react'
import Box from '@mui/material/Box'
import TabContent from '../tab-content'
import { TabPanelProps } from '../types'

export default function TabPanel({
  children,
  adminAccount,
  dragonsData,
  cancelEditHandler,
  editHandler,
  editingLoading,
  editingValue,
  index,
  location,
  onChangeEditHandler,
  page,
  setPage,
  value,
  rowsPerPage,
  setRowsPerPage,
  submitEditHandler,
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
            adminAccount={adminAccount}
            dragonsData={dragonsData}
            cancelEditHandler={cancelEditHandler}
            editHandler={editHandler}
            editingLoading={editingLoading}
            editingValue={editingValue}
            location={location}
            onChangeEditHandler={onChangeEditHandler}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            submitEditHandler={submitEditHandler}
          />
        </Box>
      )}
    </div>
  )
}
