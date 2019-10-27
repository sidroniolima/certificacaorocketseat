import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { fetchOrganizingRequest } from '~/store/modules/organizing/actions';

import { Container, Header, List } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.organizing.meetups);

  useEffect(() => {
    dispatch(fetchOrganizingRequest());
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <h1>Meus Meetups</h1>
        <Link to="/meetup">Novo Meetup</Link>
      </Header>
      <List>
        {meetups.map(meetup => (
          <li key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formattedDate}</span>
              <Link to={`/meetup/view/${meetup.id}`}>
                <MdKeyboardArrowRight color="#fff" size={24} />
              </Link>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
