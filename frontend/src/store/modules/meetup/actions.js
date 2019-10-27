export function newMeetup() {
  return { type: '@meetup/NEW_MEETUP' };
}

export function saveRequest(data) {
  return { type: '@meetup/SAVE_REQUEST', payload: { data } };
}

export function saveSuccess(meetup) {
  return { type: '@meetup/SAVE_SUCCESS', payload: { meetup } };
}

export function saveFailure() {
  return { type: '@meetup/SAVE_FAILURE' };
}

export function fetchRequest(id) {
  return { type: '@meetup/FETCH_REQUEST', payload: { id } };
}

export function fetchSuccess(meetup) {
  return { type: '@meetup/FETCH_SUCCESS', payload: { meetup } };
}

export function fetchFailure() {
  return { type: '@meetup/FETCH_FAILURE' };
}
