import css from '../index.css';

import elements from './views/elements'
import Sneakers from './models/Sneaker';
import Users from './models/Users';
import LS from './models/LS';
import Modal from './models/Modal';

import renderSneakers from './views/sneakerView';
import { renderFavorites, clearFavorites, deleteFromFavorites } from './views/favoriteView' 
import { renderLoader, clearLoader } from './views/loaderView';
import renderPagination from './views/paginationView';

const state = {
  pages: {
    page: 1,
    limit: 6,
    lastPage: 1,
    sort: 'id',
    order: 'asc',
  },
}

state.ls = new LS('sneakers');
state.modal = new Modal();

const fillMainContentent = () => {
  renderLoader(elements.loaderParent);
  
  state.sneakers.getData(state.pages.page, state.pages.limit, state.pages.sort, state.pages.order)
  .then(() => {
    updateLocalStorage();
    clearLoader(elements.loaderParent)
    renderSneakers(state.sneakers.data, state.sneakers.dataAll);
    renderPagination(state.pages.page, state.pages.lastPage);
    renderFavorites(state.sneakers.dataAll);
  })
  .catch(error => console.error('getData fetching error', error));
}

const updateLocalStorage = () => {
  if (state.ls.isSneakerLocalStorage()) {
    state.sneakers.dataAll.forEach((element) => {
      if (state.ls.isIdInLocalStorage(element.id)) {
        element.favorites = true;
      } else {
        element.favorites = false;
      }
    });
  }
}

const closeModalWindow = () => {
  elements.modalWindow.style.display = 'none';
  elements.modal.classList.remove("active");
  elements.overlay.classList.remove("active");
}

window.addEventListener('load', () => {
  renderLoader(elements.loaderParent);
  state.sneakers = new Sneakers('http://localhost:3000/sneakers');
  state.users = new Users('http://localhost:3000/users');
  state.sneakers.getAllData()
    .then(() => {
      state.pages.lastPage = Math.ceil(state.sneakers.dataAll.length / state.pages.limit);
      fillMainContentent();
      clearLoader(elements.loaderParent);
    })
    .catch(error => console.error('getAllData fetching error', error));
});

elements.sortGroup.addEventListener('click', (event) => {
  let buttonSort = event.target.closest('button');

  if (!buttonSort) return;

  switch(buttonSort.id) {
    case "retail-desc":
      state.pages.page = 1;
      state.pages.sort = "retail_price";
      state.pages.order = "desc";
      break;
    case "retail-asc":
      state.pages.page = 1;
      state.pages.sort = "retail_price";
      state.pages.order = "asc";
      break;
    case "resale-desc":
      state.pages.page = 1;
      state.pages.sort = "resale_price";
      state.pages.order = "desc";
      break;
    case "resale-asc":
      state.pages.page = 1;
      state.pages.sort = "resale_price";
      state.pages.order = "asc";
      break;
  }
  fillMainContentent();
});

elements.pagination.addEventListener('click', (event) => {
  let navButton = event.target.closest('button');
  let icon = event.target.closest('span');

  if (!navButton || icon.classList.contains('md-inactive')) return;

  switch(navButton.id) {
    case "first-page": 
      state.pages.page = 1;
      break;
    case "prev-page": 
      state.pages.page--;
      break;
    case "next-page": 
      state.pages.page++;
      break;
    case "last-page":
      state.pages.page = state.pages.lastPage;
      break;
  }
  fillMainContentent();
});

[elements.sneakerList].forEach(element => {
  element.addEventListener('click', (event) => {
    let buttonSave = event.target.closest('button');
    if (!buttonSave) return;

    const elementId = Number(buttonSave.dataset.id);
    state.ls.toggle(elementId);
    updateLocalStorage();
    renderSneakers(state.sneakers.data, state.sneakers.dataAll);
    renderFavorites(state.sneakers.dataAll);
  });
});

elements.modal.addEventListener('click', (event) => {
  let buttonClear = event.target.closest('button');
  if (!buttonClear) return;

  if (buttonClear.dataset.clear) {
    clearFavorites();
    state.ls.delAllFromLocalStorage();
    state.sneakers.dataAll.forEach(element => {
      element.favorites = false;
    });
    renderSneakers(state.sneakers.data, state.sneakers.dataAll);
  }
});

elements.modal.addEventListener('click', (event) => {
  if (event.target.dataset.delcard) {
    let favCard = event.target.closest('div');
    if (favCard.classList.contains('fav-sneaker-card')) {
      const elementId = Number(event.target.dataset.id);  

      deleteFromFavorites(favCard);
      let currentSneaker = state.sneakers.dataAll.find(sneaker => sneaker.id === elementId);
      currentSneaker.favorites = false;
      state.ls.toggle(elementId);
      
      renderSneakers(state.sneakers.data, state.sneakers.dataAll);
      renderFavorites(state.sneakers.dataAll);
    }
  }
    
});

elements.openModal.addEventListener('click', () => {
  elements.modalWindow.style.display = 'block';
  elements.modal.classList.add("active");
  elements.overlay.classList.add("active");
});


window.addEventListener('click', (event) => {
  if ((event.target === elements.overlay) || (event.target.dataset.modal === 'close')) {
    closeModalWindow();
  }
});

elements.inputEmail.addEventListener('keyup', (event) => {
  state.modal.setEmail(event.target.value);

  state.modal.submitButtonDisabled
  if (!state.modal.submitButtonDisabled) {
    elements.modalSave.disabled = false;
  } else {
    elements.modalSave.disabled = true;
  }
});

elements.modalSave.addEventListener('click', () => {
  if (state.modal.emailCheck) {
    let favSneakers = state.sneakers.data.filter(sneaker => sneaker.favorites).map(sneaker => sneaker.id);
    state.users.postData(state.modal.email, favSneakers)
      .catch(error => console.error('post error', error));
    closeModalWindow();
  }
});