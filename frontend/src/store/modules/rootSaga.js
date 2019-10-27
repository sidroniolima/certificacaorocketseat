import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import meetup from './meetup/sagas';
import organizing from './organizing/sagas';

export default function* rootSata() {
  return yield all([auth, user, meetup, organizing]);
}
