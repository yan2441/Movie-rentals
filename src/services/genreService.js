import http from './httpServices';

export function getGenres() {
  return http.get("http://localhost:3900/api/genres")
}