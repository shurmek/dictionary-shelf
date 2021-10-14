import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Notifier } from './Notifier';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { Provider } from 'react-redux';
import { store } from '../store';
import { NotifierProvider } from './Notifier';

export const App: React.FC = (): JSX.Element => {

  return (
    <Provider store={store}>
      <NotifierProvider>
        <CssBaseline />
        <Notifier />
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </NotifierProvider>
    </Provider>
  )
}