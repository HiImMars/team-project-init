function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
            <a class="gallery__link link" href=${largeImageURL}>
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                <span class="number-wrapper">${likes}</span>
                </p>
                <p class="info-item">
                <b>Views</b>
                <span class="number-wrapper">${views}</span>
                </p>
                <p class="info-item">
                <b>Comments</b>
                <span class="number-wrapper">${comments}</span>
                </p>
                <p class="info-item">
                <b>Downloads</b>
                <span class="number-wrapper">${downloads}</span>
                </p>
            </div>
        </div>`
    )
    .join('');
}

export { createMarkup };
