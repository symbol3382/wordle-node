/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dictionary_words', table => {
        table.increments();
        table.string('word_name').unique();
        table.tinyint('is_common').defaultTo(0);
        table.bigInteger('used_count').defaultTo(0);
        table.tinyint('length');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dictionary_words');
};
