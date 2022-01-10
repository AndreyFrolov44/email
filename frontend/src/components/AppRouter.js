import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { publicRoutes } from "../routes";
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from '../pages/Home';

import '../assets/style/main.css';

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route path={path} element={Component} exact key={path} />
                )}
                <Route path='/' element={Home} exact />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRouter;