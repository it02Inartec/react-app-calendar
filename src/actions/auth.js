import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventClearActive } from './calendar';

export const startLogin = ( email, password ) => {
    // se usa return porque es asincrona la función
    return async ( dispatch ) => {
        
        const res = await fetchWithoutToken(
            'auth', // endpoint
            { email, password }, // data
            'POST' // method
        );

        const body = await res.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
};

export const startRegister = ( email, password, name ) => {
    return async ( dispatch ) => {
        const res = await fetchWithoutToken(
            'auth/register',
            { email, password, name },
            'POST'
        );

        const body = await res.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );

        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
};

export const startCheking = () => {
    return async ( dispatch ) => {
        const res = await fetchWithToken( 'auth/renew' );

        const body = await res.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );

        } else {
            dispatch( checkingFinish() );
        }
    }
};

const checkingFinish = () => ({ type: types.authChekingFinish });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( eventClearActive() );
        dispatch( logout() );
    };
};

const logout = () => ({ type: types.authLogout });