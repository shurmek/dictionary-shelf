import { Lock, LockOpen } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

export const PasswordField: React.FC<Omit<TextFieldProps, "type">> = (props): JSX.Element => {
  const [visiblePass, setVisiblePass] = useState<boolean>(false);

  return (
    <TextField
      {...props}
      placeholder={props.placeholder || "••••••••"}
      type={visiblePass ? 'text' : 'password'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip
              title={visiblePass ? "Скрыть" : "Показать"}
              aria-label={visiblePass ? "Скрыть" : "Показать"}
            >
              <IconButton
                color="default"
                size="small"
                onClick={() => setVisiblePass(!visiblePass)}
              >
                {visiblePass
                  ? <LockOpen color={props.error ? "error" : "primary"} />
                  : <Lock color={props.error ? "error" : "primary"} />
                }
              </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
    />
  )
}