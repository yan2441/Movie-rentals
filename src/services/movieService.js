import http from './httpServices';
export function getMovies() {
  return http.get('http://localhost:3900/api/movies')
}

export function deleteMovie(id) {
  return http.delete('http://localhost:3900/api/movies'+'/'+id)
}
