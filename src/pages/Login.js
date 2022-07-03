import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  box: {
    backgroundColor: '#FFF',
    width: 300,
    height: 300,
    padding: '36px',
    boxShadow: '0 0 100px rgb(0 0 0 / 8%)',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 800,
    marginLeft: 8,
    lineHeight: '1.334',
    color: '#F2780C',
    letterSpacing: '0em',
  },
  copyright: {
    color: 'rgba(0,0,0,.45)',
    fontSize: '13px'
  },
  avatar: {
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: 4,
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Copyright = () => {
  return (
    <Typography style={{ position: 'absolute', top: 'calc(100vh - 64px)' }} variant="body2" color="textSecondary" align="center">
      Copyright © Turing 2021.
    </Typography>
  );
}


export default function Login() {
  const { handleLogin, error, loading } = useContext(Context);

  const Signin = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    handleLogin(email, password);
  }
 
  const classes = useStyles();

    return (
      <>
      <div className={ classes.root }>
        <div className={classes.box}>
              <div className={ classes.avatar }>
                <img alt='logo' src={logo} />
                <Typography className={ classes.title } component="h1" variant="h6">
                  FRED ADMIN
                </Typography>
              </div>
              <form className={classes.form} onSubmit={Signin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Endereço de E-mail"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                { error && <div style={{ color: 'red', fontSize: '0.9rem', fontFamily: "roboto", marginTop: 8 }}>Usuário ou senha estão incorretos!</div>}
                <Button 
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  className={classes.submit}
                  style={{backgroundColor: '#F2780C', color:'#FFFFFF'}}
                  >
                    Sign in
                  </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Esqueceu a Senha?
                    </Link>
                  </Grid>
                </Grid>
              </form>
        </div>
          <Copyright className={ classes.copyright }/>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
    );

  
}