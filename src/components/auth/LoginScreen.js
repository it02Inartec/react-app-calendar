import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        emailLogin: 'jennifer@gmail.com',
        passwordLogin: '123456'
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        nameRegister: 'Johanna',
        emailRegister: 'johanna@gmail.com',
        passwordRegister: '123456',
        passwordConfirm: '123456'
    });

    const { emailLogin, passwordLogin } = formLoginValues;
    
    const { nameRegister, emailRegister, passwordRegister, passwordConfirm } = formRegisterValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( emailLogin, passwordLogin ) );
    }

    const handleRegister = ( e ) => {
        e.preventDefault();
        if ( passwordRegister !== passwordConfirm ) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
        dispatch( startRegister( emailRegister, passwordRegister, nameRegister ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="emailLogin"
                                value={ emailLogin }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="passwordLogin"
                                value={ passwordLogin }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="nameRegister"
                                value={ nameRegister }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="emailRegister"
                                value={ emailRegister }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="passwordRegister"
                                value={ passwordRegister }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="passwordConfirm"
                                value={ passwordConfirm }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}