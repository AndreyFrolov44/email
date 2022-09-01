import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { authRoutes } from "../routes";
import { LOG_CONTACTS } from '../utils/consts';
import SideBar from './sidebar/SideBar';

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
                <Route path="*" element={<Navigate replace to={LOG_CONTACTS} />} />
            </Routes>
        </>
    );
};

export default AppRouter;