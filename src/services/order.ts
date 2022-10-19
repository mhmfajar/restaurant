import callAPI from '../config/api';

const ROOT_API = "http://localhost:8000";
const API_VERSION = 'api/v1';

export async function getOrders() {
  const url = `${ROOT_API}/${API_VERSION}/order`;
  
  return callAPI({
    url,
    method: 'GET',
    token: true
  });
}

export async function getOrderDetail(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/order/${id}`;
  
  return callAPI({
    url,
    method: 'GET',
    token: true
  });
};

export async function setOrderTable(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/order-table`;
  const data = {
    id
  }

  return callAPI({
    url,
    method: 'POST',
    data: data,
    token: true
  });
}

export async function setCloseOrder(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/close-order`;
  const data = {
    id
  }

  return callAPI({
    url,
    method: 'PUT',
    data: data,
    token: true
  });
}

export async function setAddOrderDetails(data: any) {
  const url = `${ROOT_API}/${API_VERSION}/order/add`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true
  });
}

export async function setUpdateOrderDetails(data: any) {
  const url = `${ROOT_API}/${API_VERSION}/order/update`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true
  });
}

export async function setDeleteOrderDetails(id: any) {
  const url = `${ROOT_API}/${API_VERSION}/order/delete/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true
  });
}