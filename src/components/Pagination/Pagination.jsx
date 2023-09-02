document.addEventListener('DOMContentLoaded', function () {
  const data = [...]; // Agregar mas adelante los datos.
  const itemsPerPage = 8; 
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let currentPage = 1;
    // Cambiar las variables y demas dependiendo del nombre que le pongamos a las cosas.

  function showCurrentPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);
    
    // 
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = currentPageData.join('<br>');
    
  
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.textContent == currentPage) {
        page.classList.add('active');
      }
    });

    
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = currentPage;
    const totalPagesElement = document.getElementById('totalPages');
    totalPagesElement.textContent = totalPages;
  }

 
  function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
      showCurrentPageData();
    }
  }

 
  const pagination = document.getElementById('pagination');
  pagination.addEventListener('click', function (event) {
    if (event.target.classList.contains('page')) {
      const pageNumber = parseInt(event.target.textContent);
      goToPage(pageNumber);
    }
  });

  
  showCurrentPageData();
});

// HTML.

