import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import DateInput from '~/components/DateInput';
import Logo from '~/components/Logo';

import {Container, Content, MeetupList} from './styles';

function Dashboard({isFocused}) {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [meetupsSize, setMeetupsSize] = useState();

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get(`/meetups`, {
        params: {
          date,
          page: 1,
        },
      });

      setMeetups(response.data);
      setMeetupsSize(response.data.length);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]); //eslint-disable-line

  async function loadMore() {
    const nextPage = page + 1;

    const response = await api.get(`/meetups`, {
      params: {
        date,
        page: nextPage,
      },
    });

    setMeetups([...meetups, ...response.data]);
    setMeetupsSize(response.data.length);
    setPage(nextPage);
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/meetup/${id}/subscriptions`);
      Alert.alert('Bem-vindo ao meetup!');
    } catch (error) {
      Alert.alert('Não foi possível a subscrição.');
    }
  }

  return (
    <Background>
      <Container>
        <Logo />
        <DateInput date={date} onChange={date => setDate(date)} />
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              data={item}
              onHandle={() => handleSubscription(item.id)}
              buttonText="Realizar inscrição"
            />
          )}
          onEndReached={meetupsSize >= 10 ? loadMore : null}
          onEndReachedThreshold={0.2}
        />
      </Container>
    </Background>
  );
}

function IconTab({tintColor}) {
  return <Icon name="event" size={20} color={tintColor} />;
}

IconTab.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: IconTab,
};

export default withNavigationFocus(Dashboard);
