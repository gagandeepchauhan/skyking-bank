import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountItem.module.css';



const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj?.toString()?.substr(0, 21)} ${dateObj?.getHours() >= 12 ? 'PM' : 'AM'}`;
};

const AccountItem = ({
    data
}) => {
    const navigate = useNavigate();

    return (
        <tr className={styles.accountItem}>
            <td
                onClick={() => navigate(`/account/${data?._id}`)}
            >
                <span className='sky-link'>{data?.email}</span>
            </td>
            <td>{getDate(data?.createdAt)}</td>
            <td>{data?.balance?.toLocaleString()}</td>
        </tr>
    )
};

export default AccountItem;