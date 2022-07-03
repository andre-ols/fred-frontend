import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { motion } from "framer-motion";
import Timer from '../timer';
import Status from '../status';

const styleTitle = {
  paddingLeft: 24,
  paddingRight: 13,
  color: '#F2780C',
  marginBottom: 4,
}

const Card = styled.div`
&:hover{
  box-shadow: 1px 2px 7px ${props => props.backgroundColor};
  cursor: pointer;
}

border-radius: 24px;
padding: 0px
display: flex;
overflow-y: hidden;
flex-direction: column;
height: 170px;
background-color: #FFF;
box-shadow: 2px 2px 10px 3px rgb(97 97 97 / 10%);
`;

function CardHome(props) {
    const [ backgroundColor, setBackgroudColor ] = useState('')

    useEffect(() => {
      if(props.order.status === 'Pendente')
        setBackgroudColor('#3f51b5')
      else if (props.order.status === "Preparo")
        setBackgroudColor('#F2780C');
    }, [props.order.status])

      function handleVibrate(index){
        if(index === 0 && props.order.status === 'Pendente')
          return [0, 1, -2, 2, 0];
        else
          return [0, 0, 0, 0, 0];
      }

            const order = props.order;
        
            return (
                <Grid key={order.id} item xs md={6} lg={4} onClick={props.openDetail}>
                  <motion.div
                      animate={{
                        rotate: handleVibrate(props.index),
                      }}
                      transition={{
                        duration: 1.3,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    >
                      <Card backgroundColor={backgroundColor}>
                          <header style={{ display:  'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '24px', backgroundColor: 'white', height: 48, boxShadow: '0px 3px 5px 1px rgb(97 97 97 / 15%)' }}>

                            <h2 style={{ color: '#F2780C', marginLeft: 24 }}>{order.customers.name}</h2>
                            <Status color="#3f51b5" status={order.status} right={24} />
                          </header>
                          <h3 style={styleTitle} >Endereço: <span style={{ fontWeight: 400, color: '#666f80' }}>{order.addresses.address}</span></h3>

                          <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: 24 }}>
                          <h3 style={{...styleTitle, marginTop: 8}} >Pagamento: <span style={{ fontWeight: 400, color: '#666f80' }}>{order.payments.type}</span></h3>
                          <Timer createdAt={order.createdAt} />
                          </div>
                          
                      </Card>
                   </motion.div>
                </Grid>

                  );
}  
export default CardHome; 
  
 