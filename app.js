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

// CONSTRUCTOR
let myLibrary = [];

class Book {
    constructor(title, author, status) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.status = form.status.value;
    }
}

// FUNCTION TO ADD BOOK TO LIBRARY AND LOCAL STORAGE
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

// SET ITEM TO LOCAL STORAGE 
function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// FUNCTION TO CLEAR FORM AFTER SUMBIT 
function clearForm() {
    title.value = "";
    author.value = "";
}

// CREATES BOOK TILE
function createTile(item) {
    const library = document.getElementById('tile-container');
    const bookTile = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookStatus = document.createElement('select');
    const statusOption = document.createElement('option');
    const statusOptionNR = document.createElement('option');
    const statusOptionReading = document.createElement('option');
    const bookDelete = document.createElement('button');

    bookTile.setAttribute('id', myLibrary.indexOf(item));
    bookTile.classList.add('bookTile');

    bookTitle.textContent = item.title;
    bookTitle.classList.add('titleTile');
    bookTile.appendChild(bookTitle);

    bookAuthor.textContent = item.author;
    bookAuthor.classList.add('authorTile');
    bookTile.appendChild(bookAuthor);

    //bookStatus.value = bookStatus.selectedOptions.value;
    //bookStatus.value = 
    bookStatus.classList.add('statusTile');
    bookTile.appendChild(bookStatus);

    statusOption.textContent = 'read';
    statusOption.value = 'read';
    bookStatus.appendChild(statusOption);

    statusOptionNR.textContent = 'not read';
    statusOptionNR.value = "not read";
    bookStatus.appendChild(statusOptionNR)

    statusOptionReading.textContent = 'reading';
    statusOptionReading.value = "reading";
    bookStatus.appendChild(statusOptionReading);

    bookDelete.textContent = 'Delete';
    bookDelete.classList.add('deleteBtn');
    bookTile.appendChild(bookDelete);

    library.appendChild(bookTile);

// UPDATE LOCAL STORAGE WHEN BOOK TILE STATUS UPDATES
    bookStatus.addEventListener('change', () => {
        item.status = bookStatus.value;
        console.log(bookStatus.value);
        updateLocalStorage();
        render();
    })
    
}




// CREATES VISUAL TILE IN DOM
function render() {
    const library = document.getElementById('tile-container');
    const bookTile = document.querySelectorAll('.bookTile');
    bookTile.forEach(bookTile => library.removeChild(bookTile))

    for (let i = 0; i < myLibrary.length; i++) {
        createTile(myLibrary[i]);
    }
}

// RENDERS BOOKS FROM STORAGE AFTER PAGE REFRESH
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