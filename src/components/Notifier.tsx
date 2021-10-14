import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useTypedSelector } from "../hooks/typed-selector.hook";

export const Notifier: React.FC = (): null => {
  const { notification } = useTypedSelector(state => state)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, {
        variant: notification.type
      })
    }
  }, [notification])

  return null
}


export const NotifierProvider: React.FC = ({ children }): JSX.Element => (
  <SnackbarProvider
    anchorOrigin={{
      horizontal: "left",
      vertical: "bottom"
    }}
    maxSnack={5}
  >
    {children}
  </SnackbarProvider>
)