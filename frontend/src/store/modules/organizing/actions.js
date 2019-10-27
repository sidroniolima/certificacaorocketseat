export function fetchOrganizingRequest() {
  return { type: '@organizing/FETCH_ORGANIZING_REQUEST' };
}

export function fetchOrganizingSuccess(meetups) {
  return { type: '@organizing/FETCH_ORGANIZING_SUCCESS', payload: { meetups } };
}

export function fetchOrganizingFailure() {
  return { type: '@organizing/FETCH_ORGANIZING_FAILURE' };
}
