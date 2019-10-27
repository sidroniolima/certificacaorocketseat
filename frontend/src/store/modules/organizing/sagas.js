import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import api from '~/services/api';

import { fetchOrganizingSuccess, fetchOrganizingFailure } from './actions';

export function* fetchOrganizingMeetup() {
  try {
    const response = yield call(api.get, '/organizing');

    const data = response.data.map(item => ({
      ...item,
      formattedDate: format(parseISO(item.date), "d 'de' MMM', às ' HH'h'mm", {
        locale: pt,
      }),
    }));

    yield put(fetchOrganizingSuccess(data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Não foi possível recuperar os Meetups.');
    yield put(fetchOrganizingFailure());
  }
}

export default all([
  takeLatest('@organizing/FETCH_ORGANIZING_REQUEST', fetchOrganizingMeetup),
]);
