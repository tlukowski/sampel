var search = document.querySelector('.knowledge-search');

document.addEventListener("DOMContentLoaded", function() { 
    const filters = document.querySelector('#Filters');
    if(filters){
        filterHandler()
    }
    if (search){
        toggleSearch()
    }    
});

function filterHandler(){
    const buttonHandler = document.querySelector("#filtersHandler") 
    const removeFilter = document.querySelectorAll('.list__selected-btn--remove');
    const filterButton = document.querySelectorAll('.filter-title');
    const filterOverlay = document.querySelector('.filters-overlay');
    const closeButton = document.querySelector('.Filters-close button');
    const clearButton = document.querySelector('#filtersClear');
    const searchbar = document.querySelector('.knowledge__searchbar')
    buttonHandler.addEventListener("click", function(e){
        e.preventDefault(); 
        bodyToggler()
    });

    filterButton.forEach(box => {
        box.addEventListener('click', function handleClick(event) {
            bodyToggler()
            body.classList.add('title-chosen');
        });
      });
    removeFilter.forEach(e => {
        e.addEventListener('click', function handleClick(event) {
            e.parentElement.classList.remove('selected')
        });
      });
    filterOverlay.addEventListener("click", function(){    
        bodyToggler()
    });
    closeButton.addEventListener("click", function(){    
        bodyToggler()
    });
    clearButton.addEventListener("click", function(e){    
        e.preventDefault();
        body.classList.remove('title-chosen');
        searchbar.setAttribute('style', 'top:0px;');
    });
}

function bodyToggler(){
    body.classList.toggle('open-filters');
}

function toggleSearch(){
    const searchButton = document.querySelector('.knowledge__searchbar-btn');
    const searchRemoveButton = document.querySelector('.knowledge__searchbar-btn--remove');
    
    searchButton.addEventListener('click',function(){
        search.classList.add('knowledge-search--searched');
    })
    searchRemoveButton.addEventListener('click',function(){
        search.classList.remove('knowledge-search--searched');
        clearSearch()
    })
}

function clearSearch(){
    const searchInput = document.querySelector('.searchbar');
    searchInput.value="";
}