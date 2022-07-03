import React from 'react';
import { Paper,makeStyles } from '@material-ui/core';
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';


const genderItems = [
    { id: 'male', title: 'Masculino' },
    { id: 'female', title: 'Femino' },
    { id: 'other', title: 'Outros' },
]


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


    const initialFValues = {
        id: data.id,
        fullName: data.name,
        email: data.email,
        mobile: '',
        address: data.addresses.address,
        gender: 'male',
        departmentId: '',
        hireDate: new Date(),
        isPermanent: false,
    }

    const classes = useStyles();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "O campo de nome é obrigatório"
        if ('email' in fieldValues)
            temp.email = validateEmail(fieldValues.email) ? "" : "Insira um e-mail válido"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 10 ? "" : "O telefone deve ser nesse modelo (xx) xxxxx-xxxx"
        if ('address' in fieldValues)
            temp.address = fieldValues.address.length > 0 ? "" : "O campo de cidade é obrigatório"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            resetForm()
        }
    }

    return (
        <>
            <div className={classes.pageHedaer}>
              <h3 style={{ fontSize: 'large' }}>Editar Conta</h3>
            </div>
            <Paper className={classes.pageContent}>
                <Form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={6} >
                            <Controls.Input
                                name="fullName"
                                label="Nome"
                                value={values.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}
                            />
                            <Controls.Input
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                            <Controls.Input
                                label="Telefone"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleInputChange}
                                error={errors.mobile}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <Controls.Input
                                  label="Endereço"
                                  name="address"
                                  value={values.address}
                                  onChange={handleInputChange}
                                  error={errors.address}
                            />

                            <Controls.RadioGroup
                                name="gender"
                                label="Genero"
                                value={values.gender}
                                onChange={handleInputChange}
                                items={genderItems}
                            />                    
                            <Controls.DatePicker
                                name="hireDate"
                                label="Data"
                                value={values.hireDate}
                                onChange={handleInputChange}
                            />

                            <div style={{ marginLeft: 4, marginTop: 8 }}>
                                <Controls.Button style={{ backgroundColor: '#F2780C' }}
                                    type="submit"
                                    text="Enviar" />
                                <Controls.Button 
                                    text="Resetar"
                                    color="default"
                                    onClick={resetForm} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </>
    )
}
