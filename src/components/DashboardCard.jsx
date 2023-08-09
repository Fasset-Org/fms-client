import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const DashboardCard = ({ title, Icon, ...otherProps }) => {
  return (
    <Card
      component={Stack}
      justifyContent="center"
      alignItems="center"
      height={200}
      sx={{
        cursor: "pointer",
        border: 2,
        borderColor: "#5D6D7E",
        // backgroundColor: "#374370",
        borderRadius: 4
      }}
      {...otherProps}
      className="linear-bg-2"
    >
      <CardContent component={Stack} alignItems="center">
        <Icon fontSize="large" sx={{ color: "primary.main" }} />
        <Typography sx={{ color: "primary.main" }} fontSize={17} fontWeight="bolder">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
