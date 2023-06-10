const {execute} = require("./baseRepo");
const getLatestDate = (wordLength) => {
    const query = `SELECT MAX(word_date) as latest_date from word_of_days JOIN words on words.id = word_of_days.word_id WHERE words.length = ?`;
    return execute(query, [wordLength]);
}

const getTodayWord = (length) => {
    const query = `SELECT w.word_name
        FROM word_of_days as d 
        LEFT JOIN words as w 
        ON w.id = d.word_id 
        WHERE 
            w.length = ? 
            AND d.word_date = CURDATE()`;
    return execute(query, [length]);
}

module.exports = {
    getLatestDate: getLatestDate,
    getTodayWord: getTodayWord,
}
