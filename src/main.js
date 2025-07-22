import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import 'loaders.css/loaders.min.css';

const refs = {
  form: document.querySelector('form'),
};

const onFormSubmit = event => {
  event.preventDefault();

  const searchedText = event.target.elements['search-text'].value.trim();

  if (!searchedText) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search field cannot be empty.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(searchedText)
    .then(data => {
      const images = data.hits;

      if (images.length === 0) {
        iziToast.info({
          title: 'No results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      createGallery(images);
    })

    .catch(error => {
      console.error('Error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
};

refs.form.addEventListener('submit', onFormSubmit);
