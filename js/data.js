const STORAGE_KEY = "BOOKSHELF_APPS";   // Berfungsi untuk menyediakan key yang digunakan untuk mengakses data pada local storage


// Sebuah global variable yang digunakan untuk menyimpan data temporary
let books = [];

// Fungsi yang digunakan untuk mengecek dukungan web storage pada browser
function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

// Fungsi yang digunakan untuk menyimpan data ke storage
function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// Memuat data dari web storage ke dalam variabel
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

// Fungsi yang digunakan sebagai perantara dalam menyimpan data sebelum memanggil saveData()
function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

// Fungsi yang digunakan untuk membuat objek book baru dari beberapa parameter
function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

// Mencari objek task book yang ada pada array berdasarkan ID yang di input pada argumen pertama
function findBook(bookId) {
    for (buku of books) {
        if (buku.id === bookId)
            return buku;
    }
    return null;
}

// Mencari index dari objek task book yang ada pada array berdasarkan ID yang di input pada argumen pertama
function findBookIndex(bookId) {
    let index = 0
    for (buku of books) {
        if (buku.id === bookId)
            return index;

        index++;
    }
    return -1;
}

// Fungsi ini digunakan untuk me-render data Book yang ada pada object array books
function refreshDataFromBook() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (buku of books) {
        const newBook = makeNewBook(buku.title, buku.author, buku.year, buku.isCompleted);
        newBook[BOOK_ITEMID] = buku.id;

        if (buku.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}