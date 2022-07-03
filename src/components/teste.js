import * as React from 'react';
import {_useMapControl as useMapControl} from 'react-map-gl';

export default function CustomControl(props) {
  const [counter, setCounter] = React.useState(0);
  const {context, containerRef} = useMapControl({
    onDragStart: evt => {
      // prevent the base map from panning
      evt.stopPropagation();
    },
    onClick: evt => {
      if (evt.type === 'click') {
        setCounter(v => v + 1);
      }
    },
    onMouseMove: evt =>{
      console.log('teste')
    }
  });

  return (
    <div ref={containerRef} >
      Clicked {counter} times
    </div>
  );
}