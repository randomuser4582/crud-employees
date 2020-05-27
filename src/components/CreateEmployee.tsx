import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { axiosRequest } from "../utils/axios-request";
import { Grid, FormControl, Button, TextField, Paper } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { AxiosResponse, AxiosError } from "axios";

export const InvalidInputText = (): JSX.Element => <span style={{ color: '#f44336' }}>The input is invalid</span>;

export default function CreateEmployeeForm(props: any): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data: any): void => {
    employeeCreatedByPOST(data);
    snackbarSuccessAlert();
  };

  const snackbarSuccessAlert = (): React.ReactText => enqueueSnackbar("Employee has been created!", { variant: "success" });

  const employeeCreatedByPOST = (data: {
    employee_name: string,
    employee_salary: string,
    employee_age: string,
  }): void => {
    axiosRequest({
      method: "POST",
      url: "employee",
      body: {
        employee_name: data.employee_name,
        employee_salary: data.employee_salary,
        employee_age: data.employee_age,
      },
    })
    .then((response: AxiosResponse<any>) => {})
    .catch((error: AxiosError<any>) => {console.log(`Error creating employee ${error}`)})
    .finally(() => {});
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper style={{ padding: 16 }}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormControl
                className="wrapInput"
                margin="normal"
                required
                fullWidth
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="employee_name"
                      id="employee_name"
                      label="Name"
                      defaultValue=""
                      inputRef={register({
                        required: true,
                        validate: (value) => {
                          return value === watch("employee_name");
                        },
                      })}
                    />
                     { errors.employee_name && <InvalidInputText/> }
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl
                className="wrapInput"
                margin="normal"
                required
                fullWidth
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="employee_salary"
                      id="employee_salary"
                      label="Salary"
                      defaultValue=""
                      inputRef={register({
                        required: true,
                        validate: (value) => {
                          return value > 0 && value === watch("employee_salary");
                        },
                      })}
                    />
                    { errors.employee_salary && <InvalidInputText/> }
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl
                className="wrapInput"
                margin="normal"
                required
                fullWidth
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="employee_age"
                      id="employee_age"
                      label="Age"
                      defaultValue=""
                      inputRef={register({
                        required: true,
                        validate: (value) => {
                          return value > 0 && value === watch("employee_age");
                        },
                      })}
                    />
                    { errors.employee_age && <InvalidInputText/> }
                  </Grid>
                </Grid>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                CREATE
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
