import { produce } from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetups: [],
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@organizing/FETCH_ORGANIZING_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@organizing/FETCH_ORGANIZING_SUCCESS': {
        draft.loading = false;
        draft.meetups = action.payload.meetups;
        break;
      }

      case '@organizing/FETCH_ORGANIZING_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
