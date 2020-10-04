import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

const StyledWrapper = styled.form`
  display: flex;
  width: 100%;
`;

const StyledInput = styled(Input)`
  flex: 1;
  min-height: 70px;
  padding: 20px;
  background: var(--color-background-lighter);
  font-size: var(--font-size-s);

  &::placeholder {
    color: var(--color-text);
  }
`;

const StyledSearchButton = styled(Button)`
  font-size: var(--font-size-s);
`;

const SearchBar = () => {
  const history = useHistory();

  const submitFn = (value) => {
    history.push(`/tactics?text=${value}`);
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={({ text }) => submitFn(text)}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <StyledWrapper autoComplete="off" onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Search by tags (eg. 433, airjapes, etc.)"
            name="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text}
          />
          <StyledSearchButton type="submit">Search</StyledSearchButton>
        </StyledWrapper>
      )}
    </Formik>
  );
};

export default SearchBar;
