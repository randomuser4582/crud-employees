import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    },
  media: {
    height: 140,
  },
}));

export default function EmployeeCard(props: any) {
    const { employee } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      <Chip
                      avatar={<Avatar alt="" src="/static/images/avatar/1.jpg" />}
                          label={`${employee.employee_name || ''}`}
                      />
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        Biography: Qui facilis perspiciatis maxime veniam non. Quibusdam aut incidunt voluptas quia qui earum qui. Voluptatem qui est soluta magni.
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
