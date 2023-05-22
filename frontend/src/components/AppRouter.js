import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { publicRoutes } from "../routes";

import '../assets/style/main.css';
import NotFound from '../pages/NotFound';
import Header from './header/Header';

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route path={path} element={Component} exact key={path} />
                )}
                <Route path='*' element={<NotFound />} exact />
            </Routes>
        </>
    );
};

export default AppRouter;