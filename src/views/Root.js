import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';

import MainView from 'views/MainView';
import TacticsView from 'views/TacticsView';

function Root() {
  return (
    <MainTemplate>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="/tactics" component={TacticsView} />
        </Switch>
      </BrowserRouter>
    </MainTemplate>
  );
}

export default Root;
