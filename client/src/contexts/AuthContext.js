import createDataContext from "./createDataContext";
import api from "../api";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "add_anim_timestamp":
            return { ...state, animTimestamp: action.payload };
        case "signin":
            return { ...state, errorMessage: '', token: action.payload };
        case "clear_error_message":
            return { ...state, errorMessage: '' };
        case "signout":
            return { ...state, errorMessage: '', token: null };
        default:
            return state;
    }
};

const signup = dispatch => async ({ email, password }, success, error) => {
    try {
        const response = await api.post('/signup', {
            email,
            password
        });
        const { token } = response.data;
        const data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
        data.token = token;
        localStorage.setItem('skyking-bank', JSON.stringify(data));
        dispatch({
            type: "signin",
            payload: token
        });
        if (success) success();
    } catch (err) {
        // console.log(err);
        dispatch({
            type: "add_error",
            payload: err?.response?.data?.error || "Something went wrong"
        });
        if (error) error();
    }
};

const signin = dispatch => async ({ email, password }, success, error) => {
    try {
        const response = await api.post('/signin', {
            email,
            password
        });
        const { token } = response.data;
        const data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
        data.token = token;
        localStorage.setItem('skyking-bank', JSON.stringify(data));
        dispatch({
            type: "signin",
            payload: token
        });
        if (success) success();
    } catch (err) {
        // console.log(err);
        dispatch({
            type: "add_error",
            payload: err?.response?.data?.error || "Something went wrong"
        });
        if (error) error();
    }
};

const signout = dispatch => async (callback) => {
    try {
        const data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
        delete data?.token;
        localStorage.setItem('skyking-bank', JSON.stringify(data));
    } catch (e) {
        localStorage.removeItem('skyking-bank');
    }
    dispatch({
        type: "signout"
    });
    if (callback) callback();
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: "clear_error_message" });
};

const tryLocalSignin = dispatch => async (callback) => {
    try {
        const data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
        const token = data?.token;
        if (token) {
            dispatch({
                type: "signin",
                payload: token
            });
        }
    } catch (err) {
        // console.log("ERROR IN GETTING LOCALSTORAGE DATA", err);
    } finally {
        if (callback) callback();
    }
};

const addAnimTimestamp = dispatch => (callback) => {
    const ts = new Date().getTime();
    let data = {}
    try {
        data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
    } catch (e) {
        data = {};
    }
    data.animTimestamp = ts;
    localStorage.setItem('skyking-bank', JSON.stringify(data));
    dispatch({
        type: "add_anim_timestamp",
        payload: ts
    });
    if (callback) callback();
}

const getAnimTimestamp = () => {
    try {
        const data = JSON.parse(localStorage.getItem("skyking-bank") || '{}');
        return data.animTimestamp;
    } catch (e) {
        return null;
    }
}

const initialValue = {
    token: null,
    errorMessage: '',
    animTimestamp: getAnimTimestamp()
}

export const { Context, Provider } = createDataContext(
    authReducer,
    { signin, signup, signout, clearErrorMessage, tryLocalSignin, addAnimTimestamp },
    initialValue
);