import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import DateInput from './DateInput';
import BannerInput from './BannerInput';

import { Container } from './styles';

import {
  saveRequest,
  fetchRequest,
  newMeetup,
} from '~/store/modules/meetup/actions';

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.meetup);
  const loading = useSelector(state => state.meetup.loading);

  useEffect(() => {
    async function fetchData() {
      const { id } = match.params;

      if (id) {
        dispatch(fetchRequest(id));
      } else {
        dispatch(newMeetup());
      }
    }

    fetchData();
  }, [dispatch, match.params]);

  function handleSubmit(data) {
    const { id } = match.params;

    if (id) {
      data.id = id;
    }

    dispatch(saveRequest(data));
  }

  const schema = Yup.object().shape({
    title: Yup.string().required('Digite o título do evento'),
    banner: Yup.number(),
    description: Yup.string().required('Digite a descrição'),
    date: Yup.date().required('Digite a data do evento'),
    location: Yup.string().required('Digite a localização do meetup'),
  });

  return (
    <Container>
      {!loading && meetup && (
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          autoComplete="off"
          initialData={meetup}
        >
          <BannerInput name="banner" />
          <Input name="title" placeholder="Título do Meetup" />
          <Input
            multiline
            name="description"
            placeholder="Descrição completa"
          />

          <DateInput placeholderText="Data do meetup" name="date" />
          <Input name="location" placeholder="Localização" />

          <button type="submit" disabled={loading}>
            {loading ? 'Aguarde...' : 'Salvar meetup'}
          </button>
        </Form>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Meetup.defaultProps = {
  match: {},
};
