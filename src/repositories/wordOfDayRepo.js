const {execute} = require("./baseRepo");
const getLatestDate = (wordLength) => {
    const query = `SELECT MAX(word_date) as latest_date from word_of_days JOIN words on words.id = word_of_days.word_id WHERE words.length = ?`;
    return execute(query, [wordLength]);
}

const getTodayWord = (length) => {
    const query = `SELECT d.id AS word_of_day_id, w.word_name
        FROM word_of_days as d 
        LEFT JOIN dictionary_words as w 
        ON w.id = d.word_id 
        WHERE 
            w.length = ? 
            AND d.word_date = CURDATE()`;
    return execute(query, [length]);
}

const getWordsOfDay = (date) => {
    const query = `SELECT w.word_name, w.length
    FROM word_of_days as d 
    LEFT JOIN dictionary_words as w 
    ON w.id = d.word_id
    WHERE
        d.word_date = ?
    `
    return execute(query, [date]);
}

const updateWordGuessCount = (wordDayId) => {
    const query = `UPDATE word_of_days 
        SET guess_count = guess_count+1
        WHERE id = ?
    `

    return execute(query, [wordDayId]);
}

const getUnusedCommonWords = (startDate, endDate, wordLength) => {
    const query = `SELECT
           id,
           word_name
        FROM
            dictionary_words
        WHERE
            is_common = 1 AND LENGTH = ? AND word_name NOT IN 
            (
                SELECT
                    w.word_name
                FROM
                    word_of_days AS d
                LEFT JOIN dictionary_words AS w
                ON
                    w.id = d.word_id
                WHERE
                    w.length = ? AND d.word_date >= ? AND d.word_date <= ?
            );
    `
    return execute(query, [wordLength, wordLength, startDate, endDate]);
}

module.exports = {
    getLatestDate: getLatestDate,
    getTodayWord: getTodayWord,
    getWordsOfDay: getWordsOfDay,
    getUnusedCommonWords: getUnusedCommonWords,
    updateWordGuessCount: updateWordGuessCount,
}
