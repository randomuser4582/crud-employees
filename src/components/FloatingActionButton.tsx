import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  variant: string;
}

export default function FloatingActionButton(props: Props): JSX.Element {
  const classes = useStyles();
  const { variant } = props;
  return (
    <div className={classes.root}>
      {
        variant === 'add' ? (
          <Fab color="primary" variant="extended" style={{marginTop: '16px'}}>
            <AddIcon className={classes.extendedIcon} /> 
            <Link
                to="createNewEmployee"
                style={{ textDecoration: 'none', color: '#ffffff' }}>
              NEW EMPLOYEE
            </Link>
          </Fab>
        )
        : variant === 'edit' ? (
            <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
          )
        : variant === 'like' ? (
              <Fab disabled aria-label="like">
          <FavoriteIcon />
        </Fab>)
        : (
        <Fab variant="extended">
          <NavigationIcon className={classes.extendedIcon} />
          ADD EMPLOYEE
        </Fab>)
      }
    </div>
  );
}
