const {getWordByName} = require("../repositories/wordRepo");
const {getTodayWord} = require("../repositories/wordOfDayRepo");
const {syncTodayWord} = require("../services/cronServices/wordCronService");
const checkWord = async (req, res) => {
    try {
        let {word} = req.body;
        let dbWords = await getWordByName(word);

        if (!dbWords.length) {
            return res.status(422).json({
                status: false,
                messages: {
                    word: ['Word does not exists !'],
                }
            })
        }

        let todayWord = await getTodayWord(word.length);
        if (!todayWord.length) {
            await syncTodayWord(word.length);
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
            result.result = matchWordWithResult();
            
            return res.json({
                status: true,
                data: result
            })
        }

    } catch (e) {
        console.error(e);
        return res.json({
            status: false,
            message: "Internal Server Error",
        }, 500)

    }

}


const matchWordWithResult = (todayWord, word) => {
    let result = [];
    todayWord = todayWord.split('');
    word = word.split('')
    const skipDelimiter = '_';
    todayWord.forEach((todayWordChar, index) => {
        if (todayWordChar === word[index]) {
            // same char , correct position
            result[index] = 1;
            word[index] = skipDelimiter
            todayWord[index] = skipDelimiter
        }
    })
    word.forEach((wordChar, index) => {
        if(wordChar === skipDelimiter) {
            return;
        }
        let matchIndex = null;
        if((matchIndex = todayWord.indexOf(wordChar)) > 0) {
            result[index] = -1;
            todayWord[matchIndex] = skipDelimiter;
        } else {
            result[index] = 0;
        }
    })
    return result;
}

module.exports = {
    checkWord: checkWord
}
