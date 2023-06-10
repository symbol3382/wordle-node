const {getWordByName} = require("../repositories/wordRepo");
const {getTodayWord} = require("../repositories/wordOfDayRepo");
const {fillNextDaysWords} = require("../services/cronServices/wordCronService");
const checkWord = async (req, res) => {
    try {
        let {word} = req.body;
        let dbWords = await getWordByName(word);

        if (!dbWords.length) {
            return res.status(422).json({
                status: false,
                messages: {
                    word: ['Word does not exists !']
                }
            })
        }

        let todayWord = await getTodayWord(word.length);
        if (!todayWord.length) {
            return res.status(500).json({
                status: false,
                message: "No word found for today"
            });
        }

        todayWord = todayWord[0].word_name;

        let result = {
            word,
            match: false,
            result: [],
        };
        if (todayWord === word) {
            return res.json({
                status: true,
                data: {
                    word,
                    match: true,
                    result: Array(word.length).fill(1),
                }
            })
        } else {
            Array.from(todayWord).forEach((todayWordChar, index) => {
                if (todayWordChar === word[index]) {
                    // same char , correct position
                    result.result[index] = 1;
                } else if (todayWord.includes(word[index])) {
                    // correct char, but wrong position
                    result.result[index] = -1;
                } else {
                    result.result[index] = 0;
                }
            })
            return res.json({
                status: true,
                data: result
            })
        }

    } catch (e) {
        return e.message;
    }

}


module.exports = {
    checkWord: checkWord
}
