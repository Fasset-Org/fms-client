import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Notices from "../../../components/User/NoticeBoard/Notices";
import WSPWindow from "../../../components/User/NoticeBoard/WSPWindow";
import DisWindow from "../../../components/User/NoticeBoard/DisWindow";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "90%" }}
    >
      {value === index && (
        <Box sx={{ px: 3, py: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const NoticeBoard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Notice Boards", url: "/cse/noticeBoard" }
        ]}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          flexGrow: 1,
          // bgcolor: "background.paper",
          display: "flex",
          minHeight: 400
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="General Notices" {...a11yProps(0)} />
          <Tab label="Grants Window Notice" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Notices />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WSPWindow />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DisWindow />
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default NoticeBoard;
