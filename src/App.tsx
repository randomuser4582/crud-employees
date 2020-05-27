import React, { Suspense } from 'react';
import './App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider } from 'notistack';
import AlphaNavigation from './components/AlphaNavigation/AlphaNavigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '16px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    loader: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      margin: '0 auto',
      textAlign: 'center'
    },
  }),
);

function App() {
  const classes = useStyles();
  return (
    <SnackbarProvider maxSnack={3}>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Suspense fallback={(<div style={{ padding: '16px', textAlign: 'left' }}>Loading...</div>)}>
              <AlphaNavigation />
            </Suspense>
          </Grid>
        </Grid>
      </div>
    </SnackbarProvider>
  );
}

export default App;
