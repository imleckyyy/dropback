import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import Button from 'components/common/Button';

const StyledWrapper = styled.form`
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  flex: 1;
  min-height: 70px;
  border: 1px solid ${({ theme }) => theme.darkGray};
  background: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.fontColor.light};
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
  outline: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.lightGray};
  }
`;

const StyledSearchButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
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
            placeholder="Search for tactics (eg. 433, airjapes, etc.)"
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
