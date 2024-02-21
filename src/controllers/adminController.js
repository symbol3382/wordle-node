const { config } = require("../config/words");
const { getTodayWord } = require("../repositories/wordOfDayRepo");

const getStatistics = async (req, res) => {
    try {
        const todayWords = [];
        for(let i = config.minWordsLength; i<= config.maxWordsLength; i++) {
            let word = await getTodayWord(i);
            word.length && todayWords.push({
                word_length: i,
                word_name: word[0].word_name,
                guess_count: word[0].guess_count || 0,
            })
        }

        return res.json({
            today_words: todayWords
        })

    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: "Internal Server Error",
        }, 500)
    }
}

module.exports = {
    getStatistics: getStatistics
}
