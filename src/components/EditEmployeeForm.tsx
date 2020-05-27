import React, {Fragment} from "react";
import { useForm } from "react-hook-form";
import { axiosRequest } from "../utils/axios-request";
import { Grid, FormControl, Button, TextField } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import { AxiosError, AxiosResponse } from "axios";
import { IEmployee } from "../interfaces/employeeModel";

export const InvalidInputText = (): JSX.Element => <span style={{ color: '#f44336' }}>The input is invalid</span>;

interface Props {
    employee: IEmployee 
}
export default function EditEmployeeForm(props: Props): JSX.Element {

    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, watch, errors } = useForm();
    const { employee } = props;

    const onSubmit = (data: any): void => {
        employeeModifiedByPUT(data);
        updateEmployeeSuccess();
    }

    const updateEmployeeSuccess = (): React.ReactText => enqueueSnackbar('Employee has been updated!', { variant: 'success' });

    const employeeModifiedByPUT = (data: { employee_name: string, employee_salary: string, employee_age: string }): void => {
        axiosRequest({
            method: 'PUT',
            url: `employee/${employee.id}`,
            body: {
                employee_name: data.employee_name,
                employee_salary: data.employee_salary,
                employee_age: data.employee_age
            }
        })
        .then((response: AxiosResponse<any>) => {})
        .catch((error: AxiosError<any>) => { console.log(`Error editing employee by id ${error}`) })
        .finally(() => {});
    };

  return (
      <Fragment>
        {employee.id !== undefined && (
        <Fragment>
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
                                    defaultValue={`${employee.employee_name || ''}`}
                                    inputRef={register({
                                        required: true,
                                        validate: (value) => {
                                            return value === watch('employee_name');
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
                                    defaultValue={`${employee.employee_salary || ''}`}
                                    inputRef={register({
                                        required: true,
                                        validate: (value) => {
                                            return value > 0 && value === watch('employee_salary');
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
                                    defaultValue={`${employee.employee_age || ''}`}
                                    inputRef={register({
                                        required: true,
                                        validate: (value) => {
                                            return value > 0 && value === watch('employee_age');
                                        },
                                    })}
                                    />
                                    { errors.employee_age && <InvalidInputText/> }
                            </Grid>
                        </Grid>
                    </FormControl>
                        
                    <Button variant="contained" color="primary" type="submit" style={{marginTop: '16px'}}>SAVE</Button>
                </form>
            </Fragment>
          )}
    </Fragment>

   
  );
}