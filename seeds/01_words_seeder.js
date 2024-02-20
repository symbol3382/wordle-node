const words = require('../words/words_dictionary.json');
const wordConfig = require('../src/config/words')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    console.log("running words");
    let minWordLength = wordConfig.config.minWordsLength;
    let maxWordLength = wordConfig.config.maxWordsLength;

    const dataToInsert = [];

    for (let i = minWordLength; i <= maxWordLength; i++) {
        words[i].forEach(word => {
            dataToInsert.push({word_name: word.toUpperCase(), length: i});
        })
    }

    await knex.raw('SET FOREIGN_KEY_CHECKS=0');
    await knex('dictionary_words').truncate();
    await knex('dictionary_words').insert(dataToInsert);
};
