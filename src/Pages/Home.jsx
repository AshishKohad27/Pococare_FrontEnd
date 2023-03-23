import { Box, Heading, } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsFromToken } from "../Redux/user/user.action";
import { LOGOUT } from "../Redux/user/user.type";

const SendToken = {
    token: "",
}
export default function Home() {
    const dispatch = useDispatch();
    const { tokenDetails, isAuth, errorMessage } = useSelector((store) => store.user);

    useEffect(() => {
        SendToken.token = axios.defaults.headers.common['authorization_access'];
        dispatch(getDetailsFromToken(SendToken));
    }, [isAuth, dispatch]);

    useEffect(() => {
        if (errorMessage === "Token Expired!") {
            dispatch({ type: LOGOUT })
        }
    }, [dispatch, errorMessage])

    return (
        <Box>
            <Heading>Token:- {tokenDetails.email}</Heading>
            <Heading>Access Token Limit:- 3min (for trial)</Heading>
            <Heading>Refresh Token Limit:- 5min (for trial)</Heading>
        </Box>
    )
}