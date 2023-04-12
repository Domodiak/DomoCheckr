import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { PageDoesntExist } from "./pages/PageDoesntExist/PageDoesntExist";
import Login from "./pages/Login/Login";
import { useState, useEffect } from 'react';
import config from './config'
import Register from './pages/Register/Register';
import axios from 'axios';

function useAuth() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ auth, setAuth ] = useState(false)
    useEffect(() => {
        const fetchData = () => {
            axios.get(config.ApiHost + 'api/auth/check/')
                .then(response => {
                    if(response.status == 200) {
                        setAuth(true)
                    }
                    setIsLoading(false)
                })
                .catch(error => {
                    setIsLoading(false)
            })
        }
        fetchData()
    }, [ axios, config.ApiHost ])
    return [ auth, isLoading ]
}

export default function App() {
    const [ auth, isLoading ] = useAuth()

    if(isLoading) {
        return <div></div>
    }

    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/' element={<Home auth={auth}/>}></Route>
                <Route path='login/' element={<Login auth={auth}/>}></Route>
                <Route path='register/' element={<Register auth={auth} />}></Route>
                <Route path='*' element={<PageDoesntExist/>} />
            </Routes>
        </BrowserRouter>
    )
}