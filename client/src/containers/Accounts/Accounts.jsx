import React from 'react';
import AccountItem from '../../components/AccountItem';
import styles from './Accounts.module.css';

const Accounts = ({
    data
}) => {
    return (
        <div>
            <div className={styles.email}>
                {data?.email ?? '_____@_____.___'}
                <span className={`light-text mt-2`}>Banker username</span>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className={styles.accountHead}>
                            <th>Account Holder's Email</th>
                            <th>Created</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.accounts?.map(account => (
                            <AccountItem
                                key={account?._id}
                                data={account}
                            />
                        ))}
                    </tbody>
                </table>
                {!data?.accounts?.length &&
                    <div className='light-text my-2'>
                        No accounts found
                    </div>
                }
            </div>
        </div>
    )
};

export default Accounts;