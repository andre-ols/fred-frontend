import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import maskMoney from '../utils/maskMoney';
import maskMinutes from '../utils/maskMinutes';

export default function InputMoney(props) {

    useEffect(() => {
        console.log('renderizou')
        document.getElementById(`Taxa ${props.id}`).value = maskMoney(props.price.toFixed(2));
        document.getElementById(`Tempo ${props.id}`).value = maskMinutes(props.time);
    }, [props.id, props.time, props.price])


  return (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center' }} onMouseEnter={() => console.log(`entrou ${props.id}`)} onMouseLeave={() => console.log(`saiu ${props.id}`)}>
            <div style={{ width: '100%', textAlign: 'center', padding: 4 }}>Até {props.radius} km</div>
            <div style={{ width: '100%', textAlign: 'center', padding: 4 }}>
                <TextField
                variant="outlined"
                type="text" 
                id={`Taxa ${props.id}`}  
                placeholder="R$ 0,00"
                onKeyUp={(e) => { 
                    e.target.value = maskMoney(e.target.value)
                    props.setEnableButton(true);
                }}
                required
                size="small"
                />
            </div>
            <div style={{ width: '100%', textAlign: 'center', padding: 4, marginRight: 12 }}> 
                <TextField
                variant="outlined"
                required
                type="text"
                id={`Tempo ${props.id}`}  
                onKeyDown={(e) => { 
                    e.target.value = maskMinutes(e.target.value);
                    props.setEnableButton(true);
                }}
                placeholder="0 min"
                size="small"
                />
            </div>
        </div>
  );
}