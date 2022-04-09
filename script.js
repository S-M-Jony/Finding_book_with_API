const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    ///console.log(searchText);
    searchField.value = "";

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
    
}

const displaySearchResult = books =>{
    //console.log(books);
    const totalFindingBook = document.getElementById('total-book');
    const errorText = document.getElementById('error-text');
    totalFindingBook.textContent = '';
    errorText.textContent = '';
    errorText.innerHTML = `
        <h2 class="text-center text-primary bg-white p-3 w-60">Total Finding Books : ${books.num_found}</h2>
    `;
    if(books.num_found === 0){
        errorText.innerHTML = `
            <h2 class="text-center text-danger bg-dark w-60 p-3 mx-auo">Please Enter right spelling!!!!</h2>
        `
    }

    const searchResult = document.getElementById('search-result');
    
    searchResult.textContent = '';

    books.docs.forEach(book => {
        //console.log(book);
        //console.log(book.length);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card shadow">
                    <img id="book-img" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid img-thumbnail rounded" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>

                        <p>Author Name : ${(book.author_name) ? book.author_name : 'Unknown'}</p>
                        <p>First Published Date :${(book.first_publish_year) ? book.first_publish_year :'Unknown'}</p>

                        <p>Publisher : ${(book.publisher) ? book.publisher : 'Unknown'}
                        
                    </div>
                </div>
            <br>
            
        `;
        searchResult.appendChild(div);
    });
}