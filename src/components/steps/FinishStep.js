import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import Heading from 'components/common/Heading';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import Notyfication from 'components/common/Notyfication';

import { TacticContext } from 'context/TacticContext';
import { FetchContext } from 'context/FetchContext';

import { getFormationName } from 'utils';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  min-width: 400px;
  margin-bottom: 10px;
`;

const FinishStep = () => {
  const { apiAxios } = useContext(FetchContext);
  const { formationId, tactic, positions, meta, changeMetaData } = useContext(TacticContext);
  const { tags, description, redditUrl, squadUrl, guideUrl } = meta;

  const [submitSuccess, setSubmitSuccess] = useState();
  const [submitError, setSubmitError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let timeout = null;
  const localHandleChange = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      changeMetaData(e.target.id, e.target.value);
    }, 500);
  };

  const localHandleSubmit = async () => {
    try {
      setIsLoading(true);

      const formationName = getFormationName(formationId);

      const input = {
        formationId,
        ...tactic,
        positions: JSON.stringify(positions),
        ...meta,
        tags: `${formationName}, ${tags}`,
      };
      const { data } = await apiAxios.post('tactics', input);
      setSubmitSuccess(data.message);
      setSubmitError('');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      const { data } = error.response;
      setSubmitError(data.message);
      setSubmitSuccess('');
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <Heading>Additional informations</Heading>

      <Formik
        initialValues={{ description, tags, redditUrl, squadUrl, guideUrl }}
        validate={(values) => {
          const errors = {};
          // if (!values.tags) {
          //   errors.email = 'Email is required';
          // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          //   errors.email = 'Invalid email address';
          // }
          if (!values.tags) {
            errors.tags = 'Tags are required';
          }
          return errors;
        }}
        onSubmit={localHandleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} onChange={(e) => localHandleChange(e)}>
            {submitSuccess && <Notyfication success>{submitSuccess}</Notyfication>}
            {submitError && <Notyfication error>{submitError}</Notyfication>}
            <StyledInput
              type="text"
              name="description"
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              errors={errors.description && touched.description && errors.description}
            />
            <StyledInput
              type="text"
              name="tags"
              label="Tags"
              placeholder="Tags"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tags}
              errors={errors.tags && touched.tags && errors.tags}
            />
            <StyledInput
              type="text"
              name="redditUrl"
              label="Reddit Link"
              placeholder="Reddit Link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.redditUrl}
              errors={errors.redditUrl && touched.redditUrl && errors.redditUrl}
            />
            <StyledInput
              type="text"
              name="squadUrl"
              label="Squad Link (futbin, futhead, futwiz)"
              placeholder="Squad Link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.squadUrl}
              errors={errors.squadUrl && touched.squadUrl && errors.squadUrl}
            />
            <StyledInput
              type="text"
              name="guideUrl"
              label="Guide Link"
              placeholder="Guide Link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guideUrl}
              errors={errors.guideUrl && touched.guideUrl && errors.guideUrl}
            />
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Publish tactic
            </Button>
          </form>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default FinishStep;
