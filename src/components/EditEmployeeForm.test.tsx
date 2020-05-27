import React, { Fragment } from 'react'
import { render, screen } from '@testing-library/react'
import { IEmployee } from '../interfaces/employeeModel';
import { FormControl, Grid, TextField, Button } from '@material-ui/core';

const EmployeeMockData: IEmployee = {
    id: "25",
    employee_name: "John Doe",
    employee_salary: "950000",
    employee_age: "25"
}

function EditEmployeeFormTest({ employee }: any): JSX.Element {
    return (
        <Fragment>
            {employee.id !== undefined && (
                <form onSubmit={() => console.log("Submit form!")} autoComplete="off">
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
                                    data-testid="employee_name_field"
                                    name="employee_name"
                                    id="employee_name"
                                    label="Full Name"
                                    defaultValue={`${employee.employee_name || ''}`}
                                >{employee.employee_name}</TextField>
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
                                    data-testid="employee_salary_field"
                                    name="employee_salary"
                                    id="employee_salary"
                                    label="Salary"
                                    defaultValue={`${employee.employee_salary || ''}`}
                                >{employee.employee_salary}</TextField>
        
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
                                    data-testid="employee_age_field"
                                    name="employee_age"
                                    id="employee_age"
                                    label="Age"
                                    defaultValue={`${employee.employee_age || ''}`}
                                />
                
                            </Grid>
                        </Grid>
                    </FormControl>
                    
                    <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>SAVE</Button>
                </form>
            )}
        </Fragment>
    );
};


test('check if labels content match and input fields exists', () => {
    const {rerender} = render(<EditEmployeeFormTest employee={EmployeeMockData} />)
    expect(screen.getByTestId('employee_name_field').textContent).toBe('Full Name')
    rerender(<EditEmployeeFormTest employee={EmployeeMockData} />)
    expect(screen.getByTestId('employee_salary_field').textContent).toBe('Salary')
    rerender(<EditEmployeeFormTest employee={EmployeeMockData} />)
    expect(screen.getByTestId('employee_age_field').textContent).toBe('Age')
})
