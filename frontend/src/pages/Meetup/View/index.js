import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { fetchRequest } from '~/store/modules/meetup/actions';
import { Container, Header, Meetup } from './styles';

export default function View({ match }) {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.meetup);

  useEffect(() => {
    async function load() {
      const { id } = match.params;

      if (id) {
        await dispatch(fetchRequest(id));
      }
    }

    load();
  }, [dispatch, match.params]);

  async function handleCancel(id) {
    try {
      await api.delete(`/meetups/${id}`);
      history.push('/dashboard');
      toast.warn('Meetup cancelado');
    } catch (error) {
      toast.error('Não foi possível cancelar o Meetup');
    }
  }

  return meetup ? (
    meetup && (
      <Container>
        <Header>
          <h1>{meetup.title}</h1>
          <div>
            <Link to={`/meetup/${meetup.id}`}>Editar</Link>
            <button type="button" onClick={() => handleCancel(meetup.id)}>
              Cancelar
            </button>
          </div>
        </Header>
        <Meetup>
          {meetup.banner && (
            <img src={meetup.banner.url} alt="Meetup de React" />
          )}
          <p>{meetup.description}</p>
          <span>{meetup.formattedDate}</span>
          <span>{meetup.location}</span>
        </Meetup>
      </Container>
    )
  ) : (
    <div>Carregando</div>
  );
}

View.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

View.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};
