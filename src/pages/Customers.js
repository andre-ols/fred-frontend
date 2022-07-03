import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { api } from '../services/Services';
import { withStyles } from '@material-ui/core';
import maskWhatsapp from '../utils/formatWhatsapp';
import history from '../history';

const StyledTableRow = withStyles(() => ({
  root: {
    '&:hover' : {
      boxShadow: 'none'
    }
  },
}))(TableRow);

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      head: {
        backgroundColor: '#F2780C',
        color: 'white'
      },
    },
    MuiTableRow: {
      root: {
        '&:hover' : {
          boxShadow: '1px 2px 7px #F2780C'
        }
      }
    },
    MuiButton:{
      root:{
        textTransform: 'none'
      }
    }
  }
});

function Patient(){
  const localData = JSON.parse( sessionStorage.getItem('customers') );
  const [data, setData] = useState(localData || []);

  useEffect(() => {
    api.get('dashboard/customers').then((res) => {
      console.log(res.data)
      setData(res.data);
      sessionStorage.setItem('customers', JSON.stringify(res.data));
    })
    }, []);

    if(data.length > 0){
      return (
          <MuiThemeProvider theme={theme}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <TableCell align="left" >Cliente</TableCell>
                <TableCell align='center' >Whatsapp</TableCell>
                <TableCell align='center' >Ações</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((customer) => {
                const whatsapp = maskWhatsapp(customer.whatsapp)
                return(
                <TableRow key={customer.id} >
                  <TableCell align="left" >{customer.name}</TableCell>
                  <TableCell align='center' >{whatsapp}</TableCell>
                  <TableCell align='center' > <Button onClick={() => history.push(`/dashboard/customer/${customer.id}`)} variant="outline" >Ver pedidos</Button> </TableCell>
                </TableRow>
                )})}

            </TableBody>
          </Table>
          </ MuiThemeProvider>
      

      );
    }
    else{
      return(
        <MuiThemeProvider theme={theme}>
         <Table>
         <TableHead>
              <StyledTableRow>
                <TableCell align="left" >Cliente</TableCell>
                <TableCell align='center' >Whatsapp</TableCell>
                <TableCell align='center' >Ações</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                  <TableCell align="left">loading...</TableCell>
                  <TableCell align='center' >loading...</TableCell>
                  <TableCell align='center' ><Button variant="contained" >loading...</Button> </TableCell>
                </TableRow>
            </TableBody>
           </ Table>
          </MuiThemeProvider>
      ); 
    }
    
  }

export default Patient;
