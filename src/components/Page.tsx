import React from 'react';
import Box from "@mui/material/Box";

export const Page: React.FC = ({ children }): JSX.Element => (
  <Box sx={{
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column"
  }}>
    {children}
  </Box>
)