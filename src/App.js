import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { FetchProvider } from 'context/FetchContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'theme/GlobalStyles';
import theme from 'theme/mainTheme';
import { routes } from 'routes';

import Main from 'pages/Main';
import Tactics from 'pages/Tactics';
import Creator from 'pages/Creator';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';

import AppShell from './AppShell';

const AppRoutes = () => (
  <Switch>
    <Route exact path={routes.signin}>
      <Signin />
    </Route>
    <Route exact path={routes.signup}>
      <Signup />
    </Route>
    <Route exact path={routes.home}>
      <AppShell>
        <Main />
      </AppShell>
    </Route>
    <Route path={routes.tactics}>
      <AppShell>
        <Tactics />
      </AppShell>
    </Route>
    <Route path={routes.creator}>
      <AppShell>
        <Creator />
      </AppShell>
    </Route>
  </Switch>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppRoutes />
          </ThemeProvider>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
