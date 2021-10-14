import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { DeictionarySettings } from './DictionarySettings';
import { DictionaryInterface } from '../store/reducers/dictionary.reducer';
import { useThunks } from '../hooks/thunks.hook';
import Box from '@mui/material/Box';

interface DictionaryRowProps {
  dictionary: DictionaryInterface,
}

export const DictionaryRow: React.FC<DictionaryRowProps> = (
  { dictionary }
): JSX.Element => {
  const [isFavorite, setFavorite] = useState<boolean>(dictionary.favorite);

  const { dictionaryRemoveThunk } = useThunks()

  const createOnDeleteHandler = (dictionary: DictionaryInterface) =>
    () => dictionaryRemoveThunk(dictionary);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        mt: 2,
        px: 2,
        py: 1
      }}
    >
      <IconButton
        onClick={() => setFavorite(!isFavorite)}
        sx={{ mr: 2 }}
        color={isFavorite ? "primary" : "default"}
        aria-label="add to favorites"
      >
        <Tooltip title={isFavorite ? "убрать из избранных" : "добавить в избранные"}>
          <Favorite color="inherit" />
        </Tooltip>
      </IconButton>
      <Box flexGrow={1} flexDirection="column">
        <Typography variant="h6">
          {dictionary.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dictionary.description}
        </Typography>
      </Box>
      <Button sx={{ mr: 2 }} disabled>Читать</Button>
      <DeictionarySettings onDelete={createOnDeleteHandler(dictionary)} />
    </Paper>
  )
}