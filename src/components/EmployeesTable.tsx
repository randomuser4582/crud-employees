import React, { useEffect, useState, Fragment } from 'react';
import { useTable, useSortBy } from 'react-table'
import { axiosRequest } from '../utils/axios-request';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { IEmployee } from '../interfaces/employeeModel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Button, ButtonGroup, FormControl, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AxiosResponse, AxiosError } from 'axios';
import FloatingActionButton from './FloatingActionButton';
import ConfirmDeleteEmployee from './ConfirmDeleteEmployee';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 650,
      maxWidth: 800
    },
    addBtn: {
      display: 'flex'
    },
    tableContainer: {
      minWidth: 650,
      maxWidth: 800
    }
  }),
);

function EmployeeTableUI({ columns, data }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
  const classes = useStyles();
  const firstPageRows = rows.slice(0, 20);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table {...getTableProps()} className={classes.table}>
        <TableHead>
          { headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              { headerGroup.headers.map(column => (
                // @ts-ignore
                <TableCell align="left" {...column.getHeaderProps(column.getSortByToggleProps())} style={column.id === 'id' ? {pointerEvents: 'none'} : {cursor: 'pointer'}}>
                  {column.render('Header')}
                  {column.id !== 'id' ?
                    (<span>
                      {
                        // @ts-ignore
                        column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''
                      }
                      </span>)
                  : null}
                </TableCell>
              ))}
            </TableRow>
          )) }
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          { firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell align="left" {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    )
                  })}
                </TableRow>
              )}
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

function EmployeesTable(): JSX.Element {

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [employeesData, setStateEmployeesData] = useState<IEmployee[]>([]);
  const [employeesDataFiltered, setStateEmployeesDataFiltered] = useState<IEmployee[]>([]);
  const [searchInputVal, setStateSearchInputVal] = useState<string>('');
  const [loading, setStateLoading] = useState<boolean>(false);
  const [isConfirmDialogOpen, setStateConfirmDialog] = useState<boolean>(false);
  const [employeeId, setStateEmployeeId] = useState<any>(null);

  const handlerOpenDialogConfirm = (_employeeId: number): void => {
    setStateConfirmDialog(true);
    setStateEmployeeId(_employeeId);
  }
  const handlerConfirmDialog = (): void => {
    deleteEmployeeByID(employeeId);
  }
  const handlerCancelDialog = (): void => setStateConfirmDialog(false);
  const updatedSnackbarSuccess = (): React.ReactText => enqueueSnackbar('The employee has been deleted!', { variant: 'success'});
  const updatedSnackbarError = (): React.ReactText => enqueueSnackbar('An error has occured!', { variant: 'warning'});

  const deleteEmployeeByID = (employeeId: number): void => {
    if (employeeId !== null) {
      axiosRequest({
        method: 'DELETE',
        url: `employee/${employeeId}`,
      })
        .then((response: AxiosResponse<any[]>) => {
        updatedSnackbarSuccess();
      })
      .catch((error: AxiosError<any>) => {
        console.log(`Error deleting employee by id ${error}`);
        updatedSnackbarError();
      })
        .finally(() => {
          setStateLoading((prevState) => !prevState);
          setStateConfirmDialog(false);
      });
    }
  }

  const _filterByEmployeeName = (value: string): IEmployee[] => {
    const filterValue = value.toLowerCase();
    return employeesData.filter(val => val.employee_name !== undefined ? val.employee_name.toLowerCase().includes(filterValue) : []);
  };

  const handleSearchInput = (event: any): void => {
    setStateSearchInputVal(event.target.value);
    const searchInputResults = _filterByEmployeeName(event.target.value);  
    setStateEmployeesDataFiltered(searchInputResults);
  }
  
  useEffect(() => {
    let didEffectCancel = false;
    if (!didEffectCancel) {
      axiosRequest({
        method: 'GET',
        url: 'employee',
      })
        .then((response: AxiosResponse<IEmployee[]>) => {
        const employees = response.data || [];
        setStateEmployeesData(employees as IEmployee[]);
        setStateEmployeesDataFiltered(employees as IEmployee[]);
      })
      .catch((error: AxiosError<any>) => {
        console.log(`There was an error fetching employees ${error}`);
      })
      .finally(() => {})
    }
  }, [loading]);

  const columns: any = [
    {
      Header: 'Employee information',
      columns: [

        {
          Header: 'FULL NAME',
          accessor: 'employee_name',
        },
        {
          Header: 'AGE',
          accessor: 'employee_age',
        },
        {
          Header: 'SALARY',
          accessor: 'employee_salary',
        },
        {
          Header: 'ACTIONS',
          accessor: 'id',
          Cell: ({ value }: any) => {
            return (
              <Fragment>
                <Fragment>
                  <ButtonGroup color="primary" aria-label="primary actions button group">
                    <Button>
                      <Link
                        to={`/employee/edit/${value}`}
                        style={{textDecoration: 'none', color: '#3f51b5'}}
                      >
                        EDIT
                      </Link>
                    </Button>
                    <Button onClick={() => handlerOpenDialogConfirm(value)}><DeleteForeverIcon style={{color: 'rgb(220, 0, 78)'}}/></Button>
                  </ButtonGroup>
                </Fragment>
              </Fragment>
            );
          },
        },
      ],
    },
  ];

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2}>
          <FloatingActionButton variant="add" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Hidden only="xs">
            <FormControl
              className="wrapInput"
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="search_employee">Search employee</InputLabel>
              <Input
                id="search_employee"
                value={searchInputVal}
                style={{margin: '16px 0 16px 0'}}
                onChange={(e) => {handleSearchInput(e)}}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            </Hidden>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <EmployeeTableUI
          columns={columns}
          data={employeesDataFiltered}
        />
      </Paper>

      <ConfirmDeleteEmployee
        handlerConfirmDialog={handlerConfirmDialog}
        handlerCancelDialog={handlerCancelDialog}
        isDialogOpen={isConfirmDialogOpen}
      />
    </Fragment>
  )
}

export default EmployeesTable
