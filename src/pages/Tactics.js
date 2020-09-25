import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FetchContext } from 'context/FetchContext';
import useQuery from 'hooks/useQuery';

import Heading from 'components/common/Heading';
import Notyfication from 'components/common/Notyfication';
import Loader from 'components/common/Loader';
import TacticItem from 'components/TacticItem';

const StyledGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-right: -5px;
  margin-left: -5px;
`;

const Tactics = () => {
  const location = useLocation();
  const query = useQuery();
  const queryString = query.toString();

  const { apiAxios } = useContext(FetchContext);

  const [tactics, setTactics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    const fetchTactics = async () => {
      try {
        const { data } = await apiAxios.get(`tactics?${queryString}`);
        if (mounted) {
          setTactics(data.tactics);
          setIsLoading(false);
          setFetchError(null);
        }
      } catch (error) {
        console.log(error);
        const { data } = error.response;
        if (mounted) {
          setIsLoading(false);
          setFetchError(data.message);
        }
      }
    };
    fetchTactics();

    return () => (mounted = false);
  }, [apiAxios, location, queryString]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading>Tactics</Heading>
      {fetchError && <Notyfication error>{fetchError}</Notyfication>}
      {tactics.length ? (
        <StyledGridWrapper>
          {tactics.map((item) => (
            <TacticItem key={item._id} item={item} />
          ))}
        </StyledGridWrapper>
      ) : (
        <p>No tactics</p>
      )}
    </>
  );
};

export default Tactics;
