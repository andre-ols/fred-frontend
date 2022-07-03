import React, { useState, useEffect }  from 'react';
import TimerIcon from '@material-ui/icons/Timer';

 const timer = { 
   marginRight: 10
 }
 const time = {
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-end',
  fontWeight: 'bold',
  color: '#F2780C',
  float: 'right'
 }

export default function Timer(props){
    const [data, setData] = useState( parseInt( (new Date() - new Date(props.createdAt)) / 60000) );

    useEffect(() => {
        let mounted = true;
        setInterval(() => {
            if(mounted)
            setData( prevState => ( prevState + 1 ) )
        }, 60000);

        return () => mounted = false;
    }, [])

    return(
        <div style={time}><TimerIcon style={timer} />{data} Min</div>
    );     
}
 