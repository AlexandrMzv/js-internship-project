import elements from "./elements";

const renderSneaker = (sneaker, favorite) => {
  const { id, model, img, colorway, release_date, retail_price, resale_price } = sneaker;
  return `
    <div class="sneaker-card">
       <h3 class="sneaker-title">${model}</h3>
       <img class="sneaker-img" src=${img} alt=${model}>
       <p class="colorway">${colorway}</p>
       <p>${release_date}</p>
       <p>retail: $${retail_price}</p>
       <p>resale: $${resale_price}</p>
       <button data-id="${id}" class="add-to-favorite">
        <span class="material-icons">
          ${(!favorite)
            ? "favorite_border"
            : "favorite"}
        </span>
       </button>
     </div>
    `
}

const clearSneakers = () => {
  elements.sneakerList.innerHTML = '';
}

const renderSneakers = (sneakers, allSneakers) => {
  clearSneakers();
  
  const allFavorites = allSneakers.map(sneaker => sneaker.favorites);
  const sneakerCards = sneakers.map(sneaker => renderSneaker(sneaker, allFavorites[sneaker.id - 1])).join('');
  elements.sneakerList.insertAdjacentHTML('beforeend', sneakerCards);
}

export default renderSneakers;