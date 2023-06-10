const words = require('../words/words_dictionary.json');
const wordConfig = require('../src/config/words')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    let minWordLength = wordConfig.config.minWordsLength;
    let maxWordLength = wordConfig.config.maxWordsLength;

    const dataToInsert = [];

    for (let i = minWordLength; i <= maxWordLength; i++) {
        words[i].forEach(word => {
            dataToInsert.push({word_name: word.toUpperCase(), length: i});
        })
    }

    await knex('words').truncate();
    await knex('words').insert(dataToInsert);
};
