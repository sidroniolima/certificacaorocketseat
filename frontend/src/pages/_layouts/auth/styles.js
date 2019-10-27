import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #22202c, #402845);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      padding: 0 15px;
      height: 44px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      margin: 0 0 3px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      & + input {
        margin-top: 12px;
      }
    }

    span {
      color: #f94d6a;
      text-align: left;
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 11px;
    }

    button {
      border-radius: 4px;
      padding: 10px;
      color: #fff;
      border: 0;
      margin: 12px 0 0;
      height: 44px;
      background: #f94d6a;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 14px;
      opacity: 0.8;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
