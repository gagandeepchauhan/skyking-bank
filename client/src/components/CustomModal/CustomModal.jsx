import React from 'react';
import styles from './CustomModal.module.css';

const CustomModal = ({
    children,
    show,
    onHide
}) => {

    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div
                    className={styles.close}
                    onClick={onHide}
                >
                    x
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default CustomModal;