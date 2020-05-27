import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { axiosRequest } from '../utils/axios-request';
import { IEmployee } from '../interfaces/employeeModel';
import EditEmployeeForm from './EditEmployeeForm';
import EmployeeCard from './EmployeeCard';
import { AxiosResponse, AxiosError } from 'axios';

interface Props {
    match: {
        params: {
            id: string;
        }
    }
}

function EditEmployee(props: Props): JSX.Element {
    const employeeId = props.match.params.id as string;
    const [employee, setStateEmployeeById] = useState<IEmployee[]>([]);

    useEffect(() => {
        let didEffectCancel = false;
        if (!didEffectCancel) {
            axiosRequest({
                method: 'GET',
                url: `employee/${employeeId}`
            })
            .then((response: AxiosResponse<any[]>) => {
                setStateEmployeeById(response.data)
            })
            .catch((error: AxiosError<any>) => {
                console.log(`An error occured ${error}`);
            })
            .finally(() => {});
        }
    }, [employeeId]);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <EmployeeCard employee={employee} />
                <br/>
                <Paper style={{ padding: 16 }}>
                    <EditEmployeeForm
                        //@ts-ignore 
                        employee={employee} />
                </Paper>
            </Grid>
        </Grid>
    )
} 

export default EditEmployee;