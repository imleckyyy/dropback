import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import useOutsideClick from 'hooks/useOutsideClick';
import Heading from 'components/common/Heading';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { AuthContext } from 'context/AuthContext';

const StyledWrapper = styled.div`
  display: block;
  width: 80%;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  right: 0%;
  top: 0%;
  background: ${({ theme }) => theme.darkGray};
  color: ${({ theme }) => theme.fontColor.light};
  z-index: 1;
  padding: 20px;
  border-left: 10px solid ${({ theme }) => theme.primary};
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 10px;
`;

const UserSidebar = ({ isVisible, setSidebarVisibility }) => {
  const authContext = useContext(AuthContext);
  const { authState, logout } = authContext;

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isVisible) {
      setSidebarVisibility(false);
    }
  });

  const logoutFn = () => {
    logout();
    setSidebarVisibility(false);
  };

  return (
    <StyledWrapper isVisible={isVisible} ref={ref}>
      <Heading>Welcome {authState.userInfo.login}</Heading>
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
        onSubmit={(values) => console.log(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              errors={errors.email && touched.email && errors.email}
            />
            <StyledInput
              type="password"
              name="password"
              label="Password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              errors={errors.password && touched.password && errors.password}
            />
            <Button type="submit">Update</Button>
          </form>
        )}
      </Formik>
      <Button type="button" onClick={logoutFn}>
        Logout
      </Button>
    </StyledWrapper>
  );
};

UserSidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setSidebarVisibility: PropTypes.func.isRequired,
};

export default UserSidebar;
