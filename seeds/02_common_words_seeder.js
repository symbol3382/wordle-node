const words = require('../words/words_dictionary.json');
const wordConfig = require('../src/config/words')

const fs = require('fs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

    let commonWords = JSON.parse(fs.readFileSync('words/common_words.json', 'utf8'));

    for (let wordLength in commonWords) {
        for (let word of commonWords[wordLength]) {
            await knex('dictionary_words').update({
                is_common: 1,
            }).where({
                word_name: word.toUpperCase(),
            })
        }
    }
}

