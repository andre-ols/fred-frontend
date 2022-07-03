import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import InputDeliveryMap from './InputDeliveryMap';
import {api} from '../services/Services';

const FeeDeliveryCard = styled.div`
    background-color: #fff;
    color: #F2780C;
    width: 340px;
    z-index: 50;
    position: absolute;
    top: 64px;
    left: 0;
    margin: 12px;
    border-radius: 4px;
    padding: 8px;
`;

export default function FeeDelivery() {
    const [ data, setData ] = useState([]);
    const [ enableButton, setEnableButton ] = useState(false);

    function colorButton(enableButton){
        if(enableButton)
            return '#F2780C';
        else
            return '#e0e0e0';
    }

    function handleSubmitForm(event) {
        event.preventDefault(); 
        const deliveryRadius = data.map(( deliveryRadius, index ) => {
            const price = parseFloat(document.getElementById(`Taxa ${index}`).value.replace("R$ ", "").replace(",", "."));
            const time = parseInt(document.getElementById(`Tempo ${index}`).value);
            return {
                price,
                time,
                radius: deliveryRadius.radius
            }
        });

        api.put('dashboard/deliveryRadius', {
            deliveryRadius
        }).then((res) => {
            setData(res.data);
            setEnableButton(true);
            console.log(res.data);
            
        })
        setEnableButton(false);

    }

    useEffect(() => {
        api.get('dashboard/deliveryRadius').then((res) => {
            setData(res.data);
            console.log(res.data);
        })
    }, [])

    return(
        <FeeDeliveryCard>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: 24, marginTop: 12 }}>
                    <strong style={{ width: '100%', textAlign: 'center' }}>Alcance</strong>
                    <strong style={{ width: '100%', textAlign: 'center' }}>Taxa</strong>
                    <strong style={{ width: '100%', textAlign: 'center', marginRight: 12 }}>Tempo (mins)</strong>
                </div>
                <form onSubmit={handleSubmitForm}>
                    {
                        data.map(( delivery, index ) => 
                            <InputDeliveryMap key={index} id={index} radius={delivery.radius} price={delivery.price} time={delivery.time} setEnableButton={setEnableButton}/>
                        )
                    }
                <Button 
                  style={{ marginTop: 16, backgroundColor: colorButton(enableButton) }}
                  type="submit"
                  disabled={!enableButton}
                  color="secondary"
                  fullWidth
                  variant="contained"
                  >
                    Enviar
                  </Button>
                  </form>
        </FeeDeliveryCard>
    )
}