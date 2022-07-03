import React, { useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { api, socket } from '../services/Services';
import Dialog from '../components/Dialog';
import CardHome from '../components/cardHome/card'


function Master() {
    const [ alertOpen, setAlertOpen ] = useState(true);
    const [ detailData, setDetailData ] = useState({});
    const [ activeDetail, setActiveDetail ] = useState(false);
    const localData = JSON.parse( sessionStorage.getItem('orders') );
    const [ data, setData ] = useState(localData || []);
    

    useEffect(() => {
      api.get('orders').then((res) => {
        setData(res.data);
        sessionStorage.setItem('orders', JSON.stringify(res.data))
      })
      }, []);

      useEffect(() => {
        socket.on('newOrder', data => console.log(data))
      }, []);

      useEffect(() => {
        socket.on('updateOrder', updatedOrder => {
          setData((prevData) => {
            const newData = prevData.map((order) => {
              if(order.id === updatedOrder.id)
                return updatedOrder;
              else 
                return order;
            });
            sessionStorage.setItem('orders', JSON.stringify(newData))
            return newData;
          });
        })
      }, []);

      function handleClick(order) {
        setDetailData(order);
        setActiveDetail(true);
      }

    return (
      <>
        <Grid container spacing={2}>
        {data.map( (order, index) =>  
            <CardHome key={order.id} order={order} index={index} openDetail={() => handleClick(order)} />
        )}
        </Grid>
        <Dialog isOpen={activeDetail} order={detailData} close={setActiveDetail} /> 
        { alertOpen &&  <Alert onClose={() => setAlertOpen(false)}
          style={{ marginTop: 20 , position: 'fixed', bottom: 20, width: 'calc(100vw - 32px)', backgroundColor: 'rgb(224 251 224)' }}
        >
          Promoção!
        </Alert> }
        </>
            
    );
  }  
export default Master; 
  
 