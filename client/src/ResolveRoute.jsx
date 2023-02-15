import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context as AuthContext } from "./contexts/AuthContext";
import PageNotFoundScreen from './screens/PageNotFoundScreen';

const ResolveRoute = ({ component: Component, compliment, ...rest }) => {
    const { tryLocalSignin, state: { token } } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tryLocalSignin(() => {
            setLoading(false);
        });
    }, []);

    if (compliment) {
        return token ? <Navigate to={'/dashboard'} /> : <Component />;
    } else {
        return token ? <Component /> : <PageNotFoundScreen />;
    }
};

export default ResolveRoute;