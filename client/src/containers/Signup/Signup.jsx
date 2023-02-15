import React, { useContext } from 'react';
import styles from './Signup.module.css';
import { Context as AuthContext } from '../../contexts/AuthContext';
import AuthForm from '../AuthForm';

const Signup = ({
    goToLogin,
    goBack
}) => {
    const { signup, state: { errorMessage } } = useContext(AuthContext);

    return (
        <>

            <AuthForm
                title={'Register'}
                onSubmit={signup}
                goBack={goBack}
                linkText={'Already a customer?'}
                onLinkClick={goToLogin}
                errorMessage={errorMessage}
            />

        </>
    )
};

export default Signup;