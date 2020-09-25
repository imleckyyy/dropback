import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const localUserInfo = localStorage.getItem('userInfo');
  const localExpiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    expiresAt: localExpiresAt,
    userInfo: localUserInfo ? JSON.parse(localUserInfo) : {},
  });

  const setAuthInfo = ({ userInfo, expiresAt }) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState({
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');

    setAuthState({
      userInfo: {},
      expiresAt: null,
    });

    history.push('/');
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  const isOwner = (id) => {
    return authState.userInfo._id === id;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        isOwner,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthContext, AuthProvider };
