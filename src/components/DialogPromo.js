import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { api } from '../services/Services';

const theme = createMuiTheme({
    overrides: {
      MuiTypography: {
        h6: {
          color: '#ba0340',
          marginLeft: '10px',
          marginRight: '10px',
          marginTop: '10px',
          display: 'flex'
        }
      },
      MuiDialog:{
        paper:{
           backgroundColor: 'white'
        }
       
      }
    }
  });

export default function DialogPromo(props){
        const handleActivatePromotion = async () => {
          props.onClose();
          const promotion = document.getElementById("promocao").value;
          const value = document.getElementById("valor").value;
          await api.post('dashboard/whatsapp/activatepromotion', {
            promotion,
            value
          })
          props.alert('ativada'); 
        }

        const handleDisablePromotion = async () => {
          props.onClose();
          await api.get('dashboard/whatsapp/disablepromotion')
          props.alert('desativada');
        }
        return (
            <MuiThemeProvider theme={theme}>
              <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Qual a promoção deseja ativar?</DialogTitle>
                <form noValidate autoComplete="off">
                    <TextField id="promocao" color="secondary" label="Promoção" style={{ marginLeft: 10 }} />
                    <TextField id="valor" color="secondary" label="Valor" type="number" style={{ marginLeft: 10, marginRight: 10 }} />
                </form>
                <DialogActions>
                  <Button onClick={handleDisablePromotion} style={{color: '#F44336'}} autoFocus>
                    Desativar
                  </Button>
                  <Button onClick={handleActivatePromotion} style={{color: '#009688'}}>
                    Ativar
                  </Button>
                </DialogActions>
              </Dialog>
              </MuiThemeProvider>
          );
}