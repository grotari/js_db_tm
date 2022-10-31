# js_db_tm

The application is a combination of data creation and text mining tasks:
1. __Home__ is designed to create and modify a database of books from scratch or using a .json list of books.
2. __Text Mining__ is an asynchronous application for text analyses.

### HOME app

#### App components
* index.html
* script.js
* script.php
* style.css
* Two classes: 
	* UI.js
	* DataBase.js
* booklist.json (a list of books for testing)

#### Properties

* A .json file with the list of books is uploaded via AJAX. When creating and manipulating the database, the data is stored in LocalStorage. Optionally, the database can be sent to the server.

* __INSERT__ button (checks are performed):
	1. All input fields should be filled in:
		* If at least one of the input fields is not filled in, an error message will be displayed asking to fill in all fields. The message disappears after 5 seconds.

	2. Year and ISBN are compliant regularities:
		* Error messages are displayed and further checks are not performed regardless:
			* whether one or both entries are incorrect, 
			* if only one of the two incorrect entries has been corrected, and
			* if the same steps are performed repeatedly.

	3. No duplicates:
		* If the book is already inserted, a message saying _"The book is already in the library"_ will be displayed and will disappear after 5 seconds, otherwise the book will be saved.

* __CLEAR__ button:
	* The entries in the input fields are deleted. When a book has been successfully inserted, the input values are automatically deleted.
	
* Double click on any field of the table:
	* Double-click on the selected book to display it in the input fields and then to update or delete it.

* Deleting a book from the database:
	* Any book is removed with the __X__ or __REMOVE__ button. If the book has been successfully removed, the following message will be displayed: _"The book with index {index} has been successfully removed from the database"_.

* __UPDATE__ button:
	* Each book can be updated by clicking on it twice to display it in the input fields. In case of a successful update, a notification will be displayed.

* __SEARCH__ field:
	* Search for one or more word combinations by entering the values without commas. These will be displayed in the form of a table. If there are no matches, a notification will be displayed.

* __ID__:
	* The ID is generated automatically. It is a combination of 5 numbers and/or letters. The base 36 is used for the creation of the IDs. Optionally, the base type and the length of the IDs can be changed.


### TEXT MINING app

#### App components:
* words.html
* wordsAsynschron.js
* a class: modele/TextAnalysis.js
* a text to upload: 1857-the-willed-child.txt
* libs/jquery

#### Properties

* __UPLOAD FILE__ button:
	* It displays the contents of a .txt file in the input field.

* __RESEARCH__ button:
	* A model with options for the parameters to be considered in the analysis will appear. There are 3 types of analyses to choose from: 
		1. Token selection only: Only the number of total words in the text should be determined.
		2. Type selection only: To measure the total number of unique words in the text and determine and display a subset of the most frequent words.
		3. Selection of both parameters: In addition to the above criteria, the density of words in the text is measured.

* __Stop words__ is the range of the first most frequent words that will be excluded from the analysis.
* __Most frequent words__ is the range of the most frequent words that the user is interested in. These will be displayed in the __Results__ field.

	* The __Stop words__ and __Most frequent words__ ranges are percentages of the total number of unique words in the text. 
	* By default, __Stop Words__ are the first 10% of the number of unique words.
	* By default, __Most frequent words__ are the first 30% of the number of unique words, excluding the stop words.
