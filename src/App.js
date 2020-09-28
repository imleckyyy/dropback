import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, AuthContext } from 'context/AuthContext';
import { FetchProvider } from 'context/FetchContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'theme/GlobalStyles';
import theme from 'theme/mainTheme';
import { routes } from 'routes';

import Main from 'pages/Main';
import Tactics from 'pages/Tactics';
import Tactic from 'pages/Tactic';
import Creator from 'pages/Creator';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';

import AppShell from './AppShell';

const AppShellRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={() => <AppShell>{children}</AppShell>} />;
};

const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to={routes.signin} />
        )
      }
    />
  );
};

// const AdminRoute = ({ children, ...rest }) => {
//   const authContext = useContext(AuthContext);
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         authContext.isAuthenticated() && authContext.isAdmin() ? (
//           <AppShell>{children}</AppShell>
//         ) : (
//           <Redirect to="/" />
//         )
//       }
//     />
//   );
// };

const AppRoutes = () => (
  <Switch>
    <Route exact path={routes.signin}>
      <Signin />
    </Route>
    <Route exact path={routes.signup}>
      <Signup />
    </Route>
    <AppShellRoute exact path={routes.home}>
      <Main />
    </AppShellRoute>
    <AppShellRoute path={routes.tactics}>
      <Tactics />
    </AppShellRoute>
    <AppShellRoute path={routes.tactic}>
      <Tactic />
    </AppShellRoute>
    <AuthenticatedRoute exact path={routes.creator}>
      <Creator />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path={routes.edit}>
      <Creator />
    </AuthenticatedRoute>
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

AppShellRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
