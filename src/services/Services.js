import axios from 'axios';
import io from 'socket.io-client';

let api = axios.create({
baseURL: 'http://localhost:3333',
headers: {
    Authorization: sessionStorage.getItem('token')
}
});

let socket = io('http://localhost:3333', {
    query: { token: sessionStorage.getItem('token') }
});

function resetAxiosAndSocket() {
    api = axios.create({
        baseURL: 'http://127.0.0.1:3333',
        headers: {
            Authorization: sessionStorage.getItem('token')
        }
        });

    socket = io('http://127.0.0.1:3333', {
    query: { token: sessionStorage.getItem('token') }
    });
}


export { api, socket, resetAxiosAndSocket };