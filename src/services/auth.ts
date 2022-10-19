import callAPI from '../config/api';
import { LoginTypes } from './data-types';

const ROOT_API = "http://localhost:8000";
const API_VERSION = 'api/v1';

export async function getAuth() {
  const url = `${ROOT_API}/${API_VERSION}/check-login`;

  return callAPI({
    url,
    method: 'GET',
    token: true
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/login`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogout() {
  const url = `${ROOT_API}/${API_VERSION}/logout`;

  return callAPI({
    url,
    method: 'POST',
    token: true
  });
}
