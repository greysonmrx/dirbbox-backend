import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('folders_users', table => {
    table.increments('id').primary();
    table
      .integer('folder_id')
      .notNullable()
      .references('id')
      .inTable('folders');
    table.integer('user_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('folders_users');
}
