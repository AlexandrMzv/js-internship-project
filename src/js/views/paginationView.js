import elements from "./elements";

const renderPagination = (page, lastPage) => {
  clearPagination();

  const html = `
     <button id="first-page" class="pag-btn">
       <span class="material-icons md-48 ${page === 1 ? "md-inactive" : ""}">
         first_page
       </span>
     </button>
     <button id="prev-page" class="pag-btn">
       <span class="material-icons md-48 ${page === 1 ? "md-inactive" : ""}">
         navigate_before
       </span>
     </button>
     <span class="material-icons md-48 page-number">
       ${page}
     </span>
     <button id="next-page" class="pag-btn">
       <span class="material-icons md-48 ${page === lastPage ? "md-inactive" : ""}">
         navigate_next
       </span>
     </button>
     <button id="last-page" class="pag-btn">
       <span class="material-icons md-48 ${page === lastPage ? "md-inactive" : ""}">
         last_page
       </span>
     </button>
    `
  elements.pagination.insertAdjacentHTML('beforeend', html);
}

const clearPagination = () => {
  elements.pagination.innerHTML = '';
}

export default renderPagination;