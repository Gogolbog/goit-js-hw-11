import './styles.css';
import Notiflix from 'notiflix';
import SearchFormApiService from './api.js';
import { addImgMarkup } from './markup.js';
import LoadMoreBtn from './loadMoreBtn.js';
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
  searchFormApiService.axiosSearchForm().then(hits => {

    loadMoreBtn.disable();


    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } 


    if (searchFormApiService.query === '') {
      return Notiflix.Notify.failure('Please fill input, nothing to search.');
    }

    clearGallery();
    loadMoreBtn.show();
    addImgMarkup(hits);
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  searchFormApiService.axiosSearchForm().then(hits => {
    if (hits.length < 40) {
       Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
    addImgMarkup(hits)
  });

      
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showTotalHits(totalHits) {
  return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}