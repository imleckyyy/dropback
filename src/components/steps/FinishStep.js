import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';

import Heading from 'components/common/Heading';
import FormField from 'components/FormField';
import Button from 'components/common/Button';
import Notyfication from 'components/common/Notyfication';

import { TacticContext } from 'context/TacticContext';
import { FetchContext } from 'context/FetchContext';

import tacticsViewModes from 'constants/tacticsViewModes';

import { getFormationName } from 'utils/tactic';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFormField = styled(FormField)`
  min-width: 400px;
  margin-bottom: 10px;
`;

const FinishStep = () => {
  const { apiAxios } = useContext(FetchContext);
  const { mode, formationId, tactic, positions, meta, changeMetaData } = useContext(TacticContext);
  const { tags, description, redditUrl, squadUrl, guideUrl } = meta;

  const [redirectOnSuccess, setRedirectOnSuccess] = useState(null);
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

      const isEditMode = mode === tacticsViewModes.edit;
      const isCloneMode = mode === tacticsViewModes.clone;

      const formationName = isEditMode || isCloneMode ? '' : `${getFormationName(formationId)}, `;

      const tacticInput = {
        formationId,
        ...tactic,
        positions: JSON.stringify(positions),
        ...meta,
        tags: `${formationName}${tags}`,
      };
      let res = null;
      if (isEditMode || isCloneMode) {
        res = await apiAxios.patch('tactics', tacticInput);
      } else {
        res = await apiAxios.post('tactics', tacticInput);
      }

      const { data } = res;
      setSubmitSuccess(data.message);
      setSubmitError('');
      setTimeout(() => {
        setIsLoading(false);
        setRedirectOnSuccess(data.tacticInfo.id);
      }, 1000);
    } catch (error) {
      const { data } = error.response;
      setSubmitError(data.message);
      setSubmitSuccess('');
      setIsLoading(false);
    }
  };

  return (
    <>
      {redirectOnSuccess ? <Redirect to={`/tactic/${redirectOnSuccess}`} /> : null}
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
              {submitSuccess && (
                <Notyfication onClose={() => setSubmitSuccess(null)} success>
                  {submitSuccess}
                </Notyfication>
              )}
              {submitError && (
                <Notyfication onClose={() => setSubmitError(null)} error>
                  {submitError}
                </Notyfication>
              )}
              <StyledFormField
                type="text"
                name="description"
                label="Description"
                placeholder="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                errors={errors.description && touched.description && errors.description}
              />
              <StyledFormField
                type="text"
                name="tags"
                label="Tags"
                placeholder="Tags"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tags}
                errors={errors.tags && touched.tags && errors.tags}
              />
              <StyledFormField
                type="text"
                name="redditUrl"
                label="Reddit Link"
                placeholder="Reddit Link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.redditUrl}
                errors={errors.redditUrl && touched.redditUrl && errors.redditUrl}
              />
              <StyledFormField
                type="text"
                name="squadUrl"
                label="Squad Link (futbin, futhead, futwiz)"
                placeholder="Squad Link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.squadUrl}
                errors={errors.squadUrl && touched.squadUrl && errors.squadUrl}
              />
              <StyledFormField
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
                {mode === tacticsViewModes.edit ? 'Save changes' : 'Create tactic'}
              </Button>
            </form>
          )}
        </Formik>
      </StyledWrapper>
    </>
  );
};

export default FinishStep;
