import Box from '@mui/material/Box';
import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { Page } from '../components/Page';

import sample from './sample.mp4';

export const AuthPage: React.FC = (): JSX.Element => {
  return (
    <Page>
      <video className="video_bg" autoPlay loop muted preload="auto" style={{ height: "100%", width: "100%", objectFit: "cover" }}>
        <source src={sample} type="video/mp4" />
      </video>
      <Box sx={{
        position: 'absolute',
        top: 64,
        right: 64
      }}>
        <AuthForm />
      </Box>
    </Page>
  )
}