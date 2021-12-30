document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addNewBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

});

document.addEventListener("ondatadelete", () => {
    console.log("Data berhasil dihapus.");
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});


document.addEventListener("ondataloaded", () => {
    refreshDataFromBook();
});

