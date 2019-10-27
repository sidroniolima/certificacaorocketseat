import styled from 'styled-components';

export const Container = styled.div`
  background: #000;
  height: 92px;
  width: 100%;
`;

export const Content = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  text-align: right;

  div {
    strong {
      color: #fff;
      display: block;
    }

    a {
      color: #999;
      display: block;
      margin-top: 3px;
    }
  }

  button {
    background: #d44059;
    color: #fff;
    border-radius: 4px;
    margin-left: 10px;
    border: 0;
    padding: 10px 15px;
  }
`;
