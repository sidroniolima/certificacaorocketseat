import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 40px 0;

  color: #fff;

  a {
    text-decoration: none;
    border: 0;
    border-radius: 4px;
    background: #4dbaf9;
    color: #fff;
    padding: 10px 30px;
  }

  button {
    border-radius: 4px;
    padding: 10px 30px;
    color: #fff;
    border: 0;
    margin-left: 10px;
    background: #f94d6a;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#F94D6A')};
    }
  }
`;

export const Meetup = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 800px;
    height: 200px;
    object-fit: cover;
  }

  p {
    color: #fff;
    margin: 20px 0;
  }

  span {
    margin-left: 20px;
    color: #eee;
    font-size: 12px;
  }
`;
