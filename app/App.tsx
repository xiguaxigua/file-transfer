import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}
