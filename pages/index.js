import React from 'react';
import { useSelector } from 'react-redux';
import * as THREE from "three";
import styled from 'styled-components';
import {Row, Col, Tabs, Button, Menu} from 'antd';
import Link from "next/link";
import { PieChartOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
// import PostForm from '../components/PostForm';
// import PostCard from '../components/PostCard';

const { TabPane } = Tabs;

import AppLayout from '../components/AppLayout';
import CurrentTask from '../components/Task/CurrentTask';

const SearchSection = styled.div`
  position: relative;
  background : rgba(0,0,0,0);
  max-width: 1400px;
  height: 13vh;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 0px;
`;
const SearchContentsBG = styled.div`
  position: relative;
  background : #FFFFFF;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 3vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  border-radius: 0px;
`;

const MainViewSection = styled.div`
  position: relative;
  background : rgba(0,0,0,0);
  max-width: 1400px;
  height: 35vh;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 0px;
`;
const MainContentsBG = styled.div`
  position: relative;
  background : #FFFFFF;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 8vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  border-radius: 0px;
`;

const ImageContents = styled.img`
  display: block;
  margin: 0px auto;
`



/*Three.js*/


const Home = () => {
  // const { isLoggedIn } = useSelector(state => state.user);
  // const { mainPosts } = useSelector(state => state.post);

  return (
    <AppLayout>
      <Row>
        <Col xs={24} lg={24}>
          <SearchSection>
            <SearchContentsBG>
              <Link href="/"><a><ImageContents src='/assets/search-text.svg'/></a></Link>
            </SearchContentsBG>
          </SearchSection>
        </Col>
        <Col xs={24} lg={24}>
          <SearchSection>
            <SearchContentsBG style={{textAlign:'center', fontSize:'18px'}}>
              <Link href="/devmode"><a>개발자모드</a></Link>
            </SearchContentsBG>
          </SearchSection>
        </Col>
        <Col xs={24} lg={24}>
          <MainViewSection>
            <MainContentsBG>
              <Link href="/camera"><a><ImageContents src='/assets/camera-text.svg'/></a></Link>
            </MainContentsBG>
          </MainViewSection>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Home;
