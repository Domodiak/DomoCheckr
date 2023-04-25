import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home.jsx';
import { PageDoesntExist } from "./pages/PageDoesntExist/PageDoesntExist.jsx";
import Login from "./pages/Login/Login.jsx";
import { Logout } from './pages/Logout/Logout.jsx';
import Register from './pages/Register/Register.jsx';
import AuthContext from './utils/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config.js';
import Cookies from 'js-cookie';

export default function App() {
    const [ auth, setAuth ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        axios.get(config.ApiHost + "api/auth/get-user/", {
            headers: {
                Authorization: "Token " + Cookies.get('token')
            }
        })
            .then((response) => { 
                if(response.status == 200) {
                    setAuth(true)
                }
            })
            .finally(() => {setIsLoading(false)})
    }, [])

    if(isLoading) {
        return
    }

    return (
        <AuthContext.Provider value={auth}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/> 
                    <Route path='login/' element={<Login />}/>
                    <Route path='register/' element={<Register />}/>
                    <Route path='logout/' element={<Logout />}/>
                    <Route path='*' element={<PageDoesntExist/>} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}