import { Routes, Route } from "react-router-dom";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";


export default function AllRoutes() {
    return (
        <Routes>
            <Route
                path="/about"
                element={
                    <PrivateRoute>
                        <About />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contact"
                element={
                    <PrivateRoute>
                        <Contact />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
