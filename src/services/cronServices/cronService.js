const {getLast100Words, getWordsWithExclude, createWords} = require("../../repositories/wordRepo");
const {getLatestDate} = require("../../repositories/wordOfDayRepo");
const moment = require("moment/moment");
const {cronConfig} = require("../../config/cron");
const getWordsToExclude = async (wordLength) => {
    let last100Words = await getLast100Words(wordLength);
    return last100Words ? last100Words.map(word => word.word_name) : [];
}

const prepareFillingDate = async (wordLength) => {
    let latestFilledDateInDB = await getLatestDate(wordLength);

    let startDate = latestFilledDateInDB && latestFilledDateInDB.length && latestFilledDateInDB[0].latest_date ?
        moment(latestFilledDateInDB[0].latest_date).add(1, 'd') :
        moment();
    let daysToFill = cronConfig.DAYS_TO_FILL;
    let endDate = moment().add(daysToFill - 1, 'd');

    return {startDate: moment(startDate.format('YYYY-MM-DD')), endDate: moment(endDate.format('YYYY-MM-DD'))};
}

const fillWords = async (wordLength, fillStartDate, fillEndDate) => {

    if (fillEndDate.diff(fillStartDate, 'd') < 0) {
        console.log('Already filled with required interval');
        return;
    }

    let newWordsCountToFill = fillEndDate.diff(fillStartDate, 'd') + 1;


    console.log('ddddddd starting to fill from ', {
        start: fillStartDate.format('YYYY-MM-DD'),
        end: fillEndDate.format('YYYY-MM-DD'),
        newWordsCountToFill,
    })

    let excludedWords = await getWordsToExclude(wordLength);
    let newWords = await getWordsWithExclude(excludedWords, wordLength, newWordsCountToFill);

    console.log('found new words', newWords.length);

    let dataToInsert = [];
    for (let i = 0; fillEndDate.diff(fillStartDate, 'd') >= 0 && i < newWords.length; i++) {
        dataToInsert.push([
            newWords[i].id,
            fillStartDate.format('YYYY-MM-DD'),
        ]);
        fillStartDate.add(1, 'd');
    }
    console.log('data to insert', dataToInsert);
    dataToInsert.length && await createWords([dataToInsert]);
}

module.exports = {
    getWordsWithExclude: getWordsWithExclude,
    prepareFillingDate: prepareFillingDate,
    fillWords: fillWords,
}
