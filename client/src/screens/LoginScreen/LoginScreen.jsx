import React, { useContext } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import styles from "./LoginScreenStyle.module.css";
import { Context as AuthContext } from '../../contexts/AuthContext';
import CustomAnimation from '../../components/CustomAnimation';

const Images = ['/assets/images/image1.jpg', '/assets/images/image2.jpg', '/assets/images/image3.jpg', '/assets/images/image4.jpg', '/assets/images/image5.jpg'];
const Template = {
    login: 0,
    signup: 1
};

const LoginScreen = () => {
    const { clearErrorMessage, state: { animTimestamp } } = useContext(AuthContext);
    const [template, setTemplate] = useState(null);

    const showAnimation = useMemo(() => {
        let currentTs = new Date().getTime();
        if (!animTimestamp) return true;
        if (currentTs > (animTimestamp + 30 * 60 * 1000)) {
            return true;
        }
        return false;
    }, [animTimestamp]);

    const imageSrc = useMemo(() => {
        return Images[Math.floor(Math.random() * Images.length)];
    }, []);

    const DefaultTemplate = () => (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className={`${styles.image}`}>
                <img
                    src={imageSrc}
                    alt=''
                />
            </div>
            <div className={styles.btnContainer}>
                <button
                    className='sky-btn'
                    onClick={goToLogin}
                >
                    Get in
                </button>
                <button
                    className='sky-btn'
                    onClick={goToSignup}
                >
                    Register
                </button>
            </div>
        </div>
    )

    const goToSignup = () => {
        clearErrorMessage();
        setTemplate(Template.signup);
    }
    const goToLogin = () => {
        clearErrorMessage();
        setTemplate(Template.login);
    }
    const goBack = () => {
        clearErrorMessage();
        setTemplate(null);
    }

    const getTemplate = () => {
        switch (template) {
            case Template.login: return <Login goToSignup={goToSignup} goBack={goBack} />
            case Template.signup: return <Signup goToLogin={goToLogin} goBack={goBack} />
            default: return <DefaultTemplate />
        }
    }

    if (showAnimation) {
        return <CustomAnimation />
    }

    return (
        <div className={styles.container}>
            <div className={`container`}>
                {getTemplate()}
            </div>
        </div>
    )
};

export default LoginScreen;