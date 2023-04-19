import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { PageDoesntExist } from "./pages/PageDoesntExist/PageDoesntExist";
import Login from "./pages/Login/Login";
import { Logout } from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import Cookie from 'js-cookie'
import AuthContext from './utils/AuthContext';

export default function App() {
    const auth = Cookie.get('token') !== undefined

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