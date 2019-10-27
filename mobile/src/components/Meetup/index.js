import React from 'react';
import {parseISO, format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, Content, Image, Title, Info, Button} from './styles';

export default function Meetup({data, onHandle, buttonText}) {
  const dateFormatted = format(
    parseISO(data.date),
    "dd 'de' MMMM, 'às' HH'h'",
    {
      locale: pt,
    },
  );

  return (
    <Container>
      <Image
        source={{
          uri: data.banner.url.replace('localhost', '192.168.15.19'),
        }}
      />
      <Content>
        <Title>{data.title}</Title>
        <Info>{dateFormatted}</Info>
        <Info>{data.location}</Info>
        <Info>Organizador: Diego Fernandes</Info>
        <Button onPress={onHandle}>{buttonText}</Button>
      </Content>
    </Container>
  );
}
