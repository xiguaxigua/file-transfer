import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { createHashHistory } from 'history';
import App from './App';
import './app.global.css';

const history = createHashHistory();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Router history={history}>
        <App />
      </Router>
    </AppContainer>,
    document.getElementById('root')
  )
);
