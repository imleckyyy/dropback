import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'theme/GlobalStyles';
import theme from 'theme/mainTheme';

function MainTemplate({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
