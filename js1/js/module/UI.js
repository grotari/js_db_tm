"use strict";

let containerTable = document.querySelector(".container");

let deleteBtn;
let table;
let index;
let books;

let isbnList = document.querySelector("#isbn");

export default class UI {
    static createTable() {
        containerTable = document.querySelector(".container");

        const table = document.createElement("table");
        const tableHead = document.createElement("thead");
        const tableHeadRow = document.createElement("tr");
        const tableHeadID = document.createElement("th");
        const tableHeadAuthor = document.createElement("th");
        const tableHeadTitle = document.createElement("th");
        const tableHeadYear = document.createElement("th");
        const tableHeadIsbn = document.createElement("th");
        const tableHeadDelete = document.createElement("th");

        // Definieren der Tabellenköpfe
        tableHeadID.textContent = "ID";
        tableHeadAuthor.textContent = "Autor";
        tableHeadTitle.textContent = "Titel";
        tableHeadYear.textContent = "Jahr";
        tableHeadIsbn.textContent = "ISBN";
        tableHeadDelete.textContent = "";

        // Zusammenstellen der DOM-Teile
        tableHeadRow.append(
            tableHeadID,
            tableHeadAuthor,
            tableHeadTitle,
            tableHeadYear,
            tableHeadIsbn,
            tableHeadDelete
        );

        tableHead.append(tableHeadRow);
        table.append(tableHead);
        containerTable.append(table);

        table.className = "table mt-4 table-hover";
        tableHead.className = "table-default";
        return containerTable;
    }

    static addBook(book) {
        table = document.querySelector("table");

        const tableBody = document.createElement("tbody");
        const row = document.createElement("tr");
        const idList = document.createElement("td");
        const authorList = document.createElement("td");
        const titleList = document.createElement("td");
        const yearList = document.createElement("td");
        const isbnList = document.createElement("td");
        const deleteList = document.createElement("td");
        deleteBtn = document.createElement("button");

        // Inhalt der Tabelle feststellen
        idList.textContent = book.id;
        authorList.textContent = book.author;
        titleList.textContent = book.title;
        yearList.textContent = book.year;
        isbnList.textContent = book.isbn;

        deleteBtn.textContent = "X";
        deleteBtn.className = "btn btn-sm delete btn-outline-danger";
        deleteList.append(deleteBtn);

        // DOM-Baumaufbau zusammenstellen
        row.append(
            idList,
            authorList,
            titleList,
            yearList,
            isbnList,
            deleteList
        );
        tableBody.appendChild(row);
        table.appendChild(tableBody);

        // Delete Button
        deleteBtn.addEventListener("click", UI.deleteBook);

        // Beim Mausdoppelklick, wird das ausgewählte Buch im Eingabeformular zur Bearbeitung angezeigt
        tableBody.lastElementChild.addEventListener("dblclick", UI.intoInput);
        return table, deleteBtn;
    }

    static numberItemsCreateDiv() {
        let summary = document.createElement("small");
        summary.setAttribute("id", "summary");
        summary.className = "card-text";

        containerTable.insertAdjacentElement("beforeend", summary);
    }

    static numberOfItemsFound(books) {
        let summary = document.querySelector("#summary");
        summary.textContent = `Es wurden ${books.length} Einträge gefunden.`;
    }

    static emptyInput() {
        if (
            document.querySelector("#author").value === "" ||
            document.querySelector("#year").value === "" ||
            document.querySelector("#title").value === "" ||
            document.querySelector("#isbn").value === ""
        ) {
            let message = "Bitte fühlen Sie alle Einträge ein!";
            console.log(message);
            UI.validationMessages("warning", message);
            return true;
        }
    }

    static incorrectInput() {
        let message;
        let UTCDate = new Date();
        let limitYear = UTCDate.getUTCFullYear() + 1;

        let isbnList = document.querySelector("#isbn");
        let yearList = document.querySelector("#year");

        let resultParameter = true;

        let yearReg = /^[0-9]+$/;

        let isbnReg =
            /^(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;

        if (yearReg.test(yearList.value) && yearList.value < limitYear) {
            console.log("Richtiges Jahr", yearList.value, limitYear);
            message = "";
            UI.incorrectMessages(yearList, message, "is-valid");
            console.log("right");
        } else {
            let message = "Das Jahr ist ungültig oder liegt weit in Zukunft!";
            UI.incorrectMessages(yearList, message, "is-invalid");
            console.log(message);
            resultParameter = false;
        }

        if (!isbnReg.test(isbnList.value)) {
            let message = "Das ISBN folgt nicht das Format: 000-0-000-00000-0!";
            console.log(message);
            UI.incorrectMessages(isbnList, message, "is-invalid");
            resultParameter = false;
        } else {
            message = "";
            UI.incorrectMessages(isbnList, message, "is-valid");
            console.log("right isbn");
        }
        return resultParameter;
    }

    static duplicatesCheck() {
        const books = JSON.parse(localStorage.getItem("books"));

        let bookObject;
        let dublicatefound = false;

        books.forEach((book) => {
            if (book.isbn == isbnList.value) {
                dublicatefound = true;
                console.log(dublicatefound);
                bookObject = book;
                UI.clearInput();
                let message = "Dieses Buch ist schon Teil der Bibliothek!";
                console.log(message);
                UI.validationMessages("info", message);
            }
        });
        return dublicatefound;
    }

    // Delete Tabellenbutton
    static deleteBook() {
        index = this.parentNode.parentNode.rowIndex;
        this.parentNode.parentNode.remove();

        console.log("Das entfernte Buch mit dem UI-Index: ", index);

        books = JSON.parse(localStorage.getItem("books"));
        const removedBook = books.splice(index - 1, 1);

        UI.numberOfItemsFound(books);

        // Validierung
        localStorage.setItem("books", JSON.stringify(books));
        books = JSON.parse(localStorage.getItem("books"));
        console.log(
            `Die aktualisierte Datei enthält ${books.length} Einsätze.`
        );

        for (let key of books) {
            if (books[key] !== removedBook.isbn) {
                throw new Error(
                    `Die Entfernug des Buches mit dem ISBN:  ${isbn} ist fehlgeschalgen!`
                );
            } else {
                console.log("Erfolgreicher Entfernug des Buches.");
                let message = `Ein Buch mit dem Index ${index} wurde erfolgreich aus dem LocalStorage entfernt.`;
                UI.validationMessages("success", message);
            }
        }
    }

    // Doppelklick auf Tabellenzeile
    static intoInput() {
        let books = JSON.parse(localStorage.getItem("books"));
        let isbn = this.childNodes[4].textContent;

        console.log(isbn);

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                console.log(index);
                document.querySelector("#author").value = book.author;
                document.querySelector("#title").value = book.title;
                document.querySelector("#year").value = book.year;
                document.querySelector("#isbn").value = book.isbn;
            }

            return index;
        });
    }

    // Clear Button
    static clearInput() {
        document.querySelector("#author").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#year").value = "";
        document.querySelector("#isbn").value = "";

        let errorsText = document.querySelectorAll(".error-messages");
        errorsText.forEach((el) => {
            el.textContent = "";
        });

        let errosInput = document.querySelectorAll(".error-input");
        errosInput.forEach((el) => {
            el.classList.remove("is-invalid");
        });
    }

    static validationMessages(className, message) {
        let div = document.querySelector("#conf-message");
        div.classList.add("alert-" + className);
        div.textContent = message;
        let form = document.querySelector("#book-form");
        form.insertAdjacentElement("afterbegin", div);
        div.style.visibility = "visible";
        setTimeout(() => {
            div.style.visibility = "hidden";
        }, 3000);
    }

    static incorrectMessages(el, message, className) {
        el.classList.remove("is-invalid");
        el.classList.add(className);
        let errorField = el.nextElementSibling;
        errorField.textContent = message;
        errorField.style.visibility = "visible";
        if (UI.incorrectInput) {
            setTimeout(() => el.classList.remove("is-valid"), 3000);
        }
    }

    // Tabelle löschen
    static tableTruncate() {
        document
            .querySelectorAll("td")
            .forEach((el) => el.parentNode.parentNode.remove());
    }

    // Suchen
    static filterData(books, searchedWords) {
        return books.filter((book) => {
            return searchedWords
                .trim()
                .split(" ")
                .every((searchedWord) => UI.checkValue(book, searchedWord));
        });
    }

    static checkValue(book, searchedWord) {
        if (typeof book === "string") {
            return book.toLowerCase().includes(searchedWord.toLowerCase());
        } else if (
            typeof book === "object" &&
            book !== null &&
            Object.keys(book).length > 0
        ) {
            return Object.values(book).some((item) =>
                UI.checkValue(item, searchedWord)
            );
        } else {
            return false;
        }
    }
}
