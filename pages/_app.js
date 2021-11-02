import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const TowerCalc = ({ Component }) => {
  return (
    <>
      <Head>
        <title>PIO심플체커 - 내 몸을 바로잡는 습관</title>
      </Head>
      <Component />
    </>
  );
};

TowerCalc.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(TowerCalc);
