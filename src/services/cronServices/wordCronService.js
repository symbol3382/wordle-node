const {getLast100Words, getWordsWithExclude, createWords, getWordsLengthRange} = require("../../repositories/wordRepo");
const {getLatestDate} = require("../../repositories/wordOfDayRepo");
const {cronConfig} = require("../../config/cron");
const moment = require('moment');
const {prepareFillingDate, fillWords} = require("./cronService");


const fillNextDaysWords = async () => {
    let wordLengthRange = await getWordsLengthRange();
    if (wordLengthRange && wordLengthRange.length && wordLengthRange[0].min && wordLengthRange[0].max) {
        for (let i = wordLengthRange[0].min; i < wordLengthRange[0].max; i++) {
            let {startDate, endDate} = await prepareFillingDate(i);
            await fillWords(i, startDate, endDate);
        }
    }
}


module.exports = {
    fillNextDaysWords: fillNextDaysWords,
}
