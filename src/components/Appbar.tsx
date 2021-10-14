import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { Logo } from './Logo';
import Home from '@mui/icons-material/Home';
import Book from '@mui/icons-material/Book';
import Info from '@mui/icons-material/Info';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useThunks } from '../hooks/thunks.hook';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';

export const Appbar: React.FC = React.memo((): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { authLogoutThunk } = useThunks();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const buttons: ButtonProps[] = [
    { startIcon: <Home />, children: 'Главная', href: '/' },
    { startIcon: <Book />, children: 'Cправочники', href: '/dictionary' },
    { startIcon: <Info />, children: 'О приложени', href: '/about' },
    { startIcon: <ExitToApp />, children: 'Выйти', onClick: () => authLogoutThunk() },
  ];

  const renderButton = (props: ButtonProps, i: number) => (
    <Button
      key={`ab_link_${i}`}
      color="inherit"
      sx={{ ml: 1 }}
      {...props}
    />
  )

  return (
    <AppBar position="static">
      <Toolbar sx={{ maxHeight: 64 }}>
        <Box alignSelf="flex-start" sx={{ mr: 2 }}>
          <Logo />
        </Box>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          DICTIONARY SHELF
        </Typography>
        {!matches ? (
          <>
            <IconButton onClick={() => setOpenMenu(true)} color="inherit">
              <Menu color="inherit" />
            </IconButton>
            <Drawer anchor='right' open={openMenu} onClose={() => setOpenMenu(false)}>
              {buttons.map(renderButton)}
            </Drawer>
          </>
        ) : (
          <>{buttons.map(renderButton)}</>
        )}
      </Toolbar>
    </AppBar >
  )
})