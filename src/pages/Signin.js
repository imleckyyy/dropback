import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';

import { AuthContext } from 'context/AuthContext';
import { FetchContext } from 'context/FetchContext';

import Logo from 'components/common/Logo';
import Button from 'components/common/Button';
import Anchor from 'components/common/Anchor';
import Heading from 'components/common/Heading';
import Notyfication from 'components/common/Notyfication';
import FormField from 'components/FormField';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const StyledForm = styled.div`
  display: block;
  width: 100%;
  background: var(--color-background-lighter);
  padding: 20px;
  margin-top: 30px;
`;

const StyledFormField = styled(FormField)`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Signin = () => {
  const authContext = useContext(AuthContext);
  const { setAuthState, isAuthenticated } = authContext;

  const { apiAxios } = useContext(FetchContext);

  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(isAuthenticated);

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await apiAxios.post('auth/signin', credentials);

      setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess('');
    }
  };

  return (
    <>
      {redirectOnLogin ? <Redirect to="/" /> : null}
      <StyledWrapper>
        <Logo />
        <StyledForm>
          <Heading>Sign in</Heading>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              }
              return errors;
            }}
            onSubmit={(values) => submitCredentials(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {loginSuccess && (
                  <Notyfication onClose={() => setLoginSuccess(null)} success>
                    {loginSuccess}
                  </Notyfication>
                )}
                {loginError && (
                  <Notyfication onClose={() => setLoginError(null)} error>
                    {loginError}
                  </Notyfication>
                )}
                <StyledFormField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  errors={errors.email && touched.email && errors.email}
                />
                <StyledFormField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errors={errors.password && touched.password && errors.password}
                />
                <StyledButtonsWrapper>
                  <Anchor as={Link} to="/signup">
                    I don&apos;t have account
                  </Anchor>
                  <Button type="submit" isLoading={loginLoading} disabled={loginLoading}>
                    Login
                  </Button>
                </StyledButtonsWrapper>
              </form>
            )}
          </Formik>
        </StyledForm>
      </StyledWrapper>
    </>
  );
};

export default Signin;
