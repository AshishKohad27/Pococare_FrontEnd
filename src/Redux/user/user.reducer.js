import axios from "axios";
import {
    CHECKING_ACCESS_TOKEN,
    CLEAR_MESSAGE,
    ERROR_MESSAGE,
    GET_DETAILS_FROM_TOKEN,
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_NEW_TOKEN_WITH_REFRESH_TOKEN,
    SIGNUP_ERROR,
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
} from "./user.type";
const access_token = localStorage.getItem("access_token");
const refresh_token = localStorage.getItem("refresh_token");
if (access_token) {
    axios.defaults.headers.common["authorization_access"] = access_token;
}
if (refresh_token) {
    axios.defaults.headers.common["authorization_refresh"] = refresh_token;
}

const initState = {
    isAuth: !!access_token,
    token: access_token,
    refresh_token: refresh_token,
    loading: false,
    error: false,
    tokenDetails: [],
    message: "",
    user: [],
    errorMessage: "",
    pageValidation: "",
};

export const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("access_token", payload.access_token);
            delete axios.defaults.headers.common["authorization_access"];
            axios.defaults.headers.common["authorization_access"] =
                payload.access_token;

            localStorage.setItem("refresh_token", payload.refresh_token);
            delete axios.defaults.headers.common["authorization_refresh"];
            axios.defaults.headers.common["authorization_refresh"] =
                payload.refresh_token;

            return {
                ...state,
                isAuth: true,
                token: payload.access_token,
                loading: false,
                error: false,
                message: payload.message,
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: payload.message,
            };
        }
        case SIGNUP_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                message: payload.message,
                user: payload.data,
            };
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: payload.message,
            };
        }

        case CLEAR_MESSAGE: {
            return {
                ...state,
                message: "",
                user: [],
                errorMessage: "",
            };
        }

        case GET_DETAILS_FROM_TOKEN: {
            return {
                ...state,
                tokenDetails: payload,
                loading: false,
                error: false,
            };
        }

        case CHECKING_ACCESS_TOKEN: {
            return {
                ...state,
                pageValidation: payload.message,
            };
        }

        case ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: payload.message,
            };
        }

        case SET_NEW_TOKEN_WITH_REFRESH_TOKEN: {
            console.log("SET_NEW_TOKEN_WITH_REFRESH_TOKEN:", payload.access_token);
            localStorage.setItem("access_token", payload.access_token);
            delete axios.defaults.headers.common["authorization_access"];
            axios.defaults.headers.common["authorization_access"] =
                payload.access_token;

            return {
                ...state,
                token: payload.access_token,
                message: payload.message,
                pageValidation: "",
            };
        }

        case LOGOUT: {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            delete axios.defaults.headers.common["authorization_access"];
            delete axios.defaults.headers.common["authorization_refresh"];

            return {
                ...state,
                isAuth: false,
            };
        }

        default: {
            return state;
        }
    }
};
