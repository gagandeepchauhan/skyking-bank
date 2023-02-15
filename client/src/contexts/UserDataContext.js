import createDataContext from "./createDataContext"
import api from "../api";

const userDataReducer = (state, action) => {
    switch (action.type) {
        case "set_user_data":
            return { errorMessage: '', userData: action.payload };
        case "set_account_data":
            return { errorMessage: '', accountData: action.payload };
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "reset":
            return { errorMessage: '', userData: null, accountData: null };
        default:
            return state;
    }
};

const fetchUserData = dispatch => async (callback) => {
    try {
        const response = await api.get('/get-user-data');
        dispatch({
            type: "set_user_data",
            payload: response.data
        });
        if (callback) callback(response.status);
    } catch (err) {
        console.log(err);
        dispatch({
            type: "add_error",
            payload: err?.response?.data?.error || "Unable to fetch user data"
        });
        if (callback) callback(err?.response.status);
    }
};

const fetchAccountData = dispatch => async (id, callback) => {
    try {
        const response = await api.get(`/get-account-data/${id}`);
        dispatch({
            type: "set_account_data",
            payload: response.data
        });
        if (callback) callback(response.status);
    } catch (err) {
        console.log(err);
        dispatch({
            type: "add_error",
            payload: err?.response?.data?.error || "Unable to fetch user data"
        });
        if (err?.response.status === 404) {
            dispatch({
                type: "set_account_data",
                payload: null
            });
        }
        if (callback) callback(err?.response.status);
    }
};

const transact = dispatch => async ({ transactionType, amount }, callback) => {
    try {
        const response = await api.post(`/transaction`, {
            transactionType,
            amount
        });
        if (callback) callback(response.status);
    } catch (err) {
        console.log(err);
        if (callback) callback(err?.response?.status, err?.response?.data?.error);
    }
};

const reset = dispatch => () => {
    dispatch({
        type: "reset"
    });
};

const initialValue = {
    errorMessage: '',
    userData: null,
    accountData: null
};

export const { Context, Provider } = createDataContext(
    userDataReducer,
    { fetchUserData, fetchAccountData, reset, transact },
    initialValue
);