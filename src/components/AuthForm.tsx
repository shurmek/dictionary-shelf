import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AuthFormDataInterface, AuthFormDataKeys } from '../store/thunks/auth.thunks';
import InputAdornment from '@mui/material/InputAdornment';
import Person from '@mui/icons-material/Person';
import { PasswordField } from './PasswordField';
import { TypedDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { useThunks } from '../hooks/thunks.hook';
import { notificationShow } from '../store/action-creators/notification.action-creators';
import Button from '@mui/material/Button';

export const AuthForm: React.FC = (): JSX.Element => {
  const dispatch: TypedDispatch = useDispatch();
  const { authLoginThunk } = useThunks();

  const initialFormData: AuthFormDataInterface = {
    [AuthFormDataKeys.USERNAME]: "",
    [AuthFormDataKeys.PASSWORD]: ""
  }
  const [formData, setFormData] = useState<AuthFormDataInterface>(initialFormData);

  const initialFormErrors: Record<AuthFormDataKeys, boolean> = {
    [AuthFormDataKeys.USERNAME]: false,
    [AuthFormDataKeys.PASSWORD]: false
  }
  const [formErrors, setFormErrors] = useState<Record<AuthFormDataKeys, boolean>>(initialFormErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    value.trim() !== '' && setFormErrors({ ...formErrors, [name]: false })
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (): void => {
    const usernameNotValid = formData[AuthFormDataKeys.USERNAME].trim() === "";
    const passwornNotdValid = formData[AuthFormDataKeys.PASSWORD].trim() === "";

    if (
      formErrors[AuthFormDataKeys.USERNAME] ||
      formErrors[AuthFormDataKeys.PASSWORD] ||
      usernameNotValid || passwornNotdValid
    ) {
      setFormErrors({
        [AuthFormDataKeys.USERNAME]: usernameNotValid,
        [AuthFormDataKeys.PASSWORD]: passwornNotdValid
      })
      dispatch(notificationShow("Заполните форму!", "error"))
      return
    }
    authLoginThunk(formData)
  }

  return (
    <Paper elevation={3} sx={{
      width: 400,
      height: 368,
      padding: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <Typography variant="h4" align="center">
        DICTIONARY SHELF
      </Typography>
      <TextField
        variant="standard"
        label="Имя пользователя"
        name={AuthFormDataKeys.USERNAME}
        value={formData[AuthFormDataKeys.USERNAME]}
        onChange={handleChange}
        placeholder="example@bravosoft.nnov.ru"
        error={formErrors[AuthFormDataKeys.USERNAME]}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person color={formErrors[AuthFormDataKeys.USERNAME] ? "error" : "primary"} />
            </InputAdornment>
          )
        }}
      />
      <PasswordField
        variant="standard"
        label="Пароль"
        name={AuthFormDataKeys.PASSWORD}
        value={formData[AuthFormDataKeys.PASSWORD]}
        onChange={handleChange}
        error={formErrors[AuthFormDataKeys.PASSWORD]}
      />
      <Button onClick={handleSubmit} variant="contained">
        ВОЙТИ
      </Button>
    </Paper>
  )
}