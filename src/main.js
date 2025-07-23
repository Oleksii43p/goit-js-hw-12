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
    } else {
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
refs.button.addEventListener('click', onLoadMore);

// funny moment

const input = document.querySelector('input[name="search-text"]');
const searchBtn = document.querySelector('button[type="submit"]');
const audio = new Audio('./sounds/run.mp3');

function moveButton() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const randomX = Math.floor(
    Math.random() * (windowWidth - searchBtn.offsetWidth)
  );
  const randomY = Math.floor(
    Math.random() * (windowHeight - searchBtn.offsetHeight)
  );

  searchBtn.style.position = 'fixed';
  searchBtn.style.left = `${randomX}px`;
  searchBtn.style.top = `${randomY}px`;
}

function shakeButton(times = 6, distance = 5, speed = 40) {
  let count = 0;
  const startX = parseInt(searchBtn.style.left, 10) || searchBtn.offsetLeft;
  const startY = parseInt(searchBtn.style.top, 10) || searchBtn.offsetTop;

  const interval = setInterval(() => {
    const offsetX = (Math.random() - 0.5) * distance * 2;
    const offsetY = (Math.random() - 0.5) * distance * 2;
    searchBtn.style.left = `${startX + offsetX}px`;
    searchBtn.style.top = `${startY + offsetY}px`;

    count++;
    if (count >= times) {
      clearInterval(interval);
      searchBtn.style.left = `${startX}px`;
      searchBtn.style.top = `${startY}px`;
    }
  }, speed);
}

searchBtn.addEventListener('mouseenter', () => {
  if (!input.value.trim()) {
    moveButton();
    shakeButton();
    audio.currentTime = 0;
    audio.play();
  }
});

