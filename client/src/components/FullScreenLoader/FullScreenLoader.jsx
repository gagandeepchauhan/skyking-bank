import React from 'react';
import styles from './FullScreenLoader.module.css';

const FullScreenLoader = () => {
    return (
        <div className={styles.loadContainer}>
            <div className={styles.loadText}>
                Loading...
            </div>
        </div>
    )
};

export default FullScreenLoader;