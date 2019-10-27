export function updateProfileRequest(data) {
  return {
    type: '@user/PROFILE_UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/PROFILE_UPDATE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/PROFILE_UPDATE_REQUEST',
  };
}
