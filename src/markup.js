import { gallery } from './index.js'

function addImgMarkup(hits) {
  const imgMarkup = hits
    .map(
      hit => `
  <div class="photo-card">
  <img src="${hit.largeImageURL}" alt="${hit.tags}" loading="lazy" width="250px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hit.downloads}</b>
    </p>
  </div>
</div>  
  `
    )
    .join('');

  return gallery.insertAdjacentHTML('beforeend', imgMarkup);
}

export { addImgMarkup };