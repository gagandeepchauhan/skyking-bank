import React from 'react';
import { useContext } from 'react';
import AuthForm from '../AuthForm';
import styles from './Login.module.css';
import { Context as AuthContext } from '../../contexts/AuthContext';

const Login = ({
    goToSignup,
    goBack
}) => {
    const { signin, state: { errorMessage } } = useContext(AuthContext);

    return (
        <>

            <AuthForm
                title={'Get in'}
                onSubmit={signin}
                goBack={goBack}
                linkText={'Not registered?'}
                onLinkClick={goToSignup}
                errorMessage={errorMessage}
            />

        </>
    )
};

export default Login;