import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';
import { Logo } from './Logo';
import Home from '@mui/icons-material/Home';
import Book from '@mui/icons-material/Book';
import Info from '@mui/icons-material/Info';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useThunks } from '../hooks/thunks.hook';

export const Appbar: React.FC = (): JSX.Element => {
  const { authLogoutThunk } = useThunks();

  const buttons: ButtonProps[] = [
    { startIcon: <Home />, children: 'Главная', href: '/' },
    { startIcon: <Book />, children: 'Cловари', href: '/dictionaries' },
    { startIcon: <Info />, children: 'О приложени', href: '/about' },
    { startIcon: <ExitToApp />, children: 'Выйти', onClick: () => authLogoutThunk() },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ maxHeight: 64 }}>
        <Box alignSelf="flex-start" sx={{ mr: 2 }}>
          <Logo />
        </Box>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          DICTIONARY SHELF
        </Typography>
        {buttons.map((props, i) =>
          <Button
            key={`ab_link_${i}`}
            color="inherit"
            sx={{ ml: 1 }}
            {...props}
          />
        )}
      </Toolbar>
    </AppBar >
  )
}