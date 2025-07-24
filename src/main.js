import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('.load-more'),
};

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalPages = 0;

const onFormSubmit = async event => {
  event.preventDefault();

  hideLoadMoreButton();
  refs.button.removeEventListener('click', onLoadMore);

  currentQuery = event.target.elements['search-text'].value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search field cannot be empty.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  currentPage = 1;
  showLoader();
  await new Promise(requestAnimationFrame);
  const data = await getImagesByQuery(currentQuery, currentPage);

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;
    totalPages = Math.ceil(data.totalHits / perPage);

    if (images.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, no images match your search query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(images);

    if (totalPages > 1) {
      showLoadMoreButton();
      refs.button.addEventListener('click', onLoadMore);
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

const onLoadMore = async () => {
  currentPage += 1;
  showLoader();
  await new Promise(requestAnimationFrame);
  const data = await getImagesByQuery(currentQuery, currentPage);

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;
    createGallery(images);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2 + 16,
      behavior: 'smooth',
    });

    if (currentPage >= totalPages) {
      refs.button.removeEventListener('click', onLoadMore);
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onFormSubmit);
// refs.button.addEventListener('click', onLoadMore);

// === funny moment ===

const input = document.querySelector('input[name="search-text"]');
const searchBtn = document.querySelector('.search-btn');
const wrapper = document.querySelector('.input-wrapper');

searchBtn.addEventListener('mouseenter', () => {
  const value = input.value.trim();

  if (value.length === 0) {
    const btnWidth = searchBtn.offsetWidth;
    const btnHeight = searchBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    searchBtn.style.position = 'fixed';
    searchBtn.style.left = `${randomX}px`;
    searchBtn.style.top = `${randomY}px`;
  }
});

input.addEventListener('input', () => {
  const value = input.value.trim();

  if (value.length > 0) {
    searchBtn.style.position = 'absolute';
    searchBtn.style.left = '100%';
    searchBtn.style.top = '0';
  }
});
