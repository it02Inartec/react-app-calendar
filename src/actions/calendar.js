import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareDataCalendar } from '../helpers/prepareDataCalendar';
import { types } from '../types/types';

export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;
        
        try {
            const res = await fetchWithToken('events', event, 'POST' );

            const body = await res.json();

            if (body.ok) {

                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                };

                dispatch( eventAddNew( event ) );
            }
        } catch (error) {
            console.log(error)
        }
    }
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});


export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {

        try {
            const param = { ...event };
            delete param.user;
            const res = await fetchWithToken(`events/${ param.id }`, param, 'PUT' );
            const body = await res.json();

            if ( body.ok ) {
                dispatch( eventUpdate( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch ( error ) {
            console.log( error );
        }
    }
};

const eventUpdate = ( event ) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDeleted = () => {
    return async ( dispatch, getState ) => {
        const { id } = getState().calendar.activeEvent;
        try {
            const res = await fetchWithToken(`events/${ id }`, {}, 'DELETE' );
            const body = await res.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch ( error ) {
            console.log( error );
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoad = () => {
    return async ( dispatch ) => {
        
        try {
            const res = await fetchWithToken('events');

            const body = await res.json();

            const events = prepareDataCalendar( body.events );

            if (body.ok) {
                dispatch( eventLoad( events ) );
            }
        } catch (error) {
            console.log( error );
        }
    }
};

const eventLoad = ( events ) => ({
    type: types.eventLoad,
    payload: events
});