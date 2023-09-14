import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(searchValue, page = 1) {
  const params = new URLSearchParams({
    key: '39159092-5eac0eb013dee091934ce15af',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: `${page}`,
  });

  const { data } = await axios.get(`${BASE_URL}?${params}`);
  return data;
}

export { fetchImages };
