import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import { api, socket } from '../services/Services';

const useStyles = makeStyles({
  depositContext: {
    display: 'flex',
    textAlign: 'center',
    height: 90,
  },
  icon: {
    fontSize: 115,
    color: '#ffffff5e',
    position:'relative',
    left: -36,
    top: 'calc(50% - 56px)'
  },
  text: {
    color: 'white',
    fontWeight: 800
  },
  title: {
    fontSize: 'initial',
    marginTop: 10
  },
  value: {
    marginTop: 5,
    fontSize: 'x-large'
  },
  body: {
    width: '100%',
    left: -25,
    position: 'relative'
  }

});


export default function Deposits(props){
  const classes = useStyles();
  const title = clsx(classes.text, classes.title);
  const value = clsx(classes.text, classes.value)
  const [data, setData] = useState({
    total: 0
  });

  useEffect(() =>{
    api.get(props.url).then((res) => {
    setData( prevData => ({...prevData, total: res.data.total}));
    })
  }, [props]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const id = user.id || "";
    socket.on(`changeStatus - ${id}`, () => {
      api.get(props.url).then((res) => {
        setData( prevData => ({...prevData, total: res.data.total}));
      })
    })
  },[props])

  if(props.type === "Faturamento")
    return (
      <div className={classes.depositContext} style={{backgroundColor: '#72b7df'}}>
      <LocalAtmOutlinedIcon className={classes.icon} fontSize="large"/> 
      <div className={classes.body}>
      <Typography className={title} variant="h6">TOTAL DE GANHOS</Typography>
        <Typography className={value} component="p" variant="h4">
        {data.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
       </Typography>
      </div>
    </div>
    );

    if(props.type === "Dinheiro")
    return (
      <div className={classes.depositContext} style={{backgroundColor: '#3db99e'}}>
      <AttachMoneyOutlinedIcon className={classes.icon} fontSize="large"/>
      <div className={classes.body}>
      <Typography className={title} variant="h6">DINHEIRO</Typography>
        <Typography className={value} component="p" variant="h4">
        {data.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
       </Typography>
      </div>
    </div>
    );

    if(props.type === "Cartão")
    return (
      <div className={classes.depositContext} style={{backgroundColor: '#ffb03beb'}}>
      <CreditCardOutlinedIcon className={classes.icon} fontSize="large"/>
      <div className={classes.body}>
      <Typography className={title} variant="h6">CARTÂO</Typography>
        <Typography className={value} component="p" variant="h4">
        {data.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
       </Typography>
      </div>
    </div>
    );
}