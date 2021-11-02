import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import styled, {createGlobalStyle} from 'styled-components';

import MainPageHeader from "./Header/MainPageHeader";
// import MainPageContents from "./MainPage/MainPageContents";

const Global = createGlobalStyle`
  body {
    background-color: #F5F5F5;
  }

  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;
const ContentsWrapper = styled.div`
  position: relative;
  max-width: 1800px;
  padding-right: 0px;
  padding-left: 0px;
  margin: 0 auto;
`; 

const AppLayout = ({children}) => {
    const {isLoggedIn} = useSelector(state => state.user);
    return (
        <>
            <Global/>
            <MainPageHeader/>
            <ContentsWrapper>
                {children}
            </ContentsWrapper>
        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
