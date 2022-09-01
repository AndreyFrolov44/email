import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AppRouter from './components/AppRouter';
import AppRouterLog from './components/AppRouterLog';
import { Context } from '.';

import './assets/style/fonts.css';
import './assets/style/reset.css';

const App = () => {
  const { user } = useContext(Context)

  useEffect(() => {
    console.log(user.isAuth, user)
  }, [user])

  return (
    <>
      <BrowserRouter>
        {
          user.isAuth ?
            <AppRouterLog />
            :
            <AppRouter />
        }
      </BrowserRouter>
    </>

  )
}

export default observer(App);
