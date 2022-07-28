export default function renderPaginationLinks(data) {
  let pathName = document.location.pathname;
  let total = Number(data.total);
  let currentPage = Number(data.page);
  let limit = data.limit;
  let pages = Math.ceil(total / limit);
  let param = data.param ? '&' + data.param : '';

  if (pages === 1) {
    return;
  }

  let paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');

  if (currentPage !== 1) {
    let firstPaginationPageItem = document.createElement('a');
    firstPaginationPageItem.href = `.${pathName}?page=1&limit=${limit}${param}`;
    firstPaginationPageItem.textContent = 'First';
    
    let prevPaginationPageItem = document.createElement('a');
    prevPaginationPageItem.href = `.${pathName}?page=${currentPage - 1}&limit=${limit}${param}`
    prevPaginationPageItem.textContent = 'Prev';
  
    paginationWrapper.append(firstPaginationPageItem, prevPaginationPageItem);
  }

  for (let i = 1; i <= pages; i++) {
    let paginationListItem;

    if (i === currentPage) {
      paginationListItem = document.createElement('span');
      paginationListItem.classList.add('current-page');
    } else {
      paginationListItem = document.createElement('a');
      paginationListItem.href = `.${pathName}?page=${i}&limit=${limit}${param}`;
    }

    paginationListItem.classList.add('pagination-item');
    paginationListItem.textContent = i;
    paginationWrapper.append(paginationListItem);
  }

  if (currentPage !== pages) {
    let lastPaginationPageItem = document.createElement('a');
    lastPaginationPageItem.href = `.${pathName}?page=${pages}&limit=${limit}${param}`;
    lastPaginationPageItem.textContent = 'Last';

    let nextPaginationPageItem = document.createElement('a');
    nextPaginationPageItem.href = `.${pathName}?page=${currentPage + 1}&limit=${limit}${param}`;
    nextPaginationPageItem.textContent = 'Next';

    paginationWrapper.append(nextPaginationPageItem, lastPaginationPageItem);
  }

  data.parentElement.append(paginationWrapper);
}