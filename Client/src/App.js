import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { PageDoesntExist } from "./pages/PageDoesntExist/PageDoesntExist";
import Login from "./pages/Login/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/'>
                    <Route index element={<Home/>}></Route>
                    <Route path="login/" element={<Login/>}></Route>
                    <Route path='*' element={<PageDoesntExist/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}