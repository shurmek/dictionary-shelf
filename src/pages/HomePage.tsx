import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Appbar } from '../components/Appbar';
import { Page } from '../components/Page';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Toolbar, ViewControlValues } from '../components/Toolbar';
import Favorite from '@mui/icons-material/Favorite';
import { DictionaryInterface } from '../store/reducers/dictionary.reducer';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import Grid from "@mui/material/Grid";
import { DictionaryCard } from "../components/DictionaryCard";
import { DictionaryRow } from "../components/DictionaryRow";


/**DEMO */
const dictionaries: DictionaryInterface[] = [
  {
    "id": "51225c90-5e41-4e57-9a42-1b207f6f39cc",
    "title": "Никте не вправе осуждать печальный плач оппозиции",
    "description": "Каждый из нас понимает очевидную вещь: экономическая повестка сегодняшнего дня обеспечивает актуальность системы массового участия.",
    "img": "https://picsum.photos/600",
    "favorite": true
  },
  {
    "id": "b5d4f749-c8c2-470e-8fd4-53f8c7cac013",
    "title": "Сложно сказать, почему выбранный нами инновационный путь не стал ограничивающим фактором",
    "description": "С учётом сложившейся международной обстановки, высококачественный прототип будущего проекта не даёт нам иного выбора, кроме определения модели развития.",
    "img": "https://picsum.photos/600",
    "favorite": true
  },
  {
    "id": "652aadcb-f31c-40e2-b359-fefb64150891",
    "title": "Прототип нового сервиса - это как шопот бессменных лидеров",
    "description": "Современные технологии достигли такого уровня, что начало повседневной работы по формированию позиции предоставляет широкие возможности для глубокомысленных рассуждений.",
    "img": "https://picsum.photos/600",
    "favorite": true
  },
  {
    "id": "d5d0f5d2-b22d-4f06-9306-4597a9347240",
    "title": "Независимые СМИ потому и независимы, что частокол на границе починят",
    "description": "Сложившаяся структура организации требует определения и уточнения системы обучения кадров, соответствующей насущным потребностям.",
    "img": "https://picsum.photos/600",
    "favorite": true
  },
]


export const HomePage: React.FC = (): JSX.Element => {
  const [viewType, setViewType] = useState<ViewControlValues>("list");
  const [searchText, setSearchText] = useState<string>("");

  return (
    <Page>
      <Appbar />
      <Container>
        <Toolbar
          viewControl={{ value: viewType, onChange: (e, value) => setViewType(value) }}
          searchControl={{ value: searchText, onChange: (e) => setSearchText(e.target.value) }}
        />
        <Box display="flex" alignItems="center" padding={2}>
          <Favorite color="action" fontSize="large" sx={{ mr: 2 }} />
          <Typography variant="h5" color="text.secondary">Избранные</Typography>
        </Box>
      </Container>
      <Container sx={{ flexGrow: 1 }}>
        {viewType === "list" ? (
          <Virtuoso
            data={dictionaries}
            itemContent={(index, item) => (
              <DictionaryRow key={item.id} dictionary={item} />
            )}
          />
        ) : (
          <VirtuosoGrid
            totalCount={dictionaries.length}
            components={{
              List: React.forwardRef((props, ref) => <Grid {...props} ref={ref} container spacing={4} />),
              Item: (props) => <Grid {...props} item />
            }}
            itemContent={(index) => (
              <DictionaryCard key={dictionaries[index].id} dictionary={dictionaries[index]} />
            )}
          />
        )}
      </Container>
    </Page>
  )
}