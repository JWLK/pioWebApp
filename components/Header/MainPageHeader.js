import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Row, Col, Image, Button} from 'antd';
import Link from "next/link";

import {HeaderSection, HeaderWrapper, TopMenu, MainMenu} from './MainPageHeaderCSS';

const MainPageHeader = () => {
    const {isLoggedIn} = useSelector(state => state.user);
    return (
        <HeaderSection>
            <HeaderWrapper>
                <Row gutter={0} align="middle">
                    <Col span={8} style={{marginBottom: 20}}>
                        <Link href="/"><a><img src='/assets/logo-pio.svg'/></a></Link>
                    </Col>
                    <Col span={8}>
                        {/*<Input.Search enterButton style={{ verticalAlign: 'middle' }} />*/}
                    </Col>
                    <Col span={8}>
                        <Row justify="end" gutter={0}>
                            {/* <Col>
                                <MainMenu type="link">
                                    <Link href="#"><a>회사 소개</a></Link>
                                </MainMenu>
                            </Col>
                            <Col>
                                <MainMenu type="link">
                                    <Link href="#"><a>서비스 소개</a></Link>
                                </MainMenu>
                            </Col> */}
                        </Row>
                    </Col>

                </Row>
            </HeaderWrapper>
        </HeaderSection>
    );
};

export default MainPageHeader;
