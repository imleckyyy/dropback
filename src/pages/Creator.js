import React, { useContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { formatTacticData } from 'utils/tactic';

import { AuthContext } from 'context/AuthContext';
import { FetchContext } from 'context/FetchContext';
import { TacticProvider } from 'context/TacticContext';

import Loader from 'components/Loader';
import Notyfication from 'components/common/Notyfication';

import * as MultiStep from 'components/steps/MultiStep';
import FormationStep from 'components/steps/FormationStep';
import TacticStep from 'components/steps/TacticStep';
import InstructionsStep from 'components/steps/InstuctionsStep';
import FinishStep from 'components/steps/FinishStep';

import tacticsViewModes from 'constants/tacticsViewModes';

const Creator = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { apiAxios } = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const { isAdmin, isOwner } = authContext;

  const [tactic, setTactic] = useState(null);
  const [mode, setMode] = useState(tacticsViewModes.create);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const isEditMode = pathname.indexOf('/edit') !== -1;
    const isCloneMode = pathname.indexOf('/clone') !== -1;

    if (isEditMode || isCloneMode) {
      setIsLoading(true);

      const fetchTactic = async () => {
        try {
          const { data } = await apiAxios.get(`tactics/${id}`);
          const [item] = data.tactic;

          const tacticData = formatTacticData(item);

          setFetchError(null);
          setTactic(tacticData);

          if (isEditMode) {
            if (isAdmin() || isOwner(item.userinfo._id)) {
              setMode(tacticsViewModes.edit);
            } else {
              setFetchError(
                `You're not be able to edit this tactic. Instead of edit you can clone this tactic.`,
              );
              setMode(tacticsViewModes.clone);
            }
          } else {
            setMode(tacticsViewModes.clone);
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 700);
        } catch (error) {
          const { data } = error.response;
          setFetchError(data.message);
          setTimeout(() => {
            setIsLoading(false);
          }, 700);
        }
      };
      fetchTactic();
    } else {
      setTactic(null);
      setMode(tacticsViewModes.create);
    }
  }, [apiAxios, id, pathname, isAdmin, isOwner]);

  return (
    <>
      {isLoading && <Loader />}
      <TacticProvider initialTacticData={tactic || null} mode={mode}>
        <MultiStep.Wizard>
          {fetchError && (
            <Notyfication onClose={() => setFetchError(null)} error>
              {fetchError}
            </Notyfication>
          )}
          <MultiStep.Breadcrumb />
          <MultiStep.Page pageIndex={1} pageTitle="Formation">
            <FormationStep />
          </MultiStep.Page>
          <MultiStep.Page pageIndex={2} pageTitle="Tactic">
            <TacticStep />
          </MultiStep.Page>
          <MultiStep.Page pageIndex={3} pageTitle="Instructions">
            <InstructionsStep />
          </MultiStep.Page>
          <MultiStep.Page pageIndex={4} pageTitle="Finish">
            <FinishStep />
          </MultiStep.Page>
          <MultiStep.Controls />
        </MultiStep.Wizard>
      </TacticProvider>
    </>
  );
};

export default Creator;
