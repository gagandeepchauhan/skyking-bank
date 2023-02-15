import React from 'react';
import TransactionItem from '../../components/TransactionItem';
import styles from './Transactions.module.css';

const Transactions = ({
    data
}) => {

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr className={styles.transactionHead}>
                        <th>Transaction Date</th>
                        <th>Deposit</th>
                        <th>Withdraw</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(transaction => (
                        <TransactionItem
                            key={transaction?._id}
                            data={transaction}
                        />
                    ))}
                </tbody>
            </table>
            {!data?.length &&
                <div className='light-text my-2'>
                    No transactions found
                </div>
            }
        </div>
    )
};

export default Transactions;