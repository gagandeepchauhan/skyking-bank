import React, { useMemo } from 'react';
import styles from './TransactionItem.module.css';

const TransactionType = {
    DIPOSIT: "deposit",
    WITHDRAW: "withdraw"
};

const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj?.toString()?.substr(0, 21)} ${dateObj?.getHours() >= 12 ? 'PM' : 'AM'}`;
};

const TransactionItem = ({
    data
}) => {

    return (
        <tr className={styles.transactionItem}>
            <td>{getDate(data?.createdAt)}</td>
            <td>{data?.transactionType === TransactionType.DIPOSIT && data?.amount?.toLocaleString()}</td>
            <td>{data?.transactionType === TransactionType.WITHDRAW && data?.amount?.toLocaleString()}</td>
            <td>{data?.balance?.toLocaleString()}</td>
        </tr>
    )
};

export default TransactionItem;