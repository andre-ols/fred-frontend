import React, { useState, createContext } from 'react';
import { api, resetAxiosAndSocket, socket } from '../services/Services';
import history from '../history';

const Context = createContext();

function AuthProvider({ children }) {

    const [error, setError] = useState(false);
    const [ loading, setLoading ] = useState(false);

    async function handleLogin(email, password) {
        setLoading(true);
        try{
            const { data } = await api.post('authenticate', { email, password })
            const { user, token } = data;
            sessionStorage.setItem('token', `Bearer ${token}`);
            sessionStorage.setItem('user', JSON.stringify(user));
            resetAxiosAndSocket();

            setError(false)
            history.push('/dashboard/home')
        }
        catch(e){ 
            setError(true)
        }
        setLoading(false);

    }

    function handleLogout() {
        sessionStorage.clear();
        api.defaults.headers.Authorization = null;
        socket.disconnect();
        history.push('/');
    }

    return (
        <Context.Provider value={{ handleLogin, handleLogout, error, loading }}>
            {children}
        </Context.Provider>
    );

}

export { Context, AuthProvider };
