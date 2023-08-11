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
import { useNavigate } from "react-router-dom";

const BreadCrumbsHeader = ({ title, menus, ...otherProps }) => {
  const navigate = useNavigate();
  const BreadLink = styled(Link)({
    textDecoration: "none"
  });

  return (
    <Stack
      component={Paper}
      height={100}
      padding={2}
      spacing={2}
      {...otherProps}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={15}>{title}</Typography>
        {menus.length > 1 && (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
      </Stack>
      <Stack>
        <Breadcrumbs aria-label="breadcrumb">
          {menus.map((menu, i) => {
            return (
              <BreadLink
                href={menu.url}
                sx={{ color: "primary.main", fontWeight: "bolder" }}
                key={i}
              >
                {menu.name}
              </BreadLink>
            );
          })}
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
};

export default BreadCrumbsHeader;
