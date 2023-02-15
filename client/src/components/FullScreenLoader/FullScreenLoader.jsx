import React from 'react';
import styles from './FullScreenLoader.module.css';

const FullScreenLoader = () => {
    return (
        <div className={styles.loadContainer}>
            <div className='text-center'>
                <div className={`${styles.loader} spinner-border mb-2`} role="status">
                    <span className="sr-only"></span>
                </div>
                <div className={styles.loadText}>
                    Loading...
                </div>
            </div>
        </div>
    )
};

export default FullScreenLoader;