import React from 'react';
import { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import TransactionForm from '../../components/TransactionForm';
import Transactions from '../Transactions';
import styles from './AccountInfo.module.css';

const TransactionType = {
    DIPOSIT: "deposit",
    WITHDRAW: "withdraw"
};

const getDate = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return `${dateObj?.toString()?.substr(0, 21)} ${dateObj?.getHours() >= 12 ? 'PM' : 'AM'}`;
};

const AccountInfo = ({
    data,
    hideActionBtns
}) => {
    const [showModal, setShowModal] = useState(false);
    const [transactionType, setTransactionType] = useState(null);

    const handleDeposit = () => {
        setTransactionType(TransactionType.DIPOSIT);
        setShowModal(true);
    };
    const handleWithdraw = () => {
        setTransactionType(TransactionType.WITHDRAW);
        setShowModal(true);
    };
    const hideModal = () => {
        setTransactionType(null);
        setShowModal(false);
    };

    return (
        <div>
            <div className={styles.headOptions}>
                <div className={styles.balance}>
                    {data?.balance?.toLocaleString() ?? '__.__'}
                    <span className={styles.abbreviation}>INR</span>
                    <span className='light-text'>current balance</span>
                </div>
                {!hideActionBtns &&
                    <div className={styles.actions}>
                        <button
                            className='sky-btn'
                            onClick={handleDeposit}
                        >
                            Deposit
                        </button>
                        <button
                            className='sky-btn'
                            onClick={handleWithdraw}
                        >
                            Withdraw
                        </button>
                    </div>
                }
            </div>
            <div className={styles.email}>
                {data?.email ?? '_____@_____.___'}
                <span className={`light-text mt-2`}>username</span>
            </div>
            <div className={styles.time}>
                <span>Updated :</span> {getDate(data?.transactions?.[0]?.createdAt) ?? '___ ___ __ ____ __:__ __'}
            </div>
            <Transactions
                data={data?.transactions}
            />
            <CustomModal
                onHide={hideModal}
                show={showModal}
            >
                <TransactionForm
                    transactionType={transactionType}
                />
            </CustomModal>
        </div>
    )
};

export default AccountInfo;