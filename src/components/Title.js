import React from 'react';

export default function Title(props) {
  return (
    <h2 
    style={{
      margin:0,
      fontWeight: 'bold', 
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      marginTop: '5px',
    }}>
      {props.children}
    </h2>
  );
}