import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import api from '~/services/api';
import history from '~/services/history';

import {
  saveSuccess,
  saveFailure,
  fetchSuccess,
  fetchFailure,
} from './actions';

export function* saveMeetup({ payload }) {
  try {
    const { id, title, description, date, location, banner } = payload.data;

    const response = yield call(
      id ? api.put : api.post,
      id ? `/meetups/${id}` : '/meetups',
      {
        id: id || null,
        banner,
        title,
        description,
        date,
        location,
      }
    );

    toast.success('Meetup salvo com sucesso.');

    const data = { ...response.data, date: parseISO(response.data.date) };

    yield put(saveSuccess(data));

    history.push(`/meetup/${data.id}`);
  } catch (error) {
    toast.error('Não foi possível salvar o Meetup.');
    yield put(saveFailure());
  }
}

export function* fetchMeetup({ payload }) {
  try {
    const response = yield call(api.get, `/meetups/${payload.id}`);

    const data = {
      ...response.data,
      date: parseISO(response.data.date),
      formattedDate: format(parseISO(response.data.date), 'dd/MM/yyyy HH:mm'),
    };
    yield put(fetchSuccess(data));
  } catch (error) {
    toast.error('Não foi possível recuperar o Meetup.');
    yield put(fetchFailure());
  }
}

export default all([
  takeLatest('@meetup/SAVE_REQUEST', saveMeetup),
  takeLatest('@meetup/FETCH_REQUEST', fetchMeetup),
]);
