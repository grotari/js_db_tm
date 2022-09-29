
Die Anwendung besteht aus zwei Seiten. 
Die erste Seite ("Home") hilft beim Erstellen und Ändern einer Datenbank mit Büchern aus einer .json-Datei oder von Grund auf.
Die zweite Seite ("Text Mining") ist eine asynchronishce Anwednung, die bei der Analyse eines Textes mithilft.


HOME-Seite

Beschreibung:

Eine json-Datei wird über AJAX hochgeladen. Wenn der Erstellungsvorgang abgeschlossen ist, kann die Datenbank ausgewählt werden, um sie an den Server zu senden, andernfalls wird sie automatisch im LocalStorage gespeichert. 

Dokumente: 

index.html, script.js, script.php, style.css, zwei Klassen: UI.js und DataBase.js
booklist.json - eine Liste von Büchern zum Testen


Eigenschaften:

Doppelklicken Sie auf ein beliebiges Feld in der Tabelle:
Um ein Buch zu aktualisieren, einzufügen oder zu entfernen, sollte es zunächst in den Eingabefeldern angezeigt werden, indem man zweimal darauf klickt.

Löschen eines Buches aus der Datenbank:
Jedes Buch kann mit Hilfe des "X"-Buttons und des "Entfernen"-Buttons aus der Tabelle entfernt werden, indem man zunächst auf das gewünschte Buch doppelklickt.
Wenn das Buch erfolgreich entfernt wurde, erhalten Sie die Meldung "Das Buch wurde mit dem gewünschten Index aus der Datenbank gelöscht".

"Einfügen"-Button (Prüfungen werden durchgeführt):
   1. alle Eingabefelder sollten ausgefüllt sein:
Wenn mindestens eines der Eingabefelder nicht ausgefüllt ist, wird eine Fehlermeldung angezeigt, die Sie auffordert, alle Felder auszufüllen. Die Meldung verschwindet nach 5 Sekunden. Die weiteren Prüfungen werden dann nicht durchgeführt.

   2. Jahr und ISBN sind konforme Regelmäßigkeiten:
Die Fehlermeldungen werden angezeigt und die weiteren Prüfungen werden nicht durchgeführt, unabhängig davon:
	ob ein oder beide Einträge fehlerhaft sind, 
	ob nur ein falscher Eintrag korrigiert wurde, unabhängig von der Reihenfolge der durchgeführten Schritte und 
	ob die gleichen Schritte wiederholt durchgeführt werden.

   3. Es werden keine neuen Bücher doppelt eingefügt:
Es wird auch geprüft, ob ein Buch bereits in der JSON-Liste vorhanden ist; ist dies der Fall, wird eine Meldung angezeigt: "Das Buch ist bereits Teil der Bibliothek", die nach 5 Sekunden verschwindet. Die anderen Prüfungen werden nicht durchgeführt.
Wenn das Buch nicht vorkommt, wird es gespeichert. Der Schritt kann mehrmals wiederholt werden => keine doppelten Einträge.

"Löschen"-Button:
Die Einträge in den Eingabefeldern werden gelöscht. Wurde ein Buch erfolgreich eingefügt, werden auch die Eingabefelder gelöscht.

"Aktualisieren"-Button:
Jedes Buch kann durch zweimaliges Anklicken aktualisiert werden. Alle Prüfungen wie beim Einfügen eines Buches werden ebenfalls durchgeführt. Im Falle einer erfolgreichen Aktualisierung gibt es eine Benachrichtigung.

Feld "Suchen":
Suchen Sie nach einer oder mehreren Wortkombinationen ohne Komma-Trennung. Diese werden in Form einer Tabelle angezeigt. Wenn keine Einträge gefunden werden, erhalten Sie ebenfalls eine Benachrichtigung.

Die Benachrichtigung am Ende der Tabelle informiert Sie auch über die Anzahl der Einträge in der Tabelle.

ID:
Die ID wird automatisch generiert. Sie ist eine Kombination aus 5 Zahlen und/oder Buchstaben. Dabei wird die Basis 36 verwendet. Sie kann aber auch auf eine beliebige Basis geändert werden. Die Länge der ID kann ebenfalls geändert werden.




TEXT MINING-Seite

Dokumente:

words.html, wordsAsynschron.js, a class: modele/TextAnalysis.js, a text to upload: 1857-the-willed-child.txt, libs/jquery

Eigenschaften:

"Datei hochladen"-Button:
Sie zeigt den Inhalt einer .txt-Datei im Eingabefeld an.

"Forschung"-Button:
Es wird ein Modell mit Optionen für Parameter angeboten, die für die Analyse berücksichtigt werden sollen.
Es stehen 2 Arten der Analyse zur Auswahl und 3 Arten von Ergebnissen, die angezeigt werden können: 
	1. Nur Token-Auswahl: Es soll nur die Anzahl der Gesamtwörter im Text ermittelt werden.
	2. Nur Typauswahl: Es soll die Gesamtzahl der eindeutigen Wörter im Text und eine Teilmenge der häufigsten Wörter angezeigt werden.
	3. Auswahl beider Parameter: Zusätzlich zu den oben genannten Kriterien wird die Dichte der Wörter im Text gemessen.

"Stoppwörter" ist der Bereich der ersten häufigsten Wörter, die aus der Analyse entfernt werden.
"Häufigste Wörter" ist der Bereich der häufigsten Wörter, die im Feld "Ergebnisse" angezeigt werden.

Die Bereiche "Stoppwörter" und "Häufigste Wörter" sind Prozentsätze der Anzahl der eindeutigen Wörter. 
Standardmäßig sind "Stoppwörter" die ersten 10 % der Anzahl der eindeutigen Wörter.
Standardmäßig sind "häufigste Wörter" die ersten 30 % der Anzahl der eindeutigen Wörter, ohne die Stoppwörter.

