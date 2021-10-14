import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { AuthPage } from '../pages/AuthPage';
import { DictionaryPage } from '../pages/DictionaryPage';
import { HomePage } from '../pages/HomePage';
import { useTypedSelector } from '../hooks/typed-selector.hook';


export const Routes: React.FC = (): JSX.Element => {
  const { auth } = useTypedSelector(state => state)

  return !auth?.token ? (
    <Switch>
      <Route exact path="/login" component={AuthPage} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/dictionary" component={DictionaryPage} />
      <Redirect to="/dictionary" />
    </Switch>
  )
}