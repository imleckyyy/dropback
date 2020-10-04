import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Button from 'components/common/Button';

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin: 0 5px;
`;

const StyledButton = styled(Button)`
  position: relative;
  padding: 5px 15px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
  }

  &:before {
    right: -10px;
    border-left: 10px solid var(--color-background-lighter);
    z-index: 2;
  }

  &:after {
    right: -19px;
    border-left: 10px solid var(--color-background);
    z-index: 1;
  }

  &:hover {
    &:before {
      border-left: 10px solid var(--color-gradient-end);
    }
  }

  ${({ primary }) =>
    !primary &&
    css`
      background: var(--color-gradient);

      &:before {
        border-left: 10px solid var(--color-gradient-end);
      }
    `}
`;

const generateArray = (totalPage) => {
  return (function (n) {
    for (var a = []; n--; a[n] = n + 1);
    return a;
  })(totalPage);
};

const addEtc = (pages) => {
  if (pages.length <= 1) {
    return pages;
  }
  var lastPage = pages[pages.length - 1];
  var secondLast = pages[pages.length - 2];

  if (pages[0] + 1 !== pages[1]) pages.splice(1, 0, '...');
  if (lastPage !== secondLast + 1) pages.splice(pages.length - 1, 0, '...');
  return pages;
};

const genPages = (pages, current, totalPage) => {
  const first = (page) => page === 1;
  const middle = (page, between) => page > between.bet && page <= between.ween;
  const last = (page) => page === totalPage;
  const between = {
    bet: 0,
    ween: 0,
  };
  if (current <= 4) {
    between.bet = 1;
    between.ween = 7;
  } else if (current > totalPage - 4) {
    between.bet = totalPage - 7;
    between.ween = totalPage - 1;
  } else {
    between.bet = current - 3;
    between.ween = current + 2;
  }
  const allPages = pages.filter((page) => first(page) || middle(page, between) || last(page));
  return addEtc(allPages);
};

const Pagination = ({ totalItems, currentPage, pageLimit = 10, onPageChanged }) => {
  const [current, setCurrent] = useState(currentPage);
  const [totalPage, setTotalPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageNav, setPageNav] = useState([]);

  useEffect(() => {
    setPageNav([...genPages(pages, current, totalPage)]);
  }, [current, pages, totalPage]);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / pageLimit);
    setTotalPage(totalPages);

    const pagesArray = generateArray(totalPages);
    setPages([...pagesArray]);
  }, [totalItems, pageLimit]);

  const onPageClick = (curr, type) => {
    if (isNaN(curr)) return;

    let nextPageIndex = null;

    if (type === 'previous' && current > 1) {
      nextPageIndex = curr - 1;
    } else if (type === 'next' && curr < totalPage) {
      nextPageIndex = curr + 1;
    } else {
      nextPageIndex = curr;
    }

    if (nextPageIndex !== current) {
      setCurrent(nextPageIndex);
      onPageChanged(nextPageIndex);
    }
  };

  return (
    <>
      <StyledList>
        {current !== 1 && (
          <StyledListItem>
            <StyledButton type="button" onClick={() => onPageClick(current, 'previous')}>
              prev
            </StyledButton>
          </StyledListItem>
        )}

        {pageNav.map((page, index) => {
          return (
            <StyledListItem key={index}>
              <StyledButton
                type="button"
                onClick={() => onPageClick(Number(page))}
                primary={page !== current}
              >
                {page}
              </StyledButton>
            </StyledListItem>
          );
        })}

        {current !== totalPage && (
          <StyledListItem>
            <StyledButton type="button" onClick={() => onPageClick(current, 'next')}>
              next
            </StyledButton>
          </StyledListItem>
        )}
      </StyledList>
    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
