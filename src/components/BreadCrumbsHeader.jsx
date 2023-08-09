import {
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
  styled
} from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BreadCrumbsHeader = ({ title, menus, href }) => {
  const BreadLink = styled(Link)({
    textDecoration: "none"
  });

  console.log(menus);

  return (
    <Stack component={Paper} height={100} padding={2} spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={15}>{title}</Typography>
        {menus.length > 1 && (
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        )}
      </Stack>
      <Stack>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadLink
            href="/"
            sx={{ color: "primary.main", fontWeight: "bolder" }}
          >
            Dashboard&nbsp;&nbsp;&nbsp;
          </BreadLink>
          {/* <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
        </Link> */}
          {menus.length === 2 && (
            <BreadLink
              href={href}
              sx={{ color: "primary.main", fontWeight: "bolder" }}
            >
              {menus[1]}&nbsp;&nbsp;&nbsp;
            </BreadLink>
          )}
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
};

export default BreadCrumbsHeader;
