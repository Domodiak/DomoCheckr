import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { PageDoesntExist } from "./pages/PageDoesntExist/PageDoesntExist";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import Cookie from 'js-cookie'

export default function App() {
    const auth = Cookie.get('token') !== undefined

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home auth={auth}/>}/> 
                <Route path='login/' element={<Login auth={auth}/>}/>
                <Route path='register/' element={<Register auth={auth} />}/>
                <Route path='*' element={<PageDoesntExist/>} />
            </Routes>
        </BrowserRouter>
    )
}