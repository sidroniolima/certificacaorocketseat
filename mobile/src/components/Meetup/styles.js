import styled from 'styled-components/native';
import DefaultButton from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Image = styled.Image`
  width: auto;
  height: 200;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Content = styled.View`
  flex: 1 auto;
  padding: 15px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Info = styled.Text`
  color: #ccc;
  font-size: 12px;

  margin: 6px 0 6px 15px;
`;

export const Button = styled(DefaultButton)`
  margin-top: 10px;
`;
