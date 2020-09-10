import React, { useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FetchContext = createContext();
const { Provider } = FetchContext;

const API_URL = '/api';

const FetchProvider = ({ children }) => {
  const apiAxios = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await apiAxios.get('/csrf-token');
      apiAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };
    getCsrfToken();
  }, [apiAxios]);

  return (
    <Provider
      value={{
        apiAxios,
      }}
    >
      {children}
    </Provider>
  );
};

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { FetchContext, FetchProvider };
