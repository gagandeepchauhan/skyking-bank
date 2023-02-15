import React, { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import styles from './AccountScreen.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Context as UserDataContext } from '../../contexts/UserDataContext';
import { Context as AuthContext } from '../../contexts/AuthContext';
import FullScreenLoader from '../../components/FullScreenLoader';
import AccountInfo from '../../containers/AccountInfo';

const AccountScreen = () => {
    const { fetchAccountData, state: { accountData }, reset } = useContext(UserDataContext);
    const { signout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const navigate = useNavigate();
    console.log(userId);

    const fetchAccount = useCallback(() => {
        setLoading(true);
        fetchAccountData(userId, (status) => {
            if (status === 401) {
                signout();
                reset();
                navigate('/');
            }
            else if (status === 403) {
                reset();
                navigate('/dashboard');
            }
            else {
                setLoading(false);
            }
        })
    }, [fetchAccountData, userId]);

    useEffect(() => {
        fetchAccount();
    }, []);

    if (loading) {
        return <FullScreenLoader />
    }

    return (
        <div className={`${styles.accountScreen} container py-3 mt-5`}>
            <AccountInfo
                data={accountData}
                hideActionBtns={true}
            />
        </div>
    )
};

export default AccountScreen;