import React, { useState } from "react";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Popover, { PopoverOrigin } from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import { ImageLoadField } from "./ImageLoadField";
import { SxProps } from "@mui/material/node_modules/@mui/system";
import Tooltip from "@mui/material/Tooltip";
import { DictionaryInterface } from "../store/reducers/dictionary.reducer";
import { useDispatch } from "react-redux";
import { TypedDispatch } from "../store";
import { useThunks } from "../hooks/thunks.hook";
import { notificationShow } from "../store/action-creators/notification.action-creators";


interface FloatingAddFormProps {
  sx?: SxProps,
  anchorOrigin?: PopoverOrigin,
  transformOrigin?: PopoverOrigin
}

export const FloatingAddForm: React.FC<FloatingAddFormProps> = ({
  sx,
  anchorOrigin,
  transformOrigin
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const dispatch: TypedDispatch = useDispatch();
  const { dictionaryAddThunk } = useThunks();

  type FormDataInterface = Omit<DictionaryInterface, "id">

  const initialFormData: FormDataInterface = {
    title: "",
    description: "",
    favorite: false,
    img: "https://picsum.photos/600"
  }

  const [formData, setFormData] = useState<FormDataInterface>(initialFormData);


  const initialFormErrors: Record<"title" | "description", boolean> = {
    title: false,
    description: false
  }

  const [formErrors, setFormErrors] = useState<Record<"title" | "description", boolean>>(initialFormErrors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    value.trim() !== '' && setFormErrors({ ...formErrors, [name]: false })
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (): void => {
    const titleNotValid = formData.title.trim() === "";
    const descriptionNotdValid = formData.description.trim() === "";

    if (
      formErrors.title ||
      formErrors.description ||
      titleNotValid || descriptionNotdValid
    ) {
      setFormErrors({ title: titleNotValid, description: descriptionNotdValid })
      const errorMsg = `Ошибка! Не заполненны обязательные поля:${
        (titleNotValid ? " название," : "") +
        (descriptionNotdValid ? " описание" : "")
      }`;

      dispatch(notificationShow(errorMsg, "error"))
      return
    }
    dictionaryAddThunk(formData)
    setAnchorEl(null)
  }

  return (
    <>
      <Fab
        sx={sx}
        color="primary"
        aria-label="добавить справочник"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Tooltip title="добавить справочник" placement="left">
          <Add />
        </Tooltip>
      </Fab>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 464,
            width: 352,
            p: 2
          }}
        >
          <TextField
            variant="standard"
            placeholder="Название"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={formErrors.title}
          />
          <ImageLoadField />
          <TextField
            sx={{ mt: 2 }}
            variant="standard"
            placeholder="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            maxRows={3}
            error={formErrors.description}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            ЗАГРУЗИТЬ
          </Button>
        </Paper>
      </Popover>
    </>
  )
}