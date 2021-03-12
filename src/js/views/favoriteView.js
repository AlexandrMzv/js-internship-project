import elements from "./elements";

const renderFavorite = (sneaker) => {
  const { id, model, img } = sneaker;
  return `
    <div class="fav-sneaker-card">
      <img class="fav-sneaker-img" src=${img} alt=${model}>
      <span data-favorites=${id} class="fav-sneaker-title" style="line-height: 75px">${model}</span>
      <span data-delcard="delcard" data-id=${id} class="material-icons detele-card-btn">
        delete
      </span>
    </div>
  `
}

const btnClearFavorites = () => {
  return `
    <button data-clear="clear" class="modal-btn btn-clear-fav">
      <span class="material-icons">
        delete
      </span>
      <span class="fav-button-text" style="vertical-align: super;">
        Удалить все
      </span>
    </button>
  `
}

export const deleteFromFavorites = (node) => {
  node.remove();
}

export const clearFavorites = () => {
  elements.modalBody.innerHTML = '';
}

export const renderFavorites = ((sneakers) => {
  clearFavorites();
  sneakers = sneakers.filter(sneaker => sneaker.favorites);
  let favoriteSneakers = sneakers.map(sneaker => renderFavorite(sneaker)).join('');

  if (sneakers.length) {
    favoriteSneakers += btnClearFavorites();
  }

  elements.modalBody.insertAdjacentHTML('beforeend', favoriteSneakers);
})