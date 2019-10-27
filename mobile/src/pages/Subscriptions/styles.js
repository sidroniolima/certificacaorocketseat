import {FlatList} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 20},
})``;
