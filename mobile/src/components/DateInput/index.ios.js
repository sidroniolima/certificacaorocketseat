import React, {useState, useMemo} from 'react';
import {DatePickerIOS} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {Container, DateButton, DateText} from './styles';

export default function DateInput({date, onChange}) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" size={20} color="#FFF" />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DatePickerIOS
          date={date}
          onDateChange={onChange}
          minimumDate={new Date()}
          minuteInterval={60}
          locale="pt"
        />
      )}
    </Container>
  );
}
