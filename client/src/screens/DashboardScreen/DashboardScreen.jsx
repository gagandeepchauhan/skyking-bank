import React, { useEffect, useContext, useState } from 'react';
import { Context as UserDataContext } from '../../contexts/UserDataContext';
import { Context as AuthContext } from '../../contexts/AuthContext';
import AccountInfo from '../../containers/AccountInfo';
import Accounts from '../../containers/Accounts';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardScreen.module.css';
import { useCallback } from 'react';

const UserType = {
    CUSTOMER: "customer",
    BANKER: "banker"
};

const DashboardScreen = () => {
    const { state: { userData }, fetchUserData, reset } = useContext(UserDataContext);
    const { signout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        signout();
        reset();
        navigate('/');
    };

    const fetchUser = useCallback(() => {
        setLoading(true);
        fetchUserData((status) => {
            if (status === 200) {
                setLoading(false);
            } else {
                logout();
            }
        })
    }, [fetchUserData]);

    useEffect(() => {
        fetchUser();
    }, []);

    const getView = () => {
        switch (userData.userType) {
            case UserType.CUSTOMER:
                return <AccountInfo data={userData} />;
            case UserType.BANKER:
                return <Accounts data={userData} />;
            default:
                return null;
        }
    };

    if (loading) {
        return <FullScreenLoader />
    }

    return (
        <div className={`${styles.dashboard} container py-3 mt-5`}>
            <div
                className={styles.logout}
                onClick={logout}
            >
                <button className='sky-round-btn'>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
            {getView()}
        </div>
    )
};

export default DashboardScreen;