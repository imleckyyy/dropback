import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from 'context/AuthContext';
import { FetchContext } from 'context/FetchContext';
import { TacticProvider } from 'context/TacticContext';

import Heading from 'components/common/Heading';
import Notyfication from 'components/common/Notyfication';
import Loader from 'components/common/Loader';
import TacticToolsDropdown from 'components/TacticToolsDropdown';

import * as MultiStep from 'components/steps/MultiStep';
import InformationsStep from 'components/steps/InformationsStep';
import TacticStep from 'components/steps/TacticStep';
import InstructionsStep from 'components/steps/InstuctionsStep';

const StyledToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tactic = () => {
  const { id } = useParams();
  const { apiAxios } = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const { isAdmin, isOwner } = authContext;

  const [tactic, setTactic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchTactic = async () => {
      try {
        const { data } = await apiAxios.get(`tactics/${id}`);
        const [item] = data.tactic;

        const tacticData = {
          mode: 'view',
          formationId: item.formationId,
          tactic: {
            defenseStyle: item.defenseStyle,
            defenseWidth: item.defenseWidth,
            defenseDepth: item.defenseDepth,
            offenseStyle: item.offenseStyle,
            offenseWidth: item.offenseWidth,
            offensePlayersInBox: item.offensePlayersInBox,
            corners: item.corners,
            freeKicks: item.freeKicks,
          },
          positions: JSON.parse(item.positions),
          meta: {
            tags: item.tags,
            description: item.description,
            redditUrl: item.redditUrl,
            squadUrl: item.squadUrl,
            guideUrl: item.guideUrl,
            userName: item.userinfo.login,
            userId: item.userinfo._id,
          },
        };

        setTactic(tacticData);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        const { data } = error.response;
        setFetchError(data.message);
      }
    };
    fetchTactic();
  }, [apiAxios, id]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Heading>Tactic details</Heading>
      {fetchError && <Notyfication error>{fetchError}</Notyfication>}
      {tactic.formationId ? (
        <TacticProvider initialTacticData={tactic}>
          <MultiStep.Wizard>
            <StyledToolsWrapper>
              <MultiStep.Breadcrumb />
              {isAdmin() || (isOwner(tactic.meta.userId) && <TacticToolsDropdown tacticId={id} />)}
            </StyledToolsWrapper>
            <MultiStep.Page pageIndex={1} pageTitle="Informations">
              <InformationsStep
                formationId={tactic.formationId}
                description={tactic.meta.description}
                tags={tactic.meta.tags}
                redditUrl={tactic.meta.redditUrl}
                squadUrl={tactic.meta.squadUrl}
                guideUrl={tactic.meta.guideUrl}
                userName={tactic.meta.userName}
                userId={tactic.meta.userId}
              />
            </MultiStep.Page>
            <MultiStep.Page pageIndex={2} pageTitle="Tactic">
              <TacticStep />
            </MultiStep.Page>
            <MultiStep.Page pageIndex={3} pageTitle="Instructions">
              <InstructionsStep />
            </MultiStep.Page>
            <MultiStep.Controls />
          </MultiStep.Wizard>
        </TacticProvider>
      ) : (
        <p>No item found</p>
      )}
    </>
  );
};

export default Tactic;
