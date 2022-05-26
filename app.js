const title = document.getElementById('title');
const author = document.getElementById('author');
const status = document.getElementById('status');
const form = document.getElementById('form')
const tile_container = document.getElementById('tile-container');

// Form submit - adds book to library + local storage
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
})


let myLibrary = [];

class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

//ADDS BOOK TO LIBRARY AND LOCAL STORAGE
function addBookToLibrary() {
    if (title.value.legnth === 0 || author.value.length === 0) {
        alert("Please fill all fields");
        return;
    }
    const newBook = new Book(title.value, author.value, status.value);
    myLibrary.push(newBook);
    updateLocalStorage();
    render();
}

// Set Item to Local Storage 
function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// CLEAR FORM
function clearForm() {
    title.value = "";
    author.value = "";
}

//CREATES BOOK TILE
function createTile(item) {
    const library = document.getElementById('tile-container');
    const bookTile = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookStatus = document.createElement('select');
    const statusOption = document.createElement('option');
    const bookDelete = document.createElement('button');

    bookTile.setAttribute('id', myLibrary.indexOf(item));

    bookTitle.textContent = item.title;
    bookTitle.classList.add('titleTile');
    bookTile.appendChild(bookTitle);

    bookAuthor.textContent = item.author;
    bookAuthor.classList.add('authorTile');
    bookTile.appendChild(bookAuthor);

    bookStatus.textContent = item.status;
    bookStatus.classList.add('statusTile');
    bookTile.appendChild(bookStatus);

    statusOption.textContent = 'Read';
    statusOption.value = 'Read';
    bookStatus.appendChild(statusOption);

    statusOption.textContent = 'Not Read';
    statusOption.value = "Not Read";

    statusOption.textContent = 'Reading';
    statusOption.value = "Reading";
    bookStatus.appendChild(statusOption);

    bookDelete.textContent = 'Delete';
    bookDelete.classList.add('deleteBtn');
    bookTile.appendChild(bookDelete);

    library.appendChild(bookTile);
}

//Creates visual tile in browser
function render() {
    const library = document.getElementById('tile-container');
    const bookTile = document.querySelectorAll('.bookTile');
    bookTile.forEach(bookTile => library.removeChild(bookTile))

    for (let i = 0; i < myLibrary.length; i++) {
        createTile(myLibrary[i]);
    }
}

//Renders books from local storage after page refresh
function restore() {
    if (!localStorage.myLibrary) {
        render();
    } else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();