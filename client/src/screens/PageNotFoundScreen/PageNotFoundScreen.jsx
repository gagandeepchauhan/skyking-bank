import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageNotFoundScreenStyle.module.css';

const PageNotFoundScreen = () => {
    const navigate = useNavigate();
    return (
        <div className={`${styles.pnfScreen} container py-3 mt-5`}>
            <div>
                <div className={styles.title}>
                    Page Not Found
                </div>
                <p className='light-text'>
                    The page you are looking for either does not exist or you are not authenticated well
                </p>
                <button
                    className='sky-btn'
                    onClick={() => navigate('/')}
                >
                    go to valid page
                </button>
            </div>
        </div>
    )
};

export default PageNotFoundScreen;