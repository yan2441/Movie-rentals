import http from './httpServices';
import config from '../config.json';

const apiEndPoint = config.apiUrl + "/auth";

export function login(email,password){
  return http.post(apiEndPoint ,{email ,password})
}