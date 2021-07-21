import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ isLogged, component: Component, ...others }) => {
    return (
        <Route
            { ...others }
            component={ ( props ) => (
                ( !isLogged ) ?
                ( <Component { ...props } /> ):
                ( <Redirect to="/" /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};