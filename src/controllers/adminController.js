const { config } = require("../config/words");
const { getTodayWord, getWordsOfDay } = require("../repositories/wordOfDayRepo");
const { syncWords } = require("../services/cronServices/wordCronService");

const getStatistics = async (req, res) => {
    try {
        let date = req.query.date;
        console.log(date);
        let words = await getWordsOfDay(date);
        console.log("Filter result",  words
        .filter(word => {
            console.log('word length', word.length, config.minWordsLength, config.maxWordsLength)
            return word?.length >= config.minWordsLength && word.length <= config.maxWordsLength})
        )
        let resultWords = words
        .filter(word => word.length >= config.minWordsLength && word.length <= config.maxWordsLength)
        .map(word => {
                return {
                    guess_count: word.guess_count, 
                    word_length: word.length, 
                    word_name: word.word_name
                }
        })

        return res.json({
            today_words: resultWords,
        })

    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: "Internal Server Error",
        }, 500)
    }
}

const adminSyncWords = (req, res) => {
    syncWords();
}

module.exports = {
    getStatistics: getStatistics,
    adminSyncWords: adminSyncWords,
}
