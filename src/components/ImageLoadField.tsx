import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';


interface ImageLoadFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, file: File) => any
};

export const ImageLoadField: React.FC<ImageLoadFieldProps> = ({ onChange }): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const acceptTypes = "image/png, image/jpg, image/jpeg";
  const root = React.useRef<HTMLInputElement | null>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      !acceptTypes.includes(e.target.files[0].type)
    ) {
      setSelectedFile(undefined);
      return;
    }

    onChange && onChange(e, e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, .1)",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(0, 0, 0, .3)",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, .15)",
          transition: "background-color .1s ease-in"
        }
      }}
      onClick={() => root.current?.click()}
    >
      <input
        onChange={onSelectFile}
        ref={root}
        hidden
        type="file"
        accept={acceptTypes}
      />
      {selectedFile && <img src={preview} height="100%" alt="loaded image" />}
      <Typography sx={{ position: "absolute" }} color="GrayText">Загрузить обложку</Typography>
    </Box>
  );
};