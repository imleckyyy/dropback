import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import { FetchContext } from 'context/FetchContext';

import Loader from 'components/Loader';
import Notyfication from 'components/Notyfication';
import TacticItem from 'components/TacticItem';
import Heading from 'components/common/Heading';
import Button from 'components/common/Button';

const StyledInfoWrapper = styled.div`
  display: flex;
`;

const StyledInfoLabel = styled.span`
  min-width: 20%;
`;

const StyledInfoValue = styled.span`
  flex: 1;
`;

const StyledVerifiedLabel = styled.span`
  position: relative;
  display: block;
  font-size: var(--font-size-xxs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-500);
  padding-left: 25px;
  margin-top: 10px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-55%);
    display: block;
    width: 15px;
    height: 15px;
    background: var(--color-gradient);
    border-radius: 50%;
  }

  &:after {
    content: '';
    position: absolute;
    display: block;
    left: 5px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid var(--color-text);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const StyledGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-right: -5px;
  margin-left: -5px;
  margin-bottom: 30px;
`;

const StyledSeeMoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const User = () => {
  const { login } = useParams();

  const { apiAxios } = useContext(FetchContext);

  const [userData, setUserData] = useState(null);
  const [tactics, setTactics] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (userData) {
      document.title = `${userData.login} Profile | DROPBACK`;
    } else {
      document.title = `User | DROPBACK`;
    }
  }, [userData]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTactic = async () => {
      try {
        const { data } = await apiAxios.get(`users/${login}`);
        setUserData(data.user);
        setTactics(data.tactics);
        setHasMoreItems(data.hasMoreTactics);
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
  }, [apiAxios, login]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {fetchError && (
        <Notyfication onClose={() => setFetchError(null)} error>
          {fetchError}
        </Notyfication>
      )}
      {userData && (
        <>
          <Heading>
            {userData.login}
            {userData.isVerified && <StyledVerifiedLabel>Verified</StyledVerifiedLabel>}
          </Heading>
          {userData.youTubeName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>YouTube:</StyledInfoLabel>
              <StyledInfoValue>{userData.youTubeName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
          {userData.twitchName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>Twitch:</StyledInfoLabel>
              <StyledInfoValue>{userData.twitchName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
          {userData.redditName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>Reddit:</StyledInfoLabel>
              <StyledInfoValue>{userData.redditName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
          {userData.futbinName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>Futbin:</StyledInfoLabel>
              <StyledInfoValue>{userData.futbinName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
          {userData.futheadName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>Futhead:</StyledInfoLabel>
              <StyledInfoValue>{userData.futheadName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
          {userData.futwizName && (
            <StyledInfoWrapper>
              <StyledInfoLabel>Futwiz:</StyledInfoLabel>
              <StyledInfoValue>{userData.futwizName}</StyledInfoValue>
            </StyledInfoWrapper>
          )}
        </>
      )}
      <Heading>Latest tactics:</Heading>
      {tactics.length ? (
        <>
          <StyledGridWrapper>
            {tactics.map((item) => (
              <TacticItem key={item._id} item={item} />
            ))}
          </StyledGridWrapper>
        </>
      ) : (
        <p>No tactics</p>
      )}
      {hasMoreItems && (
        <StyledSeeMoreWrapper>
          <Button as={Link} to={`/tactics?userId=${userData._id}`}>
            More tactics
          </Button>
        </StyledSeeMoreWrapper>
      )}
    </>
  );
};

export default User;
