import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


export const HeaderSection = styled.div`
  position: relative;
  background-color: #E8C17B;
  padding-top: 21px;
  padding-bottom: 0px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  margin-bottom: 0px;
  z-index: 999;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  max-width: 1800px;
  padding-right: 25px;
  padding-left: 25px;
  margin: 0 auto;
`;

export const TopMenu = styled(Button)`
  margin-top: 10px;
  color: #707070;
  font-size: 13px;
  font-weight: regular;
  :hover {
    color: #333;
  }
  :focus {
    color: #333;
  }
  :active {
    color: #333;
  }
`;

export const MainMenu = styled(Button)`
  color: #fff;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: bold;
  :hover {
    color: #214C2D;
  }
  :focus {
    color: #214C2D;
  }
  :active {
    color: #214C2D;
  }
`;
