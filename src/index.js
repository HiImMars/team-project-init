import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/markup';
import { fetchImages } from './js/api';
// axios.defaults.headers.common['key'] = '39159092-5eac0eb013dee091934ce15af';
const form = document.querySelector('.search-form');
const imagesContainer = document.querySelector('.gallery');
const guardJs = document.querySelector('.js-guard');

form.addEventListener('submit', onFormSubmit);
const simpleLightbox = new SimpleLightbox('.gallery a');

let searchValue;
let page = 1;

async function onFormSubmit(event) {
  try {
    event.preventDefault();
    observer.unobserve(guardJs);
    imagesContainer.innerHTML = '';
    page = 1;
    Notiflix.Loading.circle();
    searchValue = form.elements.searchQuery.value.trim();
    if (searchValue === '') {
      Notiflix.Report.warning(
        'Invalid input! Please enter a valid search query'
      );
      Notiflix.Loading.remove();
      return;
    } else {
      const { hits, totalHits } = await fetchImages(searchValue);
      if (totalHits === 0) {
        Notiflix.Report.warning("Haven't found images", 'Please try again');
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
      imagesContainer.innerHTML = createMarkup(hits);
      simpleLightbox.refresh();
      event.target.reset();
      observer.observe(guardJs);
    }
  } catch (error) {
    Notiflix.Report.failure('Oops!', 'Please enter a valid search query');
    console.log(error);
  } finally {
    Notiflix.Loading.remove();
  }
}

async function fetchMoreImages() {
  try {
    Notiflix.Loading.circle();
    page += 1;
    const { hits, totalHits } = await fetchImages(searchValue, page);
    imagesContainer.insertAdjacentHTML('beforeend', createMarkup(hits));
    simpleLightbox.refresh();
    if (hits.length < 40) {
      observer.unobserve(guardJs);
    }
    if (page > Math.round(totalHits / 40)) {
      setTimeout(() => {
        Notiflix.Report.warning("That's all! :)");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    Notiflix.Report.warning("That's all! :)");
  } finally {
    Notiflix.Loading.remove();
  }
}

let options = {
  root: null,
  rootMargin: '10px',
  threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

async function handlerPagination(entries, observer) {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      await fetchMoreImages();
    }
  }
}
