import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Logo from '~/components/Logo';

import {Container, MeetupList} from './styles';

function Subscriptions({isFocused}) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('/subscriptions');

      setSubscriptions(response.data);
    }

    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]); //eslint-disable-line

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setSubscriptions(subscriptions.filter(sub => sub.id !== id));

      Alert.alert('Você não está mais inscrito para este Meetup');
    } catch (error) {
      Alert.alert('não foi possível cancelar sua inscrição. Tente mais tarde.');
    }
  }

  return (
    <Background>
      <Container>
        <Logo />
        <MeetupList
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              data={item.meetup}
              onHandle={() => handleCancel(item.id)}
              buttonText="Cancelar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

function IconTab({tintColor}) {
  return <Icon name="loyalty" size={20} color={tintColor} />;
}

IconTab.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: IconTab,
};

export default withNavigationFocus(Subscriptions);
