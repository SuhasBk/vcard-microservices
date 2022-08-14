import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AlertProvider } from './alert/AlertContext';
import AlertPopup from './alert/AlertPopup';
import UserService from './auth/UserService';
import EditCard from './editcard/EditCard';
import Header from './header/Header';
import Home from './home/Home';
import MyCards from './home/mycards/MyCards';
import './index.css';
import Login from './login/Login';
import Profile from './profile/Profile';
import Registration from './registration/Registration';
import Protected from './route-guard/Protected';

ReactDOM.createRoot(document.getElementById('root'))
.render(
    <AlertProvider>
        <BrowserRouter>
            <Header></Header>
            <AlertPopup />
            <Routes> 
                <Route path='/' element={
                    <Protected isLoggedIn={UserService.isLoggedIn()}><Home /></Protected>
                }></Route>

                <Route path='/dashboard' element={
                    <Protected isLoggedIn={UserService.isLoggedIn()}><Home /></Protected>
                }></Route>

                <Route path='/profile' element={
                    <Protected isLoggedIn={UserService.isLoggedIn()}><Profile /></Protected>
                }></Route>

                <Route path='/mycards' element={
                    <Protected isLoggedIn={UserService.isLoggedIn()}><MyCards /></Protected>
                }></Route>

                <Route path='/editcard' element={
                    <Protected isLoggedIn={UserService.isLoggedIn()}><EditCard /></Protected>
                }></Route>

                <Route path='/signin' element={<Login />}></Route>

                <Route path='/register' element={<Registration />}></Route>

                <Route
                path="*"
                element={<>Page Not Found</>}
                />
            </Routes>
        </BrowserRouter>
    </AlertProvider>
);