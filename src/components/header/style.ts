import styled from 'styled-components';
export const HeaderContainer = styled.div`
  display: flex;
  height: 56px;
  background: #035891;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const Title = styled.a`
  padding: 0 10px;
  margin-right: 30px;
  text-align: center;
  color: #fff;
  height: 56px;
  display: flex;
  align-items: center;
  .lugia-icon-logo_ysstech {
    display: inline-block;
    font-size: 36px;
    line-height: 56px;
    padding-right: 10px;
    transform: scaleX(0.85);
    color: #0099ff;
  }
  span {
    font-size: 15px;
    color: #0099ff;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 800;
  }
`;

export const Navdiv = styled.div`
  display: flex;
  height: 56px;
  margin: 0 10px;
`;
