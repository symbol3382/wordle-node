const { getLast100Words, getWordsWithExclude, createWords, getWordsLengthRange } = require("../../repositories/wordRepo");
const { getLatestDate, getTodayWord, getWordsOfDay, getWordsOfDateRange, getUnusedCommonWords } = require("../../repositories/wordOfDayRepo");
const { cronConfig } = require("../../config/cron");
const moment = require('moment');
const { config } = require("../../config/words");
const { default: knex } = require("knex");

const dateFormat = "YYYY-MM-DD";

/**
 * @description This method will fill the next 30 days
 * @note this will check the next 30 days should not be repeated from last 120 days
 * 
 * @param {Number} days 
 */
const syncWords = async (days = 30) => {
    const minWords = config.minWordsLength;
    const maxWords = config.maxWordsLength;

    const date = moment();
    for (let day = 0; day < 30; day++) {
        let dateStr = date.format(dateFormat);
        let dateWords = await getWordsOfDay(dateStr);
        for (let wordLength = minWords; wordLength <= maxWords; wordLength++) {
            let dateWord = dateWords.find(word => word.length === wordLength);
            if(!dateWord) {
                let randomWord = await getRandomWordByLength(wordLength, date);
                pool.query('INSERT INTO word_of_days (word_id, word_date) VALUES(?)', [[randomWord, dateStr]])
            }
        }
        date.add(1, 'd');
    }

}

/**
 * 
 * @param {*} wordLength 
 * @param {import("moment").Moment} date 
 */
const getRandomWordByLength = async (wordLength, date) => {
    const unusedCommonWords = await getUnusedCommonWords(
        date.clone().subtract(150, 'd').format(dateFormat),
        date.format(dateFormat),
        wordLength
    );
    let commonWords = unusedCommonWords.map(word => word.id)
    return commonWords[getRandomInt(0 ,commonWords.length)]
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    syncWords: syncWords,
}
