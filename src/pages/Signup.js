import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';

import { AuthContext } from 'context/AuthContext';
import { FetchContext } from 'context/FetchContext';

import Logo from 'components/common/Logo';
import Button from 'components/common/Button';
import Anchor from 'components/common/Anchor';
import Heading from 'components/common/Heading';
import Notyfication from 'components/Notyfication';
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
  padding: 20px;
  margin-top: 30px;
  background: var(--color-background-lighter);
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

const Signup = () => {
  const authContext = useContext(AuthContext);
  const { setAuthState, isAuthenticated } = authContext;

  const { apiAxios } = useContext(FetchContext);

  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [signupLoading, setSignupLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(isAuthenticated);

  useEffect(() => {
    document.title = `Register | DROPBACK`;
  }, []);

  const submitCredentials = async (credentials) => {
    try {
      setSignupLoading(true);
      const { data } = await apiAxios.post('auth/signup', credentials);

      setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setSignupLoading(false);
      const { data } = error.response;
      setSignupError(data.message);
      setSignupSuccess('');
    }
  };

  return (
    <>
      {redirectOnLogin ? <Redirect to="/" /> : null}
      <StyledWrapper>
        <Logo />
        <StyledForm>
          <Heading>Create new account</Heading>

          <Formik
            initialValues={{ login: '', email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.login) {
                errors.login = 'Login is required';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              }
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values) => submitCredentials(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {signupSuccess && (
                  <Notyfication onClose={() => setSignupSuccess(null)} success>
                    {signupSuccess}
                  </Notyfication>
                )}
                {signupError && (
                  <Notyfication onClose={() => setSignupError(null)} error>
                    {signupError}
                  </Notyfication>
                )}
                <StyledFormField
                  type="login"
                  name="login"
                  label="Login"
                  placeholder="Login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  errors={errors.login && touched.login && errors.login}
                />
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
                  <Anchor as={Link} to="/signin">
                    I already have account
                  </Anchor>
                  <Button type="submit" isLoading={signupLoading} disabled={signupLoading}>
                    Register
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

export default Signup;
