import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import decodeJwt from 'jwt-decode';
import AppConfig from './../AppConfig';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const {username, password} = params;
    const request = new Request(`${AppConfig.endpoint}api/login_check`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({token}) => {
        const decodedToken = decodeJwt(token);
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(Object.values(decodedToken.roles)));
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.reject();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const rawRoles = localStorage.getItem('roles');
    return null != rawRoles ? Promise.resolve(JSON.parse(rawRoles)) : Promise.reject();
  }

  return Promise.reject('Unkown method');
};
