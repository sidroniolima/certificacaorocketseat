import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto 0;

  display: flex;
  justify-content: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin: 20px auto;

    hr {
      border: 0.5px solid ${lighten(0.1, '#f94d6a')};
      margin: 20px 0;
    }

    input,
    textarea {
      padding: 0 15px;
      height: 44px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      margin: 0 0 3px;
      color: #fff;

      & + input,
      textarea {
        margin-top: 60px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 180px;
      font: 14px 'Roboto', sans-serif;

      resize: none;
      padding: 12px 12px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #f94d6a;
      text-align: left;
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 11px;
    }

    & > button {
      width: auto;
      align-self: flex-end;
      border-radius: 4px;
      padding: 10px 30px;
      color: #fff;
      border: 0;
      margin-top: 18px;
      background: #f94d6a;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#F94D6A')};
      }
    }
  }
`;
