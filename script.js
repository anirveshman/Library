const myLibrary = [];


function Book (title, author, noPages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = noPages;
    this.read = haveRead;
    this.id = crypto.randomUUID();
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    }
}

Object.assign(Book.prototype, {
    toggleRead()
    {
        if(this.read == true) this.read = false;
        else this.read = true;
    } 
})

function addBookToLibrary(title, author, noPages, haveRead){
    let book = new Book(title, author, noPages, haveRead);

    myLibrary.push(book);
}

function createCard(book){
    let bookElement = document.createElement("div");
    bookElement.classList.add("book-element");
    let infoElement = document.createElement("p");
    let readElement = document.createElement("div");
    let toggleReadElement = document.createElement("button");
    let removeElement = document.createElement("button");
    let bookid = document.createElement("div");

    let idval = book.id;
    bookid.style.display = "none";
    bookid.textContent = idval;

    infoElement.textContent = book.info();

    readElement.textContent = `${book.read ? "Read" : "Not read"}`;
    readElement.style.backgroundColor = `${book.read ? "green" : "red"}`;
    readElement.classList.add("display-read");

    toggleReadElement.textContent = "Toggle read status";
    toggleReadElement.classList.add("toggle-read");
    toggleReadElement.addEventListener("click", (e) => {
        for(i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id == idval){
                myLibrary[i].toggleRead();
                readElement.textContent = `${myLibrary[i].read ? "Read" : "Not read"}`;
                readElement.style.backgroundColor = `${myLibrary[i].read ? "green" : "red"}`;
                break;
            }
        }
    })

    removeElement.textContent = "Remove book";
    removeElement.classList.add("remove-book");
    removeElement.addEventListener("click", (e) => {
        for(i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id == idval) myLibrary.splice(i, 1);
            break;
        }

        displayLibrary();
    })

    bookElement.appendChild(infoElement);
    bookElement.appendChild(readElement);
    bookElement.appendChild(toggleReadElement);
    bookElement.appendChild(removeElement);


    return bookElement;
}

function displayLibrary(){
    let bookContainer = document.querySelector(".book-container"); 

    bookContainer.replaceChildren(); //removes all children
    

    for(let book of myLibrary){
        let bookElement = createCard(book);
        bookContainer.appendChild(bookElement);
    }
}

const dialog = document.getElementById('book-dialog');
let addNewButton = document.querySelector(".add-new");
const cancelBtn = document.getElementById('cancel');
const form = document.getElementById('book-form');

addNewButton.addEventListener("click", (e) => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", (e) => {
    dialog.close();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    displayLibrary();

    form.reset();
    dialog.close();
})

