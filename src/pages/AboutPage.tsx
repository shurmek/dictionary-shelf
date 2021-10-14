import React from 'react';
import Container from '@mui/material/Container';
import { Appbar } from '../components/Appbar';
import { Page } from '../components/Page';
import Typography from '@mui/material/Typography';

export const AboutPage: React.FC = (): JSX.Element => {

  return (
    <Page>
      <Appbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">
          О приложении
        </Typography>
        <Typography variant="subtitle1">v 1.0</Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Разработано при подержке нервных клеток и кофеина.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          - Используйте готовую базу из 10 тысяч словарей;<br />
          - Добавляйте собственные;<br />
          - Ищите книги с помощью быстрого и удобного поиска;
        </Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Когда-нибудь в следующей жизни...
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          - Разработаем добавление в избранные; <i>(P.S. на главной страничке ничего не работает)</i><br />
          - Разработаем к историю просмотров; <br />
          - Вы сможете их читать; <br />
          - Картинки будут разные (но это не точно);
        </Typography>
      </Container>
    </Page>
  )
}