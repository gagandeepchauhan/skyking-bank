import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.css';

const AuthForm = ({
    title,
    onSubmit,
    goBack,
    linkText,
    onLinkClick,
    errorMessage
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        onSubmit({ email: email?.toLowerCase(), password }, () => {
            setLoading(false);
            navigate('/dashboard');
        }, () => {
            setLoading(false);
        });
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>
                <button
                    className='sky-round-btn mb-4'
                    onClick={goBack}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                {title}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className='sky-input'
                    placeholder='Type Email'
                    type='email'
                    value={email}
                    required
                    onChange={({ target }) => setEmail(target.value)}
                />
                <input
                    className='sky-input'
                    placeholder='Type Password'
                    type='password'
                    value={password}
                    required
                    onChange={({ target }) => setPassword(target.value)}
                />
                <button
                    className='sky-round-btn mt-2'
                    type='submit'
                    disabled={loading}
                >
                    {loading
                        ? <div className="spinner-border spinner-border-sm" style={{ color: 'var(--primary-text-color)' }} role="status">
                            <span className="sr-only"></span>
                        </div>
                        : <i className="fa-solid fa-chevron-right"></i>
                    }
                </button>
            </form>
            <span
                className='sky-link'
                onClick={onLinkClick}
            >
                {linkText}
            </span>
            {errorMessage &&
                <span className='sky-error'>
                    <i className="sky-error fa-solid fa-circle-exclamation"></i>
                    &nbsp;
                    {errorMessage}
                </span>
            }
        </div>
    )
};

export default AuthForm;