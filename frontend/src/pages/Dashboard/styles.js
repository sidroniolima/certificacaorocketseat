import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px auto 0;
  max-width: 800px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    border: 0;
    border-radius: 4px;
    background: #f94d6a;
    color: #fff;
    padding: 10px 40px;
  }
`;

export const List = styled.ul`
  text-decoration: none;
  margin-top: 45px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;

    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    color: #fff;

    & + li {
      margin-top: 10px;
    }

    strong {
      font-size: 14px;
    }

    div {
      span {
        font-size: 12px;
        font-weight: 300;
      }

      svg {
        vertical-align: middle;
        margin-left: 20px;
      }
    }
  }
`;
