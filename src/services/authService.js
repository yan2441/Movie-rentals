import http from './httpServices';
import config from '../config.json';
import jwtDecode from 'jwt-decode';


const apiEndPoint = config.apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password })
  localStorage.setItem("token", jwt)
}

export async function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt)
}

export function logout() {
  localStorage.removeItem('token')
}

export function getCurrentUser(params) {
  try {
    const jwt = localStorage.getItem('token')
    return jwtDecode(jwt)
  } catch (ex) {
    return null
  }
}

export function getJwt() {
  return localStorage.getItem('token')
}