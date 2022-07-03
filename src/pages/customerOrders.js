import React, { useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { api } from '../services/Services';
import Card from '../components/cardCustomerOrders/card';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import history from '../history';

const Title = styled.h2`
color: #F2780C;
`;

const Header = styled.div`
z-index: 10000;
position: fixed;
display: flex;
align-items: center;
justify-content: center;
top: 0px;
left: 0px;
width: 100%;
height: 64px;
background-color: #FFF;
padding: 8px 24px 8px 36px;
color: white;
box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 3px 0px rgb(0 0 0 / 12%);
`;

function CustomerOrders(props) {
    const id = props.match.params.id;
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(false);
    

    useEffect(() => {
      console.log(id)
      api.get(`dashboard/customer_orders/${id}`).then((res) => {
        if(res.data.error)
          setError(true);
        console.log(res.data)
        setData(res.data);
      })
      }, [id]);

    if(error)
      return (
        <Header>
          <IconButton style={{ position: 'absolute', left: 16 }} onClick={() => history.push('/dashboard/customers')
}>
            <ChevronLeftIcon />
          </IconButton>
          <Title>
          Pedidos não encontrados!
          </Title>
        </Header>
      );

    if(!data.length)
      return (
      <> 
        <Header>
          <IconButton style={{ position: 'absolute', left: 16 }} onClick={() => history.push('/dashboard/customers')
}>
            <ChevronLeftIcon />
          </IconButton>
        </Header>
        <Spinner/>
      </>
      )

    return (
      <>
        <Header>
          <IconButton style={{ position: 'absolute', left: 16 }} onClick={() => history.push('/dashboard/customers')
}>
            <ChevronLeftIcon />
          </IconButton>
          <Title>Pedidos de {data[0].customers.name}!</Title>
        </Header>
        <Grid container spacing={2}>
        {data.map( (order, index) =>  
            <Card key={order.id} order={order} index={index} />
        )}
        </Grid>
      </>
    );
  }  
export default CustomerOrders; 
  
