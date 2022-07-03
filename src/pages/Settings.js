import React, { useState } from 'react';
import { Paper,makeStyles } from '@material-ui/core';
import { Grid, } from '@material-ui/core';
import SwitchButton from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { api } from '../services/Services';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: '0px 24px 24px 24px',
        padding: theme.spacing(3),
        borderRadius: '0px 0px 24px 24px'
    },
    pageHedaer: {
      margin: '24px 24px 0px 24px',
      borderRadius: '24px 24px 0px 0px',
      backgroundColor: '#F2780C',
      padding: '8px 24px 8px 36px',
      color: 'white',
      boxShadow: '0px 0px 5px 1px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 3px 0px rgb(0 0 0 / 12%)'
    },
    button: {
      marginLeft: 8
    }
}))

export default function Account() {
    const data = JSON.parse(sessionStorage.getItem('user'));
    const [activeBot, setActiveBot] = useState(data.state_bot === '1' ? true : false);
    const [activeSounds, setActiveSounds] = useState(data.state_bot === '1' ? true : false);

    const handleBotVisibility = () => {
        if(activeBot){
          api.get('dashboard/destroy');
        }
        else{
          api.get('dashboard/init');
        }
        setActiveBot(!activeBot);
    }

    const handleSoundVisibility = () => {
        if(activeSounds){
          api.get('dashboard/destroy');
        }
        else{
          api.get('dashboard/init');
        }
        setActiveSounds(!activeSounds);
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.pageHedaer}>
              <h3 style={{ fontSize: 'large' }}>Configurações</h3>
            </div>
            <Paper className={classes.pageContent}>
                <Grid container>
                    <Grid item xs={12} md={6} lg={6} >
                        <FormControlLabel 
                            style={{ paddingLeft: 13, color: 'rgb(165 175 193)' }}
                            control={<SwitchButton color="primary" 
                            checked={activeSounds} onChange={handleSoundVisibility} />}
                            label= {<span style={{ fontSize: '.95rem', fontWeight: 500 }}>{ activeSounds ? 'Som Ativado' : 'Som Desativado' }</span>}
                        />    

                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <FormControlLabel 
                            style={{ paddingLeft: 13, color: 'rgb(165 175 193)' }}
                            control={<SwitchButton color="primary" 
                            checked={activeBot} onChange={handleBotVisibility} />}
                            label= {<span style={{ fontSize: '.95rem', fontWeight: 500 }}>{ activeBot ? 'Bot Ativado' : 'Bot Desativado' }</span>}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
