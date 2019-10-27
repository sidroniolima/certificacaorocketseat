import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 10px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 200px;
      width: 800px;
    }

    h2 {
      display: flex;
      color: rgba(255, 255, 255, 0.3);
      font-size: 14px;
      font-weight: 400;
      height: 200px;
      width: 800px;
      background: rgba(0, 0, 0, 0.3);

      justify-content: center;
      align-items: center;
    }

    input {
      display: none;
    }
  }
`;
