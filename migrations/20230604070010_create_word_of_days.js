/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('word_of_days', table => {
      table.increments();
      table.date('word_date');
      table.integer('word_id').unsigned().references('id').inTable('dictionary_words')
          // .onDelete('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('word_of_days');
};
