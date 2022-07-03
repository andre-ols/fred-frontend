import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import Spinner from './Spinner';
//import Dialog from './Dialog';
import { api } from '../services/Services';

const spinner = {
    position: 'relative',
    left: 'calc(50% - 20px)',
    color: '#F2780C'
}

export default function Buttons(props){
    const [state, setState] = useState({
        spinner: false,
        isOpen: false
    });

    function sendMessage(status) {
        let message;
        if(status === 'PREPARO')
            message = 'Seu pedido foi aceito e já está em preparo! ☺️\n\n_mensagem enviada automaticamente, por favor não responder_';
        if(status === 'FINALIZADO')
            message = 'Seu pedido saiu para entrega, jaja ele chega aí 😁 \n\n_mensagem enviada automaticamente, por favor não responder_';
        if(status === 'CANCELADO')
            message = 'Infelizmente seu pedido foi *cancelado* 😞\n\n_mensagem enviada automaticamente, por favor não responder_';

        api.post(`dashboard/whatsapp/${props.cliente_id}`, {
            message
        });
    }
    
    function ChangeStatus(status){
        setState({...state, spinner: true});
        api.put(`dashboard/changestatus/${props.id}/${status}`)
        sendMessage(status);
    }

    /*
    useEffect(() =>{
        setState( prevState => ({...prevState, spinner: false}))
    }, [props.status]);
    */

    if(!state.spinner){
        return(
        <div >
            <Button 
            variant="contained" 
            style={{backgroundColor: '#009688', color:'#FFFFFF'}} 
            onClick={() => ChangeStatus('PREPARO')}
            >
            Aceitar
            </Button>
            <Button 
            variant="contained" 
            style={{backgroundColor: '#f44336', color:'#FFFFFF', marginLeft: '5px'}} 
            onClick={() => setState({...state, isOpen: true})}
            >
            Recusar
            </Button>
            <Button 
            color="secondary" 
            style={{marginLeft: '5px'}}
            onClick={props.click}
            >
            Detalhes</Button>

            {/*state.isOpen && <Dialog 
            isOpen={state.isOpen} id={props.id} 
            cancel={() => {ChangeStatus('CANCELADO'); 
            setState({spinner: true, isOpen: false})}} 
            onClose={(e) => setState({...state, isOpen: false})}/>*/}

        </div>
        );
    }

    else
       return  <div style={spinner}><Spinner /></div>
        
}
    
     