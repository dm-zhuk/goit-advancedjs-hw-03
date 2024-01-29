import axios from 'axios';

const API_KEY =
  'live_Zuu1PB5DCXr8IC90o7QvjqwUwjyaEDC5Biv1MSecsCZxv5jxKZHuSX5mZ2ZjZp62';
const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_ENDPOINT = `${BASE_URL}/breeds`;
const IMAGES_ENDPOINT = `${BASE_URL}/images/search`;

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${BREEDS_ENDPOINT}`)
    .then(response => response.data)
    .catch(error => console.error(error));
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${IMAGES_ENDPOINT}?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => console.error(error));
}
