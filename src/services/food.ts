import callAPI from '../config/api';
import { FoodCreateTypes } from './data-types';

const ROOT_API = "http://localhost:8000";
const API_VERSION = 'api/v1';

export async function getFoodDetail(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/food/${id}`;

  return callAPI({
    url,
    method: 'GET',
    token: true
  });
}

export async function setFoodCreate(data: FoodCreateTypes) {
  const url = `${ROOT_API}/${API_VERSION}/food`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  });
}

export async function setFoodUpdate(data: FoodCreateTypes, id: any) {
  const url = `${ROOT_API}/${API_VERSION}/food/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true
  });
}

export async function setFoodDelete(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/food/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true
  });
}

export async function fetchFood() {
  const url = `${ROOT_API}/${API_VERSION}/food`;

  return callAPI({
    url,
    method: 'GET',
    token: true
  });
}
