import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignSelf: 'center',
    position: 'absolute',
    left: 'calc(100vw/2 - 50px)',
    top: 'calc(100vh/2 - 50px)',
    color: '#F2780C',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
      <CircularProgress classes={{
      root: classes.root
  }} />
  );
}