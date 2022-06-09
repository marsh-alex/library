
// ARRAY TO STORE BOOK OBJECT DATA
let myLibrary = [];

const title = document.getElementById('title');
const author = document.getElementById('author');
const status = document.getElementById('status');
const form = document.getElementById('form')
const tile_container = document.getElementById('tile-container');

// CONSTRUCTOR
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

// FUNCTION TO CLEAR FORM AFTER SUMBIT 
function clearForm() {
    title.value = "";
    author.value = "";
}

// FORM SUBMIT - ADDS BOOK TO MYLIBRARY & LOCAL STORAGE
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
})

// CREATES VISUAL TILE IN DOM
function render() {
    const library = document.getElementById('tile-container');
    const bookTile = document.querySelectorAll('.bookTile');
    bookTile.forEach(bookTile => library.removeChild(bookTile))

    for (let i = 0; i < myLibrary.length; i++) {
        createTile(myLibrary[i]);
    }
}

// SET ITEM TO LOCAL STORAGE 
function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}



// CREATES BOOK TILE
function createTile(item) {
    const library = document.getElementById('tile-container');
    const bookTile = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookStatus = document.createElement('button');
    const bookDelete = document.createElement('button');

    bookTile.setAttribute('id', myLibrary.indexOf(item));
    bookTile.classList.add('bookTile');

    bookTitle.textContent = item.title;
    bookTitle.classList.add('titleTile');
    bookTile.appendChild(bookTitle);

    bookAuthor.textContent = item.author;
    bookAuthor.classList.add('authorTile');
    bookTile.appendChild(bookAuthor);

    bookStatus.classList.add('statusTile');
    bookTile.appendChild(bookStatus);
    if (item.status === 'read') {
        bookStatus.textContent = 'Read';
        bookStatus.style.backgroundColor = '#03cea4';
    } if (item.status === 'not read'){
        bookStatus.textContent = "Not Read";
        bookStatus.style.backgroundColor = '#fb4d3d';
    };

    bookDelete.textContent = 'Delete';
    bookDelete.classList.add('deleteBtn');
    bookTile.appendChild(bookDelete);

    library.appendChild(bookTile);

// DELETES TILE FROM UI AND LOCAL STORAGE
    bookDelete.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        updateLocalStorage();
        render();
    })

    
// UPDATE BOOK TILE STATUS & LOCAL STORAGE
    bookStatus.addEventListener('click', () => {
        if (item.status === "read") {
            item.status = "not read";
        } else (item.status = "read");
        updateLocalStorage();
        render();
        console.log(item.status);
    })
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