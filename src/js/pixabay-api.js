import axios from 'axios';

// const API_KEY = '51410933-6e28737e6449aa5e8ee5fd880';
// const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export const getImagesByQuery = async (query, page = 1) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '51410933-6e28737e6449aa5e8ee5fd880',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page: page,
    },
  });

  return response.data;
};
