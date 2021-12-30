const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId";


function makeNewBook(title /* string */, author /* string */, year /* number */, isCompleted /* boolean */) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuth = document.createElement("h4");
    textAuth.innerText = author;

    const textAngka = document.createElement("p");
    textAngka.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuth, textAngka);

    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}



function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}


function createTrashButton() {
    return createButton("trash-button", function (event) {

        var yes = confirm("Anda akan menghapus sesuatu ?");
        if (yes) {
            removeTaskFromCompleted(event.target.parentElement);
            document.dispatchEvent(new Event("ondatadelete"));
        } else {
        }
    });
}


function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* callback function */) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}


const checkbox = document.getElementById("inputBookIsComplete");

let check = false;


function addNewBook() {
    if (checkbox.checked) {
        const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

        const textTitle = document.getElementById("inputBookTitle").value;
        const textAuth = document.getElementById("inputBookAuthor").value;
        const tahun = document.getElementById("inputBookYear").value;

        const buku = makeNewBook(textTitle, textAuth, tahun, true);
        const bookObject = composeBookObject(textTitle, textAuth, tahun, true);

        buku[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBOOKList.append(buku);
        updateDataToStorage();

    }
    else {
        const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

        const textTitle = document.getElementById("inputBookTitle").value;
        const textAuth = document.getElementById("inputBookAuthor").value;
        const tahun = document.getElementById("inputBookYear").value;

        const buku = makeNewBook(textTitle, textAuth, tahun, false);
        const bookObject = composeBookObject(textTitle, textAuth, tahun, false);

        buku[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBOOKList.append(buku);
        updateDataToStorage();

    }
}

function addTaskToCompleted(taskElement /* HTMLELement */) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h3").innerText;
    const taskAuth = taskElement.querySelector(".inner > h4").innerText;
    const taskAngka = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeNewBook(taskTitle, taskAuth, taskAngka, true);
    const buku = findBook(taskElement[BOOK_ITEMID]);
    buku.isCompleted = true;
    newBook[BOOK_ITEMID] = buku.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement /* HTMLELement */) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);

    books.splice(bookPosition, 1);
    taskElement.remove();

    updateDataToStorage();

}

function undoTaskFromCompleted(taskElement /* HTMLELement */) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h3").innerText;
    const taskAuth = taskElement.querySelector(".inner > h4").innerText;
    const taskAngka = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeNewBook(taskTitle, taskAuth, taskAngka, false);
    const buku = findBook(taskElement[BOOK_ITEMID]);
    buku.isCompleted = false;
    newBook[BOOK_ITEMID] = buku.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

const submitSearch = document.getElementById("searchSubmit");
submitSearch.addEventListener("click", function (event) {
    const inputSearch = document.getElementById("searchBookTitle").value.toLowerCase();
    const listBook = document.querySelectorAll('.book_item');

    for (buku of listBook) {
        const title = buku.firstElementChild.textContent.toLowerCase();

        if (title.indexOf(inputSearch) != -1) {
            buku.style.display = "block";
            console.log(title);
        } else {
            buku.style.display = "none";
        }
    }
    event.preventDefault();
});

