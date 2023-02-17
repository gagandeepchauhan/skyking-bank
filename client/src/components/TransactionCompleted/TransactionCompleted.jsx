import React from 'react';
import styles from './TransactionCompleted.module.css';

const TransactionCompleted = () => {
    return (
        <div className='sky-success'>
            <i className="sky-success fa-regular fa-circle-check"></i>
            &nbsp;
            Transaction completed!
        </div>
    )
};

export default TransactionCompleted;