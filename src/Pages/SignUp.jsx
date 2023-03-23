import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { postSign } from '../Redux/user/user.action';
import { CLEAR_MESSAGE } from '../Redux/user/user.type';
// import { postSign } from '../redux/user/user.action';
const initialState = {
    email: "",
    password: ""
}
export default function SignUp() {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const { message } = useSelector((store) => store.user);

    useEffect(() => {
        if (message === "User With this Email Already Exists") {
            form.email = "";
            form.password = "";
            alert(message);
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [message, form, dispatch]);


    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form, [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            alert("Please Fill All Details");
        }
        // console.log("email:", form.email, "password:", form.password)
        dispatch(postSign(form))
    }

    const { email, password } = form;


    if (message === "User With this Email Already Exists") {
        return <Navigate to="/login" />
    } else
        return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}

            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>SignIn to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}

                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="text"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        )
}