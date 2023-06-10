const wordConfig = require("../../config/words");
const fillError = (errors, key, message) => {
    if (errors[key]) {
        errors[key].push(message);
    } else {
        errors[key] = [message];
    }
    return errors;
}

const validateWord = (req, res, next) => {
    try {
        let {word} = req.body;
        let errors = {};

        if (!word) {
            errors = fillError(errors, 'word', 'Word is required');
        } else if (typeof word !== 'string') {
            errors = fillError(errors, 'word', 'Word must be a valid string');
        } else if (word.length < wordConfig.config.minWordsLength || word.length > wordConfig.config.maxWordsLength) {
            errors = fillError(errors, 'word', `Word length must be between ${wordConfig.config.minWordsLength} to ${wordConfig.config.maxWordsLength}`)
        }

        if (Object.keys(errors).length) {
            res.status(422).json({
                status: false,
                messages: errors,
                req: req.body,
            })
        } else {
            next()
        }
    } catch (e) {
        console.log('ddddddd here is the errorr', e);
        res.status(500).json({

            status: false,
            message: e.message,
        })
    }

}

module.exports = {
    validateWord: validateWord,
}
