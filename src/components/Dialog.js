import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Timer from './timer';
import Divider from '@material-ui/core/Divider';
import Status from './status';
import maskWhatsapp from '../utils/formatWhatsapp';
import { api } from '../services/Services';

const theme = createMuiTheme({
    overrides: {
      MuiDialog:{
        paper:{
           backgroundColor: '#FFFFFF',
           padding: 24,
           width: 400,
           borderRadius: 24
        }
       
      }
    }
  });

export default function DialogText(props){
    const [ status, setStatus ] = useState(props.order.status);
    const [ order, setOrder ] = useState(props.order);

    useEffect(() => {
      if(props.isOpen) {
        setStatus(props.order.status);
        setOrder(props.order);
      }
    }, [props]);

    const styleh3 = { color: '#F2780C', marginBottom: 4, marginTop: 4 };

    const { customers: customer, payments: payment, details, addresses } = order;

    if ( !(customer) )
      return (
        <>
        </>
      );

    const whatsapp = maskWhatsapp(customer.whatsapp);

    const acceptOrder = async () => {
      const { data } = await api.put(`dashboard/orders/${props.order.id}`, {
        status: 'Preparo'
      });
      setStatus(data.status);
    }

  return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={props.isOpen}
          onClose={() => props.close(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <Button style={{ position: 'absolute', right: 4, padding: 0 }} onClick={() => props.close(false)}>x</Button>
        <div style={{ display:  'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <Timer createdAt={order.createdAt} origin={'dialog'}/>
          <Status color="#F2780C" status={status} right={46}/>
        </div>

        <h3 style={styleh3} >Nome: <span style={{ fontWeight: 400, color: '#666f80' }}>{customer.name}</span></h3>
        <h3 style={styleh3}>Contato: <span style={{ fontWeight: 400, color: '#666f80' }}>{whatsapp}</span></h3>
        <h3 style={styleh3}>Endereço: <a href={addresses.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 400, color: '#666f80' }}>{addresses.address}</a></h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={styleh3}>Pagamento: <span style={{ fontWeight: 400, color: '#666f80' }}>{payment.type}</span></h3>
        { payment.change && <h3 style={styleh3}>Troco: <span style={{ fontWeight: 400, color: '#666f80' }}>{payment.change.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></h3> }
        </div>

        <h3 style={{...styleh3, marginTop: 10}}>Itens</h3>

        <Divider style={{ backgroundColor: '#F2780C', marginTop: 10 }}/>
          <Table>
                  <TableBody>
                    {details.map( (data) => (
                      <TableRow key={data.id} >
                        <TableCell style={{ padding: 0 }}>{data.item}</TableCell>
                        <TableCell align="center" >{data.amount}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
          </Table> 

          <DialogActions style={{ marginTop: 10}}>
          <Button onClick={acceptOrder} variant="contained" style={{ backgroundColor: '#F2780C', color: 'white', textTransform: 'none' }} >Aceitar</Button>
          <Button style={{ marginLeft: 14, color: '#F2780C', textTransform: 'none' }} >Cancelar</Button>
          </DialogActions>
        </Dialog>
        </MuiThemeProvider>
    );
}