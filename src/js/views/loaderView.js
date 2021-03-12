export const renderLoader = (parent) => {
  const loader = `
     <div class="loader-wrapper">
       <div class="lds-dual-ring"></div>
     </div>
    `
  parent.insertAdjacentHTML('beforeend', loader);
}

export const clearLoader = (parent) => {
  parent.innerHTML = '';
}