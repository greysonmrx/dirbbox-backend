import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('folders_uploads', table => {
    table.increments('id').primary();
    table
      .integer('folder_id')
      .notNullable()
      .references('id')
      .inTable('folders');
    table
      .integer('upload_id')
      .notNullable()
      .references('id')
      .inTable('uploads');
    table.integer('user_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('folders_uploads');
}
