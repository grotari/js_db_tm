"use strict";
import TextAnalyse from "./module/TextAnalyse.js";

export const tokensCheckbox = document.querySelector("#tokens");
export const typesCheckbox = document.querySelector("#types");
export const mfwRange = document.querySelector("#mfw");
export const stopWordsRange = document.querySelector("#stopwords");
export const btnSubmitParameters = document.querySelector("#submit-parameters");
export const resultsField = document.querySelector("#results");

document.querySelector("#text-load-btn").addEventListener("click", (e) => {
    e.preventDefault();

    const txtFile = document.getElementById("formFile").files[0];
    let TA = new TextAnalyse(txtFile);
    console.log(TA.uploadTxt());
    console.log(TA.textWrangling());
    console.log(TA.wordCounting());
    console.log(TA.textLengthCount());
    console.log(TA.uniqueWordsCount());
    console.log(TA.dataSort());
    console.log(TA.wordDensityCalc());
    console.log(TA.mfwExtract());

    btnSubmitParameters.addEventListener("click", () => {
        closeModal();
        console.log(TA.readInput());
        console.log(TA.stopWordsCheck());
        console.log(TA.mfwRangeCheck());
        console.log(TA.stopWordsRangeToWords());
        console.log(TA.mfwRangeToWords());
        console.log(TA.mfwForJson());
        console.log(TA.mfwToDisplay());
        console.log(TA.resultsToDisplay());
    });
   
});

typesCheckbox.addEventListener("change", () => {
    stopWordsRange.disabled = false;
    mfwRange.disabled = false;
});

function openModal() {
    $("#modal").show();
    $("#modal-fade").show();
    $("#modal-wrapper").show();
    $("body").addClass("modal-open");
}

function closeModal() {
    $("#modal").hide();
    $("#modal").scrollTop();
    $("#modal-fade").hide();
    $("#modal-wrapper").hide();
    $("body").removeClass("modal-open");
}

document.querySelector("#btn-for-modal").addEventListener("click", openModal);
document.querySelector("#close-button").addEventListener("click", closeModal);
