"use strict";
import {
    tokensCheckbox,
    typesCheckbox,
    mfwRange,
    stopWordsRange,
    resultsField,
} from "../wordsAsynchron.js";

let mfw;

export default class TextAnalyse {
    constructor(rawText) {
        this.rawText = rawText;
    }

    async readTxt() {
        let promise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => resolve(reader.result));
            reader.addEventListener("error", reject);
            reader.readAsText(this.rawText);
        });
        return promise;
    }

    async uploadTxt() {
        return (document.getElementById("text-area").value =
            await this.readTxt());
    }

    // 2. Datenbereinigung
    async textWrangling() {
        let text = await this.readTxt();
        return text
            .replace(/[!"„“#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
            .replace(/\n /, "\n")
            .replace(/\s{2,}/g, " ")
            .toLowerCase()
            .split(" ");
    }

    // -------- II. Text Mining -------
    // 1.  Dataerstellung
    async wordCounting() {
        const cleanText = await this.textWrangling();
        return new Map(
            [...new Set(cleanText)].map((i) => [
                i,
                cleanText.filter((j) => j === i).length,
            ])
        );
    }

    // 2. Textlänge
    async textLengthCount() {
        const data = await this.wordCounting();
        return [...data.values()].reduce((sum, zahl) => sum + zahl);
    }

    // 3. Anzahl der einzigartigen Wörter
    async uniqueWordsCount() {
        const data = await this.wordCounting();
        return data.size;
    }

    // 4. Sortieren der Daten
    async dataSort() {
        const data = await this.wordCounting();
        return new Map([...data].sort((a, b) => b[1] - a[1]));
    }

    // 5. Wortdichte
    async wordDensityCalc() {
        const uniqueWords = await this.uniqueWordsCount();
        const textLength = await this.textLengthCount();
        return ((uniqueWords / textLength) * 100).toFixed(2);
    }

    // 6. Die häufigsten Wörter: nur Schlüssel
    async mfwExtract() {
        const dataSorted = await this.dataSort();
        return (mfw = [...new Set(dataSorted)].map((b) => {
            return b[0];
        }));
    }

    async readInput() {
        const allParameters = new Map();
        allParameters.tokens = tokensCheckbox.checked;
        allParameters.types = typesCheckbox.checked;
        allParameters.stopWordsRange = stopWordsRange.value;
        allParameters.mfwRange = mfwRange.value;
        return allParameters;
    }

    async stopWordsCheck() {
        const allParameters = await this.readInput();
        return (allParameters.stopWordsRange =
            allParameters.stopWordsRange || 5);
    }

    async mfwRangeCheck() {
        const allParameters = await this.readInput();
        return (allParameters.mfwRange = allParameters.mfwRange || 30);
    }

    async stopWordsRangeToWords() {
        const stopWords = await this.stopWordsCheck();
        const uniqueWords = await this.uniqueWordsCount();
        return Math.round((uniqueWords * stopWords) / 100);
    }

    async mfwRangeToWords() {
        const stopWords = await this.stopWordsRangeToWords();
        const uniqueWords = await this.uniqueWordsCount();
        const mfw = await this.mfwRangeCheck();
        return Math.round(((uniqueWords - stopWords) * mfw) / 100);
    }

    async mfwForJson() {
        const stopWords = await this.stopWordsRangeToWords();
        const dataSorted = await this.dataSort();
        const saveMfw = [...dataSorted].slice(stopWords);
        return new Map(saveMfw);
    }

    async mfwToDisplay() {
        const stopWords = await this.stopWordsRangeToWords();
        const mfw = await this.mfwRangeToWords();
        const mfwList = await this.mfwExtract();
        return [...mfwList].slice(stopWords,stopWords+mfw).join(", ");
    }

    async resultsToDisplay() {
        const allParameters = await this.readInput();
        const textLength = await this.textLengthCount();
        const uniqueWords = await this.uniqueWordsCount();
        const displayMfw = await this.mfwToDisplay();
        const wordDensity = await this.wordDensityCalc();
        const mfw = await this.mfwRangeToWords();

        if (allParameters.tokens && !allParameters.types) {
            resultsField.innerHTML = `Anzahl der Wörter: ${textLength}.`;
        } else if (!allParameters.tokens && allParameters.types) {
            resultsField.innerHTML = `
              Anzahl der einmaligen Wörter: ${uniqueWords}. <br>
              Die ${mfw} meist verwendeten Wörter: ${displayMfw}.`;
        } else if (allParameters.tokens && allParameters.types) {
            resultsField.innerHTML = `Anzahl der Wörter: ${textLength}. <br> 
              Anzahl der einmaligen Wörter: ${uniqueWords}. <br>
              Die Wortschatzdichte ist: ${wordDensity}%. <br>
              Die ${mfw} meist verwendeten Wörter: ${displayMfw}.`;
        }
        else return;
    }
}
