import './styles.css';
import Notiflix from 'notiflix';
import SearchFormApiService from './api.js';
import { addImgMarkup } from './markup.js';
import LoadMoreBtn from './loadMoreBtn.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


export { gallery };
  

const gallery = document.querySelector('.gallery');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
const searchForm = document.getElementById('search-form');
const searchFormApiService = new SearchFormApiService();


searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', onLoadMore);



function onSubmit(e) {
  e.preventDefault();

  searchFormApiService.query = e.currentTarget.elements.searchQuery.value;
  searchFormApiService.resetPage();
  searchFormApiService.axiosSearchForm().then(data => {

    loadMoreBtn.disable();

    if (data.hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } 
 
    if (searchFormApiService.query === '') {
      return Notiflix.Notify.failure('Please fill input, nothing to search.');
    }

    clearGallery();
    loadMoreBtn.show();
    addImgMarkup(data.hits);
    loadMoreBtn.enable();
    showTotalHits(data);

    if (data.hits.length < 40) {
      return loadMoreBtn.hide();
    }

    creatLightBox();
  });
}

function onLoadMore() {
  searchFormApiService.axiosSearchForm().then(data => {
    if (data.hits.length < 40) {
       Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
    addImgMarkup(data.hits);
    creatLightBox();
  });

}

function clearGallery() {
  gallery.innerHTML = '';
}

function showTotalHits(data) {
  return Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function creatLightBox () {
  return new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionsDelay: 250,
  }).refresh();
}