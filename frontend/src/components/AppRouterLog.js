import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { authRoutes } from "../routes";
import SideBar from './sidebar/SideBar';
import NotFound from '../pages/NotFound';

import "../assets/style/log.css";

const AppRouter = () => {
    const [sideBarActive, setSideBarActive] = useState(true)

    return (
        <>
            <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} />
            <Routes>
                {authRoutes.map((el) =>
                    <Route path={el.path} element={<el.Component sideBarActive={sideBarActive} setSideBarActive={setSideBarActive} />} exact key={el.path} />
                )}
                <Route path='*' element={<NotFound />} exact />
            </Routes>
        </>
    );
};

export default AppRouter;