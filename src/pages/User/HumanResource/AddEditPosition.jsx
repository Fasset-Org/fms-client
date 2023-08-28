import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../../components/FormComponents/TextFieldWrapper";
import TextAreaFieldWrapper from "../../../components/FormComponents/TextAreaFieldWrapper";
import { useQuery } from "@tanstack/react-query";
import AdminQuery from "../../../stateQueries/Admin";
import SelectFieldWrapper from "../../../components/FormComponents/SelectFieldWrapper";

const AddEditPosition = () => {
  let departments = [];
  const departmentQuery = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      return await AdminQuery.getAllDepartments();
    }
  });

  if (departmentQuery?.departments) {
    departments = [
      ...departmentQuery?.departments?.map((department) => {
        return {
          value: department.id,
          label: department.departmentName
        };
      })
    ];
  }

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Add/Edit Position", url: "/addEditPositiosn" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <Stack px={20}>
        <Stack spacing={2} padding={2} border={1}>
          <Typography fontSize={20} fontWeight="bolder" textAlign="center">
            Add Position
          </Typography>
          <Formik
            initialValues={{
              jobTitle: "",
              purposeOfJob: "",
              departmentId: ""
            }}
          >
            {() => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper name="jobTitle" label="Job Title" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextAreaFieldWrapper
                        name="purposeOfJob"
                        label="Purpose Of Job"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="roleId"
                        label="Position"
                        options={departments}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="departmentId"
                        label="Department"
                        options={departments}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <SelectFieldWrapper
                        name="lineRoleId"
                        label="Reporting To"
                        options={departments}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="qualificationName"
                        label="Qualification"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextFieldWrapper
                        name="remuneration"
                        label="Remuneration Package"
                      />
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddEditPosition;
