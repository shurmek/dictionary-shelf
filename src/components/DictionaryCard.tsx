import React, { useState } from 'react';
import Favorite from '@mui/icons-material/Favorite';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { DictionaryInterface } from '../store/reducers/dictionary.reducer';
import { useThunks } from '../hooks/thunks.hook';
import { DeictionarySettings } from './DictionarySettings';


interface DictionaryCardProps {
  dictionary: DictionaryInterface
}

export const DictionaryCard: React.FC<DictionaryCardProps> = ({
  dictionary
}): JSX.Element => {
  const [isFavorite, setFavorite] = useState<boolean>(dictionary.favorite);
  const { dictionaryRemoveThunk } = useThunks()

  const createOnDeleteHandler = (dictionary: DictionaryInterface) =>
    () => dictionaryRemoveThunk(dictionary);

  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 340,
        height: 500
      }}
    >
      <CardHeader
        title={dictionary.title}
        titleTypographyProps={{ variant: "body1" }}
        action={<DeictionarySettings onDelete={createOnDeleteHandler(dictionary)} />}
      />
      <CardMedia
        component="img"
        height="200"
        image={dictionary.img}
      />
      <CardContent sx={{ height: "100%", overflow: "auto" }}>
        <Typography variant="body2" color="text.secondary">
          {dictionary.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <IconButton
          onClick={() => setFavorite(!isFavorite)}
          color={isFavorite ? "primary" : "default"}
          aria-label="add to favorites"
        >
          <Tooltip title={isFavorite ? "убрать из избранных" : "добавить в избранные"}>
            <Favorite color="inherit" />
          </Tooltip>
        </IconButton>
        <Button endIcon={<ArrowForward />} children="Читать" disabled />
      </CardActions>
    </Card>
  )
}