import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('folders_users', table => {
    table.increments('id').primary();
    table
      .integer('folder_id')
      .notNullable()
      .references('id')
      .inTable('folders')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('folders_users');
}
