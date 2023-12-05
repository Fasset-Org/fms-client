import { Stack } from '@mui/material'
import React from 'react'
import BreadCrumbsHeader from '../../../components/BreadCrumbsHeader'

const Banners = () => {
  return (
    <Stack spacing={2}>
    <BreadCrumbsHeader
      title="Welcome back Tiyisela Themba Makamu"
      menus={[
        { name: "Dashboard", url: "/dashboard" },
        { name: "Website Management", url: "/websiteManagement" },
        { name: "Banners", url: "/cse/banners" }
      ]}
      sx={{ mb: 2 }}
    />
      </Stack>
  )
}

export default Banners