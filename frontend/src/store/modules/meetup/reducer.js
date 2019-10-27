import { produce } from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetup: {},
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/NEW_MEETUP': {
        draft.meetup = {};
        break;
      }

      case '@meetup/SAVE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/SAVE_SUCCESS': {
        draft.loading = false;
        draft.meetup = action.payload.meetup;
        break;
      }

      case '@meetup/SAVE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@meetup/FETCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/FETCH_SUCCESS': {
        draft.loading = false;
        draft.meetup = action.payload.meetup;
        break;
      }

      case '@meetup/FETCH_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
