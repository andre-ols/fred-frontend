import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styleLink = {color: 'rgb(165 175 193)', textDecoration: 'none'};
const styleIcon = { minWidth: 32 };
const styleText = { fontSize: '.95rem', fontWeight: 500 };

const Card = styled.div`
&:hover{
  box-shadow: 0px 0px 5px;
  border-radius: 16px;
  margin-left: 4px;
  margin-right: 4px;
}
padding-left: 12px; padding-right: 12px; border-radius: 4px; height: 44px;
display: flex; align-items: center
`;

export default function MainListItems(props){

  const changeColor = (link) => {
    if(link === props.path)
      return '#F2780C'
    else return 'rgb(165 175 193)'
  }
  

return (
  <div>
  <Link style={styleLink} to="/dashboard/home">
    <Card >
      <ListItemIcon style={styleIcon}>
        <DashboardIcon style={{color: changeColor('/dashboard/home')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/home'), ...styleText}}>Início</span>
    </Card>
  </Link>
  <Link style={styleLink} to="/dashboard/map">
    <Card>
      <ListItemIcon style={styleIcon}>
        <BarChartIcon style={{color: changeColor('/dashboard/map')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/map'), ...styleText}}>Entrega</span>
    </Card>
  </Link>
  <Link style={styleLink} to="/dashboard/customers">
    <Card>
      <ListItemIcon style={styleIcon}>
        <GroupIcon style={{color: changeColor('/dashboard/customers')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/customers'), ...styleText}}>Clientes</span>
    </Card>
  </Link>
  <Link style={styleLink} to="/dashboard/settings">
    <Card>
      <ListItemIcon style={styleIcon}>
        <SettingsIcon style={{color: changeColor('/dashboard/settings')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/settings'), ...styleText}}>Configurações</span>
    </Card>
  </Link>
  <Link style={styleLink} to="/dashboard/account">
    <Card >
      <ListItemIcon style={styleIcon}>
        <PersonIcon style={{color: changeColor('/dashboard/account')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/account'), ...styleText}}>Conta</span>
    </Card>
  </Link>
  <Link style={styleLink} to="/dashboard/reports">
    <Card>
      <ListItemIcon style={styleIcon}>
        <BarChartIcon style={{color: changeColor('/dashboard/reports')}}/>
      </ListItemIcon>
      <span style={{color: changeColor('/dashboard/reports'), ...styleText}}>Relatórios</span>
    </Card>
  </Link>
  </div>
);
} 