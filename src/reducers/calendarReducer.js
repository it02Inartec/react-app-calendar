import { types } from '../types/types';
// {
//     id: new Date().getTime(),
//     title: 'Mi cumpleaños',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#FAFAFA', // no lo usamos para este proyecto
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Yoyo'
//     }
// }

const inicialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = inicialState, action ) => {
    
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    event => ( event.id === action.payload.id ) ? action.payload : event
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => ( event.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }

        case types.eventLoad:
            return {
                ...state,
                events: [
                    ...action.payload
                ]
            }

        default:
            return state;
    }
}