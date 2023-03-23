import axios from "axios";
import {
    CHECKING_ACCESS_TOKEN,
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

// Signup
export const postSign = (payload) => async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    try {
        let res = await axios.post(`http://localhost:7878/auth/signup`, payload);
        console.log('res:', res.data);
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: SIGNUP_ERROR });
    }
};

//Login
export const postLogin = (payload) => async (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    try {
        let res = await axios.post(`http://localhost:7878/auth/login`, payload);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (e) {
        console.log('e:', e.response.data.messages)
        dispatch({ type: LOGIN_ERROR });
    }
};

//Verify token and get result
export const getDetailsFromToken = (payload) => async (dispatch) => {
    try {
        let res = await axios.post(`http://localhost:7878/auth/verify`, payload);
        dispatch({ type: GET_DETAILS_FROM_TOKEN, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data })
        console.log("error from postVerify:", e.response.data);
    }
};

// Checking Token 
export const verifyAccessTokenEachPage = () => async (dispatch) => {
    try {
        let res = await axios.get(`http://localhost:7878/auth/page`);
        dispatch({ type: CHECKING_ACCESS_TOKEN, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data })
        console.log("Error Message From Verify Page:", e.response.data);
    }
};

//Refresh Token 
export const settingNewToken = () => async (dispatch) => {
    try {
        let res = await axios.post(`http://localhost:7878/auth/refresh`);
        dispatch({ type: SET_NEW_TOKEN_WITH_REFRESH_TOKEN, payload: res.data });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data })
        console.log("Error Message From Verify Page:", e.response.data);
    }
}

//LOGOUT
export const LogOut = () => async (dispatch) => {
    try {
        await axios.post(`http://localhost:7878/auth/logout`);
        dispatch({ type: LOGOUT });
    } catch (e) {
        dispatch({ type: ERROR_MESSAGE, payload: e.response.data })
        console.log("Error Message From Verify Page:", e.response.data);
    }
}