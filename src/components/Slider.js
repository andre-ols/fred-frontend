import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 180,
    color: '#ba0340',
    textAlign: 'center',
    marginTop: '10px',
    marginLeft: 20
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiSlider:{
      root:{
        color: '#ba0340',
        marginTop: 40
        }
      },
      PrivateValueLabel:{
        label:{
          color: '#FFFFFF'
        }
    }
  }
})

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  
  const time = JSON.parse(localStorage.getItem('time') || '[30,60]');
  const [value, setValue] = React.useState([time[0], time[1]]);
  const classes = useStyles();
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('time', JSON.stringify(newValue));

  };
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Tempo de entrega
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        step={10}
      />
    </div>
    </MuiThemeProvider>
  );
}