import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/common/Button';

import BreadcrumbsImage from 'assets/breadcrumbs_01.png';
import BreadcrumbsImage2 from 'assets/breadcrumbs_02.png';

const StyledControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

const StyledBreadcrumbsList = styled.ul`
  position: relative;
  display: flex;
  padding: 0;
  margin: 20px 0;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    background-size: 100%;
    z-index: -1;
  }

  &:before {
    left: 60px;
    top: -75px;
    width: 184px;
    height: 90px;
    background: url(${() => BreadcrumbsImage});
  }

  &:after {
    left: 270px;
    bottom: -5px;
    width: 143px;
    height: 12px;
    background: url(${() => BreadcrumbsImage2});
  }
`;

const StyledBreadcrumbsItem = styled.li`
  display: block;
`;

const StyledBreadcrumbsButton = styled(Button)`
  position: relative;
  padding: 15px 20px 15px 30px;
  margin-right: 10px;
  min-width: 120px;
  text-align: left;
  background: ${({ theme }) => theme.darkGray};

  &:before {
    content: '';
    position: absolute;
    right: -20px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 23px solid transparent;
    border-left: 20px solid ${({ theme }) => theme.darkGray};
    border-bottom: 23px solid transparent;
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    right: -29px;
    top: 0;
    display: block;
    width: 0;
    height: 0;
    border-top: 23px solid transparent;
    border-left: 20px solid #ffffff;
    border-bottom: 23px solid transparent;
    z-index: 1;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.gradient};

      &:hover {
        background: ${({ theme }) => theme.gradient};
      }

      &:before {
        border-left: 20px solid rgba(187, 34, 250, 1);
      }
    `}
`;

const WizardContext = React.createContext({
  currentPage: 1,
  changePage: () => {},
  pageIndexes: [],
  updatePageIndexes: () => {},
  pageTitles: [],
  updatePageTitles: () => {},
});

const Page = ({ children, pageIndex, pageTitle }) => {
  const { currentPage, updatePageIndexes, updatePageTitles } = useContext(WizardContext);

  useEffect(() => {
    updatePageIndexes(pageIndex);
    updatePageTitles({ pageIndex, pageTitle });
  });

  return currentPage === pageIndex ? children : null;
};

const Controls = () => {
  const { currentPage, changePage, pageIndexes } = useContext(WizardContext);
  const totalPageNumber = pageIndexes.length;

  const prevPage = () => changePage(currentPage - 1);
  const nextPage = () => changePage(currentPage + 1);

  return (
    <StyledControlsWrapper>
      {currentPage !== 1 ? (
        <Button onClick={prevPage} text>
          Previous
        </Button>
      ) : null}

      {currentPage !== totalPageNumber ? <Button onClick={nextPage}>Next</Button> : null}
      {/* {currentPage === totalPageNumber ? <Button>Finish</Button> : null} */}
    </StyledControlsWrapper>
  );
};

const Breadcrumb = () => {
  const { currentPage, pageTitles, changePage } = useContext(WizardContext);
  const sortedPageTitles = pageTitles.sort((a, b) => a.pageIndex - b.pageIndex);

  return (
    <StyledBreadcrumbsList>
      {sortedPageTitles.map((page) => (
        <StyledBreadcrumbsItem key={page.pageIndex}>
          <StyledBreadcrumbsButton
            isActive={currentPage === page.pageIndex}
            onClick={() => changePage(page.pageIndex)}
          >
            {page.pageTitle}
          </StyledBreadcrumbsButton>
        </StyledBreadcrumbsItem>
      ))}
    </StyledBreadcrumbsList>
  );
};

const Wizard = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndexes, setPageIndexes] = useState([]);
  const [pageTitles, setPageTitles] = useState([]);

  const changePage = (newPageIndex) => {
    setCurrentPage(newPageIndex);
  };

  const updatePageIndexes = (pageIndex) => {
    if (pageIndexes.includes(pageIndex)) {
      return;
    }

    setPageIndexes((prevPageIndexes) => [...prevPageIndexes, pageIndex]);
  };

  const updatePageTitles = (pageInfo) => {
    if (pageTitles.filter((item) => item.pageIndex === pageInfo.pageIndex).length) {
      return;
    }

    setPageTitles((prevPageTitles) => [...prevPageTitles, pageInfo]);
  };

  return (
    <WizardContext.Provider
      value={{
        currentPage,
        changePage,
        pageIndexes,
        updatePageIndexes,
        pageTitles,
        updatePageTitles,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

Wizard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export { Page, Controls, Breadcrumb, Wizard };
