import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MainListItems from '../components/listItems';
import Home from './Home.js';
import Button from '@material-ui/core/Button';
import { Switch, useLocation } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Customers from './Customers';
import Account from './Account';
import Settings from './Settings';
import CustomerOrders from './customerOrders';
import SwitchButton from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Context } from '../context/AuthContext';
import { api } from '../services/Services';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../history';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Map from './Map';
import logo from '../assets/logo-fred-sem-fundo.jpg';
const drawerWidth = 220;

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
  },
  toolbar: {
    paddingRight: 24,
    paddingLeft: 16,
    minHeight: 64 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  appBar: {
    transition: '0.5s',
    boxShadow: '0px 0px 0px 0px',
    position: 'relative'
  },
  title: {
    paddingLeft: 13,
    paddingRight: 13,
    color: '#F2780C',
    fontSize: '1.2rem!important',
    fontFamily: 'Josefin Sans',
    fontWeight: 500,
    lineHeight: 1.2
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    transition: 0,
    boxShadow: '4px -4px 5px rgb(62 79 112 / 10%), 0px -4px 0px rgb(62 79 112 / 10%)'
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: 'white',
    paddingLeft: 16,paddingRight: 16,paddingTop: 16, paddingBottom: 20
  },
  driver: {
    backgroundColor: '#F2780C'
  },
  FormControlLabel: {
    paddingLeft: 13, color: 'rgb(165 175 193)'
  },
  list:{
    paddingTop: 8,
  },
  image: {
    marginBottom: 4, width: 50
  },
  titleLogo: {
    color: '#5972a1', fontWeight: 800, 
    textAlign: 'left', marginLeft: 16, 
    fontSize: '1.2rem', fontFamily: 'Josefin Sans'
  },
  boxLogo: {
    display: 'flex', alignItems: 'center', 
    position: 'absolute', bottom: 16, paddingLeft: 13
  }
}));



export default function Dashboard() {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem('user')) || {};
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const [invisible, setInvisible] = useState(user.state_bot === '1' ? true : false);
  const [activeBot, setActiveBot] = useState(user.state_bot === '1' ? 'Bot Ativado' : 'Bot Desativado');
  const { handleLogout } = useContext(Context);
  const path = useLocation().pathname;
  
  if(path === '/dashboard' || path === '/dashboard/')
    history.push('/dashboard/home');

  const handleBadgeVisibility = () => {
    if(invisible){
      setActiveBot('Bot Desativado');
      api.get('dashboard/destroy');
    }
    else{
      setActiveBot('Bot Ativado');
      api.get('dashboard/init');
    }
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      <Drawer classes={{ paper: classes.drawerPaper }} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className={classes.toolbarIcon}>
          <img alt="logo" src={logo} style={{ width: 120 }} />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        
        <h3 className={classes.title}><span style={{ color: '#aab7d0' }}>Olá, </span>{ user.name }!</h3>
        
        <List className={classes.list} onClick={() => setDrawerOpen(false)}>
          <MainListItems path={path}/>
        </List>
        
        <FormControlLabel className={classes.FormControlLabel}
          control={<SwitchButton color="primary" checked={invisible} onChange={handleBadgeVisibility} />}
          label= {<span style={{ fontSize: '.95rem', fontWeight: 500 }}>{ activeBot }</span>}
        />
        
        <Divider className={classes.driver}/>
      </Drawer>

        <CssBaseline />
        <AppBar style={{backgroundColor : 'white', height: 64 }} className={ classes.appBar }>
          <Toolbar className={classes.toolbar}>
            <Button style={{ color: '#F2780C' }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </Button>
            <Button  
              style={{ position: 'absolute', right:0, marginRight: 24, textTransform: 'none', color: '#F2780C' }}
              onClick={handleLogout}
              >
            <ExitToAppIcon style={{ marginRight: 4 }}/>
              Logout
              </Button>
          </Toolbar>
        </AppBar>
        
        <main className={classes.content}>
          <Switch>
          <PrivateRoute path="/dashboard/home" exact component={Home}/>
          <PrivateRoute path="/dashboard/customers" exact component={Customers} />
          <PrivateRoute path="/dashboard/customer/:id" exact component={CustomerOrders} />
          <PrivateRoute path="/dashboard/map" exact component={Map} />
          <PrivateRoute path="/dashboard/account" exact component={Account} />
          <PrivateRoute path="/dashboard/settings" exact component={Settings} />
          </Switch>
        </main>
      </div>
  );
}
