import React, { useEffect } from "react";
import LogIn from "../pages/LogIn";
import { Outlet, useNavigate } from "react-router";
import jwtDecode from "jwt-decode";


const auth = () => {
    return localStorage.getItem("loginData")/* .split('"')[1] */;
};
console.log(auth());
const useSession = () => {
    const session = auth();
    console.log(session);
    const decodeSession = session?jwtDecode(session):null
    console.log(decodeSession);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!session){
            navigate("/LogIn", {replace: true})
        }
    }, [navigate, session])

    return decodeSession
};

const ProtectedRoutes = () => {
    const isAuthorized = auth();
   const session = useSession();

    return session?<Outlet/>:<LogIn/>
}

export {ProtectedRoutes}