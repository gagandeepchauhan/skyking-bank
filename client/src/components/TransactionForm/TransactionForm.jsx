import React from 'react';
import { useState } from 'react';
import styles from './TransactionForm.module.css';
import { Context as UserDataContext } from '../../contexts/UserDataContext';
import { useContext } from 'react';
import TransactionCompleted from '../TransactionCompleted';

const TransactionForm = ({
    transactionType
}) => {
    const { transact, fetchUserData } = useContext(UserDataContext);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        transact({
            transactionType,
            amount
        }, (status, message) => {
            if (status === 201) {
                setCompleted(true);
                fetchUserData();
            } else {
                setError(message);
            }
            setLoading(false);
        })
    };

    if (completed) {
        return <TransactionCompleted />
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>{transactionType}</div>
            <form onSubmit={handleSubmit}>
                <input
                    className='sky-input'
                    placeholder='Enter amount'
                    type='number'
                    value={amount}
                    required
                    onChange={({ target }) => setAmount(target.value)}
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
            {error &&
                <span className='sky-error mt-3'>
                    <i className="sky-error fa-solid fa-circle-exclamation"></i>
                    &nbsp;
                    {error}
                </span>
            }
        </div>
    )
};

export default TransactionForm;