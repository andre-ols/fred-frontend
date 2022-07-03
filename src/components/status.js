import React, { useState, useEffect } from 'react';

export default function Status(props){
  const [ color, setColor ] = useState('');
  
  useEffect(() => {
    console.log("entrou")
    if(props.status === "Pendente")
    setColor('#3f51b5')
    else if (props.status === "Preparo")
      setColor('#F2780C')
  }, [props.status])

    return(
        <div style={ { display: 'inline-flex', height: 24, alignItems: 'center', color: 'white', marginRight: props.right, backgroundColor: color, borderRadius: 16 } }>
          <span style={{ paddingLeft: 8, paddingRight: 8 }}>{props.status}</span>
        </div>
    );
}