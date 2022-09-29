"use strict";
import UI from "./module/UI.js";
import DataBase from "./module/DataBase.js";

// Einstellung der Parameter für Eingabefelder
let isbnList = document.querySelector("#isbn");
let titleList = document.querySelector("#title");
let yearList = document.querySelector("#year");
let authorList = document.querySelector("#author");

isbnList.setAttribute("maxLength", "17");
isbnList.setAttribute("size", "17");
yearList.setAttribute("maxLength", "4");
authorList.setAttribute("maxLength", "30");
titleList.setAttribute("maxLength", "30");

const form = document.querySelector("#book-form");
const containerTable = document.querySelector("#booklist-container");

// Platzhalter für Validierungsnachrichten
let div = document.createElement("div");
div.setAttribute("id", "conf-message");
div.className = "alert";
form.insertAdjacentElement("afterbegin", div);
div.style.visibility = "hidden";

let books, message, json;

//------------------ 1. Teil: Ajax ---------------------

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (xhr.status != 200) {
        containerTable.textContent = "Allgemeiner Verarbeitungsfehler";
        return;
    }
    if (xhr.responseType == "json") json = xhr.response;
    else json = JSON.parse(xhr.responseText);

    console.log("Die geladene JSON Datei:", json);

    localStorage.setItem("books", JSON.stringify(json));
    console.log("Stored data:", localStorage);

    // Bücher anzeigen lassen
    const books = DataBase.getDB();
    UI.createTable();
    books.forEach((book) => UI.addBook(book));
    UI.numberItemsCreateDiv();
    UI.numberOfItemsFound(books);
};

xhr.open("GET", "./booklist.json");
xhr.responseType = "json";
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.send();

//------------------ 2. Teil ---------------------

// 1. Insert Button
document.querySelector("#insert").addEventListener("click", (event) => {
    event.preventDefault();

    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const isbn = document.querySelector("#isbn").value;

    if (UI.emptyInput()) return;

    if (!UI.incorrectInput()) return;

    if (!UI.duplicatesCheck()) {
        const newBook = new DataBase(author, title, year, isbn);
        console.log("newBook", newBook);

        let bookMitID = DataBase.addNewBook(newBook);
        console.log("bookMitID", bookMitID);

        UI.addBook(bookMitID);

        // Validierung
        let addedBookList = DataBase.getDB();
        console.log(
            "4. Die Datenbank zusammen mit dem hinzugefügten Buch: ",
            addedBookList
        );
        UI.numberOfItemsFound(addedBookList);

        let message =
            "Das Buch wurde erfolgreich im Local Storage gespeichert!";
        UI.validationMessages("success", message);
        console.log(message);

        UI.clearInput();
    }
});

// 2. Update Button
document.querySelector("#update").addEventListener("click", (event) => {
    event.preventDefault();
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const isbn = document.querySelector("#isbn").value;

    if (UI.emptyInput()) return;
    if (!UI.incorrectInput()) return;

    let books = DataBase.getDB();

    books.forEach((element, index) => {
        if (element.isbn === isbn) {
            books[index].author = author;
            books[index].title = title;
            books[index].year = year;
        }
    });

    console.log("Das updated Buch: ", books);
    let message = "Das Buch wurde erfolgreich updated!";
    UI.validationMessages("success", message);
    console.log(message);

    DataBase.saveDB(books);
    UI.clearInput();
    UI.tableTruncate();
    books.forEach((book) => UI.addBook(book));
    UI.numberOfItemsFound(books);
});

// 3.  Remove Button
document.querySelector("#remove").addEventListener("click", (event) => {
    event.preventDefault();
    let isbn = document.querySelector("#isbn").value;

    let index;
    books = DataBase.getDB();
    books.forEach((book, index) => {
        if (book.isbn === isbn) return index;
    });

    let removedBook = books.splice(index, 1);
    DataBase.saveDB(books);

    let message = `Ein Buch mit dem ISBN ${isbn} wurde erfolgreich aus dem LocalStorage entfernt.`;
    UI.validationMessages("success", message);
    UI.clearInput();
    UI.tableTruncate();
    books.forEach((book) => UI.addBook(book));
    UI.numberOfItemsFound(books);
});

// 4. Clear Button
document.querySelector("#clear").addEventListener("click", (event) => {
    event.preventDefault();

    UI.clearInput();
});

// 5. Search Button
let searchedInput = document.querySelector("#search-input");

document.querySelector("#search").addEventListener("click", (event) => {
    event.preventDefault();

    const books = DataBase.getDB();
    let filterBooks = UI.filterData(books, searchedInput.value);

    console.log("Gefundene Bücher: ", filterBooks);

    if (!filterBooks.length) {
        message = `Es wurden keine Einträge mit der Suchabfrage: ${searchedInput.value} gefunden.`;
        UI.validationMessages("warning", message);
        UI.tableTruncate();
        UI.numberOfItemsFound(filterBooks);
    } else {
        UI.tableTruncate();
        filterBooks.forEach((filterBook) => UI.addBook(filterBook));
        UI.numberOfItemsFound(filterBooks);
    }
});

function sendData() {
    if (window.confirm("Möchten Sie die Daten an Server abschicken?")) {
        let books = DataBase.getDB();
        DataBase.sendToServer(JSON.stringify(books));
        let message = "Die Daten wurden erfolgreich an den Server geschickt!";
        UI.validationMessages("success", message);
    }
}
