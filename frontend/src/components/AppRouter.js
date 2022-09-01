import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { publicRoutes, authRoutes } from "../routes";
import Header from './header/Header';
import Footer from './footer/Footer';

import '../assets/style/main.css';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route path={path} element={Component} exact key={path} />
                )}
                {authRoutes.map(({ path, Component }) =>
                    <Route path={path} element={<Login />} exact key={path} />
                )}
                <Route path='*' element={<NotFound />} exact />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRouter;