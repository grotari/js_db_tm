"use strict";

const BASE = 36;
const ID_LENGTH = 5;
let books;

export default class DataBase {
    constructor(author, title, year, isbn) {
        this.author = author;
        this.title = title;
        this.year = year;
        this.isbn = isbn;
    }

    static getDB() {
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        console.log("Stored data:", localStorage);
        return books;
    }

    static addNewBook(book) {
        book.id = DataBase.randomID();
        books = DataBase.getDB();

        books = [...books, book];
        DataBase.saveDB(books);

        return book;
    }

    static randomID() {
        let id;
        let strings = [];

        for (let i = 0; i < ID_LENGTH; i++) {
            let randomNumber = (Math.random() + 1)
                .toString(BASE)
                .substring(2, ID_LENGTH + 2);
            strings.push(randomNumber);
            console.log(strings);

            i = strings.join("").length;
            console.log(i);

            id = strings.join("").substring(0, ID_LENGTH);
            console.log(id);
        }
        return id;
    }

    static saveDB(books) {
        localStorage.setItem("books", JSON.stringify(books));
    }

    static sendToServer() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status != 200) return;
            console.log("Die empfangene Daten:", xhr.responseText);
        };
        xhr.open("POST", "./script.php");
        xhr.send(books);
    }
}
