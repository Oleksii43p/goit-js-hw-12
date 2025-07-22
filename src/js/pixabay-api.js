import axios from 'axios';


export const getImagesByQuery = query => {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '51410933-6e28737e6449aa5e8ee5fd880',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
};
