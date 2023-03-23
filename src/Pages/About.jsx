import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    LogOut,
    settingNewToken,
    verifyAccessTokenEachPage,
} from "../Redux/user/user.action";
import { CLEAR_MESSAGE } from "../Redux/user/user.type";

export default function About() {
    const dispatch = useDispatch();
    const { isAuth, pageValidation, errorMessage } = useSelector(
        (store) => store.user
    );

    useEffect(() => {
        if (pageValidation === "Valid Page!") {
            dispatch({ type: CLEAR_MESSAGE });
        }

        if (
            pageValidation === "Access Token Expired!" &&
            errorMessage !== "Refresh Token Expired!"
        ) {
            alert(pageValidation);
            dispatch(settingNewToken());
        } else if (errorMessage === "Refresh Token Expired!") {
            dispatch(LogOut());
        }

        dispatch(verifyAccessTokenEachPage());
    }, [isAuth, dispatch, pageValidation, errorMessage]);

    if (errorMessage === "Refresh Token Expired!") {
        alert(`Error: ${errorMessage}`);
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Heading>
                {pageValidation === "Access Token Expired!" ? "Expired" : "About_Page"}
            </Heading>
        </div>
    );
}
