const {execute} = require("./baseRepo");
const getLast100Words = length => {
    const query = `SELECT wd.word_id, w.word_name from word_of_days as wd join dictionary_words as w on w.id = wd.word_id where w.length=? LIMIT ?`;
    return execute(query, [length, 100])
}

const getWordsWithExclude = (excluded = [], length, limit) => {
    let query = 'SELECT * FROM dictionary_words WHERE  length= ?';
    let preparedStatement = [length];
    if(excluded && excluded.length) {
        query += ` and word_name not in (?)`
        preparedStatement.push(excluded);
    }
    query += ` ORDER BY RAND() LIMIT ? `
    preparedStatement.push(limit);
    return execute(query, preparedStatement);
}

const createWords = (dataToInsert) => {
    const query = `INSERT INTO word_of_days (word_id, word_date) VALUES ?`;
    return execute(query, dataToInsert);
}

const getWordsLengthRange = () => {
    const query = `SELECT MIN(length) as min, MAX(length) as max FROM dictionary_words`;
    return execute(query);
}

const getWordByName = (wordName) => {
    const query = `SELECT * FROM dictionary_words where word_name=?`;
    return execute(query, [wordName]);
}

module.exports = {
    getLast100Words: getLast100Words,
    getWordsWithExclude: getWordsWithExclude,
    createWords: createWords,
    getWordsLengthRange: getWordsLengthRange,
    getWordByName: getWordByName,
}
