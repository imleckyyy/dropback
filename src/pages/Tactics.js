import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { FetchContext } from 'context/FetchContext';
import useQuery from 'hooks/useQuery';

import Heading from 'components/common/Heading';
import Notyfication from 'components/Notyfication';
import Loader from 'components/Loader';
import TacticItem from 'components/TacticItem';
import Pagination from 'components/Pagination';

const StyledGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-right: -5px;
  margin-left: -5px;
  margin-bottom: 30px;
`;

const Tactics = () => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const queryString = query.toString();

  const { apiAxios } = useContext(FetchContext);

  const [tactics, setTactics] = useState([]);
  const [currentPage, setCurrentPage] = useState(query.get('page') ? Number(query.get('page')) : 1);
  const [totalItems, setTotalItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    document.title = `FIFA 21 Tactics | DROPBACK`;
  }, []);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    const fetchTactics = async () => {
      try {
        const { data } = await apiAxios.get(`tactics?${queryString}`);
        if (mounted) {
          setTactics(data.tactics);
          setTotalItems(data.pageInfo.items);
          setIsLoading(false);
          setFetchError(null);
        }
      } catch (error) {
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

  const onPageChange = (page) => {
    setCurrentPage(page);
    query.set('page', page);
    const newQueryString = query.toString();
    history.push(`/tactics?${newQueryString}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading>Tactics</Heading>
      {fetchError && (
        <Notyfication onClose={() => setFetchError(null)} error>
          {fetchError}
        </Notyfication>
      )}
      {tactics.length ? (
        <>
          <StyledGridWrapper>
            {tactics.map((item) => (
              <TacticItem key={item._id} item={item} />
            ))}
          </StyledGridWrapper>
          <Pagination
            totalItems={totalItems}
            currentPage={currentPage}
            pageLimit={20}
            onPageChanged={onPageChange}
          />
        </>
      ) : (
        <p>No tactics</p>
      )}
    </>
  );
};

export default Tactics;
